<template>
  <div class="container contents-bck">
    <div class="layout ">
      <Row type='flex' justify="center" align="top" class-name="article">
        <Col :xl="{ span: 20 }" :lg="{span:20}" :md="{span: 24}" :xs="{span:24}"  class-name="content-left">
          <div class="card-body applyBck">
            <div class="panel-header">
              <h1 class="h3">{{setting.title}}互推计划 </h1>
            </div>
            <div class="panel-body mt-2"><p>我们很高兴地宣布{{setting.title}}的新计划 –&nbsp;<strong>互推计划</strong>。这个计划旨在与各产品团队进行联名推广，通过互相借力，共同提升品牌影响力和用户关注度。
            </p>
              <h2>计划内容</h2>
              <ul>
                <li><strong>联名推广</strong>：我们将与您的产品团队进行联名推广，共同在市场上提升品牌知名度。我们将在我们的平台上展示您的产品，同时，我们也期待您在您的平台上提及我们的服务。
                </li>
                <li><strong>活动协办</strong>：我们可以作为活动的协办单位，共同举办各类活动，以吸引更多用户的关注。这可以是线上的网络活动，也可以是线下的实体活动。我们将共同策划活动内容，确保活动的成功进行。
                </li>
                <li><strong>新媒体推广</strong>：我们可以在新媒体平台上互相挂名推广，扩大品牌的影响力。我们将在社交媒体、博客、论坛等平台上进行推广，同时也欢迎您在您的新媒体平台上提及我们。
                </li>
                <li><strong>灵活合作</strong>：我们欢迎各种形式的合作，如果您有任何其他的想法或建议，我们都非常乐意听取和探讨。无论是产品的联合开发，还是市场的共同开拓，我们都期待与您的合作。
                </li>
              </ul>
              <p>我们相信，通过互推计划，我们可以共同提升品牌的影响力，扩大产品的市场份额，实现共赢。</p></div>
          </div>
        </Col>
      </Row>

    </div>
  </div>
</template>

<script>
import setting from "@/setting"

export default {
  name: "reciprocalProject",
  data() {
    return {
      setting: setting
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/commonmMixin.scss";

@include collect-page-layout;
.h3{
  text-align: left;
}
ul,ol{
  list-style: disc;
  padding-left: 50px;
}
</style>
