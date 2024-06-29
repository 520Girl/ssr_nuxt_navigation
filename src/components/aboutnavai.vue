<template>
  <div class="embody-container">
    <div class="embody-layout  mx-15-2 ">
      <div class="card-body applyBck">
        <div class="panel-header">
          <h1 class="h3">关于AI免费工具尊享导航 </h1>
        </div>
        <p style="text-align: center;">
          <img loading="lazy" class="size-full wp-image-962 aligncenter"
                src="https://navai.vip/images/logoside.png" alt="" width="350" height="100" :alt="setting.title">
        </p>
        <h2 style="text-align: center;"><strong style="font-size: 20px;">关于{{setting.title}}</strong></h2>
        <p style="">&nbsp; &nbsp; &nbsp;
          &nbsp;{{setting.title}}已经被Google、Bing、Qwant、YOU.com、百度、雅虎、F搜、知识星球等绝大多数平台收录。目前推荐国内外AI应用1000+，网址分类包含：国际工具导航、搜索引擎、内容检测器、文本<a
            class="external" :href="setting.website+'/favorites/6087'" title="查看与 写作 相关的文章"
            target="_blank">写作</a>、智能翻译、办公工具、文本营销、财务事务、聊天机器人、语音合成、音乐制作、绘画生成、图像化身、图像合成、3D生成、视频技术、数字虚拟人、生命科学、游戏应用、产品导购、无代码创作等40个细分领域。在<a
            :href="setting.website+'/favorites/700'" target="_blank"
            rel="nofollow noopener"
            class="external" style="color: red;font-size: 18px;">navai.vip</a>你可以发现来自全球创业者发布的优质AI工具，现阶段的AI工具趋于成熟，使用它们可以为你打开新的窗户，看见更大、更精彩的创作空间。项目团队还在持续挖掘优质的<a
            class="external external" title="navai.vip工具导航进行搜集整理"
            :href="setting.website" target="_blank"
            rel="noopener">AI导航</a>，测试后会推荐给广大创作者们。发现全球优质AI导航工具，与创作者一同成长！navai.vip期待与你相遇。
        </p>
        <p style="padding-left: 40px;">&nbsp; &nbsp; &nbsp; &nbsp;-本文由AI工具写作助手腾讯Effidit协助完成。</p>
        <h2 style="text-align: center; "><strong>ABOUT A COLLECTION OF FREE AI TOOLS</strong></h2>
        <p style="padding-left: 40px;">&nbsp; &nbsp; &nbsp; COLLECTION OF FREE AI TOOLS navigation has been included by
          Google,
          Bing, Qwant, YOU.com, Baidu, Knowledge Planet and most other platforms. At present, 1000+ AI
          applications at
          home and abroad are recommended. Url classification includes: International tool navigation, search
          engine,
          content detector, text writing, intelligent translation, office tools, text marketing, financial
          affairs,
          chatbot, speech synthesis, music production, painting generation, image avatar, image synthesis, 3D
          generation, video technology, digital virtual human, life science, game application, product
          shopping guide,
          no code creation and other 40 subdivisions. On navai.vip, you can find quality AI tools published by
          entrepreneurs from all over the world. AI tools at this stage are becoming mature. Using them can
          open new
          Windows for you to see a bigger and more wonderful creative space. The project team is also
          continuing to
          develop high-quality navai tools, which will be tested and recommended to creators. Discover global
          quality
          navai tools and grow together with creators! navai.vip looks forward to meeting you.</p>
        <p style="padding-left: 40px;">&nbsp; &nbsp; &nbsp; &nbsp;– This article was completed with the assistance of Tencent Effidit, an AI tool writing assistant.</p>
        <p style="padding-left: 40px; text-align: right;">Translation from: GOOGLE</p>
      </div>
    </div>
  </div>
</template>

<script>
import setting from "@/setting"
export default {
  head(){
    const {fullPath,meta} = this.$route;
    // const {title:asyncData_title,websiteInfo} = this.gradeCoinContent.content
    // const title = `${meta.title.slice(0,meta.title.indexOf(',')+1)}-${asyncData_title}的${meta.title.slice(meta.title.indexOf(',')+1)}`
    // const description = `${meta.description.slice(0,meta.description.indexOf(',')+1)}${websiteInfo},${meta.description.slice(meta.description.indexOf(',')+1)}`
    // const imgUrl = `${setting.website}static/images/gradeCoin/${asyncData_imgUrl}`
    const title = meta.title
    const description = meta.description
    const imgUrl = ''
    return {
      title: title,
      meta: [
        {hid: 'description', name: 'description', content:description},
        {hid: 'keywords', name: 'keywords', content: title},
        {name:'og:url', property: 'og:url', content:`${setting.website}${fullPath}`},
        {name:'og:title', property: 'og:title', content:title},
        {name:'og:description', property: 'og:description', content:description},
        // {name:'og:image', property: 'og:image', content: imgUrl},
        {hid: 'author', name: 'author', content: 'navai'},
      ]
    }
  },
  name: "Aboutnavai",
  data(){
    return{
      setting:setting
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/commonmMixin.scss"; //公共样式分享
.card-body {
  padding: 0.2rem 0.2rem;
  margin: 0px 1rem 0.5rem 1rem;
  border-radius: 10px;
  .panel-header {
    margin-bottom: 35px;

    h1 {
      font-size: 0.28rem;
    }
  }

    p {
      margin-bottom: 20px;
      line-height: 30px;
      font-size: 16px;
    }

    h2 {
      font-size: 20px;
      border-left: 3px solid #f1404b;
      margin-left: -23px;
      padding-left: 20px;
      margin-bottom: 20px;
      line-height: 40px;
    }

    ul {
      @include order-sequence;
      li {
        margin: 15px 0px;
        padding-left: 15px;
        line-height: 20px;

        span {
          display: inline-block;
          margin-right: 15px;
          border-radius: 5px;
          height: 20px;
          line-height: 20px;
          width: 20px;
          text-align: center;
        }
      }
    }
}
</style>
