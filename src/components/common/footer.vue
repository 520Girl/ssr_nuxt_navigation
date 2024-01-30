<template>
  <div class="footer-container">
    <div class="footer-tools">
<!--      到顶部-->
      <a href="javascript:void(0)" class="btn auto-line-center" @click="$common.scrollClickTop()">
        <Tooltip content="回到顶部" placement="left">
          <i class="iconfont icon-daohang fontSize-icon"></i>
        </Tooltip>
      </a>
<!--      到顶部-->
<!--     打开导航-->
      <a href="javascript:void(0)" class="btn auto-line-center" @click="handleSidebar" v-if="$route.name == 'detailed'" >
        <Tooltip content="导航" placement="left">
          <Icon type="ios-keypad-outline fontSize-icon"></Icon>
        </Tooltip>
      </a>
<!--     打开导航-->
<!--      黑白主题 -->
      <a v-if="$store.state.themes == 'dark'" href="javascript:void(0)" class="btn auto-line-center" @click="theme('light')">
        <Tooltip content="切换主题 " placement="left">
          <i class="iconfont icon-rijianmoshi fontSize-icon"></i>
        </Tooltip>
      </a>
      <a v-else href="javascript:void(0)" class="btn auto-line-center"  @click="theme('dark')">
        <Tooltip content="切换主题 " placement="left">
          <i class="iconfont icon-dark fontSize-icon"></i>
        </Tooltip>
      </a>
<!--      黑白主题 -->
    </div>
    <!--<external-script src='https://widget.heweather.net/simple/static/js/he-simple-common.js?v=1.1'></external-script>-->
  </div>
</template>
<script>
import common from '@/assets/js/common'
// import {Badge, Icon} from 'iview'
import JumpBubble from '@/assets/js/jumpBubble'

// import {BackTop} from 'iview'
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
@import "~/assets/css/animation.scss";
@import "~/assets/css/components/footer.scss";
.footer-tools{
  bottom: 20px;
  right: 20px;
}

</style>
