<template>
  <div>
    <!--    公告 start-->
    <bulletin></bulletin>
    <!--    公告 end-->

    <!--    评分宝 start-->
    <grade-coin :gradeCoinLists="gradeCoinLists" :gradeCoinSpin="gradeCoinSpin"></grade-coin>
<!--    &lt;!&ndash;    评分宝 end&ndash;&gt;-->

<!--    &lt;!&ndash;    轮播-新闻-赛事 start&ndash;&gt;-->
    <articles :slideList="slideList" :blogList="blogList" :ranking="rankingList"></articles>
<!--    &lt;!&ndash;    轮播-新闻-赛事 end&ndash;&gt;-->

<!--    &lt;!&ndash;    自定义导航 start&ndash;&gt;-->
    <contents></contents>
<!--    &lt;!&ndash;    自定义导航 end&ndash;&gt;-->

<!--    &lt;!&ndash;    热门系列 start&ndash;&gt;-->
    <div ref="hotslider" >
      <component :is="isVisible.hotsliderC" v-if="isVisible.hotslider"></component>
    </div>
<!--      <hotslider ></hotslider>-->
<!--    &lt;!&ndash;    热门锡系列 end&ndash;&gt;-->

<!--    &lt;!&ndash;    展示 工具，站长start&ndash;&gt;-->
<!--      <mains  ></mains>-->
    <div ref="mains" >
      <component :is="isVisible.mainsC" v-if="isVisible.mains"></component>
    </div>

    <!-- // <footers slot="footer"></footers> -->
  </div>
</template>

<script>
  import bulletin from '@/components/common/bulletin'; //头部和左边导航
  import gradeCoin from '@/components/pages/index/gradeCoin'; //评分
  import articles from '@/components/pages/index/articles'; //轮播，展示
  import contents from '@/components/pages/index/contents'; //导航编辑
  // import hotslider from '@/components/pages/index/hotslider'; //热门app
  import 'intersection-observer';
  // import mains from '@/components/pages/index/mains';
  import setting from '@/setting'; //底部，以及主题控制
  // import {appList} from "../assets/js/api/reqModule"; //广告，站长工具等
  // import footers from '@/components/common/footer'; //底部，以及主题控制
  export default {
    name: 'Index',
    head(){
      const {fullPath,meta} = this.$route;
      return {
        title: meta.title,
        meta: [
          {hid: 'description', name: 'description', content:meta.description},
          {hid: 'keywords', name: 'keywords', content: meta.title},
          {name:'og:url', property: 'og:url', content:`${setting.website}${fullPath}`},
          {name:'og:title', property: 'og:title', content:meta.title},
          {name:'og:description', property: 'og:description', content:meta.description},
          // {name:'og:image', property: 'og:image', content:''},
        ]
      }
    },
    components: { bulletin, gradeCoin,articles,contents, },
     async asyncData({$api, $axios,store}) {
       // if (!process.server) return
       const {gradeCoins} = await $api.gradeCoin.getGradeCoin({ per_page: 6, page: 1, order: -1 },true)
       const {blog} = await $api.blog.getBolgLists( {page:1,per_page:5,tag:'',order:-1})
       const {slide} = await $api.slide.getSlide({pre_page:5})
       const {news}= await $api.news.getCountUpDate()
       switch (store.state.webBase.hotsliderDefault){
         case 'allLike':
           await store.dispatch('async_data/actions_allLike')
           break;
         case 'hotComic':
           await store.dispatch('async_data/actions_hotComicData')
           break;
         case 'hotApp':
           await store.dispatch('async_data/actions_hotAppData')
           break;
         case 'hotWeb':
           await store.dispatch('async_data/actions_hotWebData','h')
           break;
         case 'newAddress':
           await store.dispatch('async_data/actions_hotWebData','n')
           break;
         default:
           await store.dispatch('async_data/actions_allLike')
           break;
       }
       await store.dispatch('async_data/actions_bulletinData')
       await store.dispatch('async_data/actions_website')
        return {
          gradeCoinLists: gradeCoins,
          gradeCoinSpin: false,
          slideList: slide.content,
          blogList: blog.content,
          rankingList:news.content,
        }
    },
    data() {
      return {
        gradeCoinLists: {}, //评分宝数据
        gradeCoinSpin: true,
        slideList: {}, //轮播图数据
        blogList: [], //新闻数据
        rankingList:[], //赛事数据
        isVisible:{
          mains:false,
          hotslider:false,
          mainsC:null,
          hotsliderC:null,
        },
      }
    },
    created() {

    },
    mounted() {
      // this.getGradeCoin()
      this.GetIntersectionObserver('mains')
      this.GetIntersectionObserver('hotslider')
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
      GetIntersectionObserver(ref='lazyComponent'){
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (ref === 'mains' && entry.isIntersecting){
                this.asyncMains().then(() => {
                  this.isVisible[ref] = true;
                  observer.unobserve(this.$refs[ref]);
                })
            }else if (ref === 'hotslider' && entry.isIntersecting){
              this.asyncHotslider().then(() => {
                this.isVisible[ref] = true;
                observer.unobserve(this.$refs[ref]);
              })
            }

          });
        }, {
          rootMargin: '0px',
          threshold: 0.1
        });

        if (this.$refs[ref]) {
          observer.observe(this.$refs[ref]);
        } else {
          console.error("Element to observe is not available");
        }
      },
      async asyncMains(){
        const {default:mains} = await import('@/components/pages/index/mains')
        this.isVisible.mainsC = mains;
        this.isVisible.mains = true;
      },

      async asyncHotslider(){
        const {default:hotslider} = await import('@/components/pages/index/hotslider')
        this.isVisible.hotsliderC = hotslider;
        this.isVisible.hotslider = true;
      }
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
