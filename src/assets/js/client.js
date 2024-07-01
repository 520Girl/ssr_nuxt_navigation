// 需要在客户端的
import Vue from 'vue';
import directive from "./directive";
// import store from "@/store/index.js";
import handleloadingImag from '@/assets/js/handleloadingImag'
import VueLazyload from "vue-lazyload";
// import {appList,user,blog,gradeCoin,webSite,cartoon,image,slide,bulletin,news,mutulal} from '@/assets/js/api/reqModule';
(() => {
  function c() {
    let deviceWidth = document.documentElement.clientWidth || document.body.clientWidth, a = 750, b = 0;
    a = deviceWidth > 750 ? 750 : deviceWidth;
    b = a / 750 * 100;
    document.getElementsByTagName("html")[0].style.fontSize = b + "px"
  }
  c();
  window.onresize = c;
})()

//全局指令
Vue.directive('focus', directive.focus)
Vue.directive('clickData', directive.clickData)
Vue.directive('like', directive.clickLike)


// 将common方法挂载到vue 原型链上
// Vue.prototype.$common = ()=>({...common})
// export default ({app},inject)=>{
//   inject('common',common)
// }
// Vue.prototype.$api = {appList,user,blog,gradeCoin,webSite,cartoon,image,slide,bulletin,news,mutulal}

//引入公共样式
// require('@/assets/css/_orderthemes.less')
require('@/assets/css/reset.scss')
require('@/assets/css/normalize.css')
require('@/assets/css/border.scss')
require('@/assets/css/common.scss')
require('@/assets/css/transition.scss')
require('@/assets/css/slider.scss')
require('@/assets/css/commonmMixin.scss')




//使用懒加载图片,实现不同图片加载不同的loading
Vue.use(VueLazyload, {
  listenEvents: [ 'scroll' ],
  attempt: 2,
  throttleWait: 500,
  filter:{
    imgLazy(listener,options){
      handleloadingImag(listener)
    },
    progressive(listener, options) {
      // 实现渐近式加载图片（先加载模糊的图）
      listener.el.setAttribute('lazy-progressive', 'true')
      // 先加载模糊的图（这个地方是替换图片中的宽度与高度大小）
      let loadingUrl = listener.src.replace(/w_[0-9]+/g, 'w_5')
      loadingUrl = loadingUrl.replace(/h_[0-9]+/g, 'h_5')
      listener.loading = loadingUrl
    }
  },
  // adapter:{ //图片三个状态下执行德 方法， 图片的加载时长和大小参数是在图片 loaded 状态后
  //   loaded(listender, options) {
  //     console.log('loaded')
  //   },
  //   loading(listender, options) {
  //     console.log('loading')
  //   },
  //   error(listender, options) {
  //     console.log('error')
  //   }
  // }
})

export default ({app,router,store},inject)=>{
  function isMobile(){
    let flag  = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag
  }
  isMobile() ? store.commit("getIsMobile",true)  : store.commit("getIsMobile",false)
  console.log('isMobile',isMobile() ? true : false)
  console.log('themes',store.state.isMobile)

  //! 1. 添加默认主题
  let themes = localStorage.getItem('themes')
  if (themes && themes.includes('light')) {
    window.document.documentElement.setAttribute("data-theme", 'light'); //scss
    window.document.documentElement.setAttribute("class", 'light'); //less
    store.commit('getThemes', 'light');
  } else {
    window.document.documentElement.setAttribute("data-theme", 'dark');
    window.document.documentElement.setAttribute("class", 'dark');
    store.commit('getThemes', 'dark');
  }
}



