// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

// GitHub Pages serves this repo at https://<owner>.github.io/<repo>/
const owner = "ArfZkwn-coder";
const repo = "docsXAi";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "docsXAi",
  tagline: "Tutorials and guides, written and published with Claude",

  url: `https://${owner.toLowerCase()}.github.io`,
  baseUrl: `/${repo}/`,
  organizationName: owner,
  projectName: repo,
  deploymentBranch: "gh-pages", // `npm run deploy` publishes the build here
  trailingSlash: false,

  onBrokenLinks: "throw",

  // Tutorials are plain Markdown (often written by Claude), so parse .md files as
  // CommonMark rather than MDX: stray `<` or `{` in prose then can't break the build.
  markdown: { format: "detect" },

  i18n: { defaultLocale: "en", locales: ["en"] },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl: `https://github.com/${owner}/${repo}/edit/main/`,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: { customCss: "./src/css/custom.css" },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: { respectPrefersColorScheme: true },
      navbar: {
        title: "docsXAi",
        items: [
          { type: "docSidebar", sidebarId: "tutorials", position: "left", label: "Tutorials" },
          { href: `https://github.com/${owner}/${repo}`, label: "GitHub", position: "right" },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [{ label: "Getting Started", to: "/docs/getting-started" }],
          },
          {
            title: "More",
            items: [{ label: "GitHub", href: `https://github.com/${owner}/${repo}` }],
          },
        ],
        copyright: `© ${new Date().getFullYear()} docsXAi. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash", "json", "ini"],
      },
    }),
};

export default config;
