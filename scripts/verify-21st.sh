#!/usr/bin/env bash
set -euo pipefail

echo "Verifying 21st.dev CLI setup..."

# Check CLI is installed
if ! command -v 21st &> /dev/null; then
  echo "Error: 21st CLI is not installed."
  exit 1
fi

echo "CLI path: $(command -v 21st)"

# Verify API key is set
if [ -z "${API_KEY_21ST:-}" ] && [ -z "${TWENTYFIRST_TOKEN:-}" ]; then
  echo "Error: API_KEY_21ST or TWENTYFIRST_TOKEN must be set."
  exit 1
fi

# Verify API connectivity and usage
echo "Checking account usage..."
21st usage

# Verify search works
echo "Checking search..."
21st search "button" --limit 3

echo "21st.dev CLI verification passed."
