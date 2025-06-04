#!/usr/bin/env python3
"""
Figma Design Token Sync Script

This utility connects to a Figma file (referred to internally as the "channel" ID) and
fetches its full JSON payload via Figma's REST API.  The raw response is stored so that
follow-up tooling can parse design tokens (colors, typography, spacing, etc.) and generate
Swift source code (e.g. `docs/figma-colors-extracted.swift`).

Usage (preferred):
    export FIGMA_ACCESS_TOKEN="<your-figma-personal-access-token>"
    python scripts/figma_connect.py --channel z4yvn5xr

Or explicitly pass the token:
    python scripts/figma_connect.py --channel z4yvn5xr --token <access-token>

The script currently performs three steps:
1. Validates CLI arguments / environment variables.
2. Hits the Figma `GET /v1/files/{file_key}` endpoint to pull the file's JSON.
3. Writes the raw payload to `docs/figma_raw_<channel>.json`.

Future work (TODO):
    • Parse `document` → `styles` →… to extract design tokens automatically.
    • Regenerate `docs/design-variables.swift` & `docs/figma-colors-extracted.swift`.

Requirements: `requests` (install with `pip install requests`).
"""

import argparse
import json
import os
import pathlib
import sys
from typing import Optional

import requests

BASE_URL = "https://api.figma.com/v1/files"
RAW_DOCS_PREFIX = pathlib.Path("docs")


def fetch_file_json(channel: str, token: str) -> dict:
    """Fetch raw JSON for the given Figma file key (channel)"""
    headers = {"X-Figma-Token": token}
    url = f"{BASE_URL}/{channel}"

    response = requests.get(url, headers=headers, timeout=30)
    try:
        response.raise_for_status()
    except requests.HTTPError as exc:
        print(f"[ERROR] Figma API call failed: {exc}\n{response.text}", file=sys.stderr)
        sys.exit(1)

    return response.json()


def save_raw_json(data: dict, channel: str) -> pathlib.Path:
    """Save raw JSON to docs/figma_raw_<channel>.json and return the path"""
    RAW_DOCS_PREFIX.mkdir(exist_ok=True)
    path = RAW_DOCS_PREFIX / f"figma_raw_{channel}.json"
    with path.open("w", encoding="utf-8") as fp:
        json.dump(data, fp, indent=2)
    return path


def main():
    parser = argparse.ArgumentParser(description="Download raw JSON for a Figma file (channel)")
    parser.add_argument("--channel", required=True, help="Figma file key (e.g. z4yvn5xr)")
    parser.add_argument("--token", help="Figma personal access token (optional; falls back to FIGMA_ACCESS_TOKEN env var)")
    args = parser.parse_args()

    token: Optional[str] = args.token or os.getenv("FIGMA_ACCESS_TOKEN")
    if not token:
        print("[ERROR] Figma access token not supplied. Pass --token or set FIGMA_ACCESS_TOKEN.", file=sys.stderr)
        sys.exit(1)

    print(f"Connecting to Figma file '{args.channel}'…")
    raw_json = fetch_file_json(args.channel, token)
    out_path = save_raw_json(raw_json, args.channel)
    print(f"✅ Raw JSON saved to {out_path.relative_to(pathlib.Path.cwd())}")


if __name__ == "__main__":
    main()