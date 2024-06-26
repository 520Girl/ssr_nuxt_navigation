import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index';
import layout from "@/components/common/headerNav.vue";
import setting from '@/setting'

Vue.use(Router)
const router = new Router({
  routes: [
    { //首页
      path: '/',
      component: layout,
      children: [{
        path: '/',
        name: 'Index',
        component: () => import('@/compone' +
        'nts/Home').then(m => m.default || m),
        meta: {
          title:'AI导航首页,AI图片,AI新闻博客,AI漫画,评分宝,AI新闻,AIGC导航,AI网站合集,AI广告,尊享',
          description: '' +
            'AI导航:navai.vip的AI导航功能旨在为用户提供最优的网站浏览体验。AI导航能够根据用户的浏览行为和偏好，智能推荐相关的内容，帮助用户快速找到他们感兴趣的信息。这种个性化的导航方式不仅提高了用户的满意度，也增加了网站的点击率。' +
            ',AI图片:navai.vip的AI图片功能可以生成高质量的图像，满足您在不同场合下的需求。无论是需要专业的图片进行设计，还是想要寻找美丽的壁纸，AI图片都能提供给您满意的结果。这些图片广泛应用在各种领域，如艺术创作、影视制作、游戏开发、广告设计等。' +
            'AI新闻：navai.vip的AI新闻功能使用先进的人工智能技术来实时收集、整理和发布最新的新闻报道。这种全自动的新闻生产方式不仅大大提高了新闻发布的效率，而且能够确保报道的立场中立和事实准确。通过我们的AI新闻，您可以随时随地获取到最新、最热门的新闻动态。' +
            ',AI漫画：斗罗大陆,武炼巅峰,斗破苍穹,全职法师,妖神记，navai.vip的AI漫画功能利用深度学习技术，可以根据用户的喜好生成个性化的漫画内容。用户只需要输入一些关键词或主题，AI就可以创作出富有创意和趣味的漫画，带给您无尽的欢乐。,' +
            'AIApp:navai.vip的AI App搭载了强大的人工智能技术，为用户提供了一站式的智能服务。无论您想要获取最新的新闻、观看有趣的漫画，还是需要高质量的图片，AI App都能满足您的需求。而且，AI App具有优秀的用户体验设计，使得操作简单易用，让您随时随地享受AI的便捷。,' +
            'AI评分宝：navai.vip的AI评分宝是一个基于人工智能的评分工具，能够为各种产品或服务提供公正、准确的评分。AI评分宝通过分析大量的用户反馈和市场数据，能够给出客观的评分结果。这不仅帮助用户做出更好的选择，也为商家提供了改进产品或服务的参考。,' +
            'AI网站合集：navai.vip的AI网站集合功能提供了一站式的AI资源访问平台，为用户提供了极大的便利。我们精选了全球范围内最优质的AI相关网站，并按照不同的分类进行整理，用户可以根据自己的需求快速找到所需的资源。无论是AI的最新研究成果，还是AI的应用案例，或者是AI的教程和工具，用户都能在我们的AI网站集合中一目了然，无需在互联网上花费大量时间寻找。这个功能提供了一个高效、方便的方式，帮助用户获取AI领域的最新信息和知识，提升了用户的学习和工作效率。',
        }

      }]
    },
    { //评分宝
      path: '/gradeCoin',
      component: layout,
      children: [{
        path: ":id",
        name: 'GradeCoinDetailed',
        component: () => import('@/components/gradeCoins').then(m => m.default || m),
        meta: {
          title:'AI导航评分宝,AI评分宝,尊享',
          description: 'AI导航,AI评分宝:navai.vip的AI评分宝是一个基于人工智能的评分工具，能够为各种产品或服务提供公正、准确的评分。AI评分宝通过分析大量的用户反馈和市场数据，能够给出客观的评分结果。这不仅帮助用户做出更好的选择，也为商家提供了改进产品或服务的参考。',
        },
      }],

    },
    { //博客
      path: '/blog',
      component: layout,
      children: [{
        path: "/",
        name: 'Blog',
        component: () => import('@/components/blog').then(m => m.default || m),
        meta: {
          title: 'AI导航新闻,博客,AI新闻,尊享',
          description:'AI新闻:navai.vip的AI新闻功能使用先进的人工智能技术来实时收集、整理和发布最新的新闻报道。这种全自动的新闻生产方式不仅大大提高了新闻发布的效率，而且能够确保报道的立场中立和事实准确。通过我们的AI新闻，您可以随时随地获取到最新、最热门的新闻动态。'
        },
      },{
        path: "tag/:author_id([A-Za-z]+)/:page(\\d+)",
        name: 'BlogTag',
        component: () => import('@/components/blog').then(m => m.default || m),
        meta: {
          title: 'AI导航新闻分类,博客,AI新闻,尊享',
          description:'AI新闻:navai.vip的AI新闻功能使用先进的人工智能技术来实时收集、整理和发布最新的新闻报道。这种全自动的新闻生产方式不仅大大提高了新闻发布的效率，而且能够确保报道的立场中立和事实准确。通过我们的AI新闻，您可以随时随地获取到最新、最热门的新闻动态。'
        },
      },{
        path: "page/:page(\\d+)",
        name: 'BlogPage',
        component: () => import('@/components/blog').then(m => m.default || m),
        meta: {
          title: 'AI导航新闻,博客,AI新闻,尊享',
          description:'AI新闻:navai.vip的AI新闻功能使用先进的人工智能技术来实时收集、整理和发布最新的新闻报道。这种全自动的新闻生产方式不仅大大提高了新闻发布的效率，而且能够确保报道的立场中立和事实准确。通过我们的AI新闻，您可以随时随地获取到最新、最热门的新闻动态。'
        },
      },{
        path: ":id",
        name: 'BlogDetailed',
        component: () => import('@/components/pages/blog/blogDetailed').then(m => m.default || m),
        meta: {
          title: 'AI导航新闻详情,博客,AI新闻,尊享',
          description:'AI新闻:navai.vip的AI新闻功能使用先进的人工智能技术来实时收集、整理和发布最新的新闻报道。这种全自动的新闻生产方式不仅大大提高了新闻发布的效率，而且能够确保报道的立场中立和事实准确。通过我们的AI新闻，您可以随时随地获取到最新、最热门的新闻动态。'
        },
      }
      ]
    },
    {
      path: '/app',
      component: layout,
      children: [{
        path: ":id",
        name: 'App',
        component: () => import('@/components/app').then(m => m.default || m),
        meta: {
          title: 'AI导航App,AIApp,尊享',
          description:'AIApp:navai.vip的AI App搭载了强大的人工智能技术，为用户提供了一站式的智能服务。无论您想要获取最新的新闻、观看有趣的漫画，还是需要高质量的图片，AI App都能满足您的需求。而且，AI App具有优秀的用户体验设计，使得操作简单易用，让您随时随地享受AI的便捷。'
        },
      }],
    },
    { //漫画
      path: '/cartoon',
      component: layout,
      children: [
        {
          path: ":belong(\\d+)",
          name: 'Cartoon',
          component: () => import('@/components/cartoon').then(m => m.default || m),
          meta: {
            title: 'AI导航漫画,AI漫画,斗罗大陆漫画,斗罗大陆,武炼巅峰,斗破苍穹,全职法师,妖神记,尊享',
            description: 'AI导航,AI漫画:navai.vip的AI漫画功能使用先进的人工智能技术来实时收集、整理和发布最新的漫画作品。这种全自动的漫画生产方式不仅大大提高了漫画的发布效率，而且能够确保作品的质量。通过我们的AI漫画，您可以随时随地获取到最新、最热门的漫画动态。'
          },
        },
        {
          path: ":belong(\\d+)/:class(\\w+)",
          name: 'CartoonDetailed',
          component: () => import('@/components/pages/cartoon/cartoonDetailed').then(m => m.default || m),
          meta: {
            title: 'AI导航漫画详情,AI漫画,尊享',
            description: 'AI导航,AI漫画:navai.vip的AI漫画功能使用先进的人工智能技术来实时收集、整理和发布最新的漫画作品。这种全自动的漫画生产方式不仅大大提高了漫画的发布效率，而且能够确保作品的质量。通过我们的AI漫画，您可以随时随地获取到最新、最热门的漫画动态。'
          },
        }
      ]
    },
    {//提交submit收录
      path: '/embody',
      component: layout,
      children: [{
        path: "/",
        name: 'Embody',
        component: () => import('@/components/embody').then(m => m.default || m),
        meta: {
          title: 'AI导航免费工具集合尊享导航收录,AI收录,尊享',
          description: 'AI收录:navai.vip的AI收录功能为用户提供免费的工具集合，包括收录工具、收录指南、收录规范、收录流程等。用户只需按照规范操作，即可快速收录网站，提升网站收录效率。'
        },
      }],

    },
    // 排行榜 rank
    {
      path: '/rank',
      component: layout,
      children: [{
        path: "/",
        name: 'Rank',
        component: () => import('@/components/rank').then(m => m.default || m),
        meta: {
          title: 'AI导航资讯,AI资讯,AI排行榜,尊享',
          description: 'AI资讯:navai.vip欢迎您来到AI行业门户，这里是探讨人工智能领域的理想平台。我们提供最新的AI资讯、技术动态、产业发展趋势和研究成果分享，为您构建高质量的AI知识体系。'
        },
      }],

    },
    {//更多分类内容favorites
      path: '/favorites/:belong',
      component: layout,
      children: [{
        path: "/",
        name: 'Favorites',
        component: () => import('@/components/favorites').then(m => m.default || m),
        meta: {
          title: 'AI导航网站合集,AI网站,AI网站合集,尊享',
          description: 'AI网站合集:navai.vip的AI网站集合功能提供了一站式的AI资源访问平台，为用户提供了极大的便利。我们精选了全球范围内最优质的AI相关网站，并按照不同的分类进行整理，用户可以根据自己的需求快速找到所需的资源。无论是AI的最新研究成果，还是AI的应用案例，或者是AI的教程和工具，用户都能在我们的AI网站集合中一目了然，无需在互联网上花费大量时间寻找。这个功能提供了一个高效、方便的方式，帮助用户获取AI领域的最新信息和知识，提升了用户的学习和工作效率。'
        },
      }],

    },
    {// 广告 advertising
      path: '/advertising',
      component: layout,
      children: [{
        path: "/",
        name: 'Advertising',
        component: () => import('@/components/advertising').then(m => m.default || m),
        meta: {
          title: 'AI免费工具集合尊享导航广告联系,AI广告,尊享',
          description: 'AI广告:navai.vip的AI广告招商功能为企业提供了一个独特的、针对性强的广告平台。由于我们的用户群主要是对AI感兴趣的人群，因此在我们的平台上投放广告能够直接抵达这些高价值用户。我们提供多种形式的广告位，包括但不限于首页横幅、文章插页、推送广告等，以满足不同企业的广告需求。此外，我们的广告系统采用先进的AI技术，能够根据用户的行为和兴趣进行智能推送，提高广告的点击率和转化率。因此，无论您是希望提高品牌知名度，还是希望推广产品或服务，我们的AI广告招商都能为您提供有效的解决方案。\n'
        },
      }],

    },
    {
      path: '/about',
      component: layout,
      children: [{
        path: "/",
        name: 'Aboutnavai',
        component: () => import('@/components/aboutnavai').then(m => m.default || m),
        meta: {
          title: 'AI免费工具集合尊享导航关于我们,尊享',
          description: 'AI免费工具集合尊享导航:navai.vip是一个专注于AI领域的先进技术公司，我们的使命是为用户提供最新、最全面的AI资讯和资源。我们的团队由一群热衷于AI的专家和爱好者组成，他们致力于研究AI的最新趋势，开发出创新的AI应用，并通过我们的平台分享给用户。我们坚信，AI技术有着无限的可能性，可以在各个领域发挥重要作用。我们希望通过我们的平台，能让更多的人了解AI，学习AI，并从中受益。我们非常欢迎任何对AI感兴趣的人加入我们，一起探索AI的奇妙世界！'
        },
      }],

    },
    { //反诈中心
      path: '/fanzhazhongxin',
      component: layout,
      children: [{
        path: "/",
        name: 'Fanzhazhongxin',
        component: () => import('@/components/fanzhazhongxin').then(m => m.default || m),
        meta: {
          title: 'AI免费工具集合尊享导航国家反诈中心，ai反诈中心,尊享',
          description:'ai反诈中心:navai.vip的反诈中心功能为用户提供专业的反诈系统服务。我们提供专业的反诈系统服务，包括但不限于身份验证、手机防盗、网络安全、网络诈骗、恶意软件、垃圾邮件、钓鱼网站、垃圾短信、恶意链接、恶意广告等。通过我们的反诈系统，用户可以快速有效地保护自己和家人安全。'
        },
      }],
    },
    { //AICG行业报告
      path: '/free-ai-industry-reports',
      component: layout,
      children: [{
        path: "/",
        name: 'IndustrialReports',
        component: () => import('@/components/industrialReports').then(m => m.default || m),
        meta: {
          title: 'AI免费工具集合尊享导航AIGC行业报告，ai行业报告,尊享,免费',
          description:'AIGC行业报告:navai.vip提供的AI免费工具集合提供的是深入研究AI行业的发展趋势和问题，它具有详尽数据支持、市场趋势分析、行业洞察以及预测未来发展趋势等'
        },
      }],
    },
    { //免费ai工具
      path: '/free-ai-tools',
      component: layout,
      children: [{
        path: "/",
        name: 'FreeAiTools',
        component: () => import('@/components/freeAiTools').then(m => m.default || m),
        meta: {
          title: 'AI免费工具集合尊享导航ai免费工具，ai免费工具,chatgpt免费,尊享,免费',
          description:'ai免费工具:navai.vip提供的AI免费工具集合是一种利用人工智能技术为用户提供各种服务，如文本生成、图像识别、数据分析等的在线应用，特点是便捷高效、无需花费，并且常常具有智能预测、深度学习等一系列高级功能。'
        },
      }],
    },
    { //互推计划
      path: '/reciprocal-project',
      component: layout,
      children: [{
        path: "/",
        name: 'ReciprocalProject',
        component: () => import('@/components/reciprocalProject').then(m => m.default || m),
        meta: {
          title: 'AI免费工具集合尊享导航AI互推计划，AI互推计划,chatgpt免费,尊享,免费',
          description:'AI互推计划:navai.vip提供的AI互推计划是一种鼓励和支持AI相关产品或服务互相推广，合作共赢的策略，特点是可以扩大影响力，互利共赢，并推动AI行业的快速发展。'
        },
      }],
    },
    { //联系我们
      path: '/business',
      component: layout,
      children: [{
        path: "/",
        name: 'Business',
        component: () => import('@/components/business').then(m => m.default || m),
        meta: {
          title: 'AI免费工具集合尊享导航联系我们，AI联系我们,chatgpt免费,尊享,免费',
          description:'AI联系我们:navai.vip提供的AI联系我们是一个提供信息渠道以便用户与AI产品或服务供应商进行交流、提出疑问或反馈意见的接口，其特点在于提供方便快捷的沟通方式，使得用户可以方便地获取产品信息或寻求帮助。'
        },
      }],
    },
    { //免责声明
      path: '/disclaimer',
      component: layout,
      children: [{
        path: "/",
        name: 'Disclaimer',
        component: () => import('@/components/disclaimer').then(m => m.default || m),
        meta: {
          title: 'AI免费工具集合尊享导航免责声明，AI免责声明,chatgpt免费,尊享,免费',
          description:'AI免责声明:navai.vip提供的AI免责声明是我们提供商免除在用户使用其AI工具、服务或功能时所可能产生的一些责任的法律声明，特点是将用户注意力引向可能的使用风险，从而为AI服务提供商自身避免或限制可能的法律责任。'
        },
      }],
    },
    { //联系删除
      path: '/deleteinformation',
      component: layout,
      children: [{
        path: "/",
        name: 'Deleteinformation',
        component: () => import('@/components/deleteinformation').then(m => m.default || m),
        meta: {
          title: 'AI免费工具集合尊享导航联系删除，AI联系删除,chatgpt免费,尊享,免费',
          description:'AI联系删除:navai.vip提供的AI联系删除是一个允许用户主动要求删除与AI相关的联系信息或数据的功能，特点是保护用户隐私和数据安全，使用者可以自主控制他们的个人信息和数据。'
        },
      }],
    },

    { //404
      path: '*',
      component: layout,
      children: [{
        path: "/",
        name: 'Lose',
        component: () => import('@/404/404').then(m => m.default || m),
        meta: {
          title: '404,页面找不到,AI导航,尊享',
        },
      }],
    },
  ],
  // https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E6%BB%9A%E5%8A%A8%E8%A1%8C%E4%B8%BA
  scrollBehavior(to, from, savedPosition) { // 解决了动画切换延迟.5s切换，当前页面会先滚动到顶部再切换的问题
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 500)
    })

  },
  mode:'history'
})
router.beforeEach((to, from, next) => {
  //1. 配置loading 开启
  // store.commit('getLoadingHome', true)
  // if (to.path.includes('cartoon') && store().getters.cartoonRouter !== true){
  //   next('/404')
  // }
  // if (to.path.includes('image') && store().getters.imageRouter !== true){
  //   next('/404')
  // }
  // let aT = 'title' in to.query ? to.query.title + ',' : ''
  // if(process.browser){
  //   document.title = setting.title + ',' + aT + to.meta.title
  // }
  //# 将侧边栏导出来
  if(from.name === 'CartoonDetailed'){
    store().commit('setHeadeSidebar',[true,true])
  }
  next()
})
// router.afterEach((to,from,next) => {
//   window.scrollTo(0,0);
// });
/**
 * 解决报错问题：报错显示是路由重复
 * Error: Avoided redundant navigation to current location
 */
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export function createRouter() {
  return router
}
