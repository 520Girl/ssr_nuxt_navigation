<template>
  <div class="container contents-bck">
    <div class="layout ">
      <Row type='flex' justify="center" align="top" class-name="article">
        <Col :xl="{ span: 24 }" :lg="{span:24}" :md="{span: 24}" :xs="{span:24}" class-name="content-left">
          <div class="card-body applyBck">
            <div class="panel-header">
              <h1 class="h3">{{ setting.title }}联系删除 </h1>
            </div>
            <div class="panel card">
              <div class="card-body">
                <div class="panel-body mt-2"><p><strong>网站声明</strong></p>
                  <p>1、navai.vip遵守相关法律法规，由于本站资源全部来源于网络，故无法核实资源侵权的真实性；</p>
                  <p>2、出于传递信息之目的，故 navai.vip网站可能会误刊发损害或影响您的合法权益，请您积极联系处理；</p>
                  <p>3、因时间、精力有限，我们登载时尽最大努力核实了每一条消息的真实性和可靠性；</p>
                  <p>4、无论出于何种目的要求本站删除内容，“您”均需要提供相关证明，否则不予处理；</p>
                  <hr class="zcjun-owo the-best-plugins wp-block-separator">
                  <p><strong>主体要求</strong></p>
                  <p>1、无论是因我站侵权还是刊发内容可能影响到您的权益，所有删除、修改请求仅允许相关权利人申请;</p>
                  <p>2、您如果希望删除、修改内容，首先您必须是直接权利人且必须可以提供相关证明文件;</p>
                  <p>3、非直接权利人例如关联公司、朋友等，需持有直接权利人的授权证明;</p>
                  <hr class="zcjun-owo the-best-plugins wp-block-separator">
                  <p><strong>处理流程</strong><br>1、所需材料:直接权利人的证明文件、权利人给予处理人的授权文件、删改说明，以上文件均需加盖公章；
                  </p>
                  <p>2、填写完成上述文件后请打印并加盖公章后将扫描件发送至 ：<a :href="'mailto:'+setting.email" class="external" >（{{ setting.email }}）</a></p>
                  <p>3、注意 : 仅上述邮箱接受删改请求、仅支持通过邮箱联系(便于日后查证)</p>
                  <hr class="zcjun-owo the-best-plugins wp-block-separator">
                  <p><strong>注：</strong></p>
                  <p>1、为保证本站正常运作，凡是无法提供完整证明文件的请求本站一律不予处理，请谅解;</p>
                  <p>2、因时间精力有限，凡是无法提供完整证明文件的请求本站均不会回复邮件，请谅解;</p>
                  <p>3、符合删改条件的请求本站会在<strong>72小时内</strong>处理，无论是否按照您的要求删改页面，均会通过邮件回复;
                  </p>
                  <p>4、本站不接受任何付费删帖、亦未授权任何代理公司负责删帖，请勿轻信任何谣传谨防<strong><span
                    style="color: #ff0000;">上当受骗</span></strong>！</p></div>
              </div>
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
  name: "Deleteinformation",
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
.h3 {
  text-align: left;
}
hr{
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, .1);
}
strong{
  font-size: 16px;
}
</style>
