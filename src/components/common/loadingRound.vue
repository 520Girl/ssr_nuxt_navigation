<template>
  <Spin size="large" fix v-if="spinShow">
    <div class="loader">
      <div class="container animation-2">
        <div class="shape shape1" ></div>
        <div class="shape shape2" ></div>
        <div class="shape shape3" ></div>
        <div class="shape shape4" ></div>
      </div>
<!--      <div style="position: relative;bottom: -20px;left: -8px;color: #FFB74D;">加载缓慢...</div>-->
    </div>
  </Spin>
</template>

<script>
export default {
name: "loadingRound",
  props:{
    spinShow:{
      default:true,
      type:Boolean
    },
  },
  data(){
    return{
      time:Date.now(),
      shape:['#0026ff','#89ff00','#FFB74D','#F44336'],
    }
  },
  mounted() {


  },
  deactivated() {

  },
  watch:{

  }
}
</script>

<style scoped lang="scss">
.loader{
.container{
  width: 30px;
  height: 30px;
  position: relative;
.shape{
  border-radius: 7.5px;
  position: absolute;
  width: 15px;
  height: 15px;
}
.shape1{
  left: 0;
  background-color: #0026ff;
  animation: animation2shape1 0.5s ease 0s infinite alternate;
}
.shape2{
  right: 0;
  background-color: #89ff00;
  animation: animation2shape2 0.5s ease 0s infinite alternate;
}
.shape3{
  bottom: 0;
  background-color: #FFB74D;
  animation: animation2shape3 0.5s ease 0s infinite alternate;
}
.shape4{
  bottom: 0;
  right: 0;
  background-color: #F44336;
  animation: animation2shape4 0.5s ease 0s infinite alternate;
}

}
.container.animation-2{
  animation: rotation 1s infinite;
  transform: rotate(10deg);
}
@keyframes animation2shape1 {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(20px, 20px);
    transform: translate(20px, 20px);
  }
}
@keyframes animation2shape2 {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-20px, 20px);
    transform: translate(-20px, 20px);
  }
}
@keyframes animation2shape4 {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-20px, -20px);
    transform: translate(-20px, -20px);
  }
}
@keyframes animation2shape3 {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(20px, -20px);
    transform: translate(20px, -20px);
  }
}
@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
}
</style>
