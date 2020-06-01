(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{195:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return l}));var r=n(2),o=n(9),a=(n(0),n(200)),i={id:"build",title:"Build"},c={id:"toolchain/build",title:"Build",description:"The build action triggers the build step of your used token manager (e.g.",source:"@site/../docs/toolchain/build.md",permalink:"/theemo/docs/toolchain/build",sidebar:"toolchain",previous:{title:"Sync",permalink:"/theemo/docs/toolchain/sync"},next:{title:"Generate",permalink:"/theemo/docs/toolchain/generate"}},p=[{value:"Style Dictionary",id:"style-dictionary",children:[]}],s={rightToc:p};function l(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"The build action triggers the build step of your used token manager (e.g.\nstyle-dictionary or theo). Configure your tool as usual and theemo will put\nextras on top, so it can enable the e2e flow. This page describes the extras of\ntheemo for each token manager tool."),Object(a.b)("h2",{id:"style-dictionary"},"Style Dictionary"),Object(a.b)("p",null,"Configure your build step as\n",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://amzn.github.io/style-dictionary/#/config"}),"explained")," in ",Object(a.b)("inlineCode",{parentName:"p"},"config.js"),".\nTheemo adds custom\n",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://amzn.github.io/style-dictionary/#/transforms"}),"transforms")," and in doing\nso takes over the build step as suggested (so you don't have to). The ",Object(a.b)("em",{parentName:"p"},"custom\ntransform")," theemo adds is let you define transforms in your ",Object(a.b)("inlineCode",{parentName:"p"},"config.js")," -\nwithout the need to hook them in via API.\nTo use custom transforms, add ",Object(a.b)("inlineCode",{parentName:"p"},"transforms")," object as a root key to your\n",Object(a.b)("inlineCode",{parentName:"p"},"config.js"),". Inside the transforms, add objects for ",Object(a.b)("inlineCode",{parentName:"p"},"name"),", ",Object(a.b)("inlineCode",{parentName:"p"},"attribute")," or\n",Object(a.b)("inlineCode",{parentName:"p"},"value"),". Each object has to follow the\n",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://amzn.github.io/style-dictionary/#/api?id=registertransform"}),Object(a.b)("inlineCode",{parentName:"a"},"transform")),"\nobject."),Object(a.b)("p",null,"Here is an example:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"module.exports = {\n  source: [...],\n  platforms: {...},\n  transforms: {\n    name: {\n      matcher(property) {\n        return property.name.includes('.$');\n      },\n      transformer(property) {\n        property.path.pop();\n\n        const index = property.name.indexOf('.$')\n        return property.name.slice(0, index);\n      }\n    }\n  }\n}\n")))}l.isMDXComponent=!0},200:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=o.a.createContext({}),l=function(e){var t=o.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=l(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=l(n),d=r,m=u["".concat(i,".").concat(d)]||u[d]||b[d]||a;return n?o.a.createElement(m,c(c({ref:t},s),{},{components:n})):o.a.createElement(m,c({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=d;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var s=2;s<a;s++)i[s]=n[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);