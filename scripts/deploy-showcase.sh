#!/usr/bin/env bash
# Deploy the showcase site to Cloudflare Pages via direct upload.
#
# Usage:
#   ./scripts/deploy-showcase.sh              # deploy to production
#   ./scripts/deploy-showcase.sh --preview    # deploy as preview
#
# Requires:
#   - CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN env vars
#   - wrangler (npx wrangler)
#   - bun

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# --- Parse arguments ---
BRANCH="main"

for arg in "$@"; do
  case "$arg" in
    --preview) BRANCH="preview" ;;
    *) echo "Unknown argument: $arg"; exit 1 ;;
  esac
done

# --- Require CF credentials ---
if [[ -z "${CLOUDFLARE_ACCOUNT_ID:-}" || -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "Error: CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN must be set"
  echo "You can source them from cf-infra:"
  echo '  export CLOUDFLARE_ACCOUNT_ID=$(npx @dotenvx/dotenvx get TF_VAR_cloudflare_account_id -f ../cf-infra/.env.local)'
  echo '  export CLOUDFLARE_API_TOKEN=$(npx @dotenvx/dotenvx get TF_VAR_cloudflare_api_token -f ../cf-infra/.env.local)'
  exit 1
fi

export CLOUDFLARE_ACCOUNT_ID
export CLOUDFLARE_API_TOKEN

# --- Build ---
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Deploying: composables-showcase (branch: $BRANCH)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "→ Building showcase..."
(cd "$ROOT_DIR" && bunx vite build showcase)

echo ""
echo "→ Deploying to Cloudflare Pages..."
npx wrangler pages deploy "$ROOT_DIR/showcase/dist" \
  --project-name "composables-showcase" \
  --branch "$BRANCH"

echo ""
echo "✓ composables-showcase deployed successfully"

if [[ "$BRANCH" == "main" ]]; then
  echo "  Site: https://composables.leitware.com"
else
  echo "  Preview URL will appear in the wrangler output above."
fi
echo ""
