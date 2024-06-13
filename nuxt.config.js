import path from 'path'
import i18n from './src/plugins/i18n/index'
//! 1. 去掉console
let plugins = []
if (process.env.NODE_ENV === 'production'){
  plugins.push(["transform-remove-console",{"exclude":["error","warn"]}])
}
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ssr_nuxt_navigation',
    htmlAttrs: {lang: 'en'},

    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href:'/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css' }
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
    {src: '@/assets/css/_bianlian.scss', lang: 'scss'},
    {src: '@/assets/css/main.scss', lang: 'scss'},
    {src: '@/assets/css/_orderthemes.less', lang: 'less'},

    // {
    //   loaderOptions: {
    //     sass: {
    //       prependData: `@import "@/assets/css/_handle.scss";`
    //     }
    //   }
    // }
    // '@/assets/css/love.scss'
  ],
  styleResources: {//配置变量全局使用 styleResources 配置的资源路径不能使用 ~ 和 @,要使用绝对或者相对路径
    scss: ['./assets/css/_bianlian.scss', './assets/css/_handle.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/assets/js/api/axiosPackaging',
    '~/assets/js/common',
    {src: '~/assets/js/server', ssr: true},
    {src: '~/assets/js/client', ssr: false},
    {src: '~/store/persistedState.client', ssr: false},
    {src: '@/plugins/share', ssr: false},
    {src: '@/plugins/qrcode', mode: 'client'},
   '~/plugins/svg-icon'
    // 'iview/dist/iview.js'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],
  //https://v2.nuxt.com/docs/configuration-glossary/configuration-alias/
  alias: {
    '@static': path.resolve(__dirname, 'static/'),
    '@': path.resolve(__dirname, 'src/'),
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/router",
    '@nuxtjs/style-resources',
    ['@nuxtjs/i18n', i18n],
  ],
  axios: {
    proxy: true,
  },
  proxy: {
    '/api': {
      target: process.env.HOST_API,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '' // /api替换成target中的地址，也就是说以后需要http://localhost:3000/... 就写 /api
      }
    },
  },
  server: { //配置服务端渲染
    port: process.env.PORT || 3000,
    host: process.env.DOMAIN.replace("https://", "") || "0.0.0.0",
  },
  build:{
    extend(config, context) {
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find((rule) =>
        rule.test.test(".svg")
      );
      svgRule.exclude = [path.resolve(__dirname, "src/assets/images/svg")];
      //添加loader规则
      config.module.rules.push({
        test: /.svg$/, //匹配.svg
        include: [path.resolve(__dirname, "src/assets/images/svg")], //将存放svg的目录加入到loader处理目录
        use: [
          { loader: "svg-sprite-loader", options: { symbolId: "icon-[name]" } },
        ],
      });
    },
    babel:{
      plugins: [
        ...plugins
      ]
    }
  }
  // Build Configuration: https://go.nuxtjs.dev/config-build
  // build: {
  //   extend(config, ctx) {
  //     if (ctx.isDev) {
  //       // 查看别名配置信息
  //       console.log(config.resolve.alias);
  //       // 添加 alias 配置
  //       // !这儿添加的别名不能在nuxt.config.js文件中使用
  //       Object.assign(config.resolve.alias, {
  //         'sass': path.resolve(__dirname, 'assets/sass'),
  //       });
  //     }
  //   },
  // loaders: {
  //   sass: {
  //     prependData: `@import "@/assets/css/_handle.scss";`
  //   }
  // }
  // }
}
