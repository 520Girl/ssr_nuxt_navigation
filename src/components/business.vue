<template>
  <div class="container contents-bck">
    <div class="layout ">
      <Row type='flex' justify="center" align="top" class-name="article">
        <Col :xl="{ span: 24 }" :lg="{span:24}" :md="{span: 24}" :xs="{span:24}" class-name="content-left">
          <div class="card-body applyBck">
            <div class="panel-header">
              <h1 class="h3">{{ setting.title }}联系我们 </h1>
            </div>
            <div class="panel-body mt-2">
              <p><img decoding="async" class="aligncenter wp-image-27342"
                      v-lazy="mobileLogo" alt="" width="280"
                      height="152"></p>
              <blockquote class="wp-block-quote"><p><span style="color: #3366ff;"><strong>工具收录：</strong></span>欢迎广大网友、开发者进行提交好用的<span
                style="color: #ff0000;"><strong>人工智能</strong></span><strong>工具</strong>网址或应用，管理会尽快审核！
              </p>
                <p style="text-align: center;">点击：<a href="/advertising" class="external" target="_blank">一键提交</a></p></blockquote>
              <p style="text-align: center;">或：</p>
              <blockquote class="wp-block-quote"><p><strong><span style="color: #ff0000;">商务合作：</span>如有想法可直接发送邮件至：<a :href="'mailto:'+setting.email" target="_blank">{{setting.email}}</a>，收到邮件后，会尽快回复！</strong>
              </p></blockquote>

              <p style="text-align: center;"><img decoding="async" class="aligncenter"
                      width="380"
                      height="380"
                      style="width: 3.8rem; height: 3.8rem;"
                      v-lazy="'/static/images/erweima.png'"></p>
             </div>
          </div>
        </Col>
      </Row>

    </div>
  </div>
</template>

<script>
import setting from "@/setting"
import {mapGetters} from "vuex";

export default {
  name: "business",
  data() {
    return {
      setting: setting
    }
  },
  computed: {
    ...mapGetters(['logoUrl','title','mobileLogo']),
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/commonmMixin.scss";

@include collect-page-layout;
.h3 {
  text-align: left;
}
blockquote {
  position: relative;
  padding: .2rem 0 .2rem 0.3rem;
  margin: 0.3rem 0;
  border-left: 5px solid rgba(136, 136, 136, .2);
  background-color: rgba(136, 136, 136, .1);
}
p{
  margin-bottom: 0!important;
}
</style>
