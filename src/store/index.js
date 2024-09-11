import Vue from 'vue'
import Vuex from 'vuex'
import getters from "@/store/getters";
import tagsView from "./modules/tagsView";
import clickLike from "./modules/clickLike";
import async_data from "./modules/async_data";
Vue.use(Vuex)

//配置数据持久化
//不能使用clickLike 中的map map因为 需要使用到数据持久化，json.stringify 无法格式化map数据




//https://segmentfault.com/a/1190000015782272
const store = () => new Vuex.Store({
  state: {
    locale:"zh-CN",//语言
    themes:'dark',
    backdrop:false,// 背景
    isMobile:false,
    clickData:[],
    token:'',
    loadingHome:false, //最大的loading首页
    hideSidebar:true, //当图片详情页面调用 v-viewer组件时隐藏侧导航，全部的侧边栏关闭
    sidebarOnOff:false, //侧栏打开显示 false为打开
    hideHeader:true, // header 显示与隐藏
    webBase:{}, //网站基础配置数据
    asyncLoadingData:{ //滚动加载进行处理
      scrollState:'',
      bulletin:false, //前四项是默认加载的
      gradeCoin:false,
      articless:false,
      myNav:false,
      hotslider:false,
      advert_groom:false, //广告赞助
      station_master:false,
      yellow_game:false,
      youth_Tv:false,
      tool_resource:false,
    },
    async_nuxt_Data:{ //异步获取数据
      bulletinData:[], //公告数据
    }
  },
  mutations:{
    setLocale:function(state,data){ //语言
      state.locale = data
    },
    getIsMobile:function(state,data){ //获取平台类型
      console.log('getIsMobile',data)
      state.isMobile = data
    },
    getThemes:function(state,data){
      state.themes = data
    },
    getBackdrop:function(state,data){
      state.backdrop = data
    },
    getLoadingHome:function (state,data){
      state.loadingHome = data
    },
    getNewAsyncData:function (state, data) {
      state.asyncLoadingData[data] = true
    },
    setNewAsyncData:(state,data)=>{
      Object.assign(state.asyncLoadingData,data)
    },
    setScrollState:(state,data)=>{
      state.asyncLoadingData.scrollState = data
    },
    clickData:(state,data)=>{
      state.clickData = data
    },
    setHeadeSidebar:(state,data)=>{
      state.hideSidebar = data[0]
      state.hideHeader = data[1]
    },
    ADD_GET_BASE_CONFIG: (state, data) => { //获取到基础配置数据
      state.themes = data.theme
      state.locale = data.languageDefault
      state.sidebarOnOff = !data.sidebar
      state.hideHeader = data.header
      delete data.theme
      delete data.languageDefault
      delete data.sidebar
      delete data.header
      state.webBase = { ...data }
    },
  },
  actions:{ //异步处理mutations的方法
    asyncLoadingData({commit,state},data){
      commit('getNewAsyncData',data)
    },
    asyncLoadingDataAdd({commit,state},data){
      commit('setNewAsyncData',data)
    },
    async addBaseConfig({ commit,state }, data) {

      if (!('cartoonRouter' in state.webBase)){
        const {common} = await this.$api.mutulal.getBaseList()
        if (Array.isArray(common.content) && common.content.length > 0){
          common.content = common.content[0]
        }
        commit('ADD_GET_BASE_CONFIG', common.content)
      }
    },

  },
  modules: {
    tagsView,
    clickLike,
    async_data
  },
  getters
  // 传入配置后的插件实例

})

export default store;
