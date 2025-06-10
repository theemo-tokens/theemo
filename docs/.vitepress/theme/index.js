import DefaultTheme from 'vitepress/theme'
import matomo from "@zvitek/vitepress-plugin-matomo";
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import './custom.css'
import 'virtual:group-icons.css'
import '@shikijs/vitepress-twoslash/style.css'

import 'iconify-icon';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp: ({ app, router }) => {
    app.use(TwoslashFloatingVue);

    matomo({
      router: router,
      siteID: 5,
      trackerUrl: "https://analytics.otherwheel.com/"
    });
  }
}