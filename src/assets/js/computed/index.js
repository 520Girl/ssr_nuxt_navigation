import setting from '@/setting'
export default {
  // 计算属性
  computed: {
    hrefUrl() {
      return(item)=>{
        if (typeof item !== 'object'){
          if (!/(http|https|ftp)/.test(item)){
            return {url:`/${item}?title=${setting.website}`};
          }else{
            return {url:item,target:'_blank'}
          }
        } else if (item.belong === 'news' || item.belong === 'website'){
          return {url:item.belongId,target:'_blank'}
        }else if (item.belong === "slide"){
          return {url:item.hrefUrl,target:'_blank'}
        }else{
          return {url:`/${item.belong}/${item.belongId}?title=${item.title}`}
        }
      }
    },
    // 图片地址
    imgUrl(){
      return(url,type='article')=>{
        if (/\.(jpg|png|gif|jpeg|svg)$/.test(url) && /^(http|https|ftp)/.test(url)){
          return url;
        }else {
          // if (process.env.NODE_ENV === 'development'){
          //   return `_nuxt/static/images/${type}/` + url;
          // }else{
          //   return `/static/images/${type}/` + url;
          // }
          return `${type}/` + url
        //   return `${setting.website}/static/images/${type}/` + url;
        }
      }
    }
  }
}
