<template>
<!--    <header-nav >-->
  <div class="app-container contents-bck">
    <grade-background slot="main"></grade-background>
    <div class="app-layout">
<!--              右侧栏start-->
      <Row type='flex' justify="space-between" align="top" class-name="app-oneself" :style="rightOneself ? ' ' :'transform: translateX(100%);'" >
        <svg @click="rightOneselfHandle" :class="rightOneself ? 'leftIcon current fontSize-text-colornoH' : 'leftIcon fontSize-text-colornoH'" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5801" width="200" height="200">
          <path d="M570.3 846c16.4 16.4 16.4 41 0 57.3-8.2 8.2-19.1 13.7-30 13.7-10.9 0-19.1-2.7-27.3-10.9L133.4 540.2c-8.2-8.2-13.7-19.1-13.7-30 0-10.9 5.5-21.8 13.7-30l379.6-366c16.4-16.4 41-16.4 57.3 2.7 16.4 16.4 13.7 41 0 57.3l-349.5 336L570.3 846z m0 0" fill="#f90000" p-id="5802"></path>
          <path d="M733.1 741.6c11.3 11.3 11.3 28.2 0 39.5-5.6 5.6-13.2 9.4-20.7 9.4s-13.2-1.9-18.8-7.5L432 530.8c-5.6-5.6-9.4-13.2-9.4-20.7s3.8-15.1 9.4-20.7l261.6-252.2c11.3-11.3 28.2-11.3 39.5 1.9 11.3 11.3 9.4 28.2 0 39.5L492.2 510.1l240.9 231.5z m0 0" fill="#f90000" p-id="5803"></path>
          <path d="M801.2 492.1m-55 0a55 55 0 1 0 110 0 55 55 0 1 0-110 0Z" fill="#f90000" p-id="5804"></path>
        </svg>
        <Col :xxl="{span:24}" :xl="{ span: 24 }" :lg="{span:4}" :md="{span:0}" :xs="{ span: 0 }"  class-name="oneself" v-if="Object.keys(this.userInfo).length > 0">
            <div class="account-profile" >
              <div class="blob-wrap">
