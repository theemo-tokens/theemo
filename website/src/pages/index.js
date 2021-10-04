import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    to: 'docs/design/overview',
    title: <>Design</>,
    // imageUrl: 'img/undraw_building_blocks.svg',
    description: (
      <>
        <p>Automate Design in your Design Tool (eg. Figma).</p>
        <ul>
          <li><Link to='docs/design/figma'>Figma</Link></li>
        </ul>
      </>
    ),
  },
  {
    to: 'docs/toolchain/index',
    title: <>Toolchain</>,
    // imageUrl: 'img/undraw_building_blocks.svg',
    description: (
      <>
        <p>Blend into your existing toolchain</p>

        <Link to='docs/toolchain/sync'><h3>Sync</h3></Link>
        <p>Sync design tokens from your design tool (eg. Figma, Sketch) into your 
        favorite token translation tool (eg. Style-Dictionary, Theo).</p>

        <Link to='docs/toolchain/build'><h3>Build</h3></Link>
        <p>Run the build of your token translation tool and keep your design tokens organized.</p>
        
        <Link to='docs/toolchain/generate'><h3>Generate</h3></Link>
        <p>Generate a theme adapting to users preferences (such as color-scheme)</p>
      </>
    ),
  },
  {
    to: 'docs/frameworks/overview',
    title: <>Frameworks</>,
    // imageUrl: 'img/undraw_react.svg',
    description: (
      <>
        <p>Integrate the generated design tokens into your framework of choice.</p>
        <ul>
          <li><Link to='docs/frameworks/ember'>Ember</Link></li>
        </ul>
      </>
    ),
  },
];

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const { withBaseUrl } = useBaseUrlUtils();

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--secondary button--lg',
                styles.getStarted,
              )}
              to={withBaseUrl('docs/getting-started')}
            >
              Getting Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="container">
        </section>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(({ imageUrl, title, description, to }, idx) => (
                  <div
                    key={idx}
                    className={classnames('col col--4', styles.feature)}
                  >
                    {imageUrl && (
                      <div className="text--center">
                        <img
                          className={styles.featureImage}
                          src={withBaseUrl(imageUrl)}
                          alt={title}
                        />
                      </div>
                    )}
                    <Link to={withBaseUrl(to)}><h2>{title}</h2></Link>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;