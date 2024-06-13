<template>
  <div class="footer-container">
    <div class="footer-tools">
<!--      到顶部-->
      <div href="javascript:void(0)" class="btn auto-line-center" @click="$common().scrollClickTop()">
        <Tooltip content="回到顶部" placement="left">
          <i class="iconfont icon-daohang fontSize-icon"></i>
        </Tooltip>
      </div>
<!--      到顶部-->
<!--     打开导航-->
      <div href="javascript:void(0)" class="btn auto-line-center" @click="handleSidebar" v-if="$route.name == 'detailed'" >
        <Tooltip content="导航" placement="left">
          <Icon type="ios-keypad-outline fontSize-icon"></Icon>
        </Tooltip>
      </div>
<!--     打开导航-->
<!--      黑白主题 -->
      <div v-if="$store.state.themes == 'dark'" href="javascript:void(0)" class="btn auto-line-center" @click="theme('light')">
        <Tooltip content="切换主题 " placement="left">
          <i class="iconfont icon-rijianmoshi fontSize-icon"></i>
        </Tooltip>
      </div>
      <div v-else href="javascript:void(0)" class="btn auto-line-center"  @click="theme('dark')">
        <Tooltip content="切换主题 " placement="left">
          <i class="iconfont icon-dark fontSize-icon"></i>
        </Tooltip>
      </div>
<!--      黑白主题 -->
    </div>
    <!--<external-script src='https://widget.heweather.net/simple/static/js/he-simple-common.js?v=1.1'></external-script>-->
    <div class="footer-body mx-15-2">
      <Row type='flex' justify="center" align="top" class-name="footer applyBck">
        <Col :sm="{span:7}" :xs="{ span: 24 }" class="footer-li">
          <a class="footer-logo" :href="website" :title="title">
            <img :src="mobileLogo" class="logo-light" :alt="title" height="71.5" width="254">
            <img :src="mobileLogo" class="logo-dark" :alt="title" height="71.5" width="280">
          </a>
          <div class="text-sm">
            <span class="fontSize-text i-f-a">
              AI免费工具集合尊享，是一个全方位的平台，一个聚合全球优质AI智能导航,包括
            </span>
            <router-link :to="{path:'/favorites/253'}" title="AI绘画">AI绘画</router-link>、
            <router-link :to="{path:'/app'}" title="AI应用">AI应用</router-link>、
            <router-link :to="{path:'/cartoon'}" title="AI漫画">AI漫画</router-link>、
            <router-link :to="{path:'/blog'}" title="AI新闻">AI新闻</router-link>、
            <router-link :to="{path:'/image'}" title="AI图片">AI图片</router-link>、
            <router-link :to="{path:'/favorites/403'}" title="AI语音">AI语音</router-link>、
            <router-link :to="{path:'/favorites/252'}" title="AI音乐">AI音乐</router-link>、
            <router-link :to="{path:'/favorites/2336'}" title="AI论文">AI论文</router-link>、
            <router-link :to="{path:'/favorites/3611'}" title="AI简历">AI简历</router-link>、
            <router-link :to="{path:'/favorites/635'}" title="AI数字人">AI数字人</router-link>、
            <router-link :to="{path:'/favorites/937'}" title="文本转语音">文本转语音</router-link>
            等，还包括
            <router-link :to="{path:'/favorites/2481'}" title="AIPPT">AIPPT</router-link>
            <router-link :to="{path:'/favorites/gradeCoin'}" title="AI评分宝">AI评分宝</router-link>
            <router-link :to="{path:'/favorites/2481'}" title="ChatPPT">ChatPPT</router-link>
            <span class="i-f-c">
              等常用AI工具！在这个平台上，
            </span>
            <p class="fontColor" style="line-height: 18px;">
              你可以阅读到最新的漫画，获取实时新闻，享受AI技术带来的美图，方便快捷地下载APP，使用智能导航找到你想要的内容，并且通过评分宝来评价和分享你的体验。我们的目标是让每个用户都能在
              <a :href="website" class="fontSize-text-orange" target="_blank" :title="title">navai.vip</a>
              找到他们想要的，
              无论是娱乐、信息还是服务，我们都为你一网打尽。这里是你的个性化网络空间，
              一切尽在
              <a :href="website" class="fontSize-text-orange " target="_blank" :title="title">navai.vip</a>
            </p>
          </div>
        </Col>
        <Col :sm="{span:10}" :xs="{ span: 24 }" class="footer-li">
          <p class="footer-links fontSize-text-app">按下Ctrl+D或⌘+D 感谢收藏AIGC.CN</p>
          <div class="footer-nav-links">
            <li class="menu-item">
              <a href="https://www.aigc.cn/industry-standard" class="item-title">
                <span>政策法规</span>
              </a>
              <ul class="sub-menu">
                <li  class="">
                  <a href="https://www.aigc.cn/12753.html"><span>
                    管理办法
                  </span></a>
                </li>
                <li  class="">
                  <a href="https://www.aigc.cn/sites/43534.html">
                    <span>算法备案</span>
                  </a>
                </li>
                <li  class="">
                  <a href="https://www.aigc.cn/fanzhazhongxin">
                    <span>反诈中心</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="menu-item" >
              <a href="https://www.aigc.cn/submit" class="item-title">
                <Icon type="md-radio-button-on" />
                <span>资源申请</span>
              </a>
              <ul class="sub-menu">
                <li  >
                  <a href="https://www.aigc.cn/pobingjihua">
                    <span>破冰计划</span>
                  </a>
                </li>
                <li class="">
                  <a href="https://www.aigc.cn/advertising-support-program">
                    <span>广告扶持</span>
                  </a>
                </li>
                <li  >
                  <a href="https://www.aigc.cn/reciprocal-project">
                    <span>互推计划</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="menu-item" >
              <a href="https://www.aigc.cn/aboutaigc" class="item-title">
                <Icon type="md-radio-button-on" />
                <span>关于我们</span>
              </a>
              <ul class="sub-menu">
                <li >
                  <a href="https://www.aigc.cn/business">
                    <span>联系我们</span>
                  </a>
                </li>
                <li >
                  <a href="https://www.aigc.cn/disclaimer">
                    <span>免责声明</span>
                  </a>
                </li>
                <li >
                  <a href="https://www.aigc.cn/deleteinformation">
                    <span>联系删除</span>
                  </a>
                </li>
              </ul>
            </li>
          </div>
          <div class="footer-social"> </div>
        </Col>
        <Col :sm="{span:6}" :xs="{ span: 24 }" class="footer-li">
          <div class="footer-mini-img" data-toggle="tooltip" title="" data-original-title="国家反诈中心APP">
            <p class="">
              <img class=" " src="https://www.aigc.cn/wp-content/uploads/2024/01/国家反诈中心APP-1.jpg" alt="国家反诈中心APPAIGC工具导航">
            </p>
            <span class="text-muted ">国家反诈中心APP</span>
          </div>
          <div class="footer-mini-img"  title="" data-original-title="国家反诈中心APP二维码">
            <p class="">
              <img class=" " src="https://www.aigc.cn/wp-content/uploads/2024/01/国家反诈中心APP二维码-1.jpg" alt="国家反诈中心APP二维码AIGC工具导航">
            </p>
            <span class="text-muted ">国家反诈中心APP二维码</span>
          </div>
        </Col>
        <div class="footer-copyright">
          <p style="text-align: left;">
            <span style="font-size: 10px;">
              <a>Copyright</a>©2023-2024 <a href="https://www.aigc.cn/">AI工具导航</a>
              <a href="https://www.aigc.cc/">尊享AI导航</a> <a :href="website" target="_blank" rel="nofollow noopener">蜀ICP备2024070055号-1</a>
              <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=navai.vip" target="_blank" rel="nofollow noopener">
                <img src="@/assets/images/favicon1.png" :alt="title">蜀ICP备2024070055号
