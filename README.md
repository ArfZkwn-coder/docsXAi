# docsXAi

Documentation site built with [Docusaurus](https://docusaurus.io/) and hosted on GitHub Pages at
**https://arfzkwn-coder.github.io/docsXAi/**.

## Adding tutorials

Put Markdown files in `docs/`. Each one appears in the sidebar automatically, ordered by its
`sidebar_position` front matter; subfolders become sidebar groups. The docs-publisher connector writes
here too, so tutorials Claude publishes go live on the next deploy.

## Deploying

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

One-time setup: in the repo, open **Settings → Pages** and set **Source** to **GitHub Actions**.

## Working locally

Requires Node.js 20+.

```bash
npm install
npm start        # live-reloading dev server at http://localhost:3000/docsXAi/
npm run build    # production build into build/
npm run serve    # serve that build locally
```
