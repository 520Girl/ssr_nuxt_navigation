<template>
  <!--      <grade-background slot="main"></grade-background>-->
  <div class="gradeCoins-container contents-bck">
    <div class="gradeCoins-layout " v-if="'content' in gradeCoinContent">
      <!-- <div id="mydiv"></div> -->
      <Row type='flex' justify="space-between" align="top" class-name="article">
        <Col :xl="{ span: 6 }" :lg="{span:6}" :sm="{ span: 12 }" :xs="{span:24}" class-name="article-header-left ">
        <div class="logo-wraper auto-line-center applyBck">
          <div class="logo">
            <Icon type="logo-vimeo vip" />
            <!--                               :style="'background-size: cover;background: transparent  url('+require('../assets/images/gradeCoin/20200801150829.png')+') no-repeat center center'"-->
            <div class="imgBackground"
              v-lazy:background-image="'./static/images/gradeCoin' + gradeCoinContent.content.imgUrl"
              data-image="image1"></div>
            <img v-lazy="'/static/images/gradeCoin' + gradeCoinContent.content.imgUrl" height="" width="" alt="logo"
              data-image="image1">
            <div class="tool-actions auto-line-around">
              <a href="">
                <Icon type="ios-thumbs-up " class="imgInIcon" />
                <span style="padding-top: 0.01rem ">{{gradeCoinContent.content.eyeNum}}</span>
              </a>
              <a href="">
                <Icon type="ios-bookmarks" class="imgInIcon" />
                <span style="padding-top: 0.01rem">{{gradeCoinContent.content.likeNum}}</span>
              </a>
            </div>
          </div>
        </div>
        </Col>
        <Col :xl="{ span: 9 }" :lg="{span:9}" :sm="{ span: 12 }" :xs="{span:24}" class-name="article-header-centre">
        <div class="site-wraper">
          <div class="site-tag overflow-eclipse">
            <ul class="site-tag-layout auto-line-start">
              <li class="tag-layout-item">
                <span>阿斯顿</span>
              </li>
              <li class="tag-layout-item">
                <span>宝马</span>
              </li>
              <li class="tag-layout-item" v-if="gradeCoinContent.content.new">
                <span class="new" v-show="gradeCoinContent.content.new">New</span>
              </li>
              <li class="tag-layout-item">
                <span class="hot" v-show="gradeCoinContent.content.hot">Hot</span>
              </li>
            </ul>
          </div>
          <div class="site-number auto-line-start">
            <a href="" title="" class="defend">
              <count-to-number :value="gradeCoinContent.content.guaranteeMoney" :time="1"
                :suffix="'万'"></count-to-number>
              <!--                      <span class="">1000万</span>-->
              <img src="~/assets/images/gradeCoin/keep.png" width="102" height="30" title="" alt="">
            </a>
            <h1 class="fontSize-text-color">{{gradeCoinContent.content.title}}</h1>
          </div>
          <p class="site-info fontColor-t-d overflow-eclipse ">{{gradeCoinContent.content.websiteInfo}}</p>
          <span class="site-cue">标签：<a href="javascript:void(0)"
              v-for="(item,index) in gradeCoinContent.content.belongTag" :key="index">{{item}} </a></span>
          <div class="site-button ">
            <Tooltip>
              <Button @click="$common.goto(gradeCoinContent.content.registerUrl)" target="_blank" size="large"
                type="primary" class="fontColor" style="background: linear-gradient(45deg,yellow , blue)">
                立即注册
                <Icon type="ios-arrow-forward" />
              </Button>
              <div slot="content">注册送好礼</div>
            </Tooltip>
            <Tooltip>
              <Button size="large" type="primary" class="fontColor"
                style="background: linear-gradient(45deg, blue, red)">
                手机查看
                <Icon type="md-qr-scanner" />
              </Button>
              <div slot="content">
                                  <qrcode :qrcodeUrl="gradeCoinContent.content.homeUrl"></qrcode>
                              </div>
            </Tooltip>
            <Tooltip content="网站运行速度">
              <url-velocity :imgUrl="gradeCoinContent.content.homeUrl"></url-velocity>
            </Tooltip>
          </div>
        </div>
        </Col>
        <Col :xl="{ span: 9 }" :lg="{span:9}" :sm="{ span: 24 }" :xs="{span:24}" class-name="article-header-right">
        <div class="grade-wraper ">
          <div class="grade">
            <div class="grade-number auto-line-start">
              <div class="text">
                <cite>综合评分</cite>
                <p><span style="font-weight: bold;">{{gradeCoinContent.commentAll}}</span> 人评分</p>
              </div>
              <div class="number">{{ gradeCoinContent.content.commentsScoreAverage }}</div>
            </div>
            <div class="grade-width">
              <Col :xl="{ span: 24 }" :lg="{span:24}" :md="{span:12}" :xs="{ span: 24 }" class-name="gradeCoin-item "
                v-for="(item,index) in divDescribe" :key="index">
              <div class="progress-item auto-line-start">
                <em class="progress-itemLeft">{{item.title}} :</em>
                <div class="item-tip" style="min-width: 180px;height: 17px;line-height:17px;">
                  <div class="tip" :style="'width:'+item.changeValue+'%'">{{item.changeValue/10}}</div>
                </div>
                <em class="score"
                  :style="parseInt(item.scoreNum) == 10 ? 'font-size: 16px;margin-left:0;' : 'font-size:16px;'">{{item.scoreNum}}</em>
              </div>
              </Col>
            </div>
          </div>
        </div>
        </Col>
      </Row>
      <Row type='flex' justify="space-between" align="top" class-name="guestbook article">
        <Col :xl="{ span: 8 }" :lg="{span:8}" :md="8" :xs="{ span: 24 }" class-name="guestbook-main-left ">
        <div class="guestbook-left-wraper" v-for="(item,index) in platformBasis">
          <a href="javascript:void(0)" class="guestbook-left-item applyBck fontSize-text-orange">
            <div class="guestbook-left-header fontSize-icon auto-line-start">
              <Icon :type="item.icon" class="changeColor" />{{item.title}}
            </div>
            <div class="guestbook-left-content">
              <em style="line-height: 1.2;">{{gradeCoinContent.content.basicsInfo[index]}}</em>
            </div>
          </a>
        </div>
        </Col>
        <Col :xl="{ span: 16 }" :lg="{span:16}" :md="16" :xs="{ span: 24 }" class-name="guestbook-main-right">
        <div class="guestbook-right-wraper">
          <div class="guestbook-right-webInfo">
            <h1>{{gradeCoinContent.content.title}}</h1>
            <div class="webInfo">
              {{gradeCoinContent.content.gradeCoinContent}}
            </div>
          </div>
          <div class="guestbook-right-appGroom ">
            <div class="station-master tool">
              <div class="tool-header auto-line-between mx-24">
                <div class="left">
                  <div class="heade-icon">
                    <Icon type="md-bookmarks fontSize-icon " />
                  </div>
                  <h5 class="fontSize-text-mains">相关推荐</h5>
                </div>
                <div class="right auto-line-between">
                  <div class="number fontSize-text">
                    当前数量<span class='nums'>{{gradeCoinLists.allCount}}</span>个
                  </div>
                  <span class="line"></span>
                  <div class="more fontSize-text" @click="moreContent">更多
                    <Icon type="ios-arrow-forward" />
                  </div>
                </div>
              </div>
              <gradeCoin-box :GCGird="GCGird" :gradeCoinLists="gradeCoinLists" @allStart="allStart"></gradeCoin-box>
            </div>
          </div>
          <div class="guestbook-main">
            <!--                          留言界面start-->
            <guestbook :commentsList="commentsList" @pageSkip="getCommentsList($event)"
              @addCommentsData="addCommentsData(arguments)"></guestbook>
            <!--                          留言界面end-->
          </div>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  // import '@/assets/js/canvas-particle' //canvas 背景
  // import {Row, Col, Icon, Button, Tooltip,Tag} from 'iview';//iview 导入
  import headerNav from '@/components/common/headerNav'; //头部和左边导航
  import bulletin from '@/components/common/bulletin';//滚动条
  import qrcode from '@/components/common/qrcode'; //扫描二维码,生成
  import urlVelocity from '@/components/common/urlVelocity'; //访问地址响应速度
  import countToNumber from "@/components/common/countToNumber"; //数字滚动
  import guestbook from "@/components/pages/comments/guestbook"; //留言板
  import gradeBackground from "@/components/common/gradeBackground"; //背景
  import gradeCoinBox from "@/components/pages/gradeCoin/gradeCoinBox";
  export default {
    name: 'GradeCoinDetailed',
    components: { bulletin, headerNav, qrcode,urlVelocity,countToNumber, guestbook, gradeBackground, gradeCoinBox },
    // components: {bulletin, headerNav, Row, Col, Icon, Button, Tooltip,qrcode,urlVelocity,Tag,countToNumber,guestbook,gradeBackground,gradeCoinBox},
    data() {
      return {
        imgUrl: undefined,
        commentsList: {}, //聊天数据
        gradeCoinLists: [], //相关内容数据
        gradeCoinContent: {}, //app数据
        GCGird: [8, 8, 12, 12, 24],
        divDescribe: [{ title: '提款速度', scoreNum: 7, changeValue: 0 }, { title: '品牌荣誉', scoreNum: 8, changeValue: 0 }, { title: '响应速度', scoreNum: 9, changeValue: 0 }, { title: '服务质量', scoreNum: 10, changeValue: 0 }], //评分title 文字, //评分title 文字
        platformBasis: [{ title: '即使客服', content: '立即联系在线客服', icon: 'md-ionitron' }, { title: '游戏平台', content: 'EA真人 HG真人 MG真人 小金真人 小金体育 小金彩票 BSG电子 MG电子', icon: 'md-game-controller-b' }, { title: '支付方式', content: '中行 招行 工行 工行 建行 农行 民生 在线支付 微信支付 银联支付', icon: 'md-card' }, { title: '存提到账时间', content: '5分钟', icon: 'md-alarm' }, { title: '货币支持', content: '人民币 美元', icon: 'md-finger-print' }, { title: '权威牌照', content: '曼倒博彩监管委员会', icon: 'md-aperture' }, { title: '网络语言', content: '中文', icon: 'ios-ribbon' }],
        countDataChange: 0,
        countData: [8.3, 8.5, 9, 9],
        commentsVersion: 'G',
        timing: [],
        refresh: false // 是否是刷新页面
      }
    },
    activated() {
    },
    created() {
      this.allStart({ status: 0 })
      console.log(this.$route)
    },
    mounted() {
    },
    methods: {
      //star最先开始加载接口
      allStart(params) {
        if (params.status == 0) {
          Promise.all([this.getGradeCoinDetail(this.$route.params.id), this.getGradeCoin(), this.getCommentsList()]).then(([res1, res2, res3]) => {
            this.$nextTick(() => {
              this.$store.commit('getLoadingHome', false)
            })
          })
        } else {
          this.refresh = params.refresh
          this.$store.commit('getLoadingHome', true)
          this.$router.replace({
            params: {
              id: params.id,
              title: params.title
            }
          })
          Promise.all([this.getGradeCoinDetail(this.$route.params.id), this.getGradeCoin(), this.getCommentsList()]).then(([res1, res2, res3]) => {
            this.$nextTick(() => {
              this.$store.commit('getLoadingHome', false)
              this.refresh = false
            })
          })
        }
      },
      //评分系统的，渐变动画
      handleCountData(item = 0, valueIndex, count = 1, time = 200) {
        let index = 0, endCount = (parseInt(item * 10) / count).toFixed(2);
        this.timing[valueIndex] = setInterval(() => {
          if (index < endCount) {
            index++;
            this.divDescribe[valueIndex].changeValue = index
          } else {
            this.divDescribe[valueIndex].changeValue = endCount
            clearInterval(this.timing[valueIndex])
          }
        }, time)
      },
      //获取评分系统数据,
      getGradeCoin(per_page = 4, page = 1, order = -1) {
        return new Promise(resolve => {
          this.$api.gradeCoin.getGradeCoin({ per_page: per_page, page: page, order: order }).then(res => {
            if (res.status == 1) {
              this.gradeCoinLists = res.gradeCoin
              return resolve(1)
            }
          })
        })
      },
      //根据id获取全部数据
      getGradeCoinDetail() {
        return new Promise(resolve => {
          this.$api.gradeCoin.getGradeCoinDetail(this.$route.params.id).then(res => {
            if (res.status == 1) {
              //1. 赋值
              this.gradeCoinContent = res.gradeCoin

              this.gradeCoinContent.content = res.gradeCoin.content
              //2. 综合评分赋值
              this.gradeCoinContent.content.scoreNum.forEach((item, index) => {
                this.divDescribe[index].scoreNum = item
                clearInterval(this.timing[index])
                this.handleCountData(this.divDescribe[index].scoreNum, index)
              })

              return resolve(1)
            }
          })
        })

      },

      //更多
      moreContent() {
        this.$Notice.warning({ title: '更多', desc: '还在开发中...', })
      },
      //请求聊天记录
      getCommentsList(newPage = 1, id = this.$route.params.id) {
        return new Promise(resolve => {
          let params = { per_page: 1, order: -1, page: newPage, version: this.commentsVersion, order_type: 1, id: id }
          this.$api.user.getCommentsLists(params).then((res) => {
            if (res.status == 1) {
              this.commentsList = res.comment
              this.commentsList.version = ''
              this.commentsList.version = this.commentsVersion

              return resolve(1)
            }
          }).catch((error) => {
            console.warn(error)
            return resolve(1)
          })
        })
      },
      //添加用户输入的数据
      addCommentsData(data) {
        this.commentsList.allCount++
        data[0].params.onlineTime = new Date().getTime()
        if (data[0].reply) {
          data[0].params._id = data[2]
          this.commentsList.content.unshift(data[0].params)
        } else {
          for (let i = 0; i < this.commentsList.content.length; i++) {
            if (i == data[1]) {
              if ('childersChat' in this.commentsList.content[i]) {
                this.commentsList.content[i].childersChat.unshift(data[0].params)
              } else {
                this.commentsList.content[i].childersChat = []
                this.commentsList.content[i].childersChat.unshift(data[0].params)
              }
              return
            }
          }
        }
      },
    },
    computed: {
      routerQuery() {
        return this.$route
      }
    },
    watch: {
      // routerQuery(newValue,oldVal){
      //   if (!this.refresh && newValue.name !== 'Index'){
      //     this.allStart({status:1,id:newValue.query.id})
      //   }
      // }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/css/components/gradeCoins.scss';
</style>