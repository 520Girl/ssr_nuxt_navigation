

const baseUrl = {
  image: '@@/static/lazy/',
  loadingFormat: '.gif',
  errorFormat: '.jpg',
}
const base = {
  image: [ // 只有imge页面是反方向导入loading 图片的 使用字段data-image
    // {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.jpg`,},// 首页
    // {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.jpg`,},// 详情页
    // {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.jpg`,},// 详情页
    // {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.jpg`,},// 详情页
    // {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.jpg`,},// 导航页
    // {loading:`${baseUrl.image}loadingI1.jpg`, error:`${baseUrl.image}errorI1.jpg`,},// 导航页
    { loading: `${baseUrl.image}loadingI1${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorI1${baseUrl.errorFormat}`, },// 导航页
    { loading: `${baseUrl.image}loadingI2${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorI2${baseUrl.errorFormat}`, },// 详情页
    { loading: `${baseUrl.image}loadingI3${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorI3${baseUrl.errorFormat}`, },// 详情页
    { loading: `${baseUrl.image}loadingI4${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorI4${baseUrl.errorFormat}`, },// 详情页
    { loading: `${baseUrl.image}loadingI5${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorI5${baseUrl.errorFormat}`, },// 详情页
  ],
  app: [ //使用字段data-app
    // {loading:`${baseUrl.image}loadingA1${baseUrl.errorFormat}`, error:`${baseUrl.image}errorA1${baseUrl.errorFormat}`,},// 首页
    { loading: `${baseUrl.image}loadingI1${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorI1${baseUrl.errorFormat}`, },// 首页
  ],
  gradeCoin: [ // 使用字段data-grade
    { loading: `${baseUrl.image}loadingG1${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorG1${baseUrl.errorFormat}`, },// 首页
  ],
  blog: [ // 使用字段data-blog
    { loading: `${baseUrl.image}loadingB1${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorB1${baseUrl.errorFormat}`, },// 首页
  ],
  article: [ // data-articles
    { loading: `${baseUrl.image}loadingAr1${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorAr1${baseUrl.errorFormat}`, },// 首页
    { loading: `${baseUrl.image}loadingAr2${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorAr2${baseUrl.errorFormat}`, },// 首页
    { loading: `${baseUrl.image}loadingAr3${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorAr3${baseUrl.errorFormat}`, },// 首页
  ],
  cartoon: [ // data-articles
    { loading: `${baseUrl.image}loadingC1${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorC1${baseUrl.errorFormat}`, },//首页
    { loading: `${baseUrl.image}loadingC2${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorC2${baseUrl.errorFormat}`, },// 导航页
    { loading: `${baseUrl.image}loadingC3${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorC3${baseUrl.errorFormat}`, },// 导航页
    { loading: `${baseUrl.image}loadingC4${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorC4${baseUrl.errorFormat}`, },// 导航页
    { loading: `${baseUrl.image}loadingC5${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorC5${baseUrl.errorFormat}`, },// 详情
  ],
  hotWeb: [ // data-articles
    { loading: `${baseUrl.image}loadingH1${baseUrl.loadingFormat}`, error: `${baseUrl.image}errorH1${baseUrl.errorFormat}`, },
  ]
}

//weightFilters 过滤 图片地址
const weightFilters = (url, belong) => {
  url = String(url)
  let newUrl = url.split(belong)[1]
  if (/\.(jpg|png|gif|jpeg|svg)$/.test(newUrl) && /^(http|https)/.test(newUrl)) {
    return newUrl
  } else if (/\.(jpg|png|gif|jpeg)$/.test(newUrl)) {
    return url
  }
  return url
}

