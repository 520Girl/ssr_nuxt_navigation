<template>
   <div class="cartoon-container">
      <div class="cartoon-layout">
        <Row type="flex" justify="space-around" align="top" class-name="carousel-article">
          <Col :xxl="{ span: 5 }"  :lg="{span:8}"  :md="{span:24}"  class-name="comic-cover" style="z-index: 2">
            <div class="comic-cover-wrap">
<!--              <div class="image" data-cartoon="cartoon2" :style="'background:url('+'./static/images/cartoon/'+cartoonData.belongLogo1+'/'+cartoonData.imgUrl+') center center / cover no-repeat;'"></div>-->
              <div class="image" data-cartoon="cartoon2" v-lazy:background-image="'./static/images/cartoon/'+cartoonData.belongLogo1+'/'+cartoonData.imgUrl" ></div>
            </div>
          </Col>
          <Col :xxl="{ span: 13 }"  :lg="{span:16}"  :md="{span:24}"  class-name="comic-intro">
            <div class="comic-intro-wrap">
              <div class="intro-header auto-line-between">
                <div class="info">
                  <div class="title">
                    <h1 class="fontSize-text-colornoH">{{cartoonData.title}}</h1><span>每周六、每周日</span>
                  </div>
                  <p>
                    <span v-for="(item2,index2) in cartoonData.belongClass" :key="index2">{{item2}}</span>
                  </p>
                </div>

                <div class="graded">
                  <div
                    v-like="{title:cartoonData.title,type:'LL',id:cartoonData.belongLogo1,url:`/cartoon/${cartoonData.belongLogo1}?title=${cartoonData.title}`,belong:'cartoon'}"
                    v-if="cartoonData.scoreNum">
                    <Rate allow-half clearable :count="10" :max="10"
                          v-model="cartoonData.scoreNum.n"
                          @on-change="datasChange(cartoonData._id,$event)"
                          icon="md-flame"
                          style="font-size: 22px"
                          class="fontSize-like"></Rate>
                  </div>
                  <div class="graded-data ">
                    <div class="tips">

                    </div>
                    <div class="num" v-if="cartoonData.scoreNum">
                      <strong>{{cartoonData.scoreNum.n || 0}}</strong>
                      分
                    </div>
                    <div class="rated" v-if="cartoonData.scoreNum">
                      <strong>{{cartoonData.scoreNum.p || 0}}</strong>
                      人评论
                    </div>
                  </div>
                </div>
              </div>
              <article class="intro-explain">

              </article>
              <div class="intro-statistic">
                <h1 class="fontSize-text-colornoH">调戏一下漫画</h1>
                <div class="statistic-wrap">
                  <i class="before-i contents-bck "></i>
                  <i class="after-i contents-bck"></i>
                  <ul class="statistic">
                    <li :class="'item'+index2" v-for="(item2,index2) in cartoonData.evaluate" :key="index2">
                      <div class="icon">
                        <span>+1</span>
                      </div>
                      <div class="detail">
                        <span>{{item2.name}}</span>
                        <span>{{item2.num}}万</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
          <Col :xxl="{ span: 6 }"  :lg="{span:0}"  :md="{span:24}"  class-name="comic-aside">
            <div class="comic-aside-wrap contents-bck ">
              <h5 @click="handleIdea(1)">睚嗤</h5><h5 @click="handleIdea(2)">作者</h5>
              <div class="aside-header">
