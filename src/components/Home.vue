<template>
  <div>
    <!--    公告 start-->
    <bulletin></bulletin>
    <!--    公告 end-->

    <!--    评分宝 start-->
    <grade-coin :gradeCoinLists="gradeCoinLists" :gradeCoinSpin="gradeCoinSpin"></grade-coin>
    <!--    评分宝 end-->

    <!--    轮播-新闻-赛事 start-->
    <articles></articles>
    <!--    轮播-新闻-赛事 end-->

    <!--    自定义导航 start-->
    <contents></contents>
    <!--    自定义导航 end-->

    <!--    热门系列 start-->
    <hotslider ></hotslider>
    <!--    热门锡系列 end-->

    <!--    展示 工具，站长start-->
    <mains ></mains>
    <!-- // <footers slot="footer"></footers> -->
  </div>
</template>

<script>
  import { bulletin } from '@/components/common'; //头部和左边导航
  import gradeCoin from '@/components/pages/index/gradeCoin'; //评分
  import articles from '@/components/pages/index/articles'; //轮播，展示
  import contents from '@/components/pages/index/contents'; //导航编辑
  import hotslider from '@/components/pages/index/hotslider'; //热门app
  import mains from '@/components/pages/index/mains';
  // import {appList} from "../assets/js/api/reqModule"; //广告，站长工具等
  // import footers from '@/components/common/footer'; //底部，以及主题控制
  export default {
    name: 'Index',
    // components:{contents,hotslider,articles,bulletin,gradeCoin,mains},
    components: { bulletin, gradeCoin,articles,contents,hotslider,mains },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        gradeCoinLists: {}, //评分宝数据
        gradeCoinSpin: true,

      }
    },
    mounted() {
      // this.getGradeCoin()
      // console.log(this.$common.Encrypt('888888888888888888888888888888888888888'))
      //   console.log(this.$common.Decrypt(this.$common.Encrypt('888888888888888888888888888888888888888')))
      // console.log("%c%c楠格%chttps://www.nange.cn", "line-height:28px;", "line-height:28px;padding:4px;background:#2ccbe6;color:#FADFA3;font-size:14px;", "padding:4px 4px 4px 2px;background:#ff146d;color:green;line-height:28px;font-size:12px;");
      // console.log("%c%c每天都是最好的自己。", "line-height:28px;", "line-height:28px;padding:4px;background:#2ccbe6;color:#FADFA3;font-size:14px;");
    },
     asyncData({ $api }) {
      return $api.gradeCoin.getGradeCoin({ per_page: 4, page: 1, order: -1 }).then(res => {
        if (res.status == 1) {
          return {
            gradeCoinLists: res.gradeCoin,
            gradeCoinSpin: false
          }
        }
      })
    },
    methods: {
      getGradeCoin(pageSize = 4, page = 1) {
        this.$api.gradeCoin.getGradeCoin({ per_page: pageSize, page: page, order: -1 }).then(res => {
          console.log(res)
          if (res.status == 1) {
            this.gradeCoinLists = res.gradeCoin

            this.$nextTick(() => {
              this.gradeCoinSpin = false
            })
          }
        })
      },

    },
    computed: {
      // backdropChange(){
      // 	return this.$store.state.backdrop
      // }
    },
    watch: {
      // backdropChange(){
      // 	if(this.$store.state.backdrop == false){
      // 			this.sidebarOnOff =  true;
      // 		}else{
      // 			this.sidebarOnOff =  false;
      // 		}
      // 		console.log(this.sidebarOnOff)
      // }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>