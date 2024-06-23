<template>
  <Row type='flex' justify="start" align="middle" class-name="gradeCoin-menu">
    <Col  :xl="{ span: GCGird[0] }" :lg="{span:GCGird[1] }" :md="{span:GCGird[2]}" :sm="{span:GCGird[3]}" :xs="{ span: GCGird[4] }" class-name="gradeCoin-item "
          v-for="(item,index) in gradeCoinLists.content" :key="index">
      <Tooltip>
        <div  class=" item-content applyBck" >
          <router-link tag="div"
                       :to="{path:`/gradeCoin/${item._id}`,query:{title: item.title}}"
                       class="content-top auto-line-start"
                       v-click-data="{name:item.title,hrefUrl:`/gradeCoin/${item._id}?title=${item.title}`,imgUrl:'./static/images/gradeCoin/'+ item.imgUrl,belong:'gradeCoin',id:item._id}">
            <div class="top-img" >
              <img v-lazy="'/static/images/gradeCoin/'+ item.imgUrl" data-grade="gradeCoin1" width="74" height="74" :alt="item.title" />
            </div>
            <div class="top-content">
              <h5 class="fontSize-text-color">{{item.title}}</h5>
              <p class="grade">
                <span class="fontSize-text-color"><Icon type="md-star"/>{{item.commentsScoreAverage == 0 ? $t('index.not_rated') : item.commentsScoreAverage}}</span>
                <span class="fontSize-text-color">{{item.commentsLength}} {{ $t('index.rated') }}</span>
              </p>

            </div>
          </router-link>
          <div class="function ">
            <p class="entry fontSize-text-color">
              <span @click="$common().goto(item.registerUrl)" class="overflow-eclipse"><Icon type="ios-contact "/>{{$t('index.register')}}</span>
              <router-link tag="span" :to="{path:`/gradeCoin/${item._id}`,query:{title: item.title,p:'gradecoin'}}" class="overflow-eclipse"><Icon type="ios-create" />{{$t('index.score')}}</router-link>
              <router-link :to="{path:`/gradeCoin/${item._id}`,query:{title: item.title}}" tag="span" class="overflow-eclipse"><Icon type="md-copy" />{{$t('index.intro')}}</router-link>
            </p>
          </div>
          <div class="content-bottom auto-line-between">
            <a href="" title="" class="defend">
              <count-to-number :value="Number(item.guaranteeMoney)" :time="1" :suffix="suffix($t('gradeCoins.W'))" :key="$t('gradeCoins.W')" ></count-to-number>
              <img src="@/assets/images/gradeCoin/bao.png" width="102" height="30" title="" alt="">
            </a>
            <div class="like overflow-eclipse">
                <span
                  v-like="{url:`/gradeCoin/${item._id}?title=${item.title}`,belong:'gradeCoin',title:item.title,type:'HN',id:item._id}"
                >
                        <Icon type="md-heart" class="fontSize-like"/>{{item.heartNum}}
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
  components: {countToNumber},
  props: {
    GCGird: {
      type: Array,
      default: [4, 6, 8, 12, 24]
    },
    gradeCoinLists: {
      type: [Object, Array],
      default: false,
    }
  },
  data() {
    return {}
  },
  mounted() {

  },
  methods: {
    allStart(status, item) {
      // if (this.$route.name == 'Index') {
      //   this.$router.push({path: `/gradeCoin/${item._id}`, query: {title: item.title}})
      //   return
      // }
    },
    currentClick(id){
      console.log(9999)
      if (this.$route.params.id == id) {
        this.$Notice.warning({
          title: '提示',
          desc: '你选择是当前 页面',
          // duration:0
        })
        return
      }
    }
  },
  computed:{
  suffix(){
    return (item)=>{
      return item
    }
  },
},
  destroyed() {
    this.$destroy('CountToNumber')
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/commonmMixin.scss";
@include gradeCoin-menu;
</style>
