# docsXAi

Documentation site built with [Docusaurus](https://docusaurus.io/) and hosted on GitHub Pages at
**https://arfzkwn-coder.github.io/docsXAi/**.

Team members write and edit tutorials by chatting with Claude through the docs-publisher connector.
[Set Up the Connector in Claude](https://arfzkwn-coder.github.io/docsXAi/docs/set-up-in-claude) explains
how to get access.

The connector's source code is in [docs-publisher-mcp](https://github.com/ArfZkwn-coder/docs-publisher-mcp).

## Layout

| Path | Contents |
| --- | --- |
| `docs/` | Tutorials, one Markdown file per page. Subfolders become sidebar groups, ordered by `sidebar_position` front matter. |
| `static/img/` | Pictures, shown in a tutorial as `/img/...`. Upload image in the connector saves here. |
| `static/videos/` | Videos, embedded with a `<video>` tag and the `/docsXAi/videos/...` path. |
| `src/pages/index.js` | The home page. |
| `docusaurus.config.js` | Site title, URL, navbar and footer. |

## How changes go live

The connector commits straight to `main` and then deploys the site by itself, so a tutorial is live a
minute or two after Claude publishes it. Changes made here by hand need a deploy:

```bash
GIT_USER=ArfZkwn-coder npm run deploy
```

On Windows PowerShell: `$env:GIT_USER="ArfZkwn-coder"; npm run deploy`

The site is served from the `gh-pages` branch (**Settings → Pages → Source: Deploy from a branch**,
branch `gh-pages`, folder `/ (root)`). `npm run deploy` builds the site and pushes it there.

`.github/workflows/deploy.yml` can deploy on every push to `main` instead, once GitHub Actions is
available on the account: switch **Source** to **GitHub Actions**.

To undo a change, revert its commit on `main` and deploy.

## Working locally

Requires Node.js 20+.

```bash
npm install
npm start        # live-reloading dev server at http://localhost:3000/docsXAi/
npm run build    # production build into build/
npm run serve    # serve that build locally
```
