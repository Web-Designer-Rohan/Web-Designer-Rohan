# 21st.dev CLI Setup

This document describes the complete setup, configuration, and usage of the official 21st.dev CLI for this project.

## Installation

The latest official CLI is installed globally:

```bash
npm install -g @21st-dev/cli
```

Verified installation:

- Package: `@21st-dev/cli`
- Version: `1.7.2`
- Executable: `/usr/local/bin/21st`
- Node.js requirement: `>=18`

### Prerequisites

- Node.js LTS (tested with v22.23.1)
- npm (tested with 10.9.8)
- Git (tested with 2.54.0)
- Internet connectivity
- A 21st.dev API key

## Authentication

The CLI supports three authentication methods:

1. **Interactive browser login:**

   ```bash
   21st login
   ```

   This opens a browser and stores a local token. It is not available in headless environments without a browser.

2. **API key via environment variable (recommended for CI/CD):**

   ```bash
   export API_KEY_21ST=21st_sk_your_key_here
   ```

3. **API key via command-line flag:**

   ```bash
   21st --api-key 21st_sk_your_key_here <command>
   ```

Get an API key at: https://21st.dev/mcp

### Token Storage

When using `21st login`, the CLI stores a local token in your home directory. The exact location varies by platform. API keys are never written to project files when using environment variables or the `--api-key` flag.

## Configuration

No project-level configuration is required. The CLI reads credentials from the environment. A `.env.example` file is provided for local development reference:

```bash
cp .env.example .env
# Edit .env and set your real API key
```

Never commit the `.env` file.

## Common Commands

```bash
# Show help
21st help

# Authenticate interactively
21st login

# Show current account (requires browser login token)
21st whoami

# Check account usage with an API key
21st usage

# Search the registry
21st search "pricing table"

# Install a component
21st add shadcn/button

# Publish a component
21st publish ./components/SkillCard.tsx --description "A card component for displaying portfolio skills."

# Edit a component
21st edit skill-card --type component --visibility public

# Delete a component
21st delete skill-card --type component --yes
```

## Environment Variables

| Variable          | Description                    | Required |
| ----------------- | ------------------------------ | -------- |
| `API_KEY_21ST`    | 21st.dev API key               | Yes*     |
| `TWENTYFIRST_TOKEN` | Alternative token or login key | No       |

*Required for non-interactive use.

## CI/CD Usage

Use the provided `.github/workflows/21st.yml` as a starting point. Store the API key as a GitHub Secret named `API_KEY_21ST`.

For other platforms:

- **GitLab CI:** Use `API_KEY_21ST` as a CI/CD variable (masked).
- **Docker:** Use Docker secrets or runtime environment variables.
- **Vercel/Netlify:** Add `API_KEY_21ST` to environment variables (secret type).

Always mark API keys as secret/masked so they are not printed in logs.

## Troubleshooting

| Issue                               | Resolution                                                                 |
| ----------------------------------- | -------------------------------------------------------------------------- |
| `Not logged in`                     | Set `API_KEY_21ST` or run `21st login`. Note: `whoami` may require a browser login token even when the API key is valid. |
| `Marketplace membership required`   | The requested component requires a paid membership.                        |
| `Publish failed (HTTP 500)`         | Usually indicates the free-tier API key lacks publishing permissions. Upgrade to a paid membership or use a key with publish scope. |
| `Edit/delete returns 404`           | The component slug does not exist or you do not have permission to modify it. |
| `component_code must contain a default export` | Ensure the component file uses `export default`.                  |

## Verification Script

A verification script is included at `scripts/verify-21st.sh`. It checks that the CLI is installed, the API key is present, and basic commands (`usage`, `search`) succeed.

Run it locally after setting `API_KEY_21ST`:

```bash
./scripts/verify-21st.sh
```

## Updating the CLI

```bash
npm install -g @21st-dev/cli@latest
```

## Safe Removal / Reinstallation

```bash
# Uninstall
npm uninstall -g @21st-dev/cli

# Reinstall
npm install -g @21st-dev/cli
```

## Security Notes

- The real API key is stored only in environment variables, never in committed files.
- `.gitignore` ignores `.env` and other secret files.
- GitHub Actions loads the key from repository secrets.
- If an error message ever includes the full API key, treat it as a security concern and rotate the key.
