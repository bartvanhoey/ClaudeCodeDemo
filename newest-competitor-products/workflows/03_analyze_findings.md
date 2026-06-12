# Workflow: Analyze & Structure Findings

## Objective

Turn the raw scraped data from Stage 2 into a structured dataset of products/content items, extracting: product name, description, use cases, target industries, launch/publish date, and source URL.

## Inputs

- `.tmp/raw/*.json` (from Stage 2)

## Process

This stage is reasoning-heavy and done primarily by the agent (not a deterministic script):

1. Read each `.tmp/raw/<slug>.json` file's page text.
2. For each page, identify distinct "items" worth reporting: products, product features/upgrades, or notable news/announcements. Skip pure navigation/boilerplate, investor relations content (e.g. Vaisala's "Manager Transaction" releases), and generic corporate news unrelated to meteorology/radiosondes (e.g. Lockheed Martin's general news feed).
3. For each item, extract:
   - `competitor`, `name`, `type` (e.g. "product", "product (newly launched)", "product/feature")
   - `description` - what it is / what's new about it
   - `use_cases` - list of concrete applications
   - `target_industries` - list of industries/customer segments it's marketed to
   - `date` - if a publish/launch date is available (empty string if not)
   - `source_url` - the page it came from
   - `notes` - anything noteworthy for Graw (competitive angle, security/defense relevance, etc.)
4. Save via `tools/analyze_findings.py` (`save_findings()`) → `.tmp/findings.json`.

## Output

`.tmp/findings.json` - see schema in `tools/analyze_findings.py` (`FINDINGS_SCHEMA_EXAMPLE`).

## Edge Cases & Learnings

- **Vaisala's news feed is dominated by investor-relations noise** (Manager Transaction Releases, Share Repurchase Releases) - filter these out; only "News"/"Press Release" entries with product relevance matter.
- **Lockheed Martin's general news page (`/en-us/news.html`) has zero meteorological content** - it's pure defense/aerospace corporate news. The dedicated `meteorological-instrumentation.html` product page is the only useful LM source; don't expect "new product" announcements from their news feed.
- **Meteolabor AG has no dedicated news page** - its homepage and meteorology page mention custom solutions (e.g. "Argus 48" for the Swiss Air Force) inline with product listings, so those pages double as both product and "content" sources.
- Several competitors explicitly call out **military/defense use cases** in their product copy (Meteomodem M10/Pilotsonde, InterMet's 1680 MHz Military system, Meteolabor's Argus 48 for the Swiss Air Force) - this is a recurring theme worth highlighting in the PDF.
- A recurring "security" marketing angle appears across competitors: Vaisala (Multi-GNSS + message authentication), Meteomodem M10 (GNSS spoofing resistance, ON/OFF authorization on M20) - useful competitive context for Graw.
- First run (2026-06-12) produced 19 findings across 6 competitors, saved to `.tmp/findings.json`.
