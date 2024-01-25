// 1. 对各个点击事件做处理，出入点击数据方便后续使用
// 2. 数据格式为map, key为id ,值为belong:[DN,LL,HN,EN] 再使用md5 进行加密
//3. 因为需要数据持久化所以不使用map 使用二维数组，这样也可以转为map和JOSN.stringfiy

//4. 类型表
//DN 下载次数 ， LL 评星级 ， HN 点赞人数 ， EN 观看人数
//    [ ] downloadNum  下载次数//[ ]  likeLevel 评星级 取平均数//[ ]  heartNum 点赞人数//[ ] eyeNum 观看人数 可点击

const state = {
  app:[]
}
// arr1.map(i => {
//    	obj[arr1[i]] = arr2[i]
//   }) 作者：柚子讴歌 https://www.bilibili.com/read/cv10854829/ 出处：bilibili

const mutations = {
  ADD_CLICK_DATA:(state, data)=>{ //data 类型为 {title:'app',belong:'',id:''}
    let pushData = [data.id,[data.belong]]
    let index = -1
     state.app.some((item,i)=>{
       if(item.indexOf(data.id) > -1){
          index = i
          return true
       }
     })
    if (index > -1){
      if (!state.app[index][1].includes(data.belong)){
        state.app[index][1].push(data.belong)
      }
    }else state.app.push(pushData)
  }
}

const actions = {
  addData({dispatch,commit}, data){
    console.log(data)
    dispatch('askAddData', data)
    commit('ADD_CLICK_DATA', data)
  },
  //向接口请求添加数据
  askAddData({state}, data){

  }

}
// console.log(this.$store.getters['clickLike/appMapData'])
const getters = {
  appMapData(state){
    let map = new Map()
    state.app.map(item => {
      map.set(item[0],item[1])
    })
    return map
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  getters,
  actions
}
