const repoUrl = 'https://github.com/gossi/theemo';

module.exports = {
  title: 'Theemo', // Title for your website.
  tagline:
    'Design Token Automations - Filling the gaps to make all your tools work together.',
  // url: repoUrl, // Your website URL
  // baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  url: 'https://gossi.github.io',
  baseUrl: '/theemo/',

  // Used for publishing and more
  projectName: 'theemo',
  organizationName: 'gossi',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  favicon: 'img/favicon.svg',

  onBrokenLinks: 'warn',

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: true,
          remarkPlugins: [require('mdx-mermaid')]
        }
      }
    ]
  ],

  themeConfig: {
    navbar: {
      title: 'Theemo',
      logo: {
        alt: 'Theemo Logo',
        src: 'img/favicon.svg'
      },
      items: [
        {
          to: 'docs/getting-started',
          label: 'Getting Started',
          position: 'left'
        },
        { to: 'docs/design/overview', label: 'Design', position: 'left' },
        { to: 'docs/toolchain/overview', label: 'Toolchain', position: 'left' },
        {
          to: 'docs/frameworks/overview',
          label: 'Frameworks',
          position: 'left'
        },
        // {page: 'help', label: 'Help'}
        { href: repoUrl, label: 'Github', position: 'right' }
      ]
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Thomas Gossmann`
    }
  }
};