</a>
            </span>
            <span style="font-size: 8pt;"> <a href="https://www.12377.cn/" target="_blank" rel="nofollow noopener">12377违法和不良信息举报中心</a></span>
          </p>&nbsp;&nbsp;
        </div>
      </Row>

    </div>
  </div>
</template>
<script>
import common from '@/assets/js/common'
// import {Badge, Icon} from 'iview'
import JumpBubble from '@/assets/js/jumpBubble'

import {mapGetters} from "vuex";

export default {
  name: 'footers',
  // components: {Badge, Icon},
  data() {
    return {
      times:'',
      sidebar:[true,true],//顶部导航栏，和侧边导航栏状态
    }
  },
  created() {
  },
  computed:{
    ...mapGetters(['title','mobileLogo','website','website'])
  },
  mounted() {
  },
  methods: {
    //切换主题
    theme(type) {
      window.document.documentElement.setAttribute("data-theme", type);
      window.document.documentElement.setAttribute("class", type)
      this.$store.commit('getThemes', type);
      //localStorage 更持久
      localStorage.setItem('themes', type)
      // common.setUseCookies('themes', type);
    },
    //控制导航栏的显示隐藏
    handleSidebar(){
      this.sidebar[0]=!this.sidebar[0]
      this.sidebar[1]=!this.sidebar[1]
      this.$emit('handleHideSidebar',[this.sidebar[0],this.sidebar[1]])
    },
  },
  watch:{}
}
</script>
<style scoped lang="scss">
@import "~@/assets/css/animation.scss";
@import "~@/assets/css/components/footer.scss";
.footer-tools{
  bottom: 20px;
  right: 20px;
}

</style>
