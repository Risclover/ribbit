# app/utils/link_preview.py
import requests, html, re
from bs4 import BeautifulSoup      # pip install beautifulsoup4

def fetch_link_preview(url: str, timeout: int = 5) -> dict:
    """
    Return a lightweight dict with title, description, and og:image.
    Falls back gracefully if tags are missing or request fails.
    """
    try:
        resp = requests.get(url, timeout=timeout, headers={"User-Agent": "RibbitBot/1.0"})
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        def _tag(prop):                         # helper for og: tags
            tag = soup.find("meta", property=f"og:{prop}")
            return tag["content"] if tag and tag.get("content") else None

        title = _tag("title") or soup.title.string if soup.title else url
        desc  = _tag("description")
        image = _tag("image")

        # Sanitise & truncate
        clean_title = _collapse(title, 140)
        clean_desc  = _collapse(desc or "", 200) if desc else None

        return {"title": clean_title, "description": clean_desc, "image": image}

    except Exception:
        return {}

def _collapse(text: str, limit: int) -> str:
    """Collapse whitespace and return ≤limit chars (+ …)."""
    clean = html.unescape(re.sub(r"\s+", " ", text.strip()))
    return (clean[: limit - 1] + "…") if len(clean) > limit else clean
