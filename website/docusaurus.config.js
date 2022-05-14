const repoUrl = 'https://github.com/gossi/theemo';

module.exports = {
  title: 'Theemo', // Title for your website.
  tagline: 'Design Token Automations - Connecting Tools',
  // url: repoUrl, // Your website URL
  // baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  url: 'https://gossi.github.io',
  baseUrl: '/theemo/',

  // Used for publishing and more
  projectName: 'theemo',
  organizationName: 'gossi',

  favicon: 'img/favicon.svg',

  onBrokenLinks: 'warn',

  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;1,400&family=Patua+One&display=swap'
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: true,
          remarkPlugins: [require('mdx-mermaid')]
        },
        theme: {
          customCss: [
            require.resolve('@theemo/theme/dist/theemo.css'),
            require.resolve('./src/css/custom.css')
          ]
        }
      }
    ]
  ],

  themeConfig: {
    navbar: {
      hideOnScroll: false,
      title: 'Theemo',
      logo: {
        alt: 'Super Theemo',
        src: 'img/favicon.svg'
      },
      items: [
        {
          to: 'getting-started',
          label: 'Getting Started',
          position: 'left'
        },
        { to: 'design', label: 'Design', position: 'left' },
        { to: 'cli', label: 'CLI', position: 'left' },
        {
          to: 'frameworks',
          label: 'Frameworks',
          position: 'left'
        },
        { to: 'knowledge-base/glossary', label: 'Knowledge Base', position: 'left' },
        // {page: 'help', label: 'Help'}
        { to: 'api/theemo', label: 'API', position: 'right' },
        { href: repoUrl, label: 'Github', position: 'right' }
      ]
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://gos.si" target="_blank">Thomas Gossmann</a>`
    }
  }
};
