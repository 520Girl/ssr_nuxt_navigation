import Vue from 'vue'
import Vuex from 'vuex'

import tagsView from "./modules/tagsView";
import clickLike from "./modules/clickLike";

Vue.use(Vuex)

//配置数据持久化
//不能使用clickLike 中的map map因为 需要使用到数据持久化，json.stringify 无法格式化map数据




//https://segmentfault.com/a/1190000015782272
const store = () => new Vuex.Store({
  state: {
    locale: "zh-CN",//语言
    themes: 'dark',
    backdrop: false,// 背景
    isMobile: false,
    clickData: [],
    token: '',
    loadingHome: true, //最大的loading首页
    hideSidebar: true, //当图片详情页面调用 v-viewer组件时隐藏侧导航
    hideHeader: true, // header 显示与隐藏
    asyncLoadingData: { //滚动加载进行处理
      scrollState: '',
      // bulletin:false, //前四项是默认加载的
      // gradeCoin:false,
      // articless:false,
      // myNav:false,
      // hotslider:false,
      advert_groom: false, //广告赞助
      station_master: false,
      yellow_game: false,
      youth_Tv: false,
      tool_resource: false,
      website1: false,
      website2: false,
      website3: false,
      website4: false,
      website5: false,
      website6: false,
      website7: false,
      website8: false,
      website9: false,
      website10: false,
      website11: false,
      website12: false,
      website13: false,
      website14: false,
      website15: false,
      website16: false,
      website17: false,
      website18: false,
      website19: false,
      website20: false,
      website21: false,
      website22: false,
      website23: false,
      website24: false,
      website25: false,
      website26: false,
      website27: false,
      website28: false,
      website29: false,
      website30: false,
      website31: false,
      website32: false,
      website33: false,
      website34: false,
    },
  },
  mutations: {
    setLocale: function (state, data) { //语言
      state.locale = data
    },
    getIsMobile: function (state, data) { //获取平台类型
      console.log('getIsMobile' + data)
      state.isMobile = data
    },
    getThemes: function (state, data) {
      state.themes = data
    },
    getBackdrop: function (state, data) {
      state.backdrop = data
    },
    getLoadingHome: function (state, data) {
      state.loadingHome = data
    },
    getNewAsyncData: function (state, data) {
      state.asyncLoadingData[data] = true
    },
    setNewAsyncData(state, data) {
      Object.assign(state.asyncLoadingData, data)
    },
    setScrollState(state, data) {
      state.asyncLoadingData.scrollState = data
    },
    clickData(state, data) {
      state.clickData = data
    },
    setHeadeSidebar(state, data) {
      state.hideSidebar = data[0]
      state.hideHeader = data[1]
    }
  },
  getters: { //获取到state的数据

  },
  actions: { //异步处理mutations的方法
    asyncLoadingData({ commit, state }, data) {
      commit('getNewAsyncData', data)
    },
    asyncLoadingDataAdd({ commit, state }, data) {
      commit('setNewAsyncData', data)
    }
  },
  modules: {
    tagsView,
    clickLike
  },
  // 传入配置后的插件实例

})

export default store;
