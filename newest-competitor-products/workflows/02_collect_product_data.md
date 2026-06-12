# Workflow: Collect Product & Content Data

## Objective

For each competitor identified in Stage 1 (`.tmp/competitors.json`), scrape their website (and optional news/meteorological/defense sources) to collect raw data on products, articles, and press releases.

## Inputs

- `.tmp/competitors.json` (from Stage 1)

## Process

1. For each competitor, build a list of URLs to scrape: `website`, `products_url`, `news_url`, and any `additional_sources`. Deduplicate.
2. Call `tools/scrape_page.py` (`scrape_url()`) for each URL. This:
   - Does a `requests` GET with a browser-like User-Agent
   - Parses with BeautifulSoup, strips `<script>`/`<style>`/`<noscript>`
   - Returns `{url, status_code, title, text, links, likely_js_rendered}` (or `{url, error}` on failure)
3. Sleep ~1s between requests per competitor (politeness).
4. Save each competitor's pages via `save_raw(competitor_name, pages)` → `.tmp/raw/<slug>.json`.
5. Check each result for `likely_js_rendered: true` or `error` — these need manual follow-up (see Edge Cases).

## Output

`.tmp/raw/<slug>.json` per competitor:
```json
{
  "competitor": "InterMet Systems",
  "pages": [
    {"url": "...", "status_code": 200, "title": "...", "text": "...", "links": [{"text": "...", "href": "..."}], "likely_js_rendered": false}
  ]
}
```

## Edge Cases & Learnings

- **All 6 competitor sites (Vaisala, Meisei Electric, InterMet Systems, Meteomodem, Lockheed Martin, Meteolabor AG) worked fine with plain `requests` + BeautifulSoup** — no JS-heavy pages encountered. Playwright fallback not needed so far; `requirements.txt` keeps it commented out until a site actually requires it.
- **Vaisala's news URL from Stage 1 (`/en/news`) returned a non-200.** Corrected to `https://www.vaisala.com/en/news-and-insights` in `.tmp/competitors.json`. If a `news_url` 404s, search `site:<domain> news press releases` to find the right path.
- **Lockheed Martin's news page is broad** (124KB scraped, general defense-conglomerate news) — Stage 3 will need to filter for radiosonde/meteorological-relevant items specifically, not treat every link as a product update.
- `save_raw()` slugifies competitor names for filenames (alphanumeric + underscores, collapsed) — e.g. "Lockheed Martin (LMS6 / Sippican)" → `lockheed_martin_lms6_sippican.json`.