const handleAppLoading = (value, listener) => {
  listener.src = weightFilters(listener.src, 'app')
  switch (value) {
    case 'app1':
      listener.loading = require(`${base.app[0].loading}`)
      listener.error = base.app[0].error
      break;
  }
}
const handleBlogLoading = (value, listener) => {
  listener.src = weightFilters(listener.src, 'blog')
  switch (value) {
    case 'blog1':
      listener.loading = require(`${base.blog[0].loading}`)
      listener.error = require(`${base.blog[0].error}`)
      break;
  }
}
const handleGradeLoading = (value, listener) => {
  listener.src = weightFilters(listener.src, 'gradeCoin')
  switch (value) {
    case 'gradeCoin1':
      listener.loading = 'https://tse1-mm.cn.bing.net/th/id/OIP-C.uImWA3-t09EJOU73pgCzkAHaHa?rs=1&pid=ImgDetMain'
      // listener.loading = base.gradeCoin[0].loading
      // listener.error = base.gradeCoin[0].error
      listener.error = 'https://img.zcool.cn/community/01ee4e58d67811a801219c77fe6166.jpg@1280w_1l_2o_100sh.jpg'
      break;
  }
}
const handleArticleLoading = (value, listener) => {
  listener.src = weightFilters(listener.src, 'article')
  switch (value) {
    case 'article1':
      listener.loading = base.article[0].loading
      listener.error = base.article[0].error
      break;
    case 'article2':
      listener.loading = base.article[1].loading
      listener.error = base.article[1].error
      break;
    case 'article3':
      listener.loading = base.article[2].loading
      listener.error = base.article[2].error
      break;
  }
}
const handleHotWebLoading = (value, listener) => {
  listener.src = weightFilters(listener.src, 'hotWeb')
  switch (value) {
    case 'hotWeb1':
      listener.loading = base.hotWeb[0].loading
      listener.error = base.hotWeb[0].error
      break;
  }
}
const handleCartoonLoading = (value, listener) => {
  listener.src = weightFilters(listener.src, 'cartoon')
  switch (value) {
    case 'cartoon1':
      listener.loading = base.cartoon[0].loading
      listener.error = base.cartoon[0].error
      break;
    case 'cartoon2':
      listener.loading = base.cartoon[1].loading
      listener.error = base.cartoon[1].error
      break;
    case 'cartoon3':
      listener.loading = base.cartoon[2].loading
      listener.error = base.cartoon[2].error
      break;
    case 'cartoon4':
      listener.loading = base.cartoon[3].loading
      listener.error = base.cartoon[3].error
      break;
    case 'cartoon5':
      listener.loading = base.cartoon[4].loading
      listener.error = base.cartoon[4].error
      break;
  }
}
const handleImageLoading = (value, listener) => {
  listener.src = weightFilters(listener.src, 'image')
  switch (value) {
    case 'image1':
      listener.loading = base.image[0].loading
      listener.error = base.image[0].error
      break;
    case 'image2':
      listener.loading = base.image[1].loading
      listener.error = base.image[1].error
      break;
    case 'image3':
      listener.loading = base.image[2].loading
      listener.error = base.image[2].error
      break;
    case 'image4':
      listener.loading = base.image[3].loading
      listener.error = base.image[3].error
      break;
    case 'image5':
      listener.loading = base.image[4].loading
      listener.error = base.image[4].error
      break;
  }
}


const imgUrl = (listener) => {
  //image
  let dataValueImg = listener.el.getAttribute('data-image')
  if (dataValueImg) {
    handleImageLoading(dataValueImg, listener)
    return
  }
  //hotWeb
  let hotWeb = listener.el.getAttribute('data-hotWeb')
  if (hotWeb) {
    handleHotWebLoading(hotWeb, listener)
  }
  //cartoon
  let cartoon = listener.el.getAttribute('data-cartoon')
  if (cartoon) {
    handleCartoonLoading(cartoon, listener)
  }
  //app
  let app = listener.el.getAttribute('data-app')
  if (app) {
    handleAppLoading(app, listener)
    return
  }

  //blog
  let blog = listener.el.getAttribute('data-blog')
  if (blog) {
    handleBlogLoading(blog, listener)
    return
  }

  //gradeCoin
  let gradeCoin = listener.el.getAttribute('data-grade')
  if (gradeCoin) {
    handleGradeLoading(gradeCoin, listener)
    return
  }

  let article = listener.el.getAttribute('data-article')
  if (article) {
    handleArticleLoading(article, listener)
  }

}

export { weightFilters, imgUrl } 
