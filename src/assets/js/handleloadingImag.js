

const baseUrl={
  image:'lazy/',
}
const base = {
  image:[ // 只有imge页面是反方向导入loading 图片的 使用字段data-image
    // {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.jpg`,},// 首页
    // {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.jpg`,},// 详情页
    // {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.jpg`,},// 详情页
    // {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.jpg`,},// 详情页
    // {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.jpg`,},// 导航页
    // {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.jpg`,},// 导航页
    {loading:`${baseUrl.image}loading.gif`, error:`${baseUrl.image}errorI0.jpg`,},// 首页
    {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.jpg`,},// 导航页
    {loading:`${baseUrl.image}loadingI2.jpg`, error:`${baseUrl.image}errorI2.jpg`,},// 详情页
    {loading:`${baseUrl.image}loadingI3.jpg`, error:`${baseUrl.image}errorI3.jpg`,},// 详情页
    {loading:`${baseUrl.image}loadingI4.jpg`, error:`${baseUrl.image}errorI4.jpg`,},// 详情页
    {loading:`${baseUrl.image}loadingI5.jpg`, error:`${baseUrl.image}errorI5.jpg`,},// 详情页
  ],
  app:[ //使用字段data-app
    // {loading:`${baseUrl.image}loadingA1.jpg`, error:`${baseUrl.image}errorA1.jpg`,},// 首页
    {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.png`,},// 首页
    {error:`${baseUrl.image}errorG2.png`},// 首页
  ],
  gradeCoin:[ // 使用字段data-grade
    {loading:`${baseUrl.image}loading.gif`, error:`${baseUrl.image}errorG1.png`,},// 首页
    {error:`${baseUrl.image}errorG2.png`},// 首页
  ],
  blog:[ // 使用字段data-blog
    {loading:`${baseUrl.image}loading.gif`, error:`${baseUrl.image}errorB1.png`,},// 首页
  ],
  article:[ // data-articles
    {loading:`${baseUrl.image}loading.gif`, error:`${baseUrl.image}errorG1.png`,},// 首页
    { error:`${baseUrl.image}errorG1.png`,},// 首页
    { error:`${baseUrl.image}errorG1.png`,},// 首页
    { error:`${baseUrl.image}errorA4.png`,},// 首页
  ],
  cartoon:[ // data-articles
    {loading:`${baseUrl.image}loading.gif`, error:`${baseUrl.image}errorC1.jpg`,},//首页
    { error:`${baseUrl.image}errorC2.jpg`,},// 导航页
    { error:`${baseUrl.image}errorC3.png`,},// 导航页
    {error:`${baseUrl.image}errorC2.jpg`,},// 导航页
    { error:`${baseUrl.image}errorC2.jpg`,},// 详情
    { error:`${baseUrl.image}errorC6.png`,},// 详情
  ],
  hotWeb:[ // data-articles
    {loading:`${baseUrl.image}loading.gif`, error:`${baseUrl.image}errorH1.png`,},
  ]
}

