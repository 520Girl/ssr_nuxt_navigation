import axios from "axios";
import setting from "../setting"
import {indexOf} from "core-js/internals/array-includes";
let baseUrl = process.env.HOST_API+"api/common/routerList"
// let baseUrl = "http://localhost:3000/api/common/routerList"
const router =[
  {url:'sitemap/blog.xml',type:'blog',per_page:5,status:2},
  {url:'sitemap/app.xml',type:'app',per_page:5,status:3},
  {url:'sitemap/website.xml',type:'website',per_page:5,status:3},
  {url:'sitemap/gradeCoin.xml',type:'gradeCoin',per_page:5,status:3},
  {url:'sitemap/cartoon.xml',type:'cartoon',per_page:5,status:2},
  // {url:'sitemap/image.xml',type:'image',per_page:5,status:3},
]
export default async function getRouterList(){
  try{
  const base_sitemaps_child = {
    changefreq: "daily",
    lastmod: new Date(),
    priority: 0.8,
  }
  const sitemaps = [
    {hostname: setting.website,
      path: 'sitemap/index.xml',
      cacheTime: 1000 * 60 * 60 * 24,
      gzip: true,
      generate: false,
      defaults: {
        changefred: "always",
        lastmod: new Date(),
        priority: 0.8,
      },
      routes:[
      ]
    },
  ]
  //! 获取去配置默认路由,添加
  const routes_default = [
    {url:'/',priority:1},
    {url:'/embody',priority:0.7},
    {url:'/rank',priority:0.8},
    {url:'/advertising',priority:0.7},
    {url:'/about',priority:1},
    {url:'/fanzhazhongxin',priority:0.1},
    {url:'/free-ai-industry-reports',priority:0.7},
    {url:'/reciprocal-project',priority:0.7},
    {url:'/business',priority:0.5},
    {url:'/disclaimer',priority:0.5},
    {url:'/deleteinformation',priority:0.5},
  ]
  routes_default.forEach(item => {
    sitemaps[0].routes.push({
      url:item.url,
      changefreq: "daily",
      lastmod: new Date(),
      priority: item.priority,
    })
  })

  const sitemap = {
      hostname: setting.website,
      path: '',
      cacheTime: 1000 * 60 * 60 * 24,
      gzip: true,
      generate: false,
      defaults: {
        changefred: "always",
        lastmod: new Date(),
        priority: 0.8,
      },
      // sitemaps:[],
      // routes:[]
    }

  for(let i=0;i<router.length;i++){
    sitemap.path = router[i].url
    const {data} = await axios.get(`${baseUrl}?type=${router[i].type}&per_page=${router[i].per_page}`)
    if (data.status === 1){
      const content = data.common.content
      const sitemap_childer = JSON.parse(JSON.stringify(sitemap))
      if(router[i].status === 2){
        sitemap_childer.sitemaps = []
        content.forEach(item => { //! 二级路由
          let route = {}
          route.path = item.url
          route.routes = []
          if (item.TUrl && item.TUrl.length > 0){ //! 三级详情
            route.routes.push(...item.TUrl.map(item2=>({
              ...base_sitemaps_child,
              url: item2.url,
            })))
          }
          sitemap_childer.sitemaps.push(route)
        })
      }else{
        sitemap_childer.routes = []
        content.forEach(item => { //! 三级路由
          sitemap_childer.routes.push({
            ...base_sitemaps_child,
            url: item.url,
          })
        })
      }
      sitemaps.push(sitemap_childer)
    }

  }
  // console.log('Generated sitemaps:', JSON.stringify(sitemaps, null, 2));
  return sitemaps;
} catch (error) {
  console.error('Error generating sitemap:', error);
  throw error;
}
}


// export default async function sitemap_fun() {
//   return [
//     {
//       path: '/',
//       lastmod: new Date().toISOString(),
//     },
//   ];
// }