<!--                <img :src="require('@/assets/images/user/'+userInfo.imgUrl)" alt="logo">-->
                <img v-lazy="'/static/images/user/'+userInfo.imgUrl" :alt="userInfo.title">
                <div class="blob"></div>
                <div class="blob"></div>
                <div class="blob"></div>
              </div>
              <div class="account-title">{{userInfo.name}}</div>
              <div class="account-explain overflow-eclipse">{{userInfo.explain}}</div>
            </div>
            <div class="app-activity-box">
              <ul class="box-wrapper auto-line-around">
                <li class="box-item time">
                  <div class="icon auto-line-center">
                    <Icon type="md-time" />
                  </div>
                  <div class="text">
                    <Time :time="userInfo.onlineTime" :interval="1" type="date" />
                    <span>{{$t('app.userInfo.time')}}</span>
                  </div>
                </li>
                <li class="box-item age">
                  <div class="icon auto-line-center">
                    <Icon type="ios-ribbon" />
                  </div>
                  <div class="text">
                    <span>{{userInfo.age}}</span>
                    <span>{{$t('app.userInfo.age')}}</span>
                  </div>
                </li>
                <li class="box-item Identity">
                  <div class="icon auto-line-center">
                    <Icon type="md-glasses" />
                  </div>
                  <div class="text">
                    <span>{{$t(`app.userInfo.identity[${userInfo.epithet}]`)}}</span>
                    <span>{{$t('app.userInfo.identityTitle')}}</span>
                  </div>
                </li>
                <li class="box-item Identity">
                  <div class="icon auto-line-center">
                    <Icon type="md-flame" />
                  </div>
                  <div class="text">
                    <span>{{userInfo.eyeNum}}A</span>
                    <span>{{$t('app.userInfo.giveALike')}}</span>
                  </div>
                </li>
              </ul>
              <div class="activity-week">
                <h1>{{$t('app.userInfo.currentWeek')}}</h1>
                <div class="week-day auto-line-around">
                  <div :class="{day:true,current:index == weekCurrent}" v-for="(item,index) in week" :key="index">
                    <div class="chart"></div>
                    <span>{{item.name}}</span>
                  </div>
                </div>
              </div>
              <div class="activity-more-message">
                <div class="more-message-title auto-line-around">
                  <div class='more-class-button'>
                    <div class="cardSlot">
                      <Icon type="ios-school" color="#9e5924" @click="rightOneselfHandle(0)" />
                      <Icon type="ios-shirt" color="#b74765" @click="rightOneselfHandle(1)"/>
                    </div>
                    <div class="button" :style="progressPlate  == true ? 'transform: translateX(38px)' :'transform: translateX(0px)'"></div>
                  </div>
                  <h1>{{$t('app.userInfo.item')}}</h1>
                </div>
                <div class="more-message-content">
                  <ul :class="progressPlate ? 'more-web-progressBar current'  : 'more-web-progressBar'" v-if="Object.keys(countData).length > 0">
                    <li>
                      <Tooltip :content="$t('app.userInfo.runSpeed')" >
                        <h5>Site running speed</h5>
                        <div class="line">
                          <span class="line-progress" style="background-color: #327b8e;width: 80%;"></span>
                        </div>
                        <p style="color:#22b7de;">80<sub>%</sub></p>
                      </Tooltip>
                    </li>
                    <li>
                      <Tooltip :content="$t('app.userInfo.hotData')" >
                        <h5>Popular</h5>
                        <div class="line">
                          <span class="line-progress" :style="'background-color: #611ca0;width:'+countDataChange.hotAppNum +'%;'"></span>
                        </div>
                        <p style="color:#8076e0;">{{countDataChange.hotAppNum}}<sub>%</sub></p>
                      </Tooltip>
                    </li>
                    <li>
                      <Tooltip :content="$t('app.userInfo.commentData')" >
                        <h5>Comment</h5>
                        <div class="line">
                          <span class="line-progress" :style="'background-color: #ec923a;width: '+countDataChange.commentsLength+'%;'"></span>
                        </div>
                        <p style="color:#ef9e51;">{{countDataChange.commentsLength}}<sub>%</sub></p>
                      </Tooltip>
                    </li>
                    <li>
                      <Tooltip :content="$t('app.userInfo.glanceOver')" >
                        <h5>Glance over</h5>
                        <div class="line">
                          <span class="line-progress" :style='"background-color:#ffd3e2;width:"+countDataChange.eyeAppNum+"%"'></span>
                        </div>
                        <p style="color:#f36998;">{{countDataChange.eyeAppNum}}<sub>%</sub></p>
                      </Tooltip>
                    </li>
                  </ul>
                  <ul :class="progressPlate ? 'more-web-hot oneself-tag-personality auto-line-start plate-main ' :'more-web-hot oneself-tag-personality auto-line-start plate-main current'" >
                    <router-link tag="li" :to="{path:`/app/${item._id}`,query:{title:item.title}}" class="plate-list auto-line-start" v-for="(item,index) in heartNumData.content" :key="index">
                      <div class="plate-list-img">
