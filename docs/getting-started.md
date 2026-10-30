---
title: "Getting Started"
description: "Set up the docs-publisher MCP connector and publish your first tutorial with Claude in about ten minutes."
sidebar_position: 1
---

# Getting Started

**docs-publisher** is an MCP connector that lets Claude write, edit and delete tutorials in a Git-based documentation site (Docusaurus, MkDocs, VitePress, Docsify, GitBook Git-sync, and similar). Claude commits Markdown files to your docs repository on GitHub. Your site's normal build and deploy pipeline then publishes them, or Claude can rebuild and publish the site itself with `deploy_site`.

By the end of this tutorial you will have:

1. A GitHub token that can write to your docs repo
2. The connector installed and registered with Claude
3. Your first tutorial published, both directly and through a pull request
4. Optionally, Claude deploying your site so new tutorials go live straight away

## Prerequisites

- **Node.js 20.12 or later.** Node 18 runs the server, but only 20.12+ can read settings from a `.env` file. On older versions, pass the settings in the MCP config instead (shown below).
- **A GitHub repository for your docs**, for example `your-name/your-docs`. It can be empty; the connector handles a repo with no commits yet.
- **Claude Code or Claude Desktop.**

## Step 1: Create a GitHub token

The connector talks to GitHub with a fine-grained personal access token. Keep its scope as narrow as possible.

1. Open **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens** and click **Generate new token**.
2. Under **Repository access**, choose **Only select repositories** and pick your docs repo.
3. Under **Repository permissions**, set:
   - **Contents:** Read and write
   - **Pull requests:** Read and write
4. Generate the token and copy it. You won't be able to see it again.

:::caution
Treat the token like a password. Never commit it, and don't paste it into a chat.
:::

## Step 2: Install the connector

From the connector's folder, install its dependencies:

```bash
npm install
```

Run the built-in test to confirm everything works. It uses a fake GitHub API and a fake shell, so it needs no token or network access:

```bash
npm test
```

You should see `All smoke tests passed`.

## Step 3: Configure it

The connector reads these settings:

| Variable | Required | Default | Meaning |
| --- | --- | --- | --- |
| `GITHUB_TOKEN` | yes | – | The token from Step 1 |
| `DOCS_REPO` | yes | – | Your docs repo as `owner/name` |
| `DOCS_BRANCH` | no | `main` | The branch your site is built from |
| `DOCS_DIR` | no | `docs` | The folder that holds tutorials (`""` for the repo root) |
| `SITE_DIR` | no | – | A local clone of your docs repo; turns on `deploy_site` (Step 8) |
| `DEPLOY_COMMAND` | no | `npm run deploy` | The command `deploy_site` runs in `SITE_DIR` |

You can supply them in either of two places.

**Option A: a `.env` file** (Node 20.12+). Create `.env` next to `package.json`:

```ini
GITHUB_TOKEN=github_pat_xxx
DOCS_REPO=your-name/your-docs
DOCS_BRANCH=main
DOCS_DIR=docs
```

The connector's `.gitignore` already excludes `.env`, so the token stays out of version control.

**Option B: the MCP config.** Pass the same values as environment variables when you register the server (next step).

## Step 4: Register it with Claude

### Claude Code

Run this from any folder, replacing the path with where you installed the connector. If you used a `.env` file, you can leave out the `-e` flags.

```bash
claude mcp add docs-publisher -e GITHUB_TOKEN=github_pat_xxx -e DOCS_REPO=your-name/your-docs -e DOCS_BRANCH=main -e DOCS_DIR=docs -- node /path/to/docs-publisher-mcp/src/index.js
```

### Claude Desktop

Add this under `mcpServers` in `claude_desktop_config.json`, then restart Claude Desktop:

```json
"docs-publisher": {
  "command": "node",
  "args": ["/path/to/docs-publisher-mcp/src/index.js"],
  "env": {
    "GITHUB_TOKEN": "github_pat_xxx",
    "DOCS_REPO": "your-name/your-docs",
    "DOCS_BRANCH": "main",
    "DOCS_DIR": "docs"
  }
}
```

On Windows, use forward slashes in the path, for example `C:/Users/you/docs-publisher-mcp/src/index.js`.

## Step 5: Check the connection

Ask Claude:

> List the tutorials in my docs.

Claude calls `list_tutorials`. For a new repo the answer is "No tutorials found." That's expected, and it confirms the token and repo name are right. If you get an error instead, see [Troubleshooting](#troubleshooting).

## Step 6: Publish your first tutorial

Ask Claude for a page:

> Write a short "Hello, docs" tutorial and publish it as `hello`.

Claude calls `publish_tutorial`, which:

- writes the file to `docs/hello.md` (under `DOCS_DIR`),
- adds front matter (`title`, and `description` and `sidebar_position` when given) if the content has none,
- commits it to `DOCS_BRANCH` and replies with a link to the file on GitHub.

