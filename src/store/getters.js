import setting from '@/setting'

const getters = {
  asyncLoadingData: state => state.asyncLoadingData,
  webBase: state => state.webBase,
  isMobile: state => state.isMobile,
  logoUrl: state => state.webBase.logoUrl,
  mobileLogo: state =>  state.webBase.mobileLogo,
  website: state =>  state.webBase.url,
  title: state =>  state.webBase.title || setting.title,
  hotslider: state =>  state.webBase.hotslider,
  hotsliderDefault: state =>  state.webBase.hotsliderDefault,
  cartoonRouter: state =>  state.webBase.cartoonRouter,
  imageRouter: state =>  state.webBase.imageRouter,
  pageLayout: state =>  state.webBase.pageLayout,
  blogAuthor: state =>  state.webBase.blogAuthor,

}
export default getters
