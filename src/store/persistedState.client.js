import createPersistedState from 'vuex-persistedstate'
//https://blog.csdn.net/m0_56590688/article/details/134062578
//https://www.jb51.net/article/242763.htm
export default ({ store }) => {
  createPersistedState({
    key: 'my-app'
  })(store)
}