<!--                        <div class="images" :title="item.title" :style="'background-image: url('+require('@/assets/images/app/'+item.imgUrl+'')+')'"></div>-->
                        <div class="images" :title="item.title" v-lazy:background-image="'./static/images/app/'+item.imgUrl" data-app="app1"></div>
                      </div>
                      <div class="plate-list-text">
  <!--                                fontSize-text-colornoH-->
                        <h5 class="overflow-eclipse-2 ">{{item.explain}}</h5>
                        <div class="auto-line-between plate-list-text-time">
                          <div class="left-time">
                            <Time :time="(new Date(item.onlineTime).getTime())" type="date" />
                          </div>
                          <div class="right-evaluate auto-line-around">
                            <p><Icon type="md-heart" /><span>{{item.heartNum}}</span></p>
                            <p><Icon type="md-flame" /><span>{{item.eyeNum}}</span></p>
                            <p><Icon type="ios-chatbubbles-outline" /><span>{{item.commentsLength}}</span></p>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </ul>
                </div>
              </div>
            </div>
        </Col>
      </Row>
  <!--              右侧栏end-->
  <!--              app 详细信息 start-->
        <Row type='flex' justify="space-between" align="top" class-name="app-header  article "  v-if="hotAppData">
            <Col :xl="{ span: 5 }" :lg="{span:24}" :sm="{ span: 24 }" :xs="{span:24}"  class-name="app-content-left">
                <div class="appLeft-img" v-if="'imgUrl' in hotAppData">
                    <img v-lazy="'/static/images/app/' + hotAppData.imgUrl" data-app="app2" :alt="hotAppData.title">
                </div>
            </Col>
            <Col :xl="{ span: 19 }" :lg="{span:24}" :sm="{ span: 24 }" :xs="{span:24}"  class-name="app-content-right">
                <div class="appLeft-detail mx-15-2">
                    <h3 class="app-title overflow-eclipse fontSize-text-color"><span class="new" v-if="hotAppData.new">New</span>{{hotAppData.title}} <small style="color:red">{{hotAppData.version}}</small></h3>
                    <p class="app-brief overflow-eclipse fontColor-t-d">{{hotAppData.websiteInfo}}</p>
                    <div class="app-nature">
                        <span v-for="(item,index) in hotAppData.natureTag" :key="index">
                          <Icon :type="item ==$t('app.caregory_label.global') ? 'ios-globe' : item == $t('app.caregory_label.poster') ? 'ios-analytics' : item == $t('app.caregory_label.official') ? 'ios-at' : item == $t('app.caregory_label.topspeed') ? 'ios-designernews' : 'md-game-controller-b' " v-if=""></Icon>{{ item }}
                        </span>
                    </div>
                    <p class="app-class" v-if="hotAppData.onlineTime">
                        <span class="app-clss-time ">{{$t('app.update_time')}}：<sub><Time :time="(new Date(hotAppData.onlineTime)).getTime()" type="date" class="fontColor fontSize-text-orange"/></sub></span>
                        <span class="app-clss-tag">{{$t('app.caregory_label.name')}}：
                          <randomTag :tagValue="item | filterBelogTag" class="fontSize-text-orange" :pathName="'/app'" v-for="(item,index) in hotAppData.belongTag" :key="item"></randomTag>
