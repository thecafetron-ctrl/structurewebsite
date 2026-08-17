#!/usr/bin/env bash
set -u

KEY="a60b4a3e40d378db43a96ecfc29a08f6"
HOST="structurelogistics.com"
KEY_LOCATION="https://${HOST}/${KEY}.txt"
SITEMAP="${1:-sitemap.xml}"
ENDPOINT="${INDEXNOW_ENDPOINT:-https://api.indexnow.org/indexnow}"
DRY_RUN=0

if [ "${1:-}" = "--dry-run" ]; then
  DRY_RUN=1
  SITEMAP="${2:-sitemap.xml}"
fi

if [ ! -f "$SITEMAP" ]; then
  echo "IndexNow skipped: sitemap not found at ${SITEMAP}" >&2
  exit 0
fi

URLS=()
while IFS= read -r url; do
  URLS+=("$url")
done < <(
  grep -Eo '<loc>https://structurelogistics\.com/[^<]*</loc>' "$SITEMAP" \
    | sed -E 's#</?loc>##g' \
    | sort -u
)

if [ "${#URLS[@]}" -eq 0 ]; then
  echo "IndexNow skipped: no main-domain canonical URLs found in ${SITEMAP}" >&2
  exit 0
fi

json_urls=""
for url in "${URLS[@]}"; do
  if [ -n "$json_urls" ]; then
    json_urls="${json_urls},"
  fi
  json_urls="${json_urls}\"${url}\""
done

payload="{\"host\":\"${HOST}\",\"key\":\"${KEY}\",\"keyLocation\":\"${KEY_LOCATION}\",\"urlList\":[${json_urls}]}"

if [ "$DRY_RUN" -eq 1 ]; then
  echo "IndexNow dry run: ${#URLS[@]} canonical URL(s) would be submitted."
  echo "$payload"
  exit 0
fi

if response=$(curl --fail-with-body -sS -X POST "$ENDPOINT" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$payload" 2>&1); then
  echo "IndexNow submitted ${#URLS[@]} canonical URL(s)."
else
  echo "IndexNow submission failed but did not fail the build:" >&2
  echo "$response" >&2
fi

exit 0
