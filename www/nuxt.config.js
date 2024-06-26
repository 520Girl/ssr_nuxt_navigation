import path from 'path'
import sitemap from "./src/static/sitemap";
import i18n from './src/plugins/i18n/index'
import setting from './src/setting'
//! 1. 去掉console
let plugins = []
if (process.env.NODE_ENV === 'production'){
  plugins.push(["transform-remove-console",{"exclude":["error","warn"]}])
}
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: setting.title + '-' + '生成式AI工具导航',
    htmlAttrs: {lang: 'zh','data-theme': 'dark'},
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'keywords', content: 'AI免费工具集合尊享导航,AI导航,AI工具导航,AI应用商店,生成式AI,AI动漫,AI音乐,AI视频,AI图片,AI导航,AI工具,AI写作,AI绘画,AI设计,AI办公,AI客服,AI营销,AI语音,AI视频生成'},
      {name: 'description', content: setting.description},
      {name: 'format-detection', content: 'telephone=no'},
      {hid: 'author', name: 'author', content: 'navai'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href:setting.favicon },
    ]
  },
  srcDir: 'src/',
  css: [ //公共样式 重置样式
    // 'iview/dist/styles/iview.css'
    // {src: '@/assets/css/_bianlian.scss', lang: 'scss'},
    {src: '@/assets/css/main.scss', lang: 'scss'},
    // {src: '@/assets/css/commonmMixin.scss', lang: 'scss'},
    // {src: '@/assets/css/normalize.css', lang: 'css'},
    // {src: '@/assets/css/reset.scss', lang: 'scss'},
    // {src: '@/assets/css/border.scss', lang: 'scss'},
    {src: '@/assets/css/_orderthemes.less', lang: 'less'}
  ],
  // 函数 变量
  styleResources: {//配置变量全局使用 styleResources 配置的资源路径不能使用 ~ 和 @,要使用绝对或者相对路径
    scss: [
      './assets/css/_bianlian.scss',
      './assets/css/_handle.scss',
      './assets/css/commonmMixin.scss',
      './assets/css/animation.scss'
    ],
  },
  // loading: './components/common/loadingHome.vue',
  loadingIndicator: {
    name: 'circle',
    color: 'rgba(255,10,10,0.59)',
    background: 'red'
  },
  router: {
    // Run the middleware/auth.js on every page
    // middleware: 'auth',
    scrollBehavior(to, from, savedPosition) {
      // 文章详情也的地址栏如果有hash，会跳转到hash，因此这里判断只有地址栏没有hash才滚动到顶部,或自动注入vue-router 中
      if (to.hash) {
        return {
          selector: to.hash,
        };
      } else if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
  },
  analyze: true,
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/assets/js/api/axiosPackaging',
    '@/assets/js/common',
    {src: '@/plugins/iview', ssr: true},
    {src: '@/assets/js/server', ssr: true},
    {src: '@/assets/js/client', ssr: false},
    {src: '@/store/persistedState.client', ssr: false},
    {src: '@/plugins/share', ssr: false},
    {src: '@/plugins/qrcode', mode: 'client'},
   '@/plugins/svg-icon'
  ],
  //在 Nuxt.js 中， components 配置项用于自动注册你的组件。通过指定组件目录，Nuxt.js 会扫描所有在该目录下的组件，并自动注册它们，使你不需要在每个文件中手动导入这些组件。
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  image:{
    provider: 'static',
    // static: {
    //   baseURL: 'https://www.navai.vip' // 会在图片前面加上这个前缀
    // },
    domains: ['www.runoob.com'],// 允许的域名
    dir: process.env.NODE_ENV === 'development' ? '_nuxt/static/images/' : 'static/images/'
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  //开发会用到的模块
  buildModules: [ '@nuxt/image','nuxt-precompress', '@nuxtjs/style-resources',],
  //https://v2.nuxt.com/docs/configuration-glossary/configuration-alias/
  alias: {
    '@static': path.resolve(__dirname, 'static/'),
    '@': path.resolve(__dirname, 'src/'),
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [ //所有在 modules 中引入的模块会在应用启动前加载。无论是开发阶段还是生产环境，这些模块都会被应用。
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/router",

    ['@nuxtjs/i18n', i18n],
    "@nuxtjs/sitemap" // 生成网站地图 xml 发布seo的
  ],
  sitemap:sitemap,
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
    host: process.env.DOMAIN,
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
      // 别名配置 用于router组件中
      config.resolve.alias['@'] = path.join(__dirname, 'src');
    },
    babel:{
      plugins: [
        ...plugins
      ],
      //打包大小优化
    }
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: true,
      minSize: 10000,
      maxSize: 244000,
      cacheGroups: {
        vendor: {
          name: 'node_vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          maxSize: 244000
        },
        styles: {
          name: 'styles',
          test: /\.(css|vue)$/,
          chunks: 'all',
          enforce: true
        },
        commons: {
          test: /node_modules[\\/](vue|vue-loader|vue-router|vuex|vue-meta|core-js|@babel\/runtime|axios|webpack|setimmediate|timers-browserify|process|regenerator-runtime|cookie|js-cookie|is-buffer|dotprop|nuxt\.js)[\\/]/,
          chunks: 'all',
          priority: 10,
          name: true
        }
      }
    }
  },
  nuxtPrecompress: {
    gzip: {
      enabled: true,
      filename: '[path].gz[query]',
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      enabled: true,
      filename: '[path].br[query]',
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
    enabled: true,
    report: false,
    test: /\.(js|css|html|txt|xml|svg)$/,
    // Serving options
    middleware: {
      enabled: true,
      enabledStatic: true,
      encodingsPriority: ['br', 'gzip'],
    },
  },
}
