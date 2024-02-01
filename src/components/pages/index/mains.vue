<template>
  <div class="mains-container contents-bck">
    <section class="mains-content  mx-15-2">
      <!--广告培训 start-->
      <!-- <div class="tool" style="height: 500px;" id="advert_groom">
        <div class="tool-header auto-line-between ">
          <div class="left">
            <div class="heade-icon">
              <Icon type="md-bookmarks fontSize-icon " />
            </div>
            <h5 class="fontSize-text-mains">广告赞助商</h5>
          </div>
          <div class="right auto-line-between">

          </div>
        </div>
        <Row type='flex' justify="start" align="middle" class-name="advert-menu mx-2">
          <Col :xl="{ span: 3 }" :sm="{ span:6}" :xs="{ span: 12 }" class-name="two-item "
            v-for="(item,index) in advertList" :key="index">
          <Tooltip>
            <div class="item-content thumbnail">
              <div class="item-img">
                <span class="img-thumbnail-back">
                  <img v-lazy="item.imgUrl" data-app="app1" width="125" height="125" alt="logo">
                </span>
              </div>
              <div class="metas">
                <Time :time="item.time" type="date"></Time>
                <div class="metas-icon">
                  <span>
                    <Icon type="md-bookmarks" />{{item.views}}
                  </span>
                  <span>
                    <Icon type="ios-rose" />{{item.likeNum}}
                  </span>
                </div>
                <a :href="item.hrefUrl" target="_blank" class="metas-button">进入</a>
              </div>
              <div class="official">
                <span></span>
                <span></span>
              </div>
              <h5 class="fontSize-text-app overflow-eclipse fontSize-text-color">{{item.title}}</h5>
              <div class="download">
                <router-link :to="item.downloadUrl" target="_blank" class="">
                  <Icon type="ios-cloud-download" />下载
                </router-link>
              </div>
            </div>
            <div slot="content">{{item.tooltipContent}}</div>
          </Tooltip>

          </Col>
          <div class="menu-diamond">
          </div>
        </Row>
      </div> -->
      <!--广告培训 end-->

      <!--站长推荐 start-->
      <!-- <div class="tool" style="height: 500px;" id="station_master">
        <div class="station-master-left">
          <div class="tool-header auto-line-between ">
            <div class="left">
              <div class="heade-icon">
                <Icon type="md-bookmarks fontSize-icon " />
              </div>
              <h5 class="fontSize-text-mains">站长推荐</h5>
            </div>
            <div class="right auto-line-between">
              <div class="number fontSize-text">
                当前数量<span class='nums'>5000</span>个
              </div>
              <span class="line"></span>
              <div class="more fontSize-text refresh-icon">
                刷新
                <Icon type="md-refresh" />
              </div>
              <span class="line"></span>
              <div class="more fontSize-text">
                更多
                <Icon type="ios-arrow-forward" />
              </div>
            </div>
          </div>
          <Row type='flex' justify="start" align="middle" class-name="mains-menu mx-2">
            <Col :xl="{ span: 4 }" :lg="{span:12}" :sm="{span:12}" :xs="{ span: 12 }" class-name=" one-item"
              v-for="(item,index) in recommends" :key="index">
            <Tooltip>
              <div class="item-content auto-line-between applyBck">
                <a :href="item.hrefUrl" class="item-left" target="_blank">
                  <img v-lazy="item.imgUrl" data-app="image1" :alt="item.title">
                </a>
                <div class="item-right ">
                  <div class="title ">
                    <a href="" class="fontSize-text fontSize-text-app"><span class="new"
                        v-if="item.new">New</span>{{item.title}} <span>-</span><span>{{item.version}}</span></a>
                  </div>
                  <div class="info overflow-eclipse fontSize-text-color">
                    {{item.explain}}
                  </div>
                  <div class="app-like">
                    <div class="app overflow-eclipse">
                      <a :href="item1.hrefUrl" v-for="(item1,index1) in item.belongTag" :key="index1"
                        item-characteristic>{{item.title}}</a>
                    </div>
                  </div>
                </div>
                <div class="item-characteristic">
                  <Icon
                    :type="item1== 0 ? 'logo-apple':item1 == 1 ? 'logo-android' : item1 == 2 ? 'md-desktop': 'md-tablet-portrait'"
                    v-for="(item1,index1) in item.state" :key="index1" :title="item1" />
                </div>
                <div @click="$common.goto(item.downloadUrl)" class="cloud-download">
                  <Icon type="md-cloud-download" />
                </div>
                <div class="like">
                  <Rate allow-half v-model="item.likeNum" icon="md-heart" style="vertical-align: initial;">
                  </Rate>
                  <span>
                    <Icon type="md-heart" />{{item.heartNum}}
                  </span>
                  <span>
                    <Icon type="md-download" />{{item.downloadNum}}
                  </span>
                </div>
              </div>
              <div slot="content">{{item.websiteInfo}}</div>
            </Tooltip>
            </Col>
          </Row>
        </div>
        <div class="station-maste-rankList">
          <div class="rankList-header auto-line-between">
            <h5>
              <Icon type="md-archive" />下载排行榜
            </h5>
            <div class="rankList-MW">
              <span class="week">周榜</span>
              <span class="line">|</span>
              <span class="month">月榜</span>
            </div>
          </div>
          <div class="rankList-main">
            <ul class="main applyBck">
              <li v-for="(item,index) in recommendsRankList" :key="index">
                <a href="" class="main-content auto-line-between">
                  <div class="main-text">
                    <div class="main-icon">
                      <span
                        :class="item.id == 1 ? 'one' : item.id == 2 ? 'two' : item.id == 3 ? 'three' : 'default'"></span>
                    </div>
                    <div class="main-title">
                      <img :src="item.titleImg" :alt="item.title">
                    </div>
                    <span class="fontSize-text-app name overflow-eclipse">{{item.title}}</span>
                  </div>
                  <div class="main-trend">
                    <Tooltip v-if="item.ranking != 'level'">
                      <span
                        :class="item.ranking == 'level'? 'change1': item.ranking == 'over'? 'change2': 'change3'"></span>
                      <div slot="content">
                        <span
                          :style="item.ranking == 'level'? ' ': item.ranking == 'over'? 'color:#ff5d23;': 'color:#5ec48f'">{{item.rankingNum}}个</span>
                      </div>
                    </Tooltip>
                    <div v-else>
                      <span
                        :class="item.ranking == 'level'? 'change1': item.ranking == 'over'? 'change2': 'change3'"></span>
                      <div slot="content"
                        :style="item.ranking == 'level'? 'display:none; ': item.ranking == 'over'? ' ': ' '">
                        <span
                          :style="item.ranking == 'level'? ' ': item.ranking == 'over'? 'color:#ff5d23;': 'color:#5ec48f'">{{item.rankingNum}}个</span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="" class="main-more applyBckDeep">
                  <span>更多排行</span>
                  <Icon type="ios-arrow-forward" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> -->
      <!--站长推荐 end-->
      <!--颜色游戏 start-->
      <!-- <div class="tool" style="height: 500px;" id="yellow_game">
        <div class="tool-header auto-line-between ">
          <div class="left">
            <div class="heade-icon">
              <Icon type="md-bookmarks fontSize-icon " />
            </div>
            <h5 class="fontSize-text-mains">站长推荐</h5>
          </div>
          <div class="right auto-line-between">
            <div class="number fontSize-text">
              当前数量<span class='nums'>5000</span>个
            </div>
            <span class="line"></span>
            <div class="more fontSize-text">更多
              <Icon type="ios-arrow-forward" />
            </div>
          </div>
        </div>
        <Row type='flex' justify="start" align="middle" class-name="mains-menu">
          <div class="menu-diamond">

          </div>
        </Row>
      </div> -->
      <!--颜色游戏  end-->

      <!--youtube视频 start-->
      <!-- <div class="tool" style="height: 500px;" id="youth_Tv">
        <div class="tool-header auto-line-between ">
          <div class="left">
            <div class="heade-icon">
              <Icon type="md-bookmarks fontSize-icon " />
            </div>
            <h5 class="fontSize-text-mains">youtube视频</h5>
          </div>
          <div class="right auto-line-between">
            <div class="number fontSize-text">
              当前数量<span class='nums'>5000</span>个
            </div>
            <span class="line"></span>
            <div class="more fontSize-text">更多
              <Icon type="ios-arrow-forward" />
            </div>
          </div>
        </div>
        <Row type='flex' justify="start" align="middle" class-name="mains-menu">
          <div class="menu-diamond">

          </div>
        </Row>
      </div> -->
      <!--youtube视频 end-->

      <!--相关工具 start-->
      <!-- <div class="tool" style="height: 500px;" id="tool_resource">
        <div class="tool-header auto-line-between ">
          <div class="left">
            <div class="heade-icon">
              <Icon type="md-bookmarks fontSize-icon " />
            </div>
            <h5 class="fontSize-text-mains">相关工具</h5>
          </div>
          <div class="right auto-line-between">
            <div class="number fontSize-text">
              当前数量<span class='nums'>5000</span>个
            </div>
            <span class="line"></span>
            <div class="more fontSize-text">更多
              <Icon type="ios-arrow-forward" />
            </div>
          </div>
        </div>
        <Row type='flex' justify="start" align="middle" class-name="mains-menu">
          <div class="menu-diamond">

          </div>
        </Row>
      </div> -->
      <!--相关工具 end-->

      <!--          <website-one :id="key" :websiteData="websiteData[key]" v-for="(val,key,index ) in websiteId" :key="index"></website-one>-->
      <website-one :websiteData="websiteData" :spinShow="spinShow"></website-one>
      <loading-block :spinShow="spinShow"
        :style="'position: fixed;left: 50%;bottom:'+bottom+'px;top: unset;width: unset;height: unset;'"
        v-if="spinShow"></loading-block>
    </section>
  </div>
