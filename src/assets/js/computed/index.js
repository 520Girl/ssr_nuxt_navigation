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
    }
  }
}
