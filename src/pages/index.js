import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

const features = [
  {
    title: "Write with Claude",
    body: "Ask Claude for a tutorial and it drafts the Markdown, front matter included.",
  },
  {
    title: "Review before it ships",
    body: "Changes can arrive as pull requests, so nothing goes live until you merge.",
  },
  {
    title: "Publishes in one step",
    body: "One command rebuilds this site and deploys it to GitHub Pages.",
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <header className={clsx("hero hero--primary", styles.hero)}>
        <div className="container">
          <Heading as="h1" className={clsx("hero__title", styles.title)}>
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/docs/getting-started">
              Get started
            </Link>
          </div>
        </div>
      </header>
      <main className={clsx("container", styles.features)}>
        <div className="row">
          {features.map((f) => (
            <div key={f.title} className={clsx("col col--4", styles.feature)}>
              <Heading as="h3">{f.title}</Heading>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
