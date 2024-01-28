//需要在服务端的

import Vue from 'vue';
import iView from 'iview';
import VueLazyload from "vue-lazyload";
import handleloadingImag from '@/assets/js/handleloadingImag'
// import '~/assets/css/_bianlian.scss'

//iview
Vue.use(iView);
import 'iview/dist/styles/iview.css';

//使用懒加载图片,实现不同图片加载不同的loading
Vue.use(VueLazyload,{
    listenEvents: [ 'scroll' ],
    attempt: 1,
    filter:{
      imgLazy(listener,options){
        handleloadingImag(listener)
      },
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

