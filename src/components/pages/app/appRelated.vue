<template>
  <div class="guestbook-right-appGroom">
    <div class="station-master tool">
      <div class="tool-header auto-line-between mx-24">
        <div class="left">
          <div class="heade-icon">
            <Icon type="md-pricetags fontSize-icon " />
          </div>
          <h5 class="fontSize-text-mains">{{$t('app.related_content')}}</h5>
        </div>
        <div class="right auto-line-between">
          <div class="number fontSize-text">
            {{$t('app.current_quantity')}}<span class='nums'>{{ relatedInfo.count }}</span>{{$t('app.a')}}
          </div>
          <span class="line"></span>
          <div class="more fontSize-text" @click="moreContent">{{$t('app.more')}}
            <Icon type="ios-arrow-forward" />
          </div>
        </div>
      </div>
      <Row type='flex' justify="start" align="middle" class-name="gradeCoin-menu" >
        <Col :xl="{ span: GCGird[0] }" :lg="{span:GCGird[1]}" :md="{span:GCGird[2]}"   :sm="{ span: GCGird[3] }" :xs="{span:GCGird[4]}" class-name="gradeCoin-item" v-for="(item,index) in relatedInfo.content" :key="index">
          <!--                              <Tooltip :content="item.websiteInfo">-->
          <router-link tag="a" :to="{path:`/app/${item._id}`,query:{title:item.title}}" class="item-content applyBck">
            <div>
              <div class="content-top ">
                <div class="top-img">
                  <img class="applyBck" data-app="app1" v-lazy="'/static/images/app/'+item.imgUrl" width="100" height="100">
                </div>
                <div class="top-content">
                  <div class="fontSize-text-colornoH overflow-eclipse h5">
                    <span class="new" v-show="item.new">New</span>
                    <span class="hot" v-show="item.hot">Hot</span>
                    {{item.title}}
                  </div>
                  <p class="grade overflow-eclipse-2">
                    {{item.explain}}
                  </p>
                </div>
              </div>
            </div>
          </router-link>
          <!--                              </Tooltip>-->
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  name: "appRelated",
  props:{
    GCGird:{
      type:Array,
      default:[4,6,8,12,24]
    },
    relatedInfo:{
      type:[Object,Array],
      default:[],
    }
  },
  data(){
    return{

    }
  },
  mounted() {

  },
  methods:{
    moreContent(){
      this.$emit('moreContent')
    },
    allStart(status,item){
      let params={status:status,_id:item._id,title:item.title}
      this.$emit('allStart',params)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/css/commonmMixin.scss"; //公共样式工具栏 tool-header
  @import "~@/assets/css/components/app/appRelated.scss";
</style>
