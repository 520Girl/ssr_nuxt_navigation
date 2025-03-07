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
        }else if (item.belong === "visit"){
          if (!/(http|https|ftp)/.test(item)){
            return {url:`/${item}?title=${setting.website}`};
          }else{
            return {url:item,target:'_blank'}
          }
        }else{
          return {url:`/${item.belong}/${item.belongId}?title=${item.title}`}
        }
      }
    },
    // 图片地址
    imgUrl(){
      return(url,type='public',id='')=>{
        if (/\.(jpg|png|gif|jpeg|svg)$/.test(url) && /^(http|https|ftp)/.test(url)){
          return url;
        }else {
          // if (process.env.NODE_ENV === 'development'){
          //   return `_nuxt/static/images/${type}/` + url;
          // }else{
          //   return `/static/images/${type}/` + url;
          // }
          if (process.env.NODE_ENV === 'development'){
            return id === '' ? `/${type}/` + url : `/${type}/${id}/` + url;
          }else{
            return id === '' ? `${setting.website}/static/images/${type}/` + url : `${setting.website}/static/images/${type}/${id}/` + url;
          }
        //   return `${setting.website}/static/images/${type}/` + url;
        }
      }
    },
    //懒加载图片的src
    // lazyImgUrl(){
    //   return(url,type='',id='')=>{
    //     if (/\.(jpg|png|gif|jpeg|svg)$/.test(url) && /^(http|https|ftp)/.test(url)){
    //       return url;
    //     }else if (id !== '' && type !== ''){
    //       return `/static/images/${type}/${id}/${url}`;
    //     }else{
    //       return `/static/images/${type}/${url}`;
    //     }
    //   }
    // }
  }
}
