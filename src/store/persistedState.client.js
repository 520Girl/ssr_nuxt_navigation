import VuexPersistence from 'vuex-persist'
import * as Cookies from "js-cookie";
//https://blog.csdn.net/m0_56590688/article/details/134062578
//https://www.jb51.net/article/242763.htm

//引入js-cookilet
const cookieStorage = {
  getItem: function (key) {
    return Cookies.getJSON(key);
  },
  setItem: function (key, value) {
    return Cookies.set(key, value, { expires: 3, secure: false });
  },
  removeItem: function (key) {
    return Cookies.remove(key);
  }
};
export default ({ app, store }) => {
  if(process.client){
    new VuexPersistence({
      key: 'nuxt_navai_vip',
      storage: window.localStorage,
      modules:['clickLike','tagsView','async_data'],
      reducer(state) {
        return {
          clickLike: state.clickLike,
          tagsView: state.tagsView,
          async_data: state.async_data,
          themes: state.themes,
          locale: state.locale,
          loadingHome: state.loadingHome,
          isMobile: state.isMobile,
          hideSidebar: state.hideSidebar,
          hideHeader: state.hideHeader,
          clickData: state.clickData,
          backdrop: state.backdrop,
          webBase: state.webBase,
          sidebarOnOff: state.sidebarOnOff,
        }
      }
    }).plugin(store)
  }

}
