<template>
  <div class="footer-container">
    <div class="footer-tools">
<!--      到顶部-->
      <div href="javascript:void(0)" class="btn auto-line-center" @click="$common().scrollClickTop()">
        <Tooltip :content="$t('footer.top')"  placement="left">
          <i class="iconfont icon-daohang fontSize-icon"></i>
        </Tooltip>
      </div>
<!--      到顶部-->
<!--     打开导航-->
      <div href="javascript:void(0)" class="btn auto-line-center" @click="handleSidebar" v-if="$route.name == 'detailed'" >
        <Tooltip :content="$t('footer.nav')"  placement="left">
          <Icon type="ios-keypad-outline fontSize-icon"></Icon>
        </Tooltip>
      </div>
<!--     打开导航-->
<!--      黑白主题 -->
      <div v-if="$store.state.themes == 'dark'" href="javascript:void(0)" class="btn auto-line-center" @click="theme('light')">
        <Tooltip :content="$t('footer.switchThemes')" placement="left">
          <i class="iconfont icon-rijianmoshi fontSize-icon"></i>
        </Tooltip>
      </div>
      <div v-else href="javascript:void(0)" class="btn auto-line-center"  @click="theme('dark')">
        <Tooltip :content="$t('footer.switchThemes')" placement="left">
          <i class="iconfont icon-dark fontSize-icon"></i>
        </Tooltip>
      </div>
