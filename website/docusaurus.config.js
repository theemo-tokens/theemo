const repoUrl = 'https://github.com/gossi/theemo';

module.exports = {
  title: 'Theemo', // Title for your website.
  tagline: 'The yordle powered design-ops suite for automation',
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

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
      },
    ],
  ],

  themeConfig: {
    sidebarCollapsible: true,
    navbar: {
      title: 'Theemo',
      logo: {
        alt: 'Theemo Logo',
        src: 'img/favicon.svg'
      },
      links: [
        {to: 'docs/getting-started', label: 'Getting Started', position: 'left'},
        {to: 'docs/design/overview', label: 'Design', position: 'left'},
        { to: 'docs/toolchain/index', label: 'Toolchain', position: 'left' },
        {to: 'docs/frameworks/overview', label: 'Frameworks', position: 'left'},
        // {page: 'help', label: 'Help'}
        {href: repoUrl, label: 'Github', position: 'right'}
      ]
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Thomas Gossmann`,
    }
  }
};