<!--                <img src="../assets/images/d3f513902a5b1471d55d3c7d9d2b508d.gif" alt="">-->
                <svg-icon name="gifTitle"></svg-icon>
                <div class="text overflow-eclipse">
                  <h6 class="overflow-eclipse">{{cartoonData.author}}</h6>
                  <p><span>介绍:</span>梦想可以有,就看你能不能实现了</p>
                </div>
              </div>
              <div class="aside-author">
                <div v-if="idea.zuoze" class="bd">
                  <div class="author-con">
                    <span class="con-title">漫画简介：</span>{{cartoonData.explain}}
                  </div>
                </div>
                <div v-if="idea.yazi" class="bd bd-2">
                  <div class="author-con">
                    <span class="con-title">idea：</span>给出你的想法,我会做到的~~~
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div class="cartoon-layout-wrap">
          <img :src="'./static/images/cartoon/'+cartoonData.belongLogo1+'/'+cartoonData.imgUrl" alt="" class="frontcover background-cover">
          <div class="wrap-mask"></div>
          <div  src="../assets/images/banner-bottom-radian.png" class="wrap-bc-header"></div>
          <Row type="flex" justify="center" align="top" class-name="carousel-article">
            <Col :xxl="{span:18}" :xl="{ span: 17 }" :lg="{span:17}" :md="{span:24}" :xs="{ span: 24 }" class-name="acgn-row catalog" >
              <div class="acgn-row-catalog">
                <div class="catalog-header auto-line-between">
                  <div class="header-left" v-if="cartonnNewCha">
                    <h2 class="fontSize-text-colornoH">目录</h2>
                    <span>{{$common().Format(cartonnNewCha.updateTime,'yyyy-MM-dd')}}</span>&nbsp&nbsp&nbsp
                    <router-link tag="a" :to="{path:`${$route.params.belong}/${cartonnNewCha.chapterId}`,query:{title:cartonnNewCha.name }}" >更新至 <em>{{cartonnNewCha.name}}</em></router-link>
                  </div>
                  <div class="header-right" v-if="cartoonData.section && cartoonData.section.length > 0">
<!--                    <span :class=" pageActive.show1 == 2? 'page-start applyBck page-active' : 'page-start applyBck'" @click="morechapters(cartoonData.section.slice(0,1)[0][0]+'-'+cartoonData.section.slice(0,1)[0][1]),pageActive.show1=2"><em>1-15</em></span>-->
                    <span :class=" pageActive.show1 == 2? 'page-start applyBck page-active' : 'page-start applyBck'" @click="getCartoonDetail($route.params.belong,1,15,0),pageActive.show1=2"><em>1-15</em></span>
                    <div class="page-more"  @mouseover="more=true" @mouseleave="moveHide(0)">
                      <span class="ift-diandianx">
                        <i></i>
                        <i></i>
                        <i></i>
                      </span>
                      <div class="more" v-show="more" @mouseover="moveHide(1)" @mouseleave="more=false">
                        <i class="triangle" ></i>
                        <ul class="more-ul" >
                          <li style="display: block;text-align: center;width: unset;" class="disabled fontSize-text-colornoH"
                              @click="morechapters(cartoonData.section.slice(0,1)[0][0]+'-'+cartoonData.section.slice(0,1)[0][1])"

                          >
                            {{cartoonData.section.slice(0,1)[0][0]+'-'+cartoonData.section.slice(0,1)[0][1]}}
                          </li>
<!--                          index2 + 1 是应为开头有未爬取的数据 为第一项数组 如果没有未爬取的数据就不用 +1-->
                          <li class="fontSize-text-orange" v-for="(item2,index2) in cartoonData.section.slice(1)" :key="index2" @click="getCartoonDetail($route.params.belong,1,15,index2+1)">{{item2[0]+'-'+item2[1]}}</li>
                        </ul>
                      </div>
                    </div>
                    <span :class="pageActive.show1 == 1 ? 'page-end applyBck page-active' : 'page-end applyBck'" @click="getCartoonDetail(),pageActive.show1=1"><em>最新15话</em></span>
                    <div class="swith-bar">
                      <span :class="{active:!pageActive.show2}" @click="pageActive.show2=false">文字</span>
                      <i>|</i>
                      <span  @click="pageActive.show2=true" :class="{active:pageActive.show2}">图文</span>
                    </div>
                  </div>
                </div>
                <div class="catalog-main">
                  <div class="wave-down"></div>
                  <div class="main">
                    <ol class="auto-line-start main-item">
                      <router-link tag="li" :to="{path:`${$route.params.belong}/${item2.chapterId}`,query:{title:item2.chapterName}}" class="main-chapter-item" v-for="(item2,index2) in cartoonData.content" :key="index2">
                        <div class="chapter-item-img" v-model="pageActive.show2" v-show="pageActive.show2">
