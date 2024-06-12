

<template>
  <div class="tool" style="height: 500px;" :id="values.value">
    <div class="tool-header auto-line-between ">
      <div class="left">
        <div class="heade-icon">
          <Icon type="md-bookmarks fontSize-icon " />
        </div>
        <h5 class="fontSize-text-mains">{{values.label}}</h5>
      </div>
      <div class="right auto-line-between">

      </div>
    </div>
    <Row type='flex' justify="start" align="middle" class-name="advert-menu mx-2"  >
      <Col :xl="{ span: 3 }" :sm="{ span:6}" :xs="{ span: 12 }" class-name="two-item " v-for="(item,index) in advertList" :key="index">
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
                <span><Icon type="md-bookmarks" />{{item.views}}</span>
                <span><Icon type="ios-rose" />{{item.likeNum}}</span>
              </div>
              <a :href="item.hrefUrl" target="_blank" class="metas-button">进入</a>
            </div>
            <div class="official">
              <span></span>
              <span></span>
            </div>
            <h5 class="fontSize-text-app overflow-eclipse fontSize-text-color">{{item.title}}</h5>
            <div class="download">
              <router-link :to="item.downloadUrl"  target="_blank" class=""><Icon type="ios-cloud-download" />下载</router-link>
            </div>
          </div>
          <div slot="content">{{item.tooltipContent}}</div>
        </Tooltip>

      </Col>
      <div class="menu-diamond">
      </div>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'AdvertGroom',
  props:{
    values:{
      type:Object,
      default:{
        "label": "广告赞助商",
        "status": true,
        "index": 4,
        "value": "advert_groom"
      }
    }
  },
  data() {
    return {
      advertList:[
        {id:1,title:'月光宝盒',
          hrefUrl:'https://www.baidu.com',
          imgUrl:'https://sta-op.douyucdn.cn/nggsys/2020/09/21/1b879cfd94a48cd7253e4c05d31be3a3.jpg?x-oss-process=image/format,webp',
          downloadUrl:'https//www.google.com',
          likeNum:5,
          views:500,
          time:new Date(),
          tooltipContent:'这里是月光宝盒的提示内容你可以仔细查看'
        }
      ],
    }
    }
}
</script>

<style scoped lang="scss">
@import "~@/assets/css/commonmMixin.scss"; //公共样式分享 相关内容栏 tool-header
@import "~@/assets/css/components/index/mains.scss";
</style>