</template>
<script>
  // import {Row,Col,Icon,Tooltip,Rate,Time,} from 'iview';
  import websiteOne from "@/components/pages/mains/websiteOne";
  import loadingBlock from "@/components/common/loadingBlock"; //loading
  export default {
    name: "mains",
    // components:{Row,Col,Icon,Tooltip,Rate,Time,},
    components: { websiteOne, loadingBlock },
    data() {
      return {
        advertList: [
          {
            id: 1, title: '月光宝盒',
            hrefUrl: 'https://www.baidu.com',
            imgUrl: 'https://sta-op.douyucdn.cn/nggsys/2020/09/21/1b879cfd94a48cd7253e4c05d31be3a3.jpg?x-oss-process=image/format,webp',
            downloadUrl: 'https//www.google.com',
            likeNum: 5,
            views: 500,
            time: (new Date()).getTime(),
            tooltipContent: '这里是月光宝盒的提示内容你可以仔细查看'
          }
        ],
        recommends: [
          {
            id: 1,
            title: '熊猫VPN',
            hrefUrl: 'https://www.baidu.com',
            imgUrl: 'https://se-zhan.xyz/wp-content/uploads/2020/08/pandavpn.png',
            version: '3.0',
            explain: '国内网友翻墙工具,免费vpsn',
            websiteInfo: '这是一个健康的提示',
            belongTag: [{ title: '回城工具', hrefUrl: 'www.baidu.com' }, { title: '免费工具', hrefUrl: 'www.baidu.com' }],
            state: [0, 1, 2, 3],
            downloadUrl: 'https://www.baidu.com',
            heartNum: 500,
            downloadNum: 20,
            likeNum: 2.5,
            new: true,
          }
        ],
        recommendsRankList: [
          {
            id: 1,
            title: '一个小团子',
            titleImg: 'http://apic.douyucdn.cn/upload/avatar_v3/201810/7bdc0080915292eac70eaa41f950792b_middle.jpg?x-oss-process=image/format,webp/quality,q_75',
            ranking: 'level',
            rankingNum: '',
          },
          {
            id: 2,
            title: '一个小团子2',
            titleImg: 'http://apic.douyucdn.cn/upload/avatar_v3/201810/7bdc0080915292eac70eaa41f950792b_middle.jpg?x-oss-process=image/format,webp/quality,q_75',
            ranking: 'over',
            rankingNum: '50',
          },
          {
            id: 3,
            title: '一个小团子3',
            titleImg: 'http://apic.douyucdn.cn/upload/avatar_v3/201810/7bdc0080915292eac70eaa41f950792b_middle.jpg?x-oss-process=image/format,webp/quality,q_75',
            ranking: 'under',
            rankingNum: '12',
          },
        ],
        stationList: [],
        yellowList: [],
        switchs: false,
        params: { page: 0, per_page: 8, belong: '', order: -1 },
        websiteId: {}, //总计多少项 对应异步加载数据状态
        websiteData: [],//方便提交数据
        spinShow: false,
        bottom: 0
      }
    },
    created() {
      this.classifyId()
      this.getWebsiteId()
      if (process.client) {
        window.onscroll = this.$common.throttle(() => {
          //变量scrollTop是滚动条滚动时，距离顶部的距离
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          //变量windowHeight是可视区的高度
          var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
          //变量scrollHeight是滚动条的总高度
          var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
          //滚动条到底部的条件 648 为website-one 的高度必须减去
          if (scrollTop + windowHeight >= (scrollHeight - 648)) {
            //写后台加载数据的函数,开启动画，滚动出现，请求后台
            this.spinShow = true
            let timer = setInterval(() => {
              this.bottom += 3
              if (this.bottom >= 60) {
                clearInterval(timer)
              }
            }, 20)
            this.params.page++
            this.getWebsite()
            console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
          }
        })
      }

    },
    mounted() {
      // this.getWebsite('website1')
    },
    methods: {
      //将website数据进行分类，方便后面的滚动加载请求频率不至于太高，每四条为一项
      classifyId() {
        //已知总计135项，其中第120,112项为空
        let websiteId = {}
        let item = 135 % 4 >= 0 ? ((135 - 135 % 4) / 4 + 1) : (135 / 4)
        for (let i = 1; i <= item; i++) {
          websiteId[`website${i}`] = false
        }
        Object.assign(this.websiteId, websiteId)
        this.$store.dispatch('asyncLoadingDataAdd', this.websiteId)
      },
      getWebsite(state) {
        console.log(state)
        return new Promise((resolve, reject) => {
          this.$api.webSite.getWebsite(this.params).then(res => {
            if (res.status === 1) {
              // this.websiteData.push(res.website.content)
              this.websiteData = [...this.websiteData, ...res.website.content]
              this.$store.commit('getNewAsyncData', state)
              this.spinShow = false
              return resolve('')
            }
          }).catch(error => {
            console.warn(error)
            return resolve()
          })
        })

      },
      //处理一下websiteId,websiteData数据 数据将前面的几项分离处理,并且将webSiteId,websiteData方便赋值数据
      getWebsiteId() {
        let websiteId = {}, state = this.$store.state.asyncLoadingData
        for (let item in state) {
          if (item.includes('website')) {
            websiteId[item] = false
          }
          this.websiteData[item] = []
        }
        this.websiteId = websiteId
      },

    },
    computed: {
      asyncLoadingDataWatch() {
        //解决 监听数据新旧值一致因为同源数据，所以用计算机属性https://blog.csdn.net/chenjing0823/article/details/96429867
        let obj = {}
        Object.assign(obj, this.$store.state.asyncLoadingData.scrollState)
        return obj
      }
    },
    watch: {
      'asyncLoadingDataWatch': {
        handler(newVal, oldVal) {
          let state = this.$store.state.asyncLoadingData.scrollState
          if (!this.$store.state.asyncLoadingData[state]) {
            this.params.belong = state.replace(/[^\d]/g, '')
            this.getWebsite(state)
          }
        },
        deep: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  /* //公共样式分享 相关内容栏 tool-header */
  @import "~/assets/css/commonmMixin.scss";
  @import "~/assets/css/components/index/mains.scss";
</style>