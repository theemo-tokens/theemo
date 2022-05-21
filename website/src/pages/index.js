import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    to: 'design',
    title: <>🎨 Design</>,
    // imageUrl: 'img/undraw_building_blocks.svg',
    description: (
      <>
        <p>Automate Design in your Design Tool (eg. Figma).</p>
        <ul>
          <li><Link to='design/figma'>Figma</Link></li>
        </ul>
      </>
    ),
  },
  {
    to: 'cli',
    title: <>🛠️ CLI</>,
    // imageUrl: 'img/undraw_building_blocks.svg',
    description: (
      <>
        <p>Blend into your existing toolchain</p>

        <Link to='cli/sync'>Sync</Link>
        <p>Sync design tokens from your design tool (eg. Figma, Sketch) into your 
        favorite token translation tool (eg. Style-Dictionary, Theo).</p>

        <Link to='cli/build'>Build</Link>
        <p>Run the build of your token translation tool and keep your design tokens organized.</p>
        
        <Link to='cli/generate'>Generate</Link>
        <p>Generate a theme adapting to users preferences (such as color-scheme)</p>
      </>
    ),
  },
  {
    to: 'frameworks',
    title: <>🏗️ Frameworks</>,
    // imageUrl: 'img/undraw_react.svg',
    description: (
      <>
        <p>Integrate the generated design tokens into your framework of choice.</p>
        <ul>
          <li><Link to='frameworks/ember'>Ember</Link></li>
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
              to={withBaseUrl('getting-started')}
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