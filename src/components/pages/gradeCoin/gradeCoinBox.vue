<template>
  <Row type='flex' justify="start" align="middle" class-name="gradeCoin-menu">
    <Col  :xl="{ span: GCGird[0] }" :lg="{span:GCGird[1] }" :md="{span:GCGird[2]}" :sm="{span:GCGird[3]}" :xs="{ span: GCGird[4] }" class-name="gradeCoin-item "
         v-for="(item,index) in gradeCoinLists.content" :key="index">
      <Tooltip>
        <div  class=" item-content applyBck" >
            <div class="content-top auto-line-start" @click="allStart(1,item)" v-click-data="{name:item.title,hrefUrl:'/gradeCoin?id='+item._id,imgUrl:'./static/images/gradeCoin/'+ item.imgUrl}">
              <div class="top-img" >
                <img v-lazy="require('@@/static/20200801150829.png')" data-grade="gradeCoin1" width="74" height="74">
                <!-- <img v-lazy="'@@/static/'+'20200801150829.png'" data-grade="gradeCoin1" width="74" height="74"> -->
              </div>
              <div class="top-content">
                <h5 class="fontSize-text-color">{{item.title}}</h5>
                <p class="grade">
                  <span class="fontSize-text-color"><Icon type="md-star"/>{{item.commentsScoreAverage == 0 ? '未评' : item.commentsScoreAverage}}</span>
                  <span class="fontSize-text-color">{{item.commentsLength}} 已评</span>
                </p>

              </div>
            </div>
            <div class="function ">
              <p class="entry fontSize-text-color">
                <span @click="$common.goto(item.registerUrl)"><Icon type="ios-contact "/>注册</span>
                <span><Icon type="ios-create" />评分</span>
                <span class="overflow-eclipse"><Icon type="md-copy" />简介</span>
              </p>
            </div>
            <div class="content-bottom auto-line-between">
              <a href="" title="" class="defend">
                <count-to-number :value="Number(item.guaranteeMoney)" :time="1" :suffix="'万'" :key="Math.random()"></count-to-number>
                <img src="~/assets/images/gradeCoin/keep.png"width="102" height="30" title="" alt="">
              </a>
              <div class="like overflow-eclipse">
                <span>
                        <Icon type="md-heart"/>{{item.heartNum}}
                </span>
                <span>
                        <Icon type="md-eye" />{{item.eyeNum}}
                </span>
              </div>
            </div>
            <div class="vip fontSize-text-color">
              <Icon type="logo-vimeo" color="red"/>
            </div>
        </div>
        <div slot="content">{{item.websiteInfo}}</div>
      </Tooltip>
    </Col>
  </Row>
</template>

<script>
import countToNumber from "@/components/common/countToNumber"; //数字滚动
export default {
name: "gradeCoinBox",
  components:{countToNumber},
  props:{
    GCGird:{
      type:Array,
      default:[4,6,8,12,24]
    },
    gradeCoinLists:{
      type:[Object,Array],
      default:false,
    }
  },
  data(){
    return{

    }
  },
  mounted() {

  },
  methods:{

    allStart(status,item){
      if (this.$route.name == 'Index'){
          this.$router.push({path:`/gradeCoin/${item._id}/${item.title}`})
          // this.$router.push({path:'/gradeCoin',query:{id:item._id,title:item.title}})
          return
      }
      if (this.$route.params.id !== item._id ){
        let pramrs={status:status,id:item._id,refresh:true,title: item.title}
        this.$emit('allStart',pramrs)
      }else {
        this.$Notice.warning({
          title:'提示',
          desc:'你选择是当前 页面',
          // duration:0
        })
      }
    }
  },
  destroyed() {
    this.$destroy('CountToNumber')
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/css/commonmMixin.scss";
@include gradeCoin-menu;
</style>
