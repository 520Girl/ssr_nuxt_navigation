const base={
  //hotAPPList接口

  getAppLists:'app', //获取app条数
  getAppDetail:'app/detail', //获取app的信息信息
  getAppListsHeartNum:'app/heart',//点赞最多的app
  getAppCountData:'app/count',//app中获取网站信息统计

  //gradeicon app  blog评分网站 commentsList 接口 留言接口
  getCommentsLists:'comment/get', //获取留言
  setCommentsLists:'comment/set',//添加留言

  // //app commentsList 接口， 留言接口
  // getCommentsListsA:'commentsListsA/get',
  // setCommentsListsA:'commentsListsA/set',
  //
  // // commentsList 接口， 留言接口
  // getCommentsListsB:'commentsListsB/get',
  // setCommentsListsB:'commentsListsB/set',

  //提交访问信息
  setUserInfo:'userInfo',
  getUserInfo:'user/oneself',//app获取用户admin信息
  getUserInfoB:'user/oneselfB',//获取blog用户信息

  //查询blog数据
  getBlogLists:'blog',
  getBlogDetailedInfo:'blog/detail',
  getBlogHot:'blog/heart', //获取blog中热门文章，热评文章数据

  //查询gradeCoin 数据
  getGradeCoin:'gradeCoin', //获取 gradeCoin 多少条
  getGradeCoinDetail:'gradeCoin/detail', // 获取详细信息

  //查询websit 数据
  getWebsite:'website',

  //查询漫画
  getCartoon:'cartoon',
  getCartoonDetail:'cartoon/detail', //获取漫画章节内容
  getCartoonChapters:'cartoon/chapters', //获取漫画全部章节数据
  getCartoonRanking:'cartoon/ranking',

  //查询图片images
  getImage:'image',// 通过等级判断获取
  getImageDetail:'image/Detail',//获取图片信息数据

  //获取公告
  getBulletin:'bulletin',

  //获取轮播
  getSlide:'slide'
}

export default base
