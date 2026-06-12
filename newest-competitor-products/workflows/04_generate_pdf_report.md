# Workflow: Generate Branded PDF Report

## Objective

Render the structured findings from Stage 3 into a professional, Graw-branded PDF report listing the newest competitor products and their details, suitable for sharing with stakeholders.

## Inputs

- `.tmp/findings.json` (from Stage 3)

## Process

1. Load findings via `tools/analyze_findings.py` (`load_findings()`).
2. Call `tools/generate_pdf_report.py` (`generate_report(findings_data)`).
3. The tool builds a PDF with ReportLab:
   - Title page with a Graw-branded header bar, report title, generation date, and a list of companies covered
   - One section per competitor (teal header bar), each listing its products/findings with description, use cases, target industries, date, notes, and source URL
4. Output written to `output/competitor_product_report.pdf`.

## Output

`output/competitor_product_report.pdf` — the final deliverable. This folder is NOT in `.gitignore` (unlike `.tmp/`), so the PDF stays accessible.

## Branding

Colors sampled from `screenshot-graw-radiosondes.png` and encoded in `tools/generate_pdf_report.py`:
- Dark teal `#014948` — header bars (title page + each competitor section)
- Blue `#2278BD` — product name headings, subtitle
- Bright green `#00D27E` — accent rule, product-type labels

## Edge Cases & Learnings

- **ReportLab chosen over WeasyPrint** — pure-Python, no system dependencies (WeasyPrint needs GTK/Cairo on Windows, which is painful to install). `reportlab` added to `requirements.txt`.
- First run (2026-06-12) produced a 10-page PDF from 19 findings across 6 competitors. Verified visually by rendering pages to PNG with PyMuPDF (temporary dev dependency, not added to requirements.txt — uninstalled after use).
- If `name`/title text is long, ReportLab wraps it automatically within `GrawTitle`/`ProductName` styles — no manual truncation needed.
