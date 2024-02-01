//需要在服务端的

import Vue from 'vue';
import iView from 'iview';
import VueLazyload from "vue-lazyload";
import { weightFilters } from '@/assets/js/handleloadingImag'
// import '~/assets/css/_bianlian.scss'

//iview
Vue.use(iView);
import 'iview/dist/styles/iview.css';

//https://www.jianshu.com/p/d0aadf5cdf57
//使用懒加载图片,实现不同图片加载不同的loading
Vue.use(VueLazyload, {
  listenEvents: ['scroll'],
  attempt: 2, //尝试次数
  error: require('@@/static/lazy/loadingAr2.gif'), // 加载失败时使用的图片
  // loading: require('@@/static/lazy/loadingAr2.gif'), // 加载时的loading图
  throttleWait: 500,//节流等待时间(通过调节此值可以查看loading的效果，根据实际情况调节)
  filter: {
    progressive(listener, options) {
      // 实现渐近式加载图片（先加载模糊的图）
      listener.el.setAttribute('lazy-progressive', 'true')
      // 先加载模糊的图（这个地方是替换图片中的宽度与高度大小）
      let loadingUrl = listener.src.replace(/w_[0-9]+/g, 'w_5')
      loadingUrl = loadingUrl.replace(/h_[0-9]+/g, 'h_5')
      listener.loading = loadingUrl

      // 过滤一下添加的地址
      if (/(http|https|ftp)/.test(listener.src)) {
        let url = String(listener.src)
        if (url.includes('https')) {
          let baseHttps = url.split('https')[1]
          listener.src = `https${baseHttps}`
        }else{
          let baseHttps = url.split('http')[1]
          listener.src = `http${ baseHttps }`
        }
      }
    }
  }
  //区分每个组件加载的loading 和 error 图片
  //   filter:{
  //     imgLazy(listener,options){
  //       handleloadingImag(listener)
  //     },
  // },

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

