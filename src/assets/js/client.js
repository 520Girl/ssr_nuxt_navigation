// 需要在客户端的
import Vue from 'vue';
import directive from "./directive";
import common from "@/assets/js/common";

(()=>{
    function c() {
        let deviceWidth = document.documentElement.clientWidth || document.body.clientWidth, a = 750, b = 0;
        a = deviceWidth > 750 ? 750 : deviceWidth;
        b = a / 750 * 100;
        document.getElementsByTagName("html")[0].style.fontSize = b + "px"
    }
    c();
window.onresize =c;
  })()

//全局指令
Vue.directive('focus',directive.focus)
Vue.directive('clickData',directive.clickData)
Vue.directive('like',directive.clickLike)

// 将common方法挂载到vue 原型链上
Vue.prototype.$common = common

//引入公共样式
// require('@/assets/css/_orderthemes.less')
require('@/assets/css/reset.scss')
require('@/assets/css/normalize.css')
require( '@/assets/css/border.scss')
require('@/assets/css/common.scss')
require('@/assets/css/transition.scss')