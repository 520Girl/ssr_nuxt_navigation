<template>
  <Spin size="large" fix v-if="spinShow">
    <div class="container animation-5">
      <div class="shape shape1" :style="'background-color:'+shape[0]"></div>
      <div class="shape shape2" :style="'background-color:'+shape[1]"></div>
      <div class="shape shape3" :style="'background-color:'+shape[2]"></div>
      <div class="shape shape4" :style="'background-color:'+shape[3]"></div>
    </div>
    <div style="position: absolute;left: 50%;width: 100px;margin-left: -50px;margin-top: 13px;" v-if="item != 4">加载中...</div>
    <div style="position: absolute;left: 50%;width: 100px;margin-left: -50px;color:#FFB74D;margin-top: 13px; "  v-else>加载缓慢..</div>
  </Spin>
</template>

<script>
export default {
  name: "loadingBlock",
  props:{
    spinShow:{
      default:true,
      type:Boolean
    },
    time:{
      default:1000,
      type:Number
    }
  },
  data(){
    return{
      shape:['#5C6BC0','#8BC34A','#FFB74D','#F44336'],
      item:0,
      timer:null
    }
  },
  created() {
    this.timer = setInterval(()=>{
      this.shape[this.item] = '#FFB74D'
      this.item ++
      this.$forceUpdate()
      if (this.item === 4 ){
        clearInterval(this.timer)
      }
    },2200)
  },
  deactivated() {
    clearInterval(this.timer)
  },
  watch:{
    spinShow:function(){
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  width: 30px;
  height: 30px;
  position: relative;
  transform: rotate(45deg);
.shape{
  width: 15px;
  height: 15px;
  position: absolute;
  border-radius: 1px;
}
.shape1{
  left: 0;
  background-color: #5C6BC0;
  animation: animation5shape1 2s ease 0s infinite reverse;

}
.shape2{
  right: 0;
  background-color: #8BC34A;
  animation: animation5shape2 2s ease 0s infinite reverse;

}
.shape3{
  bottom: 0;
  background-color: #FFB74D;
  animation: animation5shape3 2s ease 0s infinite reverse;
}
.shape4{
  bottom: 0;
  right: 0;
  background-color: #F44336;
  animation: animation5shape4 2s ease 0s infinite reverse;
}
}
.animation-5{

}
@keyframes animation5shape1 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 15px);
    transform: translate(0, 15px);
  }
  50% {
    -webkit-transform: translate(15px, 15px);
    transform: translate(15px, 15px);
  }
  75% {
    -webkit-transform: translate(15px, 0);
    transform: translate(15px, 0);
  }
}
@keyframes animation5shape2 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(-15px, 0);
    transform: translate(-15px, 0);
  }
  50% {
    -webkit-transform: translate(-15px, 15px);
    transform: translate(-15px, 15px);
  }
  75% {
    -webkit-transform: translate(0, 15px);
    transform: translate(0, 15px);
  }
}
@keyframes animation5shape3 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(15px, 0);
    transform: translate(15px, 0);
  }
  50% {
    -webkit-transform: translate(15px, -15px);
    transform: translate(15px, -15px);
  }
  75% {
    -webkit-transform: translate(0, -15px);
    transform: translate(0, -15px);
  }
}
@keyframes animation5shape4 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, -15px);
    transform: translate(0, -15px);
  }
  50% {
    -webkit-transform: translate(-15px, -15px);
    transform: translate(-15px, -15px);
  }
  75% {
    -webkit-transform: translate(-15px, 0);
    transform: translate(-15px, 0);
  }
}
</style>
