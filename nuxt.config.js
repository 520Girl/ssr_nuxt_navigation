import { resolve } from 'path'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ssr_nuxt_navigation',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  srcDir: 'src/',
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'iview/dist/styles/iview.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/assets/js/api/axiosPackaging',
    '~/assets/js/plugins'
    // 'iview/dist/iview.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],
  //https://v2.nuxt.com/docs/configuration-glossary/configuration-alias/
  // alias:{
  //   'images':resolve(__dirname, '~/assets/css'),
  // },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/router",
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000/',
      pathRewrite: {
        '^/api': '' // /api替换成target中的地址，也就是说以后需要http://localhost:3000/... 就写 /api
      }
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
