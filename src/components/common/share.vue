<template>
  <div class="mainUnit-share">
    <div class="mainUnit-tag-header">
      <span></span>
      <p>{{$t('app.share_article')}}</p>
      <span>{{title}}</span>
    </div>
    <div class="mainUnit-tag-share" >
      <!-- ShareThis BEGIN -->
      <loading-block :spinShow="spinShow"></loading-block>
      <!--                                <Sharethis share-this-embed-url=""/>-->
<!--      //platform-api.sharethis.com/js/sharethis.js#property=60024e75d8aa7c0013bd8ac9&product=sticky-share-buttons&cms=sop-->
<!--      <Sharethis share-this-embed-url="//platform-api.sharethis.com/js/sharethis.js#property=60024e75d8aa7c0013bd8ac9&product=sticky-share-buttons&cms=sop"/>-->
<!--      <share  :config="config"></share>-->
      <component v-if="Share" :is="Share" ref="shareContainer" :config="config"></component>
      <!--      <div class="sharethis-inline-share-buttons">{{$t('app.share')}}</div>-->
      <!-- ShareThis END -->
    </div>
  </div>
</template>

<script>
// import Sharethis from 'vue-sharethis' //社区分享
// import share from 'vue-social-share' //更好为新的分享组件
// import 'vue-social-share/dist/client.css';
import loadingBlock from "@/components/common/loadingBlock"; //loading
import setting from "@/setting"
export default {
  name: "Share",
  components:{loadingBlock},
  props:{
    url:{
      type:String,
      default:process.browser? window.location.href : ""
    }
  },
  data(){
    return{
      spinShow:true,
      Share:null,
      title:process.browser ?document.title : '',
      config: {
        url: `${setting.website}${this.$route.path}`, // 网址，默认使用 window.location.href
        // source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        // title: "", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        // description: "", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        // image: "", // 图片, 默认取网页中第一个img标签
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
    }
  },
  mounted() {
    //分享栏加载
    this.openShare().then(() => {
      this.spinShow = false
    })
  },
  methods:{
    async openShare(){
      try {
        const { default: Share } = await import('vue-social-share'); // 动态导入 Share 组件
        this.Share = Share;
      }catch (e) {
        console.error('Failed to load vue-social-share:', error);

      }
    }
  }
}
</script>

<style scoped lang="scss">
.mainUnit-share{
  margin-left: 0.15rem;
  .mainUnit-tag-header{
    margin-bottom: 0.14rem;
    padding-left: 0.25rem;
    border-left: 4px solid red;
    p{
      line-height: 25px;
      display: inline-block;
      &:before{
        content: "";
        display: block;
        width: auto;
        min-width: 30px;
        border-top: 1px solid #ddd;
        margin-bottom: 1em;
      }
      span{
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
  .mainUnit-tag-share{
    min-height: 68px;
    position: relative;
    padding: 10px 0;
    .sharethis-inline-share-buttons{
      text-align: center;
    }
  }
}
</style>
