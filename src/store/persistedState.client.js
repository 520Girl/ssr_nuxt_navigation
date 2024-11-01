import createPersistedState from 'vuex-persistedstate'
import * as Cookies from "js-cookie";
//https://blog.csdn.net/m0_56590688/article/details/134062578
//https://www.jb51.net/article/242763.htm

//引入js-cookilet
const cookieStorage = {
  getItem: function(key) {
    return Cookies.getJSON(key);
  },
  setItem: function(key, value) {
    return Cookies.set(key, value, {expires: 3, secure: false});
  },
  removeItem: function(key) {
    return Cookies.remove(key);
  }
};
export default ({app, store }) => {
  createPersistedState({
    key: 'nuxt_navai_vip',
    reducer(state) {
      return {
        clickLike: state.clickLike,
        themes: state.themes,
        locale: state.locale,
        loadingHome: state.loadingHome,
        isMobile: state.isMobile,
        hideSidebar: state.hideSidebar,
        hideHeader: state.hideHeader,
        clickData: state.clickData,
        backdrop: state.backdrop,
        webBase: state.webBase,
        sidebarOnOff:state.sidebarOnOff,
      }
    }
  })(store)
}