//weightFilters 过滤 图片地址
const weightFilters = (url,belong)=>{
  let newUrl = ''
  // if (/(http|https)/.test(newUrl)){
  //   // let newUrl = url.substring(url.lastIndexOf('/'))
  // }else {
  //   newUrl = url.substring(url.lastIndexOf('/'))
  // }

  // let newUrl = url.split(belong)[1]

  if (/\.(jpg|png|gif|jpeg|svg)$/.test(url) && /^(http|https)/.test(url)) {
    //去掉可能存在的belong数字 src="/static/images/website/1909/55323.100.png"
    if (url.indexOf('http') > -1){
      url = url.slice(url.lastIndexOf('http'))
    }
    return url
  } else if (/\.(jpg|png|gif|jpeg)$/.test(newUrl)) {
    url = url.replace(/^\.\//, '/')
    if (process.env.NODE_ENV === 'production'){
      return url
    }
    return '_nuxt'+url
  }
  url = url.replace(/^\.\//, '/')
  if (process.env.NODE_ENV === 'production'){
    return url
  }
  return '_nuxt'+url
}

const handleAppLoading = (value,listener)=>{
  listener.src = weightFilters(listener.src,'app')
  switch (value){
    case 'app1':
      listener.loading = base.app[0].loading
      listener.error = base.app[0].error
      break;
    case 'app2':
      listener.loading = base.app[0].loading
      listener.error = base.app[0].error
      break;
  }
}
const handleBlogLoading = (value,listener)=>{
  listener.src = weightFilters(listener.src,'blog')
  switch (value){
    case 'blog1':
      listener.loading = base.blog[0].loading
      listener.error = base.blog[0].error
      break;
  }
}
const handleGradeLoading = (value,listener)=>{
  listener.src = weightFilters(listener.src,'gradeCoin')
  switch (value){
    case 'gradeCoin1':
      listener.loading = require(`@static/${base.gradeCoin[0].loading}`)
      listener.error = require(`@static/${base.gradeCoin[0].error}`)
      break;
    case 'gradeCoin2':
      listener.loading = require(`@static/${base.gradeCoin[0].loading}`)
      listener.error = require(`@static/${base.gradeCoin[1].error}`)
      break;
  }
}
const handleArticleLoading = (value,listener)=>{
  listener.src = weightFilters(listener.src,'article')
  switch (value){
    case 'article1':
      listener.loading = require(`@static/${base.article[0].loading}`)
      listener.error = require(`@static/${base.article[0].error}`)
      break;
    case 'article2':
      listener.loading = require(`@static/${base.article[0].loading}`)
      listener.error = require(`@static/${base.article[1].error}`)
      break;
    case 'article3':
      listener.loading = require(`@static/${base.article[0].loading}`)
      listener.error =require(`@static/${ base.article[2].error}`)
      break;
    case 'article4':
      listener.loading = require(`@static/${base.article[0].loading}`)
      listener.error = require(`@static/${base.article[3].error}`)
      break;
  }
}
const handleHotWebLoading = (value,listener)=>{
  listener.src = weightFilters(listener.src,'website')
  switch (value){
    case 'hotWeb1':
      listener.loading = require(`@static/${base.hotWeb[0].loading}`)
      listener.error = require(`@static/${base.hotWeb[0].error}`)
      break;
  }
}
const handleCartoonLoading = (value,listener)=>{
  listener.src = weightFilters(listener.src,'cartoon')
  switch (value){
    case 'cartoon1':
      listener.loading = require(`@static/${base.cartoon[0].loading}`)
      listener.error = require(`@static/${base.cartoon[0].error}`)
      break;
    case 'cartoon2':
      listener.loading = require(`@static/${base.cartoon[0].loading}`)
      listener.error = require(`@static/${base.cartoon[1].error}`)
      break;
    case 'cartoon3':
      listener.loading = require(`@static/${base.cartoon[0].loading}`)
      listener.error = require(`@static/${base.cartoon[2].error}`)
      break;
    case 'cartoon4':
      listener.loading = require(`@static/${base.cartoon[0].loading}`)
      listener.error = require(`@static/${base.cartoon[3].error}`)
      break;
    case 'cartoon5':
      listener.loading = require(`@static/${base.cartoon[0].loading}`)
      listener.error = require(`@static/${base.cartoon[4].error}`)
      break;
    case 'cartoon6':
      listener.loading = require(`@static/${base.cartoon[0].loading}`)
      listener.error = require(`@static/${base.cartoon[5].error}`)
      break;
  }
}
const handleImageLoading = (value,listener)=>{
  listener.src = weightFilters(listener.src,'image')
  switch (value){
    case 'image1':
      listener.loading = require(`@static/${base.image[0].loading}`)
      listener.error = require(`@static/${base.image[0].error}`)
      break;
    case 'image2':
      listener.loading = require(`@static/${base.image[1].loading}`)
      listener.error = require(`@static/${base.image[1].error}`)
      break;
    case 'image3':
      listener.loading = require(`@static/${base.image[2].loading}`)
      listener.error = require(`@static/${base.image[2].error}`)
      break;
    case 'image4':
      listener.loading = require(`@static/${base.image[3].loading}`)
      listener.error = require(`@static/${base.image[3].error}`)
      break;
    case 'image5':
      listener.loading = require(`@static/${base.image[4].loading}`)
      listener.error =require(`@static/${base.image[4].error}`)
      break;
  }
}


const imgUrl = (listener)=>{
  //image
  let dataValueImg = listener.el.getAttribute('data-image')
  if (dataValueImg){
    handleImageLoading(dataValueImg,listener)
    return
  }
  //hotWeb
  let hotWeb = listener.el.getAttribute('data-hotWeb')
  if (hotWeb){
    handleHotWebLoading(hotWeb,listener)
  }
  //cartoon
  let cartoon = listener.el.getAttribute('data-cartoon')
  if (cartoon){
    handleCartoonLoading(cartoon,listener)
  }
  //app
  let app = listener.el.getAttribute('data-app')
  if (app){
    handleAppLoading(app,listener)
    return
  }

  //blog
  let blog = listener.el.getAttribute('data-blog')
  if (blog){
    handleBlogLoading(blog,listener)
    return
  }

  //gradeCoin
  let gradeCoin = listener.el.getAttribute('data-grade')
  if (gradeCoin){
    handleGradeLoading(gradeCoin,listener)
    return
  }

  let article = listener.el.getAttribute('data-article')
    if(article){
      handleArticleLoading(article,listener)
    }

}

export default imgUrl
