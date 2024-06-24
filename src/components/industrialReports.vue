<template>
  <div class="container contents-bck">
    <div class="layout">
      <Row type='flex' justify="center" align="top" class-name="article">
        <Col :xl="{ span: 16 }" :lg="{span:20}" :md="{span: 24}" :xs="{span:24}"  class-name="content-left">
          <div class="card-body applyBck">
            <div class="panel-header">
              <h1 class="h3">{{setting.title}}获取AIGC行业报告 </h1>
            </div>
            <div class="panel-body mt-2">
              <p class="aligncenter">
                <img decoding="async" fetchpriority="high"
                     class=""
                     data-blog="blog1"
                     v-lazy="'/static/images/blog/1689222654896.png'"
                     alt="" width="1000" height="300" alt="一键免费获取AIGC行业报告,由navai.vip免费工具集合尊享导航提供">
              </p>
              <p style="padding-left: 0.5rem">图片生成由飞奔的牛排AI设计特别支持：</p>
              <div class="io-edit-post-card-content">
                <div class="url-card shortcode-url site_0 mx-auto col-10 col-md-6 ">
                  <div class="url-body default ">
                    <a :href="setting.website" target="_blank"
                       data-id="12035"
                       class="card no-c mb-4 site-12035" data-toggle="tooltip" title=""
                       data-original-title="国内知名在线AI设计作图&amp;amp;新媒体人必备素材库，AI设计，AI绘画，AI抠图，在线PS，图片编辑/延展等功能，将AI能力逐步渗透到灵感获取，创作，作品优化等环节，降低设计门槛，累计使用用户1亿+！">
                      <div class="">
                        <div class="url-logo">
                          <img class="unfancybox" v-lazy="logoUrl" height="auto" width="auto"
                               :alt="setting.title" data-was-processed="true"></div>
                        <div class="url-info flex-fill">
                          <div class="text-sm overflowClip_1"><strong style=" padding-left: 0.5rem;font-size: 15px;">飞奔的牛排AI设计</strong></div>
                          <p class="overflowClip_1 m-0 text-muted text-xs">一个励志成为行业领军者的AI设计师，ta&amp;amp;ta能用AI技术，打造出全新的行业报告，ta能通过AI设计，AI绘画，AI抠图，在线PS，图片编辑/延展等功能，将AI能力逐步渗透到灵感获取，创作，作品优化等环节，降低设计门槛！</p>
                        </div>
                      </div>
                    </a> <a
                    href="https://www.aigc.cn/go/?url=aHR0cHM6Ly93d3cuZ2FvZGluZy5jb20vdXRtcy82NTZiY2I4YjAxMTA0NzUxOTkzY2VkOWYzNDNmNDE4ZQ%3D%3D"
                    target="_blank" rel="external nofollow noopener" title="" class="togo text-center text-muted is-views"
                    data-id="12035" data-toggle="tooltip" data-placement="right" data-original-title="直达"><i
                    class="iconfont icon-arrow-r-m"></i></a></div>
                </div>
              </div>
              <h2><strong><b>夸克网盘资源：</b></strong></h2>
              <p>资源一：人工智能研究报告（持续更新中）：<a
                href="https://pan.quark.cn/s/f3f977a75253#/list/share" target="_blank"
                rel="nofollow noopener" class="external"><u>点击获取</u></a></p>
              <p>资源二：100个精选AI研究报告，成为AI专家：<a
                href="https://pan.quark.cn/s/af107ec27e61#/list/share" target="_blank"
                rel="nofollow noopener" class="external"><u>点击获取</u></a></p>
              <p>资源三：AI Agent研究报告（持续更新中）：<a
                href="https://pan.quark.cn/s/c748135a407b#/list/share" target="_blank"
                rel="nofollow noopener" class="external"><u>点击获取</u></a></p>
              <p>资源四：1000份AI大模型行业报告（持续更新中）：<a
                href="https://pan.quark.cn/s/9478d1a6e0b6#/list/share" target="_blank"
                rel="nofollow noopener" class="external"><u>点击获取</u></a></p>
              <p>资源五：1100份AIGC行业报告（持续更新中）：<a
                href="https://pan.quark.cn/s/56146957eb74#/list/share" target="_blank"
                rel="nofollow noopener" class="external"><u>点击获取</u></a></p>
              <p>资源均为网络整理，侵权删除！投诉请发邮件至 <strong class="external">{{setting.email}}</strong>。</p>
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
  name: "IndustrialReports",
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


</style>
