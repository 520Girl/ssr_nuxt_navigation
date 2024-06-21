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
        component: () => import('@/components/Home').then(m => m.default || m),
        meta: {
          title: '导航,图片,新闻,漫画,app',
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
          title: '评分宝,导航',
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
        meta: {title: '博客,新闻,导航'},
      }, {
        path: ":id",
        name: 'BlogDetailed',
        component: () => import('@/components/pages/blog/blogDetailed').then(m => m.default || m),
        meta: {title: '博客详情,新闻详情,导航'},
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
        meta: {title: 'App,app,导航'},
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
            title: '斗罗大陆漫画,导航'
          },
        },
        {
          path: ":belong(\\d+)/:class(\\w+)",
          name: 'CartoonDetailed',
          component: () => import('@/components/pages/cartoon/cartoonDetailed').then(m => m.default || m),
          meta: {
            title: '斗破苍穹漫画详细,导航'
          },
        }
      ]
    },
    {//提交submit收录
      path: '/embody',
      component: layout,
      children: [{
        path: "/",
        name: 'embody',
        component: () => import('@/components/embody').then(m => m.default || m),
        meta: {
          title: '收录',
        },
      }],

    },
    // 排行榜 rank
    {
      path: '/rank',
      component: layout,
      children: [{
        path: "/",
        name: 'rank',
        component: () => import('@/components/rank').then(m => m.default || m),
        meta: {
          title: '排行榜',
        },
      }],

    },
    {//更多分类内容favorites
      path: '/favorites/:belong',
      component: layout,
      children: [{
        path: "/",
        name: 'favorites',
        component: () => import('@/components/favorites').then(m => m.default || m),
        meta: {
          title: '工具',
        },
      }],

    },
    {// 广告 advertising
      path: '/advertising',
      component: layout,
      children: [{
        path: "/",
        name: 'advertising',
        component: () => import('@/components/advertising').then(m => m.default || m),
        meta: {
          title: '广告联系',
        },
      }],

    },
    {
      path: '/aboutnavai',
      component: layout,
      children: [{
        path: "/",
        name: 'advertising',
        component: () => import('@/components/aboutnavai').then(m => m.default || m),
        meta: {
          title: '关于我们',
        },
      }],

    },
    { //404
      path: '*',
      name: 'lose',
      component: layout,
      children: [{
        path: "/",
        name: 'advertising',
        component: () => import('@/404/404').then(m => m.default || m),
        meta: {
          title: '广告联系',
        },
      }],
      meta: {
        title: 'belongs 404'
      }
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
  let aT = 'title' in to.query ? to.query.title + ',' : ''
  if(process.browser){
    document.title = setting.title + ',' + aT + to.meta.title
  }
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
