import path from 'path'
import getRouterList from './src/static/sitemap'
import i18n from './src/plugins/i18n/index'
import setting from './src/setting'

//! 1. 去掉console
let plugins = []
if (process.env.NODE_ENV === 'production'){
  plugins.push(["transform-remove-console",{"exclude":["error","warn"]}])
}
export default async function() {
  try{
    const sitemaps = await getRouterList()
    return {
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
          {rel: 'icon', type: 'image/x-icon', href:setting.favicon }
        ]
        // script:[{  rel: 'preload',src: '//unpkg.com/view-design/dist/iview.min.js', as: 'script' }]
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
      //移到了router.scrollBehavior.js 中
      router:{
        scrollBehavior:require('./src/router.scrollBehavior.js').default,
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
        domains: ['www.runoob.com','navai.vip'],// 允许的域名
        dir: process.env.NODE_ENV === 'development' ? 'static/images' : '/', // 图片存放目录,打包有问题
      },
      // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
      //开发会用到的模块
      buildModules: [ 'nuxt-precompress', '@nuxtjs/style-resources',],
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
        "@nuxt/image",
        ['@nuxtjs/i18n', i18n],
        "@nuxtjs/sitemap" // 生成网站地图 xml 发布seo的
      ],
      // sitemap:sitemaps,
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
          //忽略iview.js
          // 添加 externals 配置，忽略 iview 相关依赖
          // config.externals = config.externals || {};
          // config.externals['iview'] = 'iview';
        },
        babel:{
          plugins: [
            ...plugins
          ],
          //打包大小优化
        }
      },
      optimization: {
        minimize: true, // 启用代码压缩
        splitChunks: {
          chunks: 'all', // 针对所有类型的代码进行分割（同步和异步）
          automaticNameDelimiter: '.', // 分割后的文件名中自动包含一个指定的分隔符
          name: true, // 确保每个chunk都能得到一个具有唯一名称的文件
          minSize: 10000, // 最小被分割的文件大小（字节）
          maxSize: 244000, // 分割文件的最大大小（字节）
          cacheGroups: {
            vendor: {
              name: 'node_vendors', // 分割出的文件名
              test: /[\\/]node_modules[\\/]/, // 匹配node_modules中的文件
              chunks: 'all', // 针对所有文件
              maxSize: 244000, // 分割文件的最大大小
            },
            styles: {
              name: 'styles', // 分割出的样式文件名
              test: /\.(css|vue)$/, // 匹配 CSS 和 Vue 文件中的样式部分
              chunks: 'all', // 针对所有文件分割样式
              enforce: true, // 强制执行该策略
            },
            commons: {
              test: /node_modules[\\/](vue|vue-loader|vue-router|vuex|vue-meta|core-js|@babel\/runtime|axios|webpack|setimmediate|timers-browserify|process|regenerator-runtime|cookie|js-cookie|is-buffer|dotprop|nuxt\.js)[\\/]/, // 匹配常用依赖库
              chunks: 'all', // 针对所有文件
              priority: 10, // 优先级
              name: true // 文件名生成策略
            }
          }
        }
      },
      nuxtPrecompress: {
        gzip: {
          enabled: true, // 启用gzip压缩
          filename: '[path].gz[query]', // 压缩后的文件命名方式
          threshold: 10240, // 仅大于阈值大小（字节）的文件才会被压缩
          minRatio: 0.8, // 压缩率阈值，小于该值则不压缩
          compressionOptions: { level: 9 } // gzip压缩级别
        },
        brotli: {
          enabled: true, // 启用brotli压缩
          filename: '[path].br[query]', // 压缩后的文件命名方式
          compressionOptions: { level: 11 }, // brotli压缩级别
          threshold: 10240, // 仅大于阈值大小（字节）的文件才会被压缩
          minRatio: 0.8, // 压缩率阈值，小于该值则不压缩
        },
        enabled: true, // 总开关
        report: false, // 是否生成压缩报告
        test: /\.(js|css|html|txt|xml|svg)$/, // 需要压缩的文件类型
        middleware: {
          enabled: true, // 启用中间件
          enabledStatic: true, // 启用静态文件的压缩
          encodingsPriority: ['br', 'gzip'], // 控制优先级，按顺序优先选择采用的压缩格式
        },
      }
    }
  }catch(e){
    console.error('Error during build process:', e);
    throw e; // 再次抛出错误，以便 Nuxt 捕获到构建错误
  }
}
