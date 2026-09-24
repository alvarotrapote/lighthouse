#!/usr/bin/env bash
set -euo pipefail

read -r -s -p "Cloudflare API token: " CLOUDFLARE_API_TOKEN
printf '\n'
read -r -p "Cloudflare account ID: " CLOUDFLARE_ACCOUNT_ID

printf '%s' "$CLOUDFLARE_API_TOKEN" | gh secret set CLOUDFLARE_API_TOKEN --repo alvarotrapote/lighthouse
printf '%s' "$CLOUDFLARE_ACCOUNT_ID" | gh secret set CLOUDFLARE_ACCOUNT_ID --repo alvarotrapote/lighthouse

unset CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID
printf 'GitHub Actions secrets configured.\n'