<!--                          <sub class="fontColor fontSize-text-orange" v-for="(item,index) in hotAppData.belongTag" :key="index">{{item | filterBelogTag}}</sub>-->
                        </span>
                        <span class="app-clss-language">{{$t('app.language.name')}}：<sub class="fontColor fontSize-text-orange" v-for="(item,index) in hotAppData.language" :key="index">{{item == 1 ? $t('app.language.china') : item == 2 ? $t('app.language.english') : item == 3 ? $t('app.language.global') : $t('app.language.village')}}</sub></span>
                        <span class="app-clss-along">{{$t('app.platform')}}：<Icon :type="item1== 0 ? 'logo-apple':item1 == 1 ? 'logo-android' : item1 == 2 ? 'md-desktop': 'md-tablet-portrait'" v-for="(item1,index1) in hotAppData.state" :key="index1"  :title="item1"/>
  </span>
                    </p>
                    <div class="app-button auto-line-center">
                        <ButtonGroup shape="circle" size="large" v-if="'back' in hotAppData">
  <!--                                  //buttonGroupBck-->
                            <Button
                              :to="hotAppData.downloadUrl"
                              class=" download fontColor"
                              target="_blank"
                              :style="'background: linear-gradient(80deg,'+hotAppData.back[0]+','+hotAppData.back[1]+' 74%)'"
                              v-like="{title:hotAppData.title,type:'DN',id:$route.params.id,url:`/app/${$route.params.id}?title=${hotAppData.title}`,belong:'app'}">
                              <Icon type="md-download" />
                              {{$t('app.Download_new')}}
                            </Button>
  <!--                                  //buttonGroupBck-->
                            <Button :to="hotAppData.hrefUrl" class=" palystation fontColor" target="_blank" :style="'background: linear-gradient(80deg,'+hotAppData.back[1]+','+hotAppData.back[2]+')'">
                              <Icon type="logo-playstation" />
                              {{$t('app.Official')}}
                            </Button>
  <!--                                  //buttonGroupBck-->
                            <Button class=" recording fontColor" :style="'background: linear-gradient(80deg,'+hotAppData.back[2]+' 21%,'+hotAppData.back[3]+')'">
                              <Icon type="ios-recording" />
                              {{$t('app.Scout')}}
                              <span>{{hotAppData.eyeNum}}</span>
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div class="app-volumn auto-line-center">
                        <span><Icon type="ios-pulse" />{{hotAppData.downloadNum}}{{$t('app.people_have_download')}}</span>
                        <span>
                            <Tooltip >
                                <Icon type="md-barcode" />
                                {{$t('app.mobile_view')}}
                                <div slot="content">
                                    <qrcode :qrcodeUrl="qrcodeUrl"></qrcode>
                                </div>
                            </Tooltip>
                        </span>
                    </div>
                    <div class="app-eye auto-line-center" @click="$common().goto(hotAppData.hrefUrl)">
                      <Tooltip >
                        <div class="eye"></div>
                        <div slot="content">
                          <span>{{$t('app.need_to_download')}} {{hotAppData.appSize}}M {{$t('app.oh')}}</span>
                        </div>
                      </Tooltip>
                    </div>
                </div>
            </Col>
        </Row>
  <!--              app 详细信息 end-->

  <!--              app相关内容，聊天start-->
        <Row type='flex' justify="center" align="top" class-name="app-main article guestbook" v-if="hotAppData">
            <Col :xl="{ span: 20 }" :lg="{span:20}" :sm="{ span: 20 }" :xs="{span:24}" class-name="app-main-content">
                <div class="appMain-introduce mx-15-2">
                    <h1>{{hotAppData.title}}</h1>
                    <p>{{hotAppData.explain}}</p>
                    <img :src="hotAppData.appContent" alt="" style="width: 100%;height: 100%;">
                    <share :config="shareConfig"></share>
                    <div class="appMain-button">
                        <a href="javascript:void(0)" @click="$common().goto(hotAppData.hrefUrl)"  target="_blank" >{{$t('app.go_towebsite_more')}}</a>
                    </div>
                </div>
            </Col>
            <Col :xl="{ span: 20 }" :lg="{span:20}" :md="{span:20}" :xs="{ span: 24 }" class-name="app-main-content mx-15-2">
              <app-related :relatedInfo="relatedInfo" :GCGird="GCGird" @moreContent="moreContent" @allStart="allStart"></app-related>
            </Col>
            <Col :xl="{ span: 20 }" :lg="{span:20}" :sm="{ span: 20 }" :xs="{span:24}" class-name="app-main-content">
              <div class="appMain-guestBook">
                <!--                          留言界面start-->
                <app-guestbook :commentsList="commentsList" @pageSkip="getCommentsList($event)" @addCommentsData="addCommentsData(arguments)"></app-guestbook>
                <!--                          留言界面end-->
              </div>
            </Col>
        </Row>
  <!--              app介绍，聊天end-->
    </div>
    <app-side :hotAppData="hotAppData" v-if></app-side>
  </div>
