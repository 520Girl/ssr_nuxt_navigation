<template>
  <div class="side-cartoon footer-tools" :style="slideHide ? 'transform: translateX(0px);' : ''">
    <Badge
      :count="cartoonData.heartNum"
      overflow-count="999"
      :offset="[6,9]"
      class-name="demo-badge-alone"
    >
      <a
        href="javascript:void(0)"
        class="btn auto-line-center"
        @click="heartNumClick = !heartNumClick"
        v-like="{url:`/cartoon/${$route.params.belong}/${$route.params.class}?title=${$route.query.title}`,belong:'cartoon',title:$route.query.title,type:'HN',id:`${$route.params.belong}/${$route.params.class}`}">
        <Tooltip content="收藏" placement="left">
          <Icon type="md-heart-outline fontSize-icon fontSize-like" :class="{'headerTagI':heartNumClick}" />
        </Tooltip>
      </a>
    </Badge>
    <a href="javascript:void(0)" class="btn auto-line-center" @click="handleSidebar" >
      <Tooltip content="导航" placement="left">
        <Icon type="ios-keypad-outline fontSize-icon"></Icon>
      </Tooltip>
    </a>
    <a href="javascript:void(0)" :class="{'btn auto-line-center':true,'form-onlyRead':cartoonData.prevId == -1}" @click="cartoonChapter(-1)" v-if="cartoonData.prevId">
      <Tooltip content="上一章" placement="left">
        <Icon type="md-skip-forward fontSize-icon cartoon-up" />
      </Tooltip>
    </a>
    <a href="javascript:void(0)"  :class="{'btn auto-line-center':true,'form-onlyRead':cartoonData.nextId == -2}" @click="cartoonChapter(-2)" v-if="cartoonData.nextId">
      <Tooltip content="下一章" placement="left">
        <Icon type="md-skip-backward fontSize-icon cartoon-dowm" />
      </Tooltip>
    </a>
  </div>
</template>

<script>
import JumpBubble from "@/assets/js/jumpBubble";

export default {
  name: "CartoonSide",
  props:{
    cartoonData:{type:[Object,Array],required:false,default:()=>[]}
  },
  data(){
    return{
      slideHide:false,
      heartNumClick:false
    }
  },
  mounted() {
    this.slideHide = true
  },
  methods:{
    //控制导航栏的显示隐藏
    handleSidebar(){
      let store = this.$store.state
      this.$store.commit('setHeadeSidebar',[!store.hideSidebar,!store.hideHeader])

      // this.$emit('handleHideSidebar',[this.sidebar[0],this.sidebar[1]])
    },
    //漫画上一章下一章
    cartoonChapter(state){
      this.$emit('cartoonChapter',state)
    }
  },
  watch:{
  },
}
</script>

<style scoped lang="scss">
//@import "~@/assets/css/animation.scss";
@import "~@/assets/css/components/footer.scss";

.footer-tools{
  position: fixed;
  bottom: 200px;
  right: 20px;
  z-index: 498;

  a{
    border-radius: 50%;
    margin: 0px 5px 5px 5px;
    position: relative;
    transition: all .5s;
    &:nth-child(1){
      margin-top: 5px;
    }
    #cavs,#cavs2{
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(-50%);
      transition: all 0.5s;
    }
    i {
      font-size: 20px;
    }
  }
  .headerTagI{
    color: red!important;
  }
  .eyeTagI{
    animation: headerTagI 3s infinite;
    color:#ffd600!important
  }
}
.side-cartoon{
  transition: all 1s;
  transform: translateX(80px);
  .cartoon-dowm,.cartoon-up{
    transform: rotateZ(-90deg);
  }
}
</style>