<!--                          <img :src="'./static/cartoon/'+cartoonData.cartoonId+'/'+item2.chapterId+'/'+item2.imgUrl" :alt="item2.chaptername">-->
<!--                          <img src="/static/images/cartoon/test2.jpg" :alt="item2.chapterName">-->
                          <img v-lazy="'./static/images/cartoon/'+$route.params.belong+'/'+item2.chapterId+'/'+item2.imgUrl" data-cartoon="cartoon3" :alt="item2.chaptername">
                        </div>
                        <div class="name">
                          {{item2.chapterName}}
                        </div>
                      </router-link>
                    </ol>
                  </div>
                </div>
              </div>
            </Col>
            <Col :xxl="{span:6}" :xl="{ span: 7 }" :lg="{span:7}" :md="{span:0}" :xs="{ span: 0 }" class-name="acgn-row sidebarPro">
              <div class="acgn-row-sidebarPro">
                <div class="composite-nav auto-line-between">
                  <h1 class="nav-left fontSize-text-colornoH">
                    排行榜
                  </h1>
                  <div class="nav-right">
                    <span>周</span>&nbsp|
                    <span>日</span>&nbsp|
                    <span class="active">总</span>
                  </div>
                </div>
                <div class="composite-content">
                  <ol class="content-item">
                    <li
                      v-click-data="{name:item.title,id:item.belongLogo1,imgUrl:'./static/images/cartoon/'+item.belongLogo1+'/'+item.imgUrl,hrefUrl:`/cartoon/${item.belongLogo1}?title=${item.title}`,belong:'cartoon'}"
                      @click="allStart({status:1,_id:item.belongLogo1})"
                      class="content-item-li" v-for="(item,index) in compositeData"
                      :key="item.title" @mouseover="conpositeDataImgShow = index">
                      <div class="row-text auto-line-between" v-show="conpositeDataImgShow != index">
                        <div class="text-left">
                          <i :class="'icon icon'+index">{{index >=3 ? index+1: ''}}</i>
                          <span class="name">{{item.title}}</span>
                        </div>
                        <div class="hot-num">
                          {{item.orderBySumValue}}
<!--                          <Icon type="ios-paw" />-->
                          <Icon type="md-flame" size="16" color="red"/>
                        </div>
                      </div>
                      <div class="row-view" v-show="conpositeDataImgShow == index">
                        <div class="view-img">
                          <i :class="'view-img-rank'+(index >=3 ?3:index )">{{index >=3 ? index : '' }}</i>
                          <img src="//resource.mhxk.com/kanman_pc/static/images/comm/space.gif" alt="" class="background-cover" v-lazy:background-image="'./static/images/cartoon/'+item.belongLogo1+'/'+item.imgUrl" data-cartoon="cartoon4">
                        </div>
                        <div class="view-text auto-line-between">
                          <div class="text-left">
                            <h3 class="fontSize-text-colornoH">{{item.title}}</h3>
                            <p class="text-desc overflow-eclipse">{{item.explain}}</p>
                          </div>
                          <div class="text-right">
<!--                            {{item.orderBySumValue}}-->
                            <!--                          <Icon type="ios-paw" />-->
<!--                            <Icon type="ios-paw-outline" />-->
                          </div>
                        </div>

                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="start" align="top" class-name="carousel-article related">
            <Col :xxl="{span:18}" :xl="{ span: 19 }" :lg="{span:16}" :md="{span:24}" :xs="{ span: 24 }" class-name="comic-related">
<!--                <cartoon-related :cartoonRelated="cartoonRelated" @moreContent="moreContent" @allStart="allStart"></cartoon-related>-->
                <cartoon-related :cartoonRelated="cartoonRelated" @moreContent="moreContent"></cartoon-related>
              <div class="comic-guestbook">
                <cartoon-guestbook :commentsList="commentsList" :titleImg="cartoonData.imgUrl" :belong="cartoonData.belongLogo1" @pageSkip="getCommentsList($event)"></cartoon-guestbook>
              </div>
            </Col>
<!--            <Col :xxl="{span:6}" :xl="{ span: 5 }" :lg="{span:8}" :md="{span:0}" :xs="{ span: 0 }" >-->
<!--              这里猜你喜欢的内容区域-->
<!--            </Col>-->
<!--            -comment-->
          </Row>
        </div>
      </div>
    </div>