<!--      黑白主题 -->
    </div>
    <!--<external-script src='https://widget.heweather.net/simple/static/js/he-simple-common.js?v=1.1'></external-script>-->
    <div class="footer-body mx-15-2">
      <Row type='flex' justify="center" align="top" class-name="footer applyBck">
        <Col :sm="{span:7}" :xs="{ span: 24 }" class="footer-li">
          <router-link class="footer-logo" :to="website" :title="title">
            <img :src="mobileLogo" class="logo-light" :alt="title" height="71.5" width="254">
            <img :src="mobileLogo" class="logo-dark" :alt="title" height="71.5" width="280">
          </router-link>
          <div class="text-sm">
            <span class="fontSize-text i-f-a">
              {{$t('footer.content_1')}}
            </span>
            <router-link :to="{path:'/favorites/253'}" :title="$t('footer.c_class_1')">{{$t('footer.c_class_1')}}</router-link>、
            <router-link :to="{path:'/app'}" :title="$t('footer.c_class_2')">{{$t('footer.c_class_2')}}</router-link>、
            <router-link :to="{path:'/cartoon'}" :title="$t('footer.c_class_3')">{{$t('footer.c_class_3')}}</router-link>、
            <router-link :to="{path:'/blog'}" :title="$t('footer.c_class_4')">{{$t('footer.c_class_4')}}</router-link>、
            <router-link :to="{path:'/image'}" :title="$t('footer.c_class_5')">{{$t('footer.c_class_5')}}</router-link>、
            <router-link :to="{path:'/favorites/403'}" :title="$t('footer.c_class_6')">{{$t('footer.c_class_6')}}</router-link>、
            <router-link :to="{path:'/favorites/252'}" :title="$t('footer.c_class_7')">{{$t('footer.c_class_7')}}</router-link>、
            <router-link :to="{path:'/favorites/2336'}" :title="$t('footer.c_class_8')">{{$t('footer.c_class_8')}}</router-link>、
            <router-link :to="{path:'/favorites/3611'}" :title="$t('footer.c_class_9')">{{$t('footer.c_class_9')}}</router-link>、
            <router-link :to="{path:'/favorites/635'}" :title="$t('footer.c_class_10')">{{$t('footer.c_class_10')}}</router-link>、
            <router-link :to="{path:'/favorites/937'}" :title="$t('footer.c_class_11')">{{$t('footer.c_class_11')}}</router-link>
            {{$t('footer.c_2')}}
            <router-link :to="{path:'/favorites/2481'}" :title="$t('footer.c_class_12')">{{$t('footer.c_class_12')}}</router-link>
            <router-link :to="{path:'/favorites/gradeCoin'}" :title="$t('footer.c_class_13')">{{$t('footer.c_class_13')}}</router-link>
            <router-link :to="{path:'/favorites/2481'}" :title="$t('footer.c_class_14')">{{$t('footer.c_class_14')}}</router-link>
            <span class="i-f-c">
              {{$t('footer.c_3')}}
            </span>
            <p class="fontColor" style="line-height: 18px;">
              <router-link :to="website" class="fontSize-text-orange" target="_blank" :title="title">navai.vip</router-link>
              {{$t('footer.c_5')}}
              <router-link :to="website" class="fontSize-text-orange " target="_blank" :title="title">navai.vip</router-link>
            </p>
          </div>
        </Col>
        <Col :sm="{span:10}" :xs="{ span: 24 }" class="footer-li">
          <p class="footer-links fontSize-text-app">{{$t('footer.c_6')}}</p>
          <div class="footer-nav-links">
            <li class="menu-item">
              <router-link to="/blog/tag/AI/1" class="item-title">
                <span>{{$t('footer.li_1')}}</span>
              </router-link>
              <ul class="sub-menu">
                <li  class="">
                  <router-link to="/blog/623c33963c00c53a9cbb999a?title=生成式人工智能服务管理暂行办法" :title="$t('footer.li_2')"><span>
                    {{$t('footer.li_2')}}
                  </span></router-link>
                </li>
                <li  class="">
                  <router-link to="/app/61ffb521b67c0000ba000525?title=互联网信息服务算法备案系统" :title="$t('footer.li_3')">
                    <span>{{$t('footer.li_3')}}</span>
                  </router-link>
                </li>
                <li  class="">
                  <router-link to="/fanzhazhongxin">
                    <span>{{$t('footer.li_4')}}</span>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="menu-item" >
              <router-link to="/embody" class="item-title">
                <Icon type="md-radio-button-on" />
                <span>{{$t('footer.li_5')}}</span>
              </router-link>
              <ul class="sub-menu">
                <li  >
                  <router-link  to="/free-ai-industry-reports" :title="$t('footer.li_6')">
                    <span>{{$t('footer.li_6')}}</span>
                  </router-link>
                </li>
                <li class="">
                  <router-link to="/advertising" :title="$t('footer.li_7')">
                    <span>{{$t('footer.li_7')}}</span>
                  </router-link>
                </li>
                <li  >
                  <router-link to="/reciprocal-project" :title="$t('footer.li_8')">
                    <span>{{$t('footer.li_8')}}</span>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="menu-item" >
              <router-link to="/about" class="item-title" :title="$t('footer.li_9')">
                <Icon type="md-radio-button-on" />
                <span>{{$t('footer.li_9')}}</span>
              </router-link>
              <ul class="sub-menu">
                <li >
                  <router-link to="/business" :title="$t('footer.li_10')">>
                    <span>{{$t('footer.li_10')}}</span>
                  </router-link>
                </li>
                <li >
                  <router-link to="/disclaimer" :title="$t('footer.li_11')">
                    <span>{{$t('footer.li_11')}}</span>
                  </router-link>
                </li>
                <li >
                  <router-link to="/deleteinformation" tag="a" :title="$t('footer.li_12')">
                    <span>{{$t('footer.li_12')}}</span>
                  </router-link>
                </li>
              </ul>
            </li>
          </div>
          <div class="footer-social"> </div>
        </Col>
        <Col :sm="{span:6}" :xs="{ span: 24 }" class="footer-li">
          <div class="footer-mini-img" data-toggle="tooltip" title="" :data-original-title="$t('footer.f_1')">
            <p class="">
              <img class=" " src="@/assets/images/guojiafanzhaapp.jpg"  :alt="$t('footer.f_1')">
            </p>
            <span class="text-muted ">{{$t('footer.f_1')}}</span>
          </div>
          <div class="footer-mini-img"  title="" :data-original-title="$t('footer.f_2')">
            <p class="">
              <img class=" " src="@/assets/images/guojiafanzhaapp2.jpg" :alt="$t('footer.f_2')">
            </p>
            <span class="text-muted ">{{$t('footer.f_2')}}</span>
          </div>
        </Col>
        <div class="footer-copyright">
          <p style="text-align: center;">{{$t('footer.c_4')}}</p>
          <p style="text-align: center;">
            <span style="font-size: 10px;">
              <span>Copyright</span>©2023-2024 <router-link :to="website">{{$t('footer.b_1')}}</router-link>
              <router-link :to="website">{{$t('footer.b_2')}}</router-link> <router-link :to="website" target="_blank" rel="nofollow noopener">{{$t('footer.b_3')}}</router-link>
              <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=navai.vip" target="_blank" rel="nofollow noopener">
                <img src="@/assets/images/guohui.png" width="20" height="22" :alt="title">{{$t('footer.b_4')}}
</a>
            </span>
            <span style="font-size: 8pt;"> <a href="https://www.12377.cn/" target="_blank" rel="nofollow noopener">{{$t('footer.b_5')}}</a></span>
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
//@import "~@/assets/css/animation.scss";
@import "~@/assets/css/components/footer.scss";
.footer-tools{
  bottom: 20px;
  right: 20px;
}

</style>
