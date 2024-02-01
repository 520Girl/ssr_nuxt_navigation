import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store/index';
import layout from "@/components/common/headerNav";
import setting from "@/setting"

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
        { //博客
            path: '/blog',
            component: layout,
            children: [{
                path: "/",
                name: 'Blog',
                component: () => import('@/components/blog').then(m => m.default || m),
                meta: { title: '博客,新闻,导航' },
            }, {
                path: "detailed/:id/:title",
                name: 'BlogDetailed',
                component: () => import('@/components/pages/blog/blogDetailed').then(m => m.default || m),
                meta: { title: '博客详情,新闻详情,导航' },
            }
            ]
        },
        { //评分宝
            path: '/gradeCoin',
            component: layout,
            children: [{
              path: ":id/:title",
              name: 'GradeCoinDetailed',
              component: () => import('@/components/gradeCoins').then(m => m.default || m),
              meta: {
                title: '评分宝,导航',
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
    // console.log(to)
    let aT = 'title' in to.query ? to.query.title + ',' : ''
    if(process.client){
        document.title = setting.title + ',' + aT + to.meta.title
    }
    //# 将侧边栏导出来
    if (from.name == 'CartoonDetailed') {
        store.commit('setHeadeSidebar', [true, true])
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
