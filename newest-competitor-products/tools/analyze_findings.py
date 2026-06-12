"""Helpers for saving/loading Stage 3 structured findings (.tmp/findings.json).

Extraction itself (reading scraped text, deciding what's a "new
product" vs. boilerplate, inferring use cases/industries) is done by
the agent. This module only handles the deterministic parts: schema
validation and consistent JSON I/O.
"""

import json
import os

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", ".tmp", "findings.json")

REQUIRED_ITEM_FIELDS = ["competitor", "name", "type", "description", "source_url"]
OPTIONAL_ITEM_FIELDS = ["use_cases", "target_industries", "date", "notes"]

FINDINGS_SCHEMA_EXAMPLE = {
    "generated_at": "2026-06-12T00:00:00Z",
    "items": [
        {
            "competitor": "Meteomodem",
            "name": "M20",
            "type": "product",
            "description": "Ultra-light (36g) radiosonde with heated humidity sensor, "
            "Robotsonde-compatible, designed to cut gas/transport costs and "
            "environmental impact.",
            "use_cases": ["Operational meteorology", "Automated balloon launches"],
            "target_industries": ["National weather services", "Meteorology"],
            "date": "",
            "source_url": "https://www.meteomodem.com/m20",
            "notes": "Marketed as lightest/greenest radiosonde on the market; includes cybersecurity features (ON/OFF authorization).",
        }
    ],
}


def validate_findings(data):
    """Raise ValueError if data doesn't match the expected schema."""
    if not isinstance(data, dict) or "items" not in data:
        raise ValueError("Expected a dict with an 'items' key")

    items = data["items"]
    if not isinstance(items, list) or not items:
        raise ValueError("'items' must be a non-empty list")

    for i, entry in enumerate(items):
        if not isinstance(entry, dict):
            raise ValueError(f"items[{i}] must be an object")
        for field in REQUIRED_ITEM_FIELDS:
            if not entry.get(field):
                raise ValueError(f"items[{i}] missing required field '{field}'")


def save_findings(data, path=OUTPUT_PATH):
    """Validate and write findings as pretty-printed JSON.

    `data` must be a dict matching FINDINGS_SCHEMA_EXAMPLE, with at
    least 'items' (a non-empty list of dicts each having 'competitor',
    'name', 'type', 'description', 'source_url'). Optional fields
    default to sensible empty values when missing.
    """
    validate_findings(data)

    normalized = {
        "generated_at": data.get("generated_at", ""),
        "items": [],
    }
    for entry in data["items"]:
        normalized_entry = {field: entry.get(field, "") for field in REQUIRED_ITEM_FIELDS}
        for field in OPTIONAL_ITEM_FIELDS:
            default = [] if field in ("use_cases", "target_industries") else ""
            normalized_entry[field] = entry.get(field, default)
        normalized["items"].append(normalized_entry)

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(normalized, f, indent=2, ensure_ascii=False)

    return path


def load_findings(path=OUTPUT_PATH):
    """Load and return the findings dict from disk."""
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


if __name__ == "__main__":
    save_findings(FINDINGS_SCHEMA_EXAMPLE)
    print(f"Wrote example data to {OUTPUT_PATH}")
    print(json.dumps(load_findings(), indent=2))
