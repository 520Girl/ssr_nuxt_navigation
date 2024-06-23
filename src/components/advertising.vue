
<template>
  <div class="advertising-container">
    <div class="advertising-layout  mx-15-2 ">
      <Row type='flex' justify="center" align="top" >
        <Col class="advertising-pic" :lg="{span:11}" :xs="{ span: 24 }" >
          <img src="@/assets/images/clutter/advertising.png" data-grade="gradeCoin2" :alt="$t('title')" />
        </Col>
        <Col class="advertising-info" :lg="{span:12}" :xs="{ span: 24 }" >
        <div class="vol">{{$t('advertise.vol')}}</div>
        <div class="share">
          <h1>{{$t('title')}}</h1>
          <div class="share-button">
            <share :url="setting.website"></share>
          </div>
        </div>
        <div class="content">
          <div style="line-height: 20px;">
            <span style="padding-left: 20px;"> {{$t('advertise.content_t')}}：</span>
            <p>
              <span style="padding-left: 20px;"></span>
              " {{$t('advertise.content')}} "
            </p>
            <span class="fontSize-text-colornoH">{{$t('advertise.content_info')}}：{{setting.email}} </span>
            <span style="color: red;font-size: 14px;font-weight: bold;padding-top: 10px;">{{$t('advertise.content_s')}} </span>
          </div>
        </div>
      </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import setting from "@/setting"
export default {
  name: "advertising",
  data(){
    return{
      setting:setting
    }
  },
  computed: {
    title(){
      return this.$t('title')
    }
  },
}
</script>

<style lang="scss" scoped>
  .advertising-container{
    .advertising-layout{
      .advertising-pic{
        display: inline-block;
        vertical-align: top;
        img{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      .advertising-info{
        padding: 32px;
        display: inline-block;
        .vol{}
        .share{}
        .content{
          p{
            line-height: 20px;
          }
        }
      }
    }
  }
</style>
