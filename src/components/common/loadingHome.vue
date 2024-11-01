<template>
  <transition name="fade">
    <div class="loading-page " v-if="loading">
      <Col :md="{span:24}" :sm="{ span: 0 }" :xs="{span:0}" class-name="page-left">
        <div class="rank-menu skeleton_animation"></div>
      </Col>
      <div class="page-main">
        <header class="skeleton_animation"></header>
        <div class="main-content">
          <div class="content-left ">
            <div class="Slideshow skeleton_animation"></div>
            <div class="Slideshow skeleton_animation" style="height: 35px;"></div>
            <Row type='flex' justify="start" class-name="menu-button" >
              <Col :xl="{ span: 4 }" :lg="{span:6}" :md="{span:8}"   :sm="{ span: 12 }" :xs="{span:24}"  class-name="carousel-item pdr-1-0 " v-for="i in 6" :key="i">
                <div class=" skeleton_animation " style="height: 100%;"></div>
              </Col>
            </Row>
          </div>
          <div class="content-right " style="margin-top: 0.52rem;">
            <Row type='flex' justify="start" class-name="menu-button " >
              <Col :xl="{ span: 7 }" :lg="{span: 11}" :xs="{ span: 24 }"  class-name="carousel skeleton_animation ">
              </Col>
              <Col :xl="{ span: 3 }"  :lg="{span: 3}" :xs="{ span:0 }"  class-name="carousel pdt-1-0 ">
                <div class="rank-menu skeleton_animation "></div>
              </Col>
              <Col :xl="{ span: 7 }"  :lg="{span: 0}" :xs="{ span:0 }" class-name="rank carousel  pdt-1-0">
                <div class="rank-menu skeleton_animation "></div>
              </Col>
              <Col :xl="{ span: 7 }"  :lg="{span: 10}" :xs="{ span:0 }"   class-name="collapse carousel pdt-1-0">
                <div class="rank-menu skeleton_animation "></div>
              </Col>
            </Row>
          </div>
          <Col :lg="{span:24}"  :md="{span:0}" :sm="{ span: 0 }" :xs="{span:0}" >
            <div class="content-nav rank-menu">
              <p class="skeleton_animation"></p>
              <p class="skeleton_animation"></p>
            </div>
            <div class="rank-menu">
              <p class="skeleton_animation"></p>
              <p class="skeleton_animation"></p>
            </div>
          </Col>
        </div>
        <Col :md="{span:24}" :sm="{ span: 0 }" :xs="{span:0}">
          <footer class="rank-menu skeleton_animation" ></footer>
        </Col>
      </div>
    </div>
  </transition>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    loading: true,
  }),
  created() {
    console.log("开始加载s",this.$store.state.isMobile);
    console.log("开始加载s2",this.isMobile);

  },
  mounted() {
    console.log("开始加载s2",this.isMobile);
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.loading = false
    //   }, 2000)
    // })

  },
  computed:{
    ...mapGetters([
      'isMobile'
    ]),
  },
  methods: {
    finishLoading() {
      this.loading = false
    },
    start() {
      this.loading = true
    },
    finish() {
      // setTimeout(()=>{
        this.loading = false
      // },200)
      console.log("开始结束");
    },
    open() {
      alert("页面加载错误，请刷新");
    },
    fail() {
      this.open();
    },
    increase(num) {

    },
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(56, 55, 55, 0.8);
  text-align: center;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 9999;
  display: flex;
  justify-content: flex-start;
  .page-left{
    width:60px;
    border-radius: 0;
  }
  .page-main{
    flex: 1;
    header{
      height: 75px;
      border-radius: 0;
    }
    .main-content{
      margin: 0.2rem;
      height: calc(100% - 190px);
      overflow: hidden;
      position: relative;

      .content-left,.content-right{
        .menu-button{
          height: 100%;
          .carousel{

          }
          .rank{
            .rank-menu{
              height: 100%;
            }
          }

          .collapse{
            //height: 100%;
          }
        }

      }
      .content-left{
        margin-top: 0;
        margin-bottom: 0;
        .menu-button{
          display: flex;
          align-items: start;
          width: 100%;
          box-sizing: border-box;
          .carousel{
            height: 50%;

          }
        }

      }
      .content-right{
        margin-top: 0;
      }
      .content-nav{
        position: absolute;
        right: 3px;
        /* display: flex; */
        top: 45px;
        p{
          height: 40px;
          width: 40px;
          border-radius: 50%;
        }
      }
      .content-button{
        position: absolute;
        left:25px;
        display: flex;
        top: 45px;
        p{
          width: 100px;
          height: 40px;
          border-radius: 20px;
          &:first-child {
            margin-right: 20px;
          }
        }
      }
    }
    footer{
      height: 75px;
      border-radius: 0;
    }
  }
}
.skeleton_animation{
  background: linear-gradient(90deg, #262121 25%, #262121bf 37%, #262121 63%);
  background-size: 400% 100%;
  animation: el-skeleton-loading 1000ms ease infinite;
  border-radius: 10px;
}
.Slideshow{
  height:30px;
  margin: 0 0px 0.2rem 0px;
}
@keyframes el-skeleton-loading {
  0% {
    background-position: 100% 50%
  }

  to {
    background-position: 0 50%
  }
}
.pdt-1-0{
  padding-left: 0.1rem;
}
.pdr-1-0{
  padding-right: 0.1rem;
  padding-top: 0.4px;
}
.rank-menu{
  height: 100%;
}

//media query
.Slideshow{
  height:30px;
}
.carousel-item{
  height: 150px;
}
.carousel{
  height: 300px;
}
@media (max-width: 576px){
  .main-content{
    height: 100% !important;
  }
}

</style>
