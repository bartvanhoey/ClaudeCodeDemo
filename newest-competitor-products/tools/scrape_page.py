"""Fetch a web page and extract its text content + links for Stage 2.

Tries a plain `requests` GET + BeautifulSoup parse first (fast, no
browser needed). If the extracted text is suspiciously short, the page
is likely JS-rendered - in that case a Playwright fallback is needed
(not installed by default; see requirements.txt).

This module only does deterministic fetch/extract/save. Deciding what
the extracted content *means* (is this a new product? what's the use
case?) is Stage 3's job, done by the agent.
"""

import json
import os
import sys

import requests
from bs4 import BeautifulSoup

RAW_DIR = os.path.join(os.path.dirname(__file__), "..", ".tmp", "raw")

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)

# Below this many characters of extracted body text, a page is flagged
# as likely needing JS rendering (Playwright fallback).
MIN_TEXT_LENGTH = 200


def fetch_page(url, timeout=20):
    """GET a URL and return {url, status_code, html} or {url, error}."""
    try:
        response = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=timeout)
        return {"url": url, "status_code": response.status_code, "html": response.text}
    except requests.RequestException as e:
        return {"url": url, "error": str(e)}


def extract_content(html, base_url):
    """Parse HTML and return {title, text, links, likely_js_rendered}."""
    soup = BeautifulSoup(html, "html.parser")

    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    title = soup.title.string.strip() if soup.title and soup.title.string else ""

    text = " ".join(soup.get_text(separator=" ").split())

    links = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        link_text = " ".join(a.get_text(separator=" ").split())
        links.append({"text": link_text, "href": href})

    return {
        "title": title,
        "text": text,
        "links": links,
        "likely_js_rendered": len(text) < MIN_TEXT_LENGTH,
    }


def scrape_url(url):
    """Fetch + extract a single URL. Returns a result dict (never raises)."""
    fetched = fetch_page(url)
    if "error" in fetched:
        return {"url": url, "error": fetched["error"]}

    if fetched["status_code"] != 200:
        return {"url": url, "status_code": fetched["status_code"], "error": "non-200 response"}

    extracted = extract_content(fetched["html"], url)
    return {"url": url, "status_code": fetched["status_code"], **extracted}


def save_raw(competitor_name, pages, raw_dir=RAW_DIR):
    """Write a competitor's scraped pages to .tmp/raw/<slug>.json."""
    os.makedirs(raw_dir, exist_ok=True)
    slug = "".join(c if c.isalnum() else "_" for c in competitor_name.lower())
    while "__" in slug:
        slug = slug.replace("__", "_")
    slug = slug.strip("_")
    path = os.path.join(raw_dir, f"{slug}.json")

    with open(path, "w", encoding="utf-8") as f:
        json.dump({"competitor": competitor_name, "pages": pages}, f, indent=2, ensure_ascii=False)

    return path


if __name__ == "__main__":
    # Manual check: scrape a single URL passed on the command line.
    if len(sys.argv) != 2:
        print("Usage: python scrape_page.py <url>")
        sys.exit(1)

    result = scrape_url(sys.argv[1])
    if "error" in result:
        print(f"Error: {result['error']}")
    else:
        print(f"Title: {result['title']}")
        print(f"Likely JS-rendered: {result['likely_js_rendered']}")
        print(f"Text length: {len(result['text'])} chars")
        print(f"Links found: {len(result['links'])}")
        preview = result["text"][:500].encode("ascii", "replace").decode("ascii")
        print(f"Text preview: {preview}")
