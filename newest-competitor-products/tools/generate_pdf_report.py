"""Generate a Graw-branded PDF report from Stage 3 findings (.tmp/findings.json).

Uses ReportLab (pure-Python, no system dependencies) to lay out a
title page plus one section per competitor, each listing its products
and details in the structured schema produced by Stage 3.

Brand colors sampled from screenshot-graw-radiosondes.png:
- Dark teal (header/nav):   #014948
- Blue (hero gradient):     #2278BD
- Bright green (accent):    #00D27E
- Light gray (footer/bg):   #D5D5E5
"""

import os

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

from analyze_findings import load_findings

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "output", "competitor_product_report.pdf")

# Brand colors
TEAL = colors.HexColor("#014948")
BLUE = colors.HexColor("#2278BD")
GREEN = colors.HexColor("#00D27E")
LIGHT_GRAY = colors.HexColor("#D5D5E5")
WHITE = colors.white
DARK_TEXT = colors.HexColor("#222222")


def build_styles():
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        "BrandBar", parent=styles["Normal"],
        fontName="Helvetica-Bold", fontSize=14, textColor=WHITE,
        letterSpacing=2,
    ))
    styles.add(ParagraphStyle(
        "GrawTitle", parent=styles["Title"],
        fontName="Helvetica-Bold", fontSize=24, textColor=TEAL,
        spaceAfter=6, leading=28,
    ))
    styles.add(ParagraphStyle(
        "GrawSubtitle", parent=styles["Normal"],
        fontName="Helvetica", fontSize=12, textColor=BLUE,
        spaceAfter=20,
    ))
    styles.add(ParagraphStyle(
        "CompetitorHeading", parent=styles["Heading1"],
        fontName="Helvetica-Bold", fontSize=18, textColor=WHITE,
        backColor=TEAL, spaceBefore=0, spaceAfter=0,
        leftIndent=8, borderPadding=(6, 8, 6, 8),
    ))
    styles.add(ParagraphStyle(
        "ProductName", parent=styles["Heading2"],
        fontName="Helvetica-Bold", fontSize=13, textColor=BLUE,
        spaceBefore=10, spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        "ProductType", parent=styles["Normal"],
        fontName="Helvetica-Oblique", fontSize=9, textColor=GREEN,
        spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        "Body", parent=styles["Normal"],
        fontName="Helvetica", fontSize=10, textColor=DARK_TEXT,
        leading=14, spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        "Label", parent=styles["Normal"],
        fontName="Helvetica-Bold", fontSize=9, textColor=TEAL,
        spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        "SourceLink", parent=styles["Normal"],
        fontName="Helvetica", fontSize=8, textColor=BLUE,
        spaceBefore=4, spaceAfter=2,
    ))
    return styles


def title_page(story, styles, generated_at, competitor_names):
    header_table = Table([[Paragraph("GRAW RADIOSONDES", styles["BrandBar"])]], colWidths=["100%"])
    header_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), TEAL),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
    ]))
    story.append(header_table)

    story.append(Spacer(1, 50 * mm))
    story.append(Paragraph("Competitor Product Report", styles["GrawTitle"]))
    story.append(Paragraph(
        "Newest products, content, and market positioning across radiosonde manufacturers",
        styles["GrawSubtitle"],
    ))
    story.append(HRFlowable(width="100%", thickness=2, color=GREEN, spaceAfter=12))
    story.append(Paragraph(f"Generated: {generated_at}", styles["Body"]))
    story.append(Paragraph("Prepared for Graw Radiosondes GmbH", styles["Body"]))

    story.append(Spacer(1, 20 * mm))
    story.append(Paragraph("Companies covered:", styles["Label"]))
    for name in competitor_names:
        story.append(Paragraph(f"&bull; {name}", styles["Body"]))

    story.append(PageBreak())


def product_block(item, styles):
    flow = []
    flow.append(Paragraph(item["name"], styles["ProductName"]))
    if item.get("type"):
        flow.append(Paragraph(item["type"], styles["ProductType"]))
    flow.append(Paragraph(item["description"], styles["Body"]))

    if item.get("use_cases"):
        flow.append(Paragraph("Use cases:", styles["Label"]))
        for uc in item["use_cases"]:
            flow.append(Paragraph(f"&bull; {uc}", styles["Body"]))

    if item.get("target_industries"):
        flow.append(Paragraph("Target industries:", styles["Label"]))
        flow.append(Paragraph(", ".join(item["target_industries"]), styles["Body"]))

    if item.get("date"):
        flow.append(Paragraph(f"<b>Date:</b> {item['date']}", styles["Body"]))

    if item.get("notes"):
        flow.append(Paragraph(f"<i>Note: {item['notes']}</i>", styles["Body"]))

    flow.append(Paragraph(item["source_url"], styles["SourceLink"]))
    flow.append(Spacer(1, 4 * mm))
    return flow


def competitor_section(competitor, items, styles):
    story = []
    header_table = Table([[Paragraph(competitor, styles["CompetitorHeading"])]], colWidths=["100%"])
    header_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), TEAL),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 4 * mm))

    for item in items:
        story.extend(product_block(item, styles))

    return story


def generate_report(findings_data, output_path=OUTPUT_PATH):
    """Build the PDF report from a findings dict (see analyze_findings.FINDINGS_SCHEMA_EXAMPLE)."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    styles = build_styles()
    doc = SimpleDocTemplate(
        output_path, pagesize=A4,
        topMargin=20 * mm, bottomMargin=20 * mm,
        leftMargin=18 * mm, rightMargin=18 * mm,
        title="Radiosonde Competitor Product Report",
    )

    # Group items by competitor, preserving first-seen order
    by_competitor = {}
    for item in findings_data["items"]:
        by_competitor.setdefault(item["competitor"], []).append(item)

    competitor_names = list(by_competitor.keys())

    story = []
    title_page(story, styles, findings_data.get("generated_at", ""), competitor_names)

    for i, competitor in enumerate(competitor_names):
        story.extend(competitor_section(competitor, by_competitor[competitor], styles))
        if i < len(competitor_names) - 1:
            story.append(PageBreak())

    doc.build(story)
    return output_path


if __name__ == "__main__":
    data = load_findings()
    path = generate_report(data)
    print(f"Wrote PDF to {path}")
