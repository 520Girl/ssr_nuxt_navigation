<script >
  export default {
    name: "youthTv",
    props:{
      values:{
        type:Object,
        default:{
          "label": "youtube视频",
          "status": true,
          "index": 2,
          "value": "youth_Tv"
        }
      }
    },
  }
</script>

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
        <div class="number fontSize-text">
          当前数量<span class='nums'>5000</span>个
        </div>
        <span class="line"></span>
        <div class="more fontSize-text">更多
          <Icon type="ios-arrow-forward" />
        </div>
      </div>
    </div>
    <Row type='flex' justify="start" align="middle" class-name="mains-menu"  >
      <div class="menu-diamond">

      </div>
    </Row>
  </div>
</template>

<style scoped lang="scss">
@import "~@/assets/css/commonmMixin.scss"; //公共样式分享 相关内容栏 tool-header
@import "~@/assets/css/components/index/mains.scss";
</style>
