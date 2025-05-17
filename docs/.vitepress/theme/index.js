import DefaultTheme from 'vitepress/theme'
import matomo from "@zvitek/vitepress-plugin-matomo";
import './custom.css'
import 'virtual:group-icons.css'
import 'vitepress-plugin-shiki-twoslash/styles.css'

export default {
  ...DefaultTheme,
  enhanceApp: (ctx) => {
    matomo({
      router: ctx.router,
      siteID: 5,
      trackerUrl: "https://analytics.otherwheel.com/"
    })
  }
}