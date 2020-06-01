(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{193:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return m}));var r=n(2),a=n(9),o=(n(0),n(200)),i={id:"ember",title:"Ember"},c={id:"frameworks/ember",title:"Ember",description:"Loads theemo themes into the ember pipeline. Watching themes for changes and",source:"@site/../docs/frameworks/ember.md",permalink:"/theemo/docs/frameworks/ember",sidebar:"frameworks",previous:{title:"Overview",permalink:"/theemo/docs/frameworks/overview"}},l=[{value:"Installation",id:"installation",children:[]},{value:"Usage",id:"usage",children:[{value:"Configuration",id:"configuration",children:[]},{value:"API",id:"api",children:[]}]}],s={rightToc:l};function m(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Loads theemo themes into the ember pipeline. Watching themes for changes and\ntriggers page refreshs."),Object(o.b)("h2",{id:"installation"},"Installation"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"ember install ember-theemo\n")),Object(o.b)("h2",{id:"usage"},"Usage"),Object(o.b)("p",null,"If you use ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/theemo/docs/toolchain/generate"}),"generate")," for your theme creating,\n",Object(o.b)("inlineCode",{parentName:"p"},"ember-theemo")," will pick up any installed themes found by the ",Object(o.b)("inlineCode",{parentName:"p"},"theemo-theme"),"\nkeyword."),Object(o.b)("p",null,"Furthermore there are some configurations to control your default behavior and a\nlittle API to help you switch between themes and color schemes."),Object(o.b)("h3",{id:"configuration"},"Configuration"),Object(o.b)("p",null,"In your ",Object(o.b)("inlineCode",{parentName:"p"},"ember-cli-build.js")," use the ",Object(o.b)("inlineCode",{parentName:"p"},"theemo")," property to control the build."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"module.exports = function(defaults) {\n  let app = new EmberAddon(defaults, {\n    // ...\n\n    theemo: {\n      defaultTheme: 'ocean'\n    }\n\n    // ...\n  });\n\n  return app.toTree();\n};\n")),Object(o.b)("p",null,"Available options:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"defaultTheme: string")," - the theme loaded by default")),Object(o.b)("h3",{id:"api"},"API"),Object(o.b)("p",null,"Use the ",Object(o.b)("inlineCode",{parentName:"p"},"theemo")," service to control themes:"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Important: Consider this API subject to change!")),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),'interface TheemoService {\n  @tracked activeTheme?: string;\n  @tracked activeColorScheme?: string;\n\n  /**\n   * Available thems\n   */\n  themes: string[];\n\n  /**\n   * List of available color schemes for the active theme\n   */\n  colorSchemes: string[];\n\n  /**\n   * Returns a list of color schemes for a given theme\n   *\n   * @param name name of the theme\n   */\n  getColorSchemes(name: string): string[];\n\n  /**\n   * Set the active theme\n   *\n   * Theemo will load the theme if not already\n   * available in the document.\n   *\n   * @param name the name of the theme\n   */\n  setTheme(name: string): Promise<void>;\n\n  /**\n   * Set the active color scheme\n   *\n   * If "none" is used, it means it will be "system"\n   *\n   * @param name color scheme to use or "none" to\n   *   reset to "system"\n   */\n  setColorScheme(name: string |\xa0undefined);\n}\n')))}m.isMDXComponent=!0},200:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return h}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),m=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=m(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},p=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=m(n),p=r,h=u["".concat(i,".").concat(p)]||u[p]||b[p]||o;return n?a.a.createElement(h,c(c({ref:t},s),{},{components:n})):a.a.createElement(h,c({ref:t},s))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=p;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var s=2;s<o;s++)i[s]=n[s];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);