</template>
<script>
import headerNav from "@/components/common/headerNav"; //头部导航
import cartoonRelated from "@/components/pages/cartoon/cartoonRelated";
import cartoonGuestbook from "@/components/pages/comments/cartoonGuestbook";
import setting from "@/setting";
export default {
  head(){
    const {fullPath,meta} = this.$route;
    const {title:asyncData_title,explain:websiteInfo,belongLogo1,imgUrl:asyncData_imgUrl} = this.cartoonData
    const title = `${meta.title.slice(0,meta.title.indexOf(',')+1)}-${asyncData_title}的${meta.title.slice(meta.title.indexOf(',')+1)}`
    const description = `${meta.description.slice(0,meta.description.indexOf(',')+1)}${websiteInfo},${meta.description.slice(meta.description.indexOf(',')+1)}`
    const imgUrl = `${setting.website}/static/images/cartoon/${belongLogo1}/${asyncData_imgUrl}`
    return {
      title: title,
      meta: [
        {hid: 'description', name: 'description', content:description},
        {hid: 'keywords', name: 'keywords', content: title},
        {name:'twitter:url', property: 'og:url', content:`${setting.website}${fullPath}`},
        {name:'twitter:title', property: 'og:title', content:title},
        {name:'twitter:description', property: 'og:description', content:description},
        {name:'twitter:image', property: 'og:image', content: imgUrl},
      ]
    }
  },
  name: "Cartoon",
  components:{headerNav,cartoonRelated,cartoonGuestbook},
  middleware:'cartoon',
  async asyncData({$api,route}){
    let {cartoon} = await $api.cartoon.getCartoonDetail({id:route.params.belong,page:1,per_page:15,order:-1})
    cartoon = cartoon.content
    cartoon.contentL = cartoon.section
    const res = await $api.cartoon.getCartoon({per_page:6,page:1,order:-1})
    const cartoonRelated  = res.cartoon
    const {comment} =  await $api.user.getCommentsLists({per_page:5,order:-1, page:1, version:'O', order_type:0,id:route.params.belong})
    const compositeData = await $api.cartoon.getCartoonRanking({state:1})
    console.log('=======================ssss----s',cartoon)
    return {
      cartoonData:cartoon,
      cartoonRelated,
      commentsList:comment,
      compositeData:compositeData.cartoon.content,
    }
  },
  data(){
    return{
      valueDisabled:2.5,
      idea:{yazi:false,zuoze:true},
      more:false,
      compositeData:[1,2,3,4,5,6,7,8,9,10],
      conpositeDataImgShow:0,
      pageActive:{show1:1,show2:true},
      timer:'',
      cartoonData:{},//当前漫画数据
      cartonnNewCha:{},//最新章节数据
      cartoonRelated:{},//漫画相关数据
      commentsList: {}, //聊天室数据
      commentsVersion:'O', //app聊天版本
      chapters:[],//章节分页数据
      sort:0,//根据 0 热门，1 最新排序
    }
  },
  created() {
    // this.allStart({status:0})
    //! nuxt 数据重铸处理
    //!1. getCartoonDetai接口数据
    //1.4 对应最新章节数据，不根据接口的变化而变化
    if (!Object.keys(this.cartonnNewCha).length){
      this.cartonnNewCha = this.cartoonData.LChapters
    }
    //1.3将日活,这些数据一一对应
    let statisticData=[
      {name:"阅读",num:0,key:'re'}, {name:"日活",num:0,key:'da'},
      {name:"收藏",num:0,key:'co'}, {name:"分享",num:0,key:'sh'},
      {name:"留言",num:0,key:'me'},{name:"礼物",num:0,key:'gi'},
      {name:"赞赏",num:0,key:'ad'},{name:"月票",num:0,key:'mo'},
      {name:"萝卜",num:0,key:'ra'},{name:"评分",num:0,key:'so'}
    ];
    statisticData.some(item=>{
      item.num = this.cartoonData.evaluate[item.key]
    })

    //章节数据,arrShow section为页面显示的数据，arrHand sectionHand为请求时的数据，根据数据来的
    let [arrShow,arrHand,section] = [[],[],Number(this.cartoonData.section)]
    let z =0
    let subt = 0
    if (this.cartoonData.contentL !== section){
      subt = this.cartoonData.contentL- section
      arrShow.push([1,subt])
    }
    subt++
    for (let i = 1;i<=parseInt(section/14);i++){
      arrShow.push([subt,subt+14]);subt+=14;
      if ((i === 1 ) && (section%14 > 0) ){
        arrHand.push([z,section%14]);z+=(section%14);
      }else {
        arrHand.push([z,z+14]);z+=14;
      }
    }
    if (section%14 > 0){
      arrShow.push([subt,this.cartoonData.contentL])
      arrHand.push([z,section])
    }
    this.cartoonData.section = arrShow
    this.cartoonData.sectionHand = arrHand.reverse()
    this.cartoonData.evaluate = statisticData
  },
  mounted() {
    console.log('=======================ssss----s',this.cartoonData)
    console.log('=======================ssss----s2===',this.commentsList)
    this.setImgColor()
  },
  methods:{
    //start最先开始加载接口
    allStart(params){
      if (params.status === 0){
        Promise.all([this.getCartoonDetail(),this.getCartoon(),this.getCommentsList(),this.getCartoonRanking()]).then(([res1,res2,res3,res4])=>{
          this.setImgColor()
        })
      }else {
      if (params._id === this.$route.params.belong) {
        this.$Notice.close('woshinide')
        this.$Notice.warning({
          title: '提示',
          desc: '你选择是当前新闻',
          duration: 1,
          name: "woshinide"
          })
          return
        }
        this.$store.commit('getLoadingHome',true)
        this.$router.push('/cartoon/'+params._id)
        Promise.all([this.getCartoonDetail(params._id,),this.getCartoon(),
          this.getCommentsList(1,params._id)]).then(([res1,res2,res3])=>{
          this.setImgColor()
        })
      }
    },
    handleIdea(state){
      if (state === 1) {this.idea.yazi = true ;this.idea.zuoze=false}
      if (state === 2) {this.idea.zuoze = true ;this.idea.yazi=false}
    },
    // 详细信息，以及单页章节数据, 有 index 就表示请求的是章节数据
    getCartoonDetail(id=this.$route.params.belong,page=1,pageSize=15,index=''){
      return new Promise(resolve => {
        let params = {id:id,page:page,per_page:pageSize,order:-1}
        if (index >= 0 && typeof (index) == 'number'){
          params.start = this.cartoonData.sectionHand[index][0]
          params.end = this.cartoonData.sectionHand[index][1]
        }
        this.$api.cartoon.getCartoonDetail(params).then(res=>{
          if (res.status === 1){
            //1.2 表示请求的是章节数据就只更新内容
            if (params.start && params.start >0){
              this.$set(this.cartoonData,'content',res.cartoon.content.content)
              return
            }
              this.cartoonData = res.cartoon.content
              this.cartoonData.contentL = this.cartoonData.section
              //1.4 对应最新章节数据，不根据接口的变化而变化
              if (!Object.keys(this.cartonnNewCha).length){
                this.cartonnNewCha = this.cartoonData.LChapters
              }
              //1.3将日活,这些数据一一对应
              let statisticData=[
                {name:"阅读",num:0,key:'re'}, {name:"日活",num:0,key:'da'},
                {name:"收藏",num:0,key:'co'}, {name:"分享",num:0,key:'sh'},
                {name:"留言",num:0,key:'me'},{name:"礼物",num:0,key:'gi'},
                {name:"赞赏",num:0,key:'ad'},{name:"月票",num:0,key:'mo'},
                {name:"萝卜",num:0,key:'ra'},{name:"评分",num:0,key:'so'}
              ];
              statisticData.some(item=>{
                item.num = this.cartoonData.evaluate[item.key]
              })

              //章节数据,arrShow section为页面显示的数据，arrHand sectionHand为请求时的数据，根据数据来的
              let [arrShow,arrHand,section] = [[],[],Number(this.cartoonData.section)]
              let z =0
              let subt = 0
              if (this.cartoonData.contentL != section){
                subt = this.cartoonData.contentL- section
                arrShow.push([1,subt])
              }
              subt++
              for (let i = 1;i<=parseInt(section/14);i++){
                arrShow.push([subt,subt+14]);subt+=14;
                if ((i === 1 ) && (section%14 > 0) ){
                  arrHand.push([z,section%14]);z+=(section%14);
                }else {
                  arrHand.push([z,z+14]);z+=14;
                }
              }
              if (section%14 > 0){
                arrShow.push([subt,this.cartoonData.contentL])
                arrHand.push([z,section])
              }
              this.cartoonData.section = arrShow
              this.cartoonData.sectionHand = arrHand.reverse()
              this.cartoonData.evaluate = statisticData
              console.log( this.cartoonData)
              //
              return resolve()
          }
        })
      })
    },
    //加载热门漫画数据
    getCartoon(){
      return new Promise(resolve=>{
        this.$api.cartoon.getCartoon({per_page:6,page:1,order:-1}).then(res=>{
          if (res.status === 1){
            this.cartoonRelated = res.cartoon

            return resolve()
          }
        }).catch(error=>{
          console.warn(error)
          return resolve()
        })
      })

    },
    //离开元素元素隐藏
    moveHide(state){
      if (state === 0){
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{this.more = false},500)
        return
      }else if (state === 1){
        this.more = true
        clearTimeout(this.timer)
        return
      }
    },
    //请求聊天记录
    getCommentsList(newPage=[1,'heart'],id=this.$route.params.belong){
      console.log(newPage)
      return new Promise((resolve,reject) => {
        newPage[1] === 'new' ? this.sort = 1 : this.sort = 0
        let params = {
          per_page:5,order:-1,
          page:newPage[0],
          version:this.commentsVersion,
          order_type:this.sort,id:id
        }
        console.log(params)
        this.$api.user.getCommentsLists(params).then((res)=>{
          if (res.status == 1){
            this.commentsList = res.comment
            console.log(this.commentsList)
            return resolve()
          }
        }).catch((error)=>{
          console.warn(error)
          return reject()
        })
      })
    },
    //获取排行榜
    getCartoonRanking(state=1){
      return new Promise((resolve,reject)=>{
        this.$api.cartoon.getCartoonRanking({state:state}).then(res=>{
          console.log(res)
          this.compositeData = res.cartoon.content
          return resolve()
        })
      })
    },
    //更多
    moreContent(){
      this.$Notice.warning({title:'更多',desc:'还在开发中...',})
    },
    //数据还未爬取
    morechapters(data){
      this.$Notice.warning({title:'漫画',desc:`${data}还未爬取，如有需要请通知我！`,})
    },
    //颜色赋值
    setImgColor(){
      //      this.$common.rgbaster(`/static/cartoon/${this.cartoonData.belongLogo1}/${this.cartoonData.imgUrl}`,0.8,3).then(res=>{
      this.$common().rgbaster(`/static/images/cartoon/test1.jpg`,0.8,3).then(res=>{
        document.getElementsByTagName('body')[0].style.setProperty('--rgbaster', res.color[1]);
        document.getElementsByTagName('body')[0].style.setProperty('--rgbasterB', res.color[0]);
        document.getElementsByTagName('body')[0].style.setProperty('--rgbasterC', res.color[2]);
      })
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.$store.commit('getLoadingHome',false)
        },1000)
      })
    },
    //提交用户访问数据给服务器
    datasChange(item,event){
      this.$api.mutulal.getCUpvote({t:{"s":event},b:'ca',id:item,u:`/cartoon/${this.cartoonData.belongLogo1}?title=${this.cartoonData.title}`,tt:this.cartoonData.title})
    }
  },
  computed:{
    routerQuery(){
      return this.$route.params
    }
  },
  watch:{
    // routerQuery(newValue,oldVal){
    //   if (Object.keys(newValue).length === 0) return;
    //   if (newValue.id == oldVal.id) return;
    //   console.log('8',newValue)
    //   console.log(889,newValue.id,oldVal.id)
    //   this.allStart(1,{id:newValue.id,title:''})
    // }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/css/commonmMixin.scss"; //公共样式分享 相关内容栏 tool-header
@import "~@/assets/css/components/cartoon.scss";
@media screen and (min-width: 1600px) {
  ::v-deep .related-item{
    width: 20%;
  }
}
</style>