If your site deploys automatically on every push, the commit goes live just as one you pushed yourself would. If it doesn't, Claude can deploy it for you (Step 8).

:::note
If your repo was empty, this first publish must be a direct commit. A pull request needs a base branch to start from, and an empty repo doesn't have one yet.
:::

## Step 7: Review changes through a pull request

For anything you want to check before it goes live, ask for a pull request:

> In the hello tutorial, add a section on next steps. Open a pull request instead of committing directly.

With `as_pull_request`, the connector pushes to a new `claude/...` branch and opens a PR against `DOCS_BRANCH`. Your live site doesn't change until you merge it. Every write tool supports this option.

## Step 8: Deploy the site from Claude

Skip this step if a CI workflow, such as GitHub Actions, already deploys your site on every push.

Otherwise, `deploy_site` lets Claude rebuild the site and publish it. It runs on the computer where the connector runs, in two steps:

1. `git pull --ff-only` in `SITE_DIR`, to fetch the tutorials Claude committed through GitHub.
2. `DEPLOY_COMMAND` (default `npm run deploy`), to build the site and publish it.

To set it up:

1. Clone your docs repo and install the site's dependencies:

   ```bash
   git clone https://github.com/your-name/your-docs.git
   ```

   ```bash
   cd your-docs && npm install
   ```

2. Run `npm run deploy` once yourself, to confirm the deploy works and Git can push. For Docusaurus, this pushes the build to the `gh-pages` branch. Set `GIT_USER` to your GitHub username first; the connector sets it for you later.
3. Add `SITE_DIR` to your settings with the clone's full path, for example `SITE_DIR=C:/Users/you/your-docs`. Use `DEPLOY_COMMAND` if your site uses something else, for example `mkdocs gh-deploy`.
4. Restart the connector (or Claude) so it picks up the new setting.

Then publish and deploy in one request:

> Write a FAQ tutorial, publish it as `faq`, and deploy the site.

Claude publishes the page, then calls `deploy_site`, which reports the end of the build output. A deploy takes a minute or two.

:::note
`deploy_site` publishes only what is on `DOCS_BRANCH`. A change waiting in a pull request goes live after you merge it and deploy again.
:::

## What Claude can do

| Tool | What it does |
| --- | --- |
| `list_tutorials` | Lists every `.md`/`.mdx` file under the docs folder |
| `read_tutorial` | Reads a tutorial's current Markdown |
| `publish_tutorial` | Creates a tutorial or fully replaces one |
| `edit_tutorial` | Replaces one exact piece of text in a tutorial |
| `delete_tutorial` | Removes a tutorial |
| `deploy_site` | Rebuilds the site from `DOCS_BRANCH` and publishes it |

Tutorial paths are relative to `DOCS_DIR` and written without an extension: `guides/webhooks` becomes `docs/guides/webhooks.md`. Paths may contain only letters, numbers, `-`, `_`, `.` and `/`, and can't escape the docs folder.

Some prompts to try:

- "Write a tutorial on setting up webhooks and publish it as `guides/webhooks` via a pull request."
- "In the install tutorial, change the Node requirement to 20+, then deploy the site."
- "Read the hello tutorial and tighten the wording."

## Troubleshooting

**`GITHUB_TOKEN is not set`**: the connector didn't receive a token. Check the `env` block in your MCP config, or, if you rely on `.env`, make sure you're on Node 20.12+ and the file sits next to `package.json`.

**`DOCS_REPO must look like 'owner/name'`**: use the form `your-name/your-docs`, not a full URL.

**`GitHub ... failed (401)`**: the token is wrong or expired. Generate a new one.

**`GitHub ... failed (403)`**: the token lacks access. Confirm it's scoped to this repo with Contents and Pull requests set to *Read and write*.

**`Branch "main" not found`**: `DOCS_BRANCH` doesn't match a branch in the repo. Many older repos use `master`.

**`Base branch ... not found`** when opening a PR: the repo is still empty. Publish once without a pull request first.

**`old_text matches N places`** from `edit_tutorial`: the text to replace isn't unique. Ask Claude to include more surrounding text.

**`Deploying is not configured`**: `SITE_DIR` isn't set, or the connector hasn't restarted since you set it.

**`git pull --ff-only ... failed`**: the clone in `SITE_DIR` has local commits that aren't on GitHub. Push them, or reset the clone to match GitHub, then deploy again.

**`npm run deploy` failed**: read the build output in Claude's reply. A broken link or invalid Markdown stops the build. An authentication error means Git on that computer can't push to the repo; run `npm run deploy` yourself once to sign in.

## Next steps

- Organise tutorials into folders such as `guides/` and `reference/`, and use `sidebar_position` to order them.
- Default to pull requests for anything customer-facing, so a person reviews each change before it ships.
