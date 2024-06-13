<template>
  <div class="embody-container">
    <div class="embody-layout  mx-15-2 ">
      <div class="card-body applyBck">
        <div class="panel-header"><h1 class="h3">AIGC工具导航提交入口 </h1></div>
        <div class="panel-body mt-2">
          <p style="margin-bottom: 20px;text-align: center;">
            <span style="font-size: 19px;">免费收录全品类AIGC应用-助力AI应用健康有序发展</span>
          </p>
          <p style="font-size: 17px">
            <font style="font-size: 17px">
              为了避免恶意投稿导致服务器负载过大，我们决定调整工具提交方式。经过深思熟虑，我们决定采用邮件形式接收工具提交，以保证网站的稳定运行。感谢您的理解和配合。
            </font>
          </p>
          <p style="font-size: 16px">
            感谢您对AIGC工具导航的支持！我们欢迎广大AI工具开发者提交优质的AI工具网址。我们将严格遵守<strong>《生成式人工智能服务管理暂行办法》</strong>，并要求所有提交的工具符合法律法规。</p>
          <h2>提交指南</h2>
          <ul>
            <li><span class="order-1 fontSize-text-colornoH">1</span><strong>合法合规</strong>：请确保您提交的工具符合法律法规，我们不接受任何非法应用的提交。
            </li>
            <li><span class="order-2 fontSize-text-colornoH">2</span><strong>审核流程</strong>：由于近期收到的投稿工具较多，我们需要一一审核网站的备案情况。请各位开发者耐心等待，我们会尽快完成审核。
            </li>
            <li><span class="order-3 fontSize-text-colornoH">3</span><strong>提交材料</strong>：为了节约时间，提交前请先准备好以下材料：工具名称、链接、标签、简介。
            </li>
            <li><span class="order-4 fontSize-text-colornoH">4</span><strong>国际站点</strong>：如果您希望您的工具能够在国际上获得更多的曝光，您可以将网址提交到我们的国际站点<a
              :href="`${setting.website}go/?url=aHR0cHM6Ly93d3cuZ2VuYWluYXYuY29tLw%3D%3D`" target="_blank"
              rel="nofollow noopener" class="external">GenAINav.com</a></li>
          </ul>
          <h2>提交示例</h2>
          <ul>
            <li>
              <span class="order-1 fontSize-text-colornoH">1</span>
              应用名称：AIGC导航【可带4-6字副标题】
            </li>
            <li>
              <span class="order-2 fontSize-text-colornoH">2</span>
              工具链接：<a :href="setting.website" title="" class="fontSize-text i-f-c"> {{setting.website}}</a>【请注意https/http,以及网址是否拼写正确】
            </li>
            <li>
              <span class="order-3 fontSize-text-colornoH">3</span>
              分类类别：<a class="external" :href="`${setting.website}favorites/ai-writing-tools`" title="查看与 AI写作 相关的文章"
                      target="_blank">AI写作</a>平台-AI<a class="external"
                                                      :href="`${setting.website}favorites/ai-writing-tools`"
                                                      title="查看与 写作 相关的文章" target="_blank">写作</a>工具【如没有您工具的分类，可新建分类，我们酌情调整】
            </li>
            <li><span class="order-4 fontSize-text-colornoH">4</span>网址标签：AIGC导航、AI工具、AI导航、生成式AI导航【希望出现的关键词】</li>
            <li><span class="order-5 fontSize-text-colornoH">5</span>应用简介：全品类AIGC创作工具_生成式AI导航平台！【一句话简介，最好控制在16-20个字符】
            </li>
            <li><span class="order-6 fontSize-text-colornoH">6</span>应用详情：工具介绍+工具特色+使用教程+常见问题【可包含1-3张图片，单张图片大小不大于300K】
            </li>
            <li><span class="order-7 fontSize-text-colornoH">7</span>应用标识：100×100像素即可【文件大小，小于30K】</li>
            <li><span class="order-8 fontSize-text-colornoH">8</span>备案信息：地ICP备2024012345号【不填写不予通过】</li>
            <li><span class="order-9 fontSize-text-colornoH">9</span>联系方式：电话、邮箱、微信、QQ均可</li>
            <li><span class="order-10 fontSize-text-colornoH">10</span>其它说明：如您提交的是二维码、小程序，将二维码贴到邮件即可</li>
          </ul>
          <h2>工具提交结果通知</h2>
          <p>无论您提交的AI工具是否通过我们的审核，我们都会及时向您反馈结果。审核通过的工具将被收录在我们的平台上，未通过审核的工具我们也会通过邮件告知您具体原因。</p>
          <p>请将您的工具提交至我们的邮箱：<span class="i-f-a fontSize-text-app">{{setting.email}}</span>。我们将尽快处理您的提交，并通过邮件通知您审核结果。感谢您对AIGC工具导航的支持和理解。
          </p>
          <p>请注意，如果链接无法访问或因其他原因不符合我们的要求，我们将会撤销链接。我们对此带来的不便表示歉意，并感谢您的理解和支持！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import setting from "@/setting.js";
export default {
  name: "embody",
  data(){
    return {
      setting
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/commonmMixin.scss"; //公共样式分享
.card-body {
  padding: 20px 20px;
  margin: 0px 1rem 0.5rem 1rem;
  border-radius: 10px;

  .panel-header {
    margin-bottom: 35px;

    h1 {
      font-size: 0.28rem;
    }
  }

  .panel-body {
    p {
      margin-bottom: 20px;
      line-height: 30px;
      font-size: 16px;
    }

    h2 {
      font-size: 20px;
      border-left: 3px solid #f1404b;
      margin-left: -23px;
      border-color: #2475d3;
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
}
</style>
