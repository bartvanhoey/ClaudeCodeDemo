"""Helpers for saving/loading the Stage 1 competitor list (.tmp/competitors.json).

Research itself (WebSearch/WebFetch, judgment about what counts as a
competitor) is done by the agent. This module only handles the
deterministic parts: schema validation and consistent JSON I/O.
"""

import json
import os

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", ".tmp", "competitors.json")

REQUIRED_COMPETITOR_FIELDS = ["name", "website"]
OPTIONAL_COMPETITOR_FIELDS = ["products_url", "news_url", "additional_sources", "notes"]

COMPETITOR_SCHEMA_EXAMPLE = {
    "generated_at": "2026-06-12T00:00:00Z",
    "competitors": [
        {
            "name": "Vaisala",
            "website": "https://www.vaisala.com",
            "products_url": "https://www.vaisala.com/en/products/weather-environmental-sensors/radiosondes",
            "news_url": "https://www.vaisala.com/en/news",
            "additional_sources": [],
            "notes": "",
        }
    ],
}


def validate_competitors(data):
    """Raise ValueError if data doesn't match the expected schema."""
    if not isinstance(data, dict) or "competitors" not in data:
        raise ValueError("Expected a dict with a 'competitors' key")

    competitors = data["competitors"]
    if not isinstance(competitors, list) or not competitors:
        raise ValueError("'competitors' must be a non-empty list")

    for i, entry in enumerate(competitors):
        if not isinstance(entry, dict):
            raise ValueError(f"competitors[{i}] must be an object")
        for field in REQUIRED_COMPETITOR_FIELDS:
            if not entry.get(field):
                raise ValueError(f"competitors[{i}] missing required field '{field}'")


def save_competitors(data, path=OUTPUT_PATH):
    """Validate and write the competitor list as pretty-printed JSON.

    `data` must be a dict matching COMPETITOR_SCHEMA_EXAMPLE, with at
    least 'competitors' (a non-empty list of dicts each having
    'name' and 'website'). Optional fields default to sensible
    empty values when missing.
    """
    validate_competitors(data)

    normalized = {
        "generated_at": data.get("generated_at", ""),
        "competitors": [],
    }
    for entry in data["competitors"]:
        normalized_entry = {field: entry.get(field, "") for field in REQUIRED_COMPETITOR_FIELDS}
        for field in OPTIONAL_COMPETITOR_FIELDS:
            default = [] if field == "additional_sources" else ""
            normalized_entry[field] = entry.get(field, default)
        normalized["competitors"].append(normalized_entry)

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(normalized, f, indent=2, ensure_ascii=False)

    return path


def load_competitors(path=OUTPUT_PATH):
    """Load and return the competitor list dict from disk."""
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


if __name__ == "__main__":
    # Quick manual check: round-trip the schema example.
    save_competitors(COMPETITOR_SCHEMA_EXAMPLE)
    print(f"Wrote example data to {OUTPUT_PATH}")
    print(json.dumps(load_competitors(), indent=2))
