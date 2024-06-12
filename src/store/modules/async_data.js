

const state = {
  bulletinData: [],
  hotAppData:{content:[]},// 热门APP数据
  hotComicData:[],// 热门漫画数据
  allLike:[],// 加载热门图片数据
  hotWebData:[],// 热门网站数据
  newWebData:[],// 最新网站数据
  oneLevelWebsite:[],
  websiteData:[]
}

const mutations= {
  ASYNC_BULLETIN_DATA: (state, data) => { //异步获取公告数据
    state.bulletinData = data
  },
  ASYNC_HOT_APP_DATA: (state, data) => { //异步获取热门APP数据
    state.hotAppData = data
  },
  ASYNC_ONE_LEVEL_WEBSITE_DATA: (state, data) => { //异步获取热门APP数据
    state.oneLevelWebsite = data
  },
  ASYNC_WEBSITE_DATA: (state, data) => { //异步获取热门APP数据
    state.websiteData = data
  },
  ASYNC_HOT_COMIC_DATA: (state, data) => { //异步获取热门漫画数据
    state.hotComicData = data
  },
  ASYNC_ALL_LIKE: (state, data) => { //异步获取热门图片数据
    state.allLike = data
  },
  ASYNC_HOT_WEB_DATA: (state, data) => { //异步获取热门网站数据
    state.hotWebData = data
  },
  ASYNC_NEW_WEB_DATA: (state, data) => { //异步获取最新网站数据
    state.newWebData = data
  }
}

const actions ={
  async actions_bulletinData({ commit,state }, data){
    const res = await this.$api.bulletin.getBulletin( {pre_page: 4})
    commit('ASYNC_BULLETIN_DATA', res.bulletin.content)
  },
  async actions_hotAppData({ commit,state }, data){
    const hotAppData =  await this.$api.appList.getAppLists({per_page:12,order:-1,page:1})
    commit('ASYNC_HOT_APP_DATA', hotAppData.app)
  },
  async actions_hotComicData({ commit,state }, data){
    const res = await this.$api.cartoon.getCartoon({per_page:12,page:1,order:-1})
    commit('ASYNC_HOT_COMIC_DATA', res.cartoon.content)
  },
  async actions_allLike({ commit,state }, data){
    const res = await this.$api.image.getImage({level:1,per_page:12,page:1,belong:''})
    commit('ASYNC_ALL_LIKE', res.image.content)
  },
  async actions_hotWebData({ commit,state }, data){
    const res = await this.$api.webSite.getWebsiteHNItem({belong:data,per_page:24})
    if (data === 'h'){
      commit('ASYNC_HOT_WEB_DATA', res.website.content)
    }else{
      commit('ASYNC_NEW_WEB_DATA', res.website.content)
    }
  },
  async actions_oneLevelWebsite({ commit,state }, data){
    const res = await this.$api.webSite.getWebsiteOne()
    commit('ASYNC_ONE_LEVEL_WEBSITE_DATA',res.website.content)
  },
  async actions_website({ commit,state }, data){
    const res = await this.$api.webSite.getWebsite({page:0,per_page:8,belong:'',order:-1,num:20})
    commit('ASYNC_WEBSITE_DATA',res.website.content)
  }
}
const getters ={
  bulletinData: state => state.bulletinData
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
