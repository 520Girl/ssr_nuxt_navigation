<template>
  <div class="station-master tool">
    <div class="tool-header auto-line-between mx-24">
      <div class="left">
        <div class="heade-icon">
          <Icon type="md-pricetags fontSize-icon " />
        </div>
        <h5 class="fontSize-text-mains">猜你喜欢</h5>
      </div>
      <div class="right auto-line-between">
        <div class="number fontSize-text">
          当前数量<span class='nums'>{{cartoonRelated.allCount}}</span>个
        </div>
        <span class="line"></span>
        <div class="more fontSize-text" @click="moreContent">更多
          <Icon type="ios-arrow-forward" />
        </div>
      </div>
    </div>
    <div class="related-content-wrap">
      <Col :xxl="{ span: 4 }" :xl="{ span: 6 }" :lg="{span:6}"   :sm="{ span: 8 }" :xs="{span:12}" class="related-item"  v-for="(item,index) in cartoonRelated.content" :key="index" v-show="item.lookState">
        <a
          @click="handleClick(item)"
          class="comic-related-item"
          href="javascript:void(0)"
          v-click-data="{name:item.title,hrefUrl:`/cartoon/${item._id}?title=${item.title}`,imgUrl:'./static/images/cartoon/'+item.belongLogo1+'/'+item.imgUrl,belong:'cartoon',id:item.belongLogo1}" >
        <!--          v-like="{url:`/cartoon/${item._id}?title=${item.title}`,belong:'cartoon',title:item.title,type:'EN',id:item.belongLogo1}">-->
<!--          <a class="comic-related-item" @click="allStart(1,item.belongLogo1)">-->
          <div class="comic-related-img">

            <img alt="" v-lazy="'./static/images/cartoon/'+item.belongLogo1+'/'+item.imgUrl" data-cartoon="cartoon4">
<!--            <img src="//resource.mhxk.com/kanman_pc/static/images/comm/space.gif" alt="" :style="'background:url('+'/static/cartoon/'+item.belongLogo1+'/'+item.imgUrl+') center center / cover no-repeat;'" >-->
            <div class="wave background-cover"></div>
          </div>
          <div class="comic-related-info fontSize-text-color">
            <div class="title auto-line-between">
              <h3 class="name overflow-eclipse">{{item.title}}</h3>
              <em class="num" v-html="scoreNumHandle(item.scoreNum.n)">
              </em>
            </div>
            <div class="desc overflow-eclipse">{{item.explain}}</div>
          </div>
        </a>
      </Col>
    </div>
  </div>
</template>

<script>
import cartoonGuestbook from "@/components/pages/comments/cartoonGuestbook";
export default {
  name: "cartoonRelated",
  components:{cartoonGuestbook},
  props:{
    cartoonRelated:{type:Object,replace:false,default:{}},
  },
  data(){
    return{
      arr:[1,2,3,4,5],
    }
  },
  mounted() {

  },
  computed:{
    scoreNumHandle(param){
      return function (param){
        if (String(param).indexOf('.') > -1){
          let last = String(param).substr(1,2)
          let first = String(param).substr(0,1)
          return `<span class="num-strong" style="font-size: 18px;font-weight: bold;">${first}</span>${last}`
        }else {
          return  '<span class="num-strong" style="font-size: 18px;font-weight: bold;">'+param+'</span>.0'
        }
      }

    }
  },
  methods:{
    handleClick(item){
      if (item.belongLogo1 === this.$route.params.belong){
        this.$Notice.close('woshinide')
        this.$Notice.warning({
          title:'提示',
          desc:'你选择是当前新闻',
          duration:1,
          name:"woshinide"
        })
        return
      }else {
        this.$router.push({path:`/cartoon/${item.belongLogo1}`,query:{title:item.title}} )
      }
    },
    moreContent(){
      this.$emit('moreContent')
    },
    allStart(status,_id){
      let params={status:status,_id:_id}
      this.$emit('allStart',params)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/css/commonmMixin.scss"; //公共样式工具栏 tool-header
.tool{
  @include tool-header;
  .related-content-wrap{
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    //overflow-x: auto;
    .related-item{
      display: flex;
      justify-content: center;
      .comic-related-item{
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        margin: 0.1rem;
        padding: 0.1rem 0.1rem 0rem 0.1rem;
        border-radius: 15px;
        &:hover{
          img{
            transform: translateY(-10px);
          }
        }
        .comic-related-img{
          //margin: .05rem .1rem .05rem .1rem;
          //height: 350px;
          max-height: 350px;
          position: relative;
          overflow: hidden;
          border-radius: 5px;
          padding: 0 15px;
          background-size: cover;
          img{
            width: 100%;
            height: 100%;
            border-radius: 5px;
            transition: .5s;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
          .wave{
            background: url(/assets/images/wave-block.png) no-repeat 0 100%;
            border-radius: 5px;

          }
        }
        .comic-related-info{
          &:hover{
            .name{
              color: #fff!important;
            }

          }
          cursor: pointer;
          transition: .5s;
          margin: 10px 0px;
          .title{
            .name{
              display: inline-block;
              text-align: left;
              margin: 0;
              font-size: 14px;
              color: inherit;
            }
            .num{
              display: inline-block;
              text-align: right;
              font-size: 12px;
              color: #ff000075;

              &:hover{
                color: red;
              }
              .num-strong{
                font-size: 18px;
                font-weight: bold;
              }
            }
          }
          .desc{
            width: 100%;
            color: inherit;
            font-size: 14px;
            margin-top: 5px;
          }
        }
      }
    }
  }
}

</style>
