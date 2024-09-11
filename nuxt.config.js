import path from 'path'
import getRouterList from './src/static/sitemap'
import i18n from './src/plugins/i18n/index'
import setting from './src/setting'
import TerserPlugin from 'terser-webpack-plugin';

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
          {rel: 'icon', type: 'image/x-icon', href:setting.favicon },
          // { rel: 'stylesheet', href: '//at.alicdn.com/t/font_2039941_lrrqf795ok.css?display=swap' }
          // { rel: 'stylesheet', href: '//cdn.bootcdn.net/ajax/libs/iview/3.5.4/styles/iview.css' }
        ],
        script: [
          // {rel: 'preload', src: '//cdn.bootcdn.net/ajax/libs/iview/3.5.4/iview.min.js', as: 'script', body: true},
          {rel: 'preload',src:'/consoleLog.js' ,defer: true,  type: 'text/javascript'}
        ]
        // script:[{  rel: 'preload',src: '//cdn.bootcdn.net/ajax/libs/iview/3.5.4/iview.min.js', as: 'script' }]
      },
      srcDir: 'src/',
      ssr: true,
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
        scrollBehavior:'@/router.scrollBehavior.js',
        middleware: ['route-change']
      },
      // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
      plugins: [
        '@/assets/js/api/axiosPackaging',
        '@/assets/js/common',
        {src: '@/plugins/iview', ssr: true},
        {src: '@/assets/js/server', ssr: true},
        {src: '@/assets/js/client', ssr: false},
        {src: '@/store/persistedState.client', ssr: false},
        // {src: '@/plugins/share', ssr: false},
        // {src: '@/plugins/qrcode', mode: 'client'},
        '@/plugins/svg-icon'
      ],
      //在 Nuxt.js 中， components 配置项用于自动注册你的组件。通过指定组件目录，Nuxt.js 会扫描所有在该目录下的组件，并自动注册它们，使你不需要在每个文件中手动导入这些组件。
      // Auto import components: https://go.nuxtjs.dev/config-components
      components: true,
      image:{
        provider: 'ipx',
        ipx: {
          // 允许访问的路径，必须匹配文件存放路径
          allowPaths: [setting.website+'/static'],
          // 其他 IPX 配置...
        },
        // static: {
        //   baseURL: 'https://www.navai.vip' // 会在图片前面加上这个前缀
        // },
        domains: ['www.runoob.com','navai.vip'],// 允许的域名
        dir: process.env.NODE_ENV === 'development' ? 'static/images' : '/', // 图片存放目录,打包有问题
        presets: {
          default: {
            modifiers: {
              format: 'webp',
              quality: 80, // 设置图像质量为 80%
            }
          }
        }
      },
      // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
      //开发会用到的模块
      buildModules: [ 'nuxt-precompress', '@nuxtjs/style-resources','nuxt-purgecss'],
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
        '@nuxtjs/pwa',
        "@nuxt/image",
        '@nuxtjs/fontaine',
        ['@nuxtjs/i18n', i18n],
        "@nuxtjs/sitemap" // 生成网站地图 xml 发布seo的
      ],
      sitemap:sitemaps,
      serverMiddleware: ['@/server/updateSitemap.js'],
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
      //生成 PWA 应用， 生成一个 manifest.json 文件，并自动生成一个 service worker 文件。
      pwa: {
        manifest: {
          name: setting.title,
          short_name: setting.short_title,
          lang: 'zh',
          display: 'standalone',
          theme_color: '#2c8a26',
          background_color: 'rgba(0,0,0,0.65)'
        },
        workbox: {
          //接口缓存，静态资源缓存，路由缓存
          // 启动时直接获取最新的 service worker
          clientsClaim: true,
          // 新的 service worker 替换当前 service worker 时立即接管现有客户端
          skipWaiting: true,
          // 启用离线分析
          offlineAnalytics: true,
          config: {
            debug: false // 关闭调试模式 使生成的 service worker 体积更小
          },
          preCaching: [
            // 预缓存的资源
            'static/images/logoside.png',
            'static/images/logoXI.png',
            '/favicon.ico',
            '/navai.png',
          ],
          runtimeCaching: [
            {
              urlPattern: new RegExp('https://navai\.vip/api/common/base'),
              handler: 'NetworkFirst',
              method: 'GET',
              options: {
                cacheName: 'api-cache/base',
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                }
              }
            },
            {
              urlPattern: new RegExp('https://navai\.vip/api/website/oneItem'),
              handler: 'NetworkFirst',
              method: 'GET',
              options: {
                cacheName: 'api-cache/oneItem',
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                }
              }
            },
            {
              urlPattern: new RegExp('^https://navai.vip/api/gradeCoins'),
              handler: 'NetworkFirst',
              method: 'GET',
              options: {
                cacheName: 'api-cache/gradeCoins',
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                }
              }
            }
          ]
        },
        icon: {
          source: 'static/images/logoXIB.png',  // 源图标文件路径
          // fileName: 'logoXI.png'  // 设置生成图标文件名称模板
          fileName: 'icons/[name]-[size].[ext]'  // 设置生成图标文件名称模板
        },
        meta: {
          // Meta标签配置
          theme_color: '#7de24a',
          mobileApp: true,
          mobileAppIOS: true,
          appleStatusBarStyle: 'black-translucent',
          favicon: true,
          name: setting.short_title,
          author: '安慕吸',
          description: setting.description,
          ogType: 'website',
          ogSiteName: setting.title,
          ogTitle: setting.title,
          ogDescription: setting.description,
          ogHost: setting.website,
          ogImage: '/navai.png',
          ogUrl: setting.website,
          charset: 'utf-8',
          viewport: 'width=device-width, initial-scale=1',
          nativeUI: true
        }
      },
      build:{
        extractCSS: true, //提取CSS
        extend(config, {isDev, isClient}) {
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
          //   if (isClient) {
          //     config.externals = config.externals || {};
          //     config.externals['iview'] = 'iview';
          //   }
        },
        babel:{
          // configFile: path.resolve(__dirname, 'babel.config.js'),
          plugins: [
            ...plugins
          ],
        },
        optimization: { //进行二次压缩
          minimize: true,
          minimizer: [
            new TerserPlugin({
              test: /\.js(\?.*)?$/i,
              parallel: true,
              extractComments: true,
              sourceMap: false,
              terserOptions: {
                output: {
                  // 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
                  beautify: false,
                  // 是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
                  comments: false
                },
                compress: {
                  // 是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用不大的警告
                  warnings: false,
                  // 是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
                  drop_console: true,
                  drop_debugger: true,
                  // 是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不转换，为了达到更好的压缩效果，可以设置为false
                  collapse_vars: true,
                  // 是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
                  reduce_vars: true,
                  pure_funcs: ['console.log'] // 移除console
                }
              }
            }),
          ],
          splitChunks: {
            chunks: 'all', // 针对所有类型的代码进行分割（同步和异步）
            automaticNameDelimiter: '.', // 分割后的文件名中自动包含一个指定的分隔符
            name: true, // 确保每个chunk都能得到一个具有唯一名称的文件
            minSize: 10000, // 最小被分割的文件大小（字节）
            maxSize: 244000, // 分割文件的最大大小（字节）
            cacheGroups: {
              iview:{
                name: 'iview', // 分割出的文件名
                test: /[\\/]iview[\\/]/, // 匹配views中的文件
                chunks: 'all', // 针对所有文件
                priority: 1,
                maxSize: 244000
              },
              vendor: {
                name: 'node_vendors', // 分割出的文件名
                test: /[\\/]node_modules[\\/]/, // 匹配node_modules中的文件
                chunks: 'all', // 针对所有文件
                priority: -10,
                maxSize: 244000
              },
              commons: {
                name: 'common',
                test: /[\\/]src[\\/]/,
                chunks: 'all', // 针对所有文件
                minChunks: 2, //minChunks 选项用于指定一个模块必须被多少个块（chunk）引用，才能被放入公共块（common chunk）中
                maxSize: 244000,
                priority: -5,
                reuseExistingChunk: true
              }
            }
          }
        },
      },
      //服务器会根据这些头信息，在客户端请求之前主动推送这些资源。
      //在 nuxt.config.js 中配置 render: { http2: { push: true } } 是启用 HTTP/2 服务器推送（HTTP/2 Server Push）功能。以下是这个配置的具体含义和作用：
      // HTTP/2 Server Push 是一种 HTTP/2 协议的特性，允许服务器在客户端请求之前主动推送资源。这可以减少页面加载时间，因为服务器可以提前将资源发送给客户端，而不需要等待客户端的请求。
      //响应头可能带有：Link: </css/main.css>; rel=preload; as=style
      // Link: </js/main.js>; rel=preload; as=script
      render: {
          http2: {
            push: true
        }
      },
      //处理 未使用的css
      purgeCSS: {
        mode: 'webpack',
        enabled: ({ isDev, isClient }) => (!isDev && isClient), // or `false` when in dev/debug mode
        paths: [
          'src/components/**/*.vue',
          'src/assets/css/**/*.css',
          'src/assets/css/**/*.less',
          'src/assets/css/**/*.scss',
          'pages/**/*.vue',
          'src/plugins/**/*.js'
        ],
        styleExtensions: ['.css','.scss', '.less'],
        whitelist: ['body', 'html', 'nuxt-progress'],
        extractors: [
          {
            extractor: content => content.match(/[A-z0-9-:\\/]+/g) || [],
            extensions: ['html', 'vue', 'js']
          }
        ]
      },
      //和 build 重复，压缩取消
      // optimization: {
      //   minimize: true, // 启用代码压缩
      //   splitChunks: {
      //     chunks: 'all', // 针对所有类型的代码进行分割（同步和异步）
      //     automaticNameDelimiter: '.', // 分割后的文件名中自动包含一个指定的分隔符
      //     name: true, // 确保每个chunk都能得到一个具有唯一名称的文件
      //     minSize: 10000, // 最小被分割的文件大小（字节）
      //     maxSize: 244000, // 分割文件的最大大小（字节）
      //     cacheGroups: {
      //       vendor: {
      //         name: 'node_vendors', // 分割出的文件名
      //         test: /[\\/]node_modules[\\/]/, // 匹配node_modules中的文件
      //         chunks: 'all', // 针对所有文件
      //         maxSize: 244000, // 分割文件的最大大小
      //       },
      //       styles: {
      //         name: 'styles', // 分割出的样式文件名
      //         test: /\.(css|vue|less|scss|sass)$/, // 匹配 CSS 和 Vue 文件中的样式部分
      //         chunks: 'all', // 针对所有文件分割样式
      //         enforce: true, // 强制执行该策略
      //       },
      //       commons: {
      //         test: /node_modules[\\/](vue|vue-loader|vue-social-share|iview|vue-router|vuex|vue-meta|core-js|@babel\/runtime|axios|webpack|setimmediate|timers-browserify|process|regenerator-runtime|cookie|js-cookie|is-buffer|dotprop|nuxt\.js)[\\/]/, // 匹配常用依赖库
      //         chunks: 'all', // 针对所有文件
      //         priority: 10, // 优先级
      //         name: true // 文件名生成策略
      //       }
      //     }
      //   }
      // },
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
      },

    }
  }catch(e){
    console.error('Error during build process:', e);
    throw e; // 再次抛出错误，以便 Nuxt 捕获到构建错误
  }
}
