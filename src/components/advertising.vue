<template>
  <div class="advertising-container">
    <div class="advertising-layout  mx-15-2 ">
      <Row type='flex' justify="center" align="top" >
        <Col class="advertising-pic" :lg="{span:11}" :xs="{ span: 24 }" >
          <img src="@/assets/images/clutter/advertising.png" data-grade="gradeCoin2" :alt="setting.title" />
        </Col>
        <Col class="advertising-info" :lg="{span:12}" :xs="{ span: 24 }" >
        <div class="vol">亲爱的：您好</div>
        <div class="share">
          <h1>名称</h1>
          <div class="share-button">
            <share :url="setting.website"></share>
          </div>
        </div>
        <div class="content">
          <p>
            <span style="padding-left: 20px;">  </span>以下是我为你准备的一段话：
            " 在这个信息爆炸的时代，我们每天都被大量的广告所包围。然而，有些广告只是简单地传递产品的信息，而缺乏真正的深度和情感。但是，我想向你推荐一个与众不同的网站，一个能够给你带来更多的思考和共鸣的地方。
            在这个网站上，你将不仅仅是一个被动的观众，而是一个有机会参与和交流的成员。这里有着丰富多样的内容，涵盖了各种感兴趣的话题，无论是艺术、科技、文化还是生活方式，你都能找到自己的兴趣点。
            更重要的是，这个网站的广告投注不仅仅是为了盈利，而是为了支持那些有价值的项目和创意。你的每一次投注都将成为项目的支持，帮助他们继续发展和成长。
            所以，我真诚地邀请你来到这个网站，不仅仅是为了投注广告，更是为了与我们一起探索、学习和成长。在这里，你将不仅仅是一个观众，而是一个有机会改变和影响的人。让我们一起创造一个更有深度和意义的广告世界！"
            <span class="fontSize-text-colornoH">如果有需要请联系我：{{setting.email}} </span>
            <span style="color: red;font-size: 12px;">还在首页为您制作了专门的区域 </span>
          </p>
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
  }
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
