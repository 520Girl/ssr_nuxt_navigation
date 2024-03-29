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
  // css:{
  //   loaderOptions:{
  //     sass:{prependData:`@import "~/assets/css/_bianlian.scss";`},  
  //     // sass:{prependData:`@import "@/assets/css/_handle.scss";`},

  //   }
  // },
  css: [
    // 'iview/dist/styles/iview.css'
    '@/assets/css/main.scss',
    // {
    //   loaderOptions: {
    //     sass: {
    //       prependData: `@import "@/assets/css/_handle.scss";`
    //     }
    //   }
    // }
    // '@/assets/css/love.scss'
  ],
  styleResources: { //配置变量全局使用
    scss: ['./assets/css/_bianlian.scss','./assets/css/_handle.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/assets/js/api/axiosPackaging',
    { src: '~/assets/js/plugins', ssr: true },
    { src: '~/assets/js/client', ssr: false }
    // 'iview/dist/iview.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],
  //https://v2.nuxt.com/docs/configuration-glossary/configuration-alias/
  alias:{
    // 'images':resolve(__dirname, '/assets/css'),
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/router",
    '@nuxtjs/style-resources'

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
    // extend(config, ctx) {
    //   if (ctx.isDev) {
    //     // 查看别名配置信息
    //     console.log(config.resolve.alias);
    //     // 添加 alias 配置
    //     // !这儿添加的别名不能在nuxt.config.js文件中使用
    //     Object.assign(config.resolve.alias, {
    //       'sass': path.resolve(__dirname, 'assets/sass'),
    //     });
    //   }
    // },
    // loaders: {
    //   sass: {
    //     prependData: `@import "@/assets/css/_handle.scss";`
    //   }
    // }
  }
}
