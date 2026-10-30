# docsXAi

Documentation site built with [Docusaurus](https://docusaurus.io/) and hosted on GitHub Pages at
**https://arfzkwn-coder.github.io/docsXAi/**.

## Adding tutorials

Put Markdown files in `docs/`. Each one appears in the sidebar automatically, ordered by its
`sidebar_position` front matter; subfolders become sidebar groups. The docs-publisher connector writes
here too, so tutorials Claude publishes go live on the next deploy.

## Deploying

The site is served from the `gh-pages` branch (**Settings → Pages → Source: Deploy from a branch**,
branch `gh-pages`, folder `/ (root)`). To publish changes, including new tutorials, build and push it
from your machine:

```bash
GIT_USER=ArfZkwn-coder npm run deploy
```

On Windows PowerShell: `$env:GIT_USER="ArfZkwn-coder"; npm run deploy`

`.github/workflows/deploy.yml` can deploy automatically on every push to `main` instead, once GitHub
Actions is available on the account: switch **Source** to **GitHub Actions**.

## Working locally

Requires Node.js 20+.

```bash
npm install
npm start        # live-reloading dev server at http://localhost:3000/docsXAi/
npm run build    # production build into build/
npm run serve    # serve that build locally
```
