<template>
    <div class="mains-container contents-bck">
        <section class="mains-content  mx-15-2">
          <template v-for="(component,index) in sortedArray" >
            <component :key="index" :is="component.value" :values="component"></component>
          </template>
<!--          <website-one :id="key" :websiteData="websiteData[key]" v-for="(val,key,index ) in websiteId" :key="index"></website-one>-->
          <website-one :websiteData="websiteData" :spinShow="spinShow" :type="'website'" ></website-one>
          <loading-block :spinShow="spinShow" :style="'position: fixed;left: 50%;bottom:'+bottom+'px;top: unset;width: unset;height: unset;'" v-if="spinShow"></loading-block>
        </section>
    </div>
</template>
<script>
  // import {Row,Col,Icon,Tooltip,Rate,Time,} from 'iview';
  import websiteOne from "@/components/pages/mains/websiteOne";
  import loadingBlock from "@/components/common/loadingBlock"; //loading
  import {mapGetters} from 'vuex';
  import {station_master,advert_groom,yellow_game,youth_Tv,tool_resource} from "@/components/pages/index/components";
  export default{
    name:"mains",
    // components:{Row,Col,Icon,Tooltip,Rate,Time,},
    components:{websiteOne,loadingBlock,station_master,advert_groom,yellow_game,youth_Tv,tool_resource},
    data() {
      return {
        sortedArray:[],
        params:{page:0,per_page:8,belong:'',order:-1},
        websiteId:{}, //总计多少项 对应异步加载数据状态
        websiteData:[],//方便提交数据
        spinShow:false,
        bottom:0
      }
    },
    created() {
      this.classifyId()
      this.getWebsiteId()

      if (this.websiteData.length === 0){
        this.websiteData.push(...this.$store.state.async_data.websiteData)
      }
      // 将页面组件按顺序排序
      this.sortedArray = Object.keys(this.pageLayout)
        .sort((a, b) => this.pageLayout[a].index - this.pageLayout[b].index)
        .map(key => {
          if (this.pageLayout[key].status){
            return this.pageLayout[key]
          }
        });
      this.scrollLoad()
    },
    mounted() {
      // this.getWebsite('website1')
    },
    methods:{
      //将website数据进行分类，方便后面的滚动加载请求频率不至于太高，每四条为一项
      classifyId(){
        //已知总计135项，其中第120,112项为空
        let websiteId={}
        let item = 135 % 4 >=0 ? ((135 - 135 % 4)/4 +1) : (135/4 )
        for (let i=1;i<=item;i++){
          websiteId[`website${i}`]=false
        }
        Object.assign(this.websiteId,websiteId)
        this.$store.dispatch('asyncLoadingDataAdd',this.websiteId)
      },
      getWebsite(state){
        return new Promise((resolve, reject) =>{
          this.$api.webSite.getWebsite(this.params).then(res=>{
            if (res.status === 1){
              // this.websiteData.push(res.website.content)
              this.websiteData=[...this.websiteData,...res.website.content]
              this.$store.commit('getNewAsyncData',state)
              this.spinShow = false
              return resolve('')
            }
          }).catch(error => {
            console.warn(error)
            return resolve()
          })
        })

      },
      //处理一下websiteId,websiteData数据 数据将前面的几项分离处理,并且将webSiteId,websiteData方便赋值数据
      getWebsiteId(){
        let websiteId = {},state = this.$store.state.asyncLoadingData
        for(let item in state){
          if (item.includes('website')){
            websiteId[item] = false
          }
          this.websiteData[item] =[]
        }
        this.websiteId = websiteId
      },
      //滚动加载数据
      scrollLoad(){
        if (process.browser){
          window.onscroll = this.$common().throttle(()=>{
            const footerHeight = document.querySelector('.footer-container').offsetHeight || 200
            console.log('footerHeights',footerHeight)
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
            //滚动条到底部的条件
            if((scrollTop+windowHeight+footerHeight) >= scrollHeight){
              //写后台加载数据的函数,开启动画，滚动出现，请求后台
              this.spinShow = true
              let timer = setInterval(()=>{
                this.bottom += 3
                if (this.bottom >= 60){
                  clearInterval(timer)
                }
              },20)
              this.params.page ++
              this.getWebsite()
              console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
            }
          })
        }
      }
        // console.log('滚动加载数据')
    },
    computed:{
      ...mapGetters(['asyncLoadingData','pageLayout']),
      asyncLoadingDataWatch(){
        //解决 监听数据新旧值一致因为同源数据，所以用计算机属性https://blog.csdn.net/chenjing0823/article/details/96429867
        let obj ={}
        Object.assign(obj,this.asyncLoadingData.scrollState)
        return obj
      }
    },
    watch:{
      'asyncLoadingDataWatch':{
        handler(newVal,oldVal){
          let state = this.$store.state.asyncLoadingData.scrollState
          if (!this.$store.state.asyncLoadingData[state]){
            this.params.belong = state.replace(/[^\d]/g,'')
            this.getWebsite(state)
          }
        },
        deep:true
      }
    },
    deactivated() {
      window.onscroll = null
    },
    activated(){
      this.scrollLoad()
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/assets/css/commonmMixin.scss"; //公共样式分享 相关内容栏 tool-header
  @import "~@/assets/css/components/index/mains.scss";
</style>
