# Workflow: Identify Competitors & Sources

## Objective

Build a list of radiosonde manufacturers/companies that compete with Graw Radiosondes Gmbh, and for each one, identify the web sources we'll later monitor for new product announcements and content (Stage 2).

This is Stage 1 of the competitor analysis pipeline:

1. **Identify competitors & sources** (this workflow)
2. Collect product & content data (`02_collect_product_data.md`)
3. Analyze & structure findings (`03_analyze_findings.md`)
4. Generate branded PDF report (`04_generate_pdf_report.md`)

## Inputs

- None required to start.
- Optional: a user-provided seed list of known competitors (names or URLs) to include/verify.

## Process

1. **Research competitors** using WebSearch/WebFetch. Known radiosonde manufacturers to use as a starting point for discovery (verify each, don't assume they're all still active or relevant):
   - Vaisala (Finland)
   - Meteomodem (France)
   - InterMet Systems (USA)
   - Lockheed Martin / Sippican (USA)
   - Yueliangwu / Tianjin Sonde (China)
   - Other regional/defense-focused manufacturers found during research

   Don't limit to this list — search for "radiosonde manufacturer" / "radiosonde competitors" / "weather balloon sonde supplier" etc. to discover others.

2. **For each competitor**, identify:
   - Company website (homepage)
   - Products page URL (where new products would be announced)
   - News/press page URL, if one exists
   - Optional additional sources: meteorological organization pages, defense/army procurement pages, or news articles that mention the company's products
   - Any notes on language, region, or access concerns

3. **Write the results** to `.tmp/competitors.json` using `tools/research_competitors.py` (`save_competitors()`), which validates the structure and writes consistent, pretty-printed JSON.

4. **Present the list to the user** for review before Stage 2 begins scraping. Use `tools/research_competitors.py` (`load_competitors()`) to reload and display it if needed in a later session.

## Output

`.tmp/competitors.json` — see schema in `tools/research_competitors.py` (`COMPETITOR_SCHEMA_EXAMPLE`).

This file is disposable/regenerable (per CLAUDE.md, `.tmp/` is not committed) — it's an input for Stage 2, not a final deliverable.

## Edge Cases & Learnings

_(Update this section as we discover quirks — rate limits, sites that block search/scraping, geo-restrictions, etc.)_

- None yet.