<!--    </header-nav>-->
</template>
<script>
  // import {Row,Col,Icon,Time,ButtonGroup,Button,Tooltip,Notice,Spin} from  'iview'
  import randomTag from '@/components/common/randomTag'; //头部和左边导航
  import gradeBackground from '@/components/common/gradeBackground'; //头部和左边导航
  import qrcode from '@/components/common/qrcode'; //头部和左边导航
  // import {headerNav,gradeBackground,qrcode,share,randomTag} from '@/components/common'; //头部和左边导航
  import appGuestbook from "@/components/pages/comments/appGuestbook"; //留言板
  import appRelated from "@/components/pages/app/appRelated"; //相关推荐
  import appSide from "@/components/pages/app/side"
  import setting from "@/setting"
  export default{
    head(){
      const {fullPath,meta} = this.$route;
      const {title:asyncData_title,websiteInfo,imgUrl:asyncData_imgUrl} = this.hotAppData
      const title = `${meta.title.slice(0,meta.title.indexOf(',')+1)}-${asyncData_title}的${meta.title.slice(meta.title.indexOf(',')+1)}`
      const description = `${meta.description.slice(0,meta.description.indexOf(',')+1)}${websiteInfo},${meta.description.slice(meta.description.indexOf(',')+1)}`
      const imgUrl = `${setting.website}/static/images/app/${asyncData_imgUrl}`
      return {
        title: title,
        meta: [
          {hid: 'description', name: 'description', content:description},
          {hid: 'keywords', name: 'keywords', content: title},
          {name:'og:url', property: 'og:url', content:`${setting.website}${fullPath}`},
          {name:'og:title', property: 'og:title', content:title},
          {name:'og:description', property: 'og:description', content:description},
          {name:'og:image', property: 'og:image', content: imgUrl},
          {hid: 'author', name: 'author', content: 'navai'},
        ],
        link: [
          { rel: 'stylesheet', href: 'https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css' }
        ]
      }
    },
      name:'App',
      components:{gradeBackground,appGuestbook,qrcode,appRelated,appSide,randomTag},
    async asyncData({$api,route}){
      //! 1.
      const {app} = await $api.appList.getAppDetail(route.params.id)
      let hotAppData = app.content
      //! 2.
      const {comment} = await $api.user.getCommentsLists({per_page:5,order:-1,page:1,version:'A',order_type:1,id:route.params.id})
      comment.version = 'A'
      //! 3.
      let params={per_page:6,order: -1,page:1}
      const res = await $api.appList.getAppListsHeartNum(params)
      let relatedInfo = res.app
      return {
        hotAppData,
        commentsList:comment,
        relatedInfo
      }
    },
    data(){
        return{
          qrcodeUrl:process.browser ? window.location.href : '',
          hotAppData: {},
          commentsList: {},
          week:[{name:'Mon'},{name:'Tue'},{name:'Wed'},{name:'Thu'},{name:'Fri'},{name:'Sat'},{name:'Sun'}], //个人信息表中的星期
          weekCurrent:0, //个人信息表默认从星期一开始
          progressPlate:true, //切换个人信息表中的切换按钮
          rightOneself:false,//个人信息表
          relatedInfo: {}, //相关内容
          GCGird:[4,4,6,8,12],//相关内容的排列大小
          heartNumData:{},//点赞排序
          countData:{},//网站数据
          countDataChange:{
            commentsLength:0,
            eyeAppNum:0,
            hotAppNum:0
          },
          shareConfig: {
            url:`${setting.website}${this.$route.path}` , // 网址，默认使用 window.location.href
            sites: [
              "qzone",
              "qq",
              "weibo",
              "wechat",
              "douban",
              "tencent",
              "linkedin",
              "google",
              "facebook",
              "twitter",
            ], // 启用的站点
            // disabled: ["google", "facebook", "twitter"], // 禁用的站点
            wechatQrcodeTitle: this.$t("blog.details.WeChat_scan"), // 微信二维码提示文字
            wechatQrcodeHelper:
              `<p>${this.$t("blog.details.Click_WeChat_Discover")}</p><p>${this.$t("blog.details.QR_Share")}</p>`,
          },
          userInfo:{},
          time3:new Date().getTime() - 60*60*1000*50,
          commentsVersion:'A', //app聊天版本
        }
      },
    created() {
        //! nuxt 数据预加载处理
      let imageUrl = this.hotAppData.imgUrl
      if (!/(http|https|ftp)/.test(imageUrl)){
        imageUrl = require('@static/images/app/' + this.hotAppData.imgUrl)
      }
      this.$common().rgbaster(imageUrl, 0.8, 4).then(res => {
        this.hotAppData.back = res.color
        this.$forceUpdate()
      })
    },
    mounted() {
      // this.getCommentsList(this.$route.params.id)

      // this.$Notice.config({
      //   top: 100,
      //   duration: 3
      // });
    },
    methods:{
      //star最先开始加载接口
      allStart(params){
        if (params.status == 0){
          Promise.all([this.getAppDetail(),this.getCommentsList(),this.getAppListsHeartNumData(6)]).then(([res1,res2])=>{
            this.$nextTick(()=>{
              this.$store.commit('getLoadingHome',false)
            })
          })
        }else {
          this.$store.commit('getLoadingHome',true)

          //将id 传到 路由上 供给this.$route.query使用
          //也可以使用this.$router.push({params:{}}) 提供给this.$route.params使用，
          //this.$route 供提取， this.$router 供添加
          this.$router.push({
            query:{
              title:params.title
            },
            params:{
              id:params._id,
              data:this.hotAppData
            }
          })
          Promise.all([this.getAppDetail(),this.getCommentsList(),this.getAppListsHeartNumData(6)]).then(([res1,res2])=>{
            this.$nextTick(()=>{
              setInterval(()=>{
                this.$store.commit('getLoadingHome',false)
              },2000)
            })
          })
        }
      },
      //请求聊天记录
      getCommentsList(newPage=1,id=this.$route.params.id){
        return new Promise((resolve, reject) => {
          let params = {per_page:5,order:-1,page:newPage,version:this.commentsVersion,order_type:1,id:id}
          this.$api.user.getCommentsLists(params).then((res)=>{
            if (res.status == 1){
              this.commentsList = res.comment
              this.commentsList.version = this.commentsVersion
              console.log(this.commentsList)
              return resolve(1)
            }
          }).catch((error)=>{
            console.warn(error)
             return reject(1)
          })
        })

      },
      //请求app数据
      getAppDetail: function (id = this.$route.params.id) {
        return new Promise(resolve => {
          this.$api.appList.getAppDetail(id).then(res => {
            if (res.status === 1) {
              this.hotAppData = res.app.content
              let imageUrl = this.hotAppData.imgUrl
              if (!/(http|https|ftp)/.test(imageUrl)){
                imageUrl = require('/static/images/app/' + this.hotAppData.imgUrl)
              }
              this.$common().rgbaster(imageUrl, 0.8, 4).then(res => {
                this.hotAppData.back = res.color
                this.$forceUpdate()
              })
              return resolve(1)
              // this.$set(this.hotAppData, 0, result)
            }
          }).catch(error => {
            console.warn(error)
            return resolve(1)
          })
        })
      },
      //添加用户输入的数据
      addCommentsData(data){
        console.log(5555,data)
        data[0].params.onlineTime = new Date()
        if (data[0].reply){
          data[0].params._id = data[2]
          this.commentsList.content.unshift(data[0].params)
        }else {
          for (let i =0;i<this.commentsList.content.length;i++){
            if (i == data[1]){
              if ('childersChat' in this.commentsList.content[i] ){
                this.commentsList.content[i].childersChat.unshift(data[0].params )
              }else{
                this.commentsList.content[i].childersChat=[]
                this.commentsList.content[i].childersChat.unshift(data[0].params )
              }
              return
            }
          }
        }
      },
      //计算今天周几
      weekHandle(gap=1){
        // let  week= new Date().getDay()
        // if (week == 0) return  6;
        // return week
        let week = new Date().getDay(),index=0,time;
        if (week == 0) week = 6;
        clearInterval(time)
        time = setInterval(()=>{
          if (index == week){
            clearInterval(time)
          }else {
            index +=1
          }
          if (index == 7) {
            index = 6
            clearInterval(time)
            return this.weekCurrent = 6
          };
          this.weekCurrent = index - 1
        },gap * 1000)
      },
      //获取点赞数app,以及相关推荐
      getAppListsHeartNumData(size=5,sort){
        return new Promise((resolve => {
          let params={per_page:size,order: sort,page:1}
          this.$api.appList.getAppListsHeartNum(params).then((res)=>{
            if (res.status == 1){
              if (sort){ //为点赞app
                this.heartNumData = res.app
              }else { //相关推荐
                this.relatedInfo = res.app
                console.log(this.relatedInfo)
              }
              return resolve(1)
            }
          }).catch(error=>{
            console.warn(error)
            return resolve(1)
          })
        }))

      },
      //获取网站app详细信息
      getAppCountData(){
        return new Promise(resolve => {
          this.$api.appList.getAppCountData().then(res=>{
            if (res.status === 1){
              this.countData = res.app.content
              return resolve(1)
            }
          }).catch(error=>{
            console.warn(error)
            return resolve(1)
          })
        })

      },
      //更多
      moreContent(){
        this.$Notice.warning({title:'更多',desc:'还在开发中...',})
      },
      //右边个人信息栏目 造数据 ,点击切换到热门0 和 网站数据1
      rightOneselfHandle(data){
        switch (data){
          case 0: //请求点赞类
          {
            this.progressPlate = !this.progressPlate
            if (!this.progressPlate && !this.heartNumData.hasOwnProperty('content')) this.getAppListsHeartNumData(4,-1);
          }
            break;
          case 1:
          {
            this.progressPlate = !this.progressPlate
          }
            break;
          default: //请求网站数据类
          {
            this.rightOneself = !this.rightOneself
            if (this.rightOneself){this.weekCurrent = 0;this.weekHandle()}
            // this.handleCountData()
            if (this.rightOneself && this.progressPlate && Object.keys(this.countData).length == 0){
              //请求网站信息,个人信息
              this.getUserInfo()
              this.getAppCountData().then(res=>{
                console.log(res)
                console.log(this.countData)
                for (let item in this.countData){
                  switch (item){
                    case 'eyeAppNum':
                      this.countData.eyeAppNum > 1336 ? this.countData.eyeAppNum :this.countData.eyeAppNum = 1336
                      this.handleCountData(item,10000,100)
                      break;
                    case 'hotAppNum':
                      this.countData.hotAppNum > 236 ? this.countData.hotAppNum :this.countData.hotAppNum = 236
                      this.handleCountData(item,1000,50)
                      break;
                    case 'commentsLength':
                      this.countData.commentsLength > 506 ? this.countData.commentsLength :this.countData.commentsLength = 506
                      this.handleCountData(item,1000,200)
                      break;
                  }
                }
              })
            }
          }
        }

      },
      //处理网站数据,渐变动画
      handleCountData(item=500,count=1000,time=200){
        let timing = '',index=0,endCount= parseFloat(parseInt(this.countData[item])/count * 100).toFixed(2);
        timing=setInterval(()=>{
          if (index < endCount){
            index++;
            this.countDataChange[item] = index
          }else{
            this.countDataChange[item] = endCount
            clearInterval(timing)
          }
        },time)
      },
      //获取用户信息
      getUserInfo(){
        this.$api.user.getUserInfo().then(res=>{
          if (res.status === 1){
            console.log(res)
            this.userInfo = res.user.content
          }
        })
      }
    },
    filters:{
      filterBelogTag: (item)=>{
        switch (item) {
          case "1" || 1:
            return "运动健身"
          case "2" || 2:
            return "音乐播放"
          case "3"|| 2:
            return "视频播放"
          case "4"|| 2:
            return "教育学习"
          case "5" || 5:
            return "健康医疗"
          case "6" || 6:
            return "趣味娱乐"
          case "7" || 7:
            return "网络购物"
          case "8" || 8:
            return "新闻资讯"
          default:
            return '综合性软件'
        }
      }
    },
    computed:{
        routerQuery(){
          return this.$route
        }
    },
    watch:{
      routerQuery(newV,oldV){
        this.allStart({status:1,id:newV.id,title:newV.query.title})
      }
    },
    deactivated() { //keep-alive 多的两个生命周期，第一个为销毁时，第二个为激活时
      this.$destroy('AppSide')
      this.$destroy('Share')
    },
    activated(){}
  }
</script>
<style lang="scss" scoped>
    @import "~@/assets/css/components/app.scss";
</style>
