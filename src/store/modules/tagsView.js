// 1. 对缓存的标签进行处理
// 2. 对访问过的标签进行处理

const getDefaultState = () =>{
  return {
    visitedViews: [], // 用户访问的页面
    cachedViews: [] // 用户需要缓存的页面
  }
}

const state = {
  visitedViews: [], // 用户访问的页面
  cachedViews: [] // 用户需要缓存的页面
}

const mutations = {
  ADD_VISITED_VIEW:(state, view)=>{
    if (state.visitedViews.some(v => v.fullPath === view.fullPath)) return
    state.visitedViews.push(
      Object.assign({}, view,{
        matched:'',
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_CACHED_VIEW:(state, view)=>{
    if(state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache){
      matched:'',
      state.cachedViews.push(view.name)
    }
  },
  DEL_VISITED_VIEW:(state, view)=>{
    for (const [i,v] of state.visitedViews.entries()){
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW:(state, view)=>{
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  }

}

const actions = {
  addView({dispatch}, view){
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}

