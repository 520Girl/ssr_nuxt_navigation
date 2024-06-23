//需要在服务端的

import Vue from 'vue';
import iView from 'iview';
import computed from "./computed";
import { weightFilters } from '@/assets/js/handleloadingImag'
// import '~/assets/css/_bianlian.scss'
import common from "@/assets/js/common";
//iview
Vue.mixin({...computed})
Vue.use(iView);
import 'iview/dist/styles/iview.css';
//https://www.jianshu.com/p/d0aadf5cdf57

