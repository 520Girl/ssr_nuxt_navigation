<template>
  <div class="container contents-bck">
    <div class="layout ">
      <Row type='flex' justify="center" align="top" class-name="article">
        <Col :xl="{ span: 18 }" :lg="{span:18}" :md="{span: 24}" :xs="{span:24}" class-name="content-left">
          <div class="card-body applyBck">
            <div class="panel-header">
              <h1 class="h3">{{ setting.title }}免责声明 </h1>
            </div>
            <div class="panel-body mt-2"><p style="text-align: center;"><img decoding="async" class="size-full wp-image-962 aligncenter"
                                                 v-lazy="mobileLogo" :alt="setting.title"
                                                 width="360" height="80"></p>
              <p style="text-align: center;"><strong><span ><span style="font-size: 18pt;">免 责 声 明</span></span></strong>
              </p>
              <p><span >&nbsp; &nbsp; &nbsp; &nbsp;{{setting.title}}仅为网址导航网，离开本站后，本站对其内容不负任何责任！对于该外部链接的指向，不由本站实际控制。本站在收录该网站时，已对其内容进行审核，收录时网页上的内容都属于合规合法，<strong><span
                style="color: #ff0000;">后期网页的内容如出现违规</span></strong>，可以直接联系本站管理员进行删除<a :href="'mailto:'+setting.email" class="external" >（{{ setting.email }}）</a>，本站不承担任何责任。</span>
              </p>
              <p><span style="font-size: 16px;color: #800000;">&nbsp; &nbsp; &nbsp; 特此声明！</span></p>
              <p style="text-align: center;"><strong><span style="font-size: 18pt;">DISCLAIMER</span></strong></p>
              <p>&nbsp; &nbsp; &nbsp; navai.vip navigation is only a website navigation network. The Website is not
                responsible for its contents after leaving this site. The point of the external link is not under the
                actual control of this site. This site in the collection of the site, has been on the content of the
                audit, collected when the content of the page belong to the legal compliance, <strong><span
                  style="color: #ff0000;">the content of the later page such as violation</span></strong>, can directly
                contact the site administrator to delete<a :href="'mailto:'+setting.email" class="external" >（{{ setting.email }}）</a>, this
                site does not assume any responsibility.</p>
              <p>I hereby declare!</p>
              <p style="text-align: right;">Translation from Youdao</p>
              <p>&nbsp;</p></div>
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
  name: "Disclaimer",
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
.aligncenter{
  width: unset;
}
</style>
