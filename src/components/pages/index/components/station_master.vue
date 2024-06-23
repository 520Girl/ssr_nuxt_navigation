<script >
export default {
  name: "StationMaster",
  props:{
    values:{
      type:Object,
      default:{
        "label": "站长推荐",
        "status": true,
        "index": 1,
        "value": "station_master"
      }
    }
  },
  data(){
    return {
      recommends:[
        {
          id:1,
          title:'熊猫VPN',
          hrefUrl:'https://www.baidu.com',
          imgUrl:'https://se-zhan.xyz/wp-content/uploads/2020/08/pandavpn.png',
          version:'3.0',
          explain:'国内网友翻墙工具,免费vpsn',
          websiteInfo:'这是一个健康的提示',
          belongTag:[{title:'回城工具',hrefUrl:'www.baidu.com'},{title:'免费工具',hrefUrl:'www.baidu.com'}],
          state:[0,1,2,3],
          downloadUrl:'https://www.baidu.com',
          heartNum:500,
          downloadNum :20,
          likeNum:2.5,
          new:true,
        }
      ],
      recommendsRankList:[
        {
          id:1,
          title:'一个小团子',
          titleImg:'http://apic.douyucdn.cn/upload/avatar_v3/201810/7bdc0080915292eac70eaa41f950792b_middle.jpg?x-oss-process=image/format,webp/quality,q_75',
          ranking:'level',
          rankingNum:'',
        },
        {
          id:2,
          title:'一个小团子2',
          titleImg:'http://apic.douyucdn.cn/upload/avatar_v3/201810/7bdc0080915292eac70eaa41f950792b_middle.jpg?x-oss-process=image/format,webp/quality,q_75',
          ranking:'over',
          rankingNum:'50',
        },
        {
          id:3,
          title:'一个小团子3',
          titleImg:'http://apic.douyucdn.cn/upload/avatar_v3/201810/7bdc0080915292eac70eaa41f950792b_middle.jpg?x-oss-process=image/format,webp/quality,q_75',
          ranking:'under',
          rankingNum:'12',
        },
      ],
    }
  }
}

</script>

<template>
  <div class="tool" style="height: 500px;" :id="values.value">
    <div class="station-master-left">
      <div class="tool-header auto-line-between ">
        <div class="left">
          <div class="heade-icon">
            <Icon type="md-bookmarks fontSize-icon " />
          </div>
          <h5 class="fontSize-text-mains">{{values.label}}</h5>
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
      <Row type='flex' justify="start" align="middle" class-name="mains-menu mx-2"  >
        <Col :xl="{ span: 4 }" :lg="{span:12}"  :sm="{span:12}" :xs="{ span: 12 }" class-name=" one-item" v-for="(item,index) in recommends" :key="index" >
          <Tooltip>
            <div class="item-content auto-line-between applyBck">
              <a :href="item.hrefUrl" class="item-left" target="_blank">
                <img v-lazy="item.imgUrl" data-app="image1" :alt="item.title">
              </a>
              <div class="item-right ">
                <div class="title ">
                  <a href="" class="fontSize-text fontSize-text-app"><span class="new" v-if="item.new">New</span>{{item.title}} <span>-</span><span>{{item.version}}</span></a>
                </div>
                <div class="info overflow-eclipse fontSize-text-color">
                  {{item.explain}}
                </div>
                <div class="app-like">
                  <div class="app overflow-eclipse">
                    <a :href="`/app/tag/${item}/1`" v-for="(item1,index1) in item.belongTag" :key="index1" target="_blank" item-characteristic>{{item.title}}</a>
                  </div>
                </div>
              </div>
              <div class="item-characteristic">
                <Icon :type="item1== 0 ? 'logo-apple':item1 == 1 ? 'logo-android' : item1 == 2 ? 'md-desktop': 'md-tablet-portrait'" v-for="(item1,index1) in item.state" :key="index1"  :title="item1"/>
              </div>
              <div @click="$common().goto(item.downloadUrl)" class="cloud-download">
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
            <div slot="content" >{{item.websiteInfo}}</div>
          </Tooltip>
        </Col>
      </Row>
    </div>
    <div class="station-maste-rankList">
      <div class="rankList-header auto-line-between">
        <h5><Icon type="md-archive" />下载排行榜</h5>
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
                  <span :class="item.id == 1 ? 'one' : item.id == 2 ? 'two' : item.id == 3 ? 'three' : 'default'"></span>
                </div>
                <div class="main-title">
                  <img :src="item.titleImg" :alt="item.title">
                </div>
                <span class="fontSize-text-app name overflow-eclipse">{{item.title}}</span>
              </div>
              <div class="main-trend">
                <Tooltip v-if="item.ranking != 'level'">
                  <span :class="item.ranking == 'level'? 'change1': item.ranking == 'over'? 'change2': 'change3'"></span>
                  <div slot="content" >
                    <span :style="item.ranking == 'level'? ' ': item.ranking == 'over'? 'color:#ff5d23;': 'color:#5ec48f'">{{item.rankingNum}}个</span>
                  </div>
                </Tooltip>
                <div v-else>
                  <span :class="item.ranking == 'level'? 'change1': item.ranking == 'over'? 'change2': 'change3'"></span>
                  <div slot="content" :style="item.ranking == 'level'? 'display:none; ': item.ranking == 'over'? ' ': ' '">
                    <span :style="item.ranking == 'level'? ' ': item.ranking == 'over'? 'color:#ff5d23;': 'color:#5ec48f'">{{item.rankingNum}}个</span>
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
  </div>
</template>

<style scoped lang="scss">
@import "~@/assets/css/commonmMixin.scss"; //公共样式分享 相关内容栏 tool-header
@import "~@/assets/css/components/index/mains.scss";
</style>
