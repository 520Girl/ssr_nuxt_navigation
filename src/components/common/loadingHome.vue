<template>
  <transition name="fade">
    <div class="loading-page " v-if="loading">
    <div class="page-left skeleton_animation"></div>
    <div class="page-main">
      <header class="skeleton_animation"></header>
      <div class="main-content">
        <div class="content-left ">
          <div class="Slideshow skeleton_animation"></div>
          <div class="Slideshow skeleton_animation" style="height: 35px;"></div>
          <Row type='flex' justify="start" class-name="menu-button" >
            <Col :xl="{ span: 4 }" :lg="{span:6}" :md="{span:8}"   :sm="{ span: 12 }" :xs="{span:24}" class-name="carousel" v-for="i in 6" :key="i">
              <div class="carousel-item skeleton_animation"></div>
            </Col>

          </Row>
        </div>
        <div class="content-right ">
          <Row type='flex' justify="start" class-name="menu-button" >
            <Col :lg="{span:8}" :md="{span:12}" :xs="{ span: 24 }" class-name="carousel skeleton_animation">

            </Col>
            <Col :lg="{span:8}" :md="{span:12}" :xs="{ span: 24 }" class-name="rank ">
              <div class="rank-menu skeleton_animation"></div>
            </Col>
            <Col :lg="{span:8}" :md="{span:0}"  :xs="{ span: 0 }" class-name="collapse skeleton_animation">

            </Col>
          </Row>
        </div>
        <div class="content-nav">
          <p class="skeleton_animation"></p>
          <p class="skeleton_animation"></p>
        </div>
        <div class="content-button">
          <p class="skeleton_animation"></p>
          <p class="skeleton_animation"></p>
        </div>
      </div>
      <footer class="skeleton_animation" ></footer>
    </div>
  </div>
  </transition>

</template>

<script>
export default {
  data: () => ({
    loading: true,
  }),
  mounted() {
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.loading = false
    //   }, 2000)
    // })

  },
  methods: {
    finishLoading() {
      this.loading = false
    },
    start() {
      console.log("开始加载");
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
      margin: 20px;
      height: calc(100% - 190px);
      overflow: hidden;
      position: relative;

      .content-left,.content-right{
        height: 40%;
        margin: 20px;
        .menu-button{
          height: 100%;
          .carousel{
            height: 100%;

          }
          .rank{
            .rank-menu{
              height: 100%;
              margin-right: 50px;
              margin-left: 50px;
            }
          }

          .collapse{
            height: 100%;

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
            .carousel-item{
              margin: 0 20px 20px 20px;
              height: 100%;
            }
          }
        }

      }
      .content-right{
        margin-top: 0;
      }
      .content-nav{
        position: absolute;
        right: 10px;
        bottom: 18px;
        p{
          height: 40px;
          width: 40px;
          border-radius: 50%;
        }
      }
      .content-button{
        position: absolute;
        left: 20px;
        display: flex;
        bottom: 50px;
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
  margin: 0 0px 20px 0px;
}
@keyframes el-skeleton-loading {
  0% {
    background-position: 100% 50%
  }

  to {
    background-position: 0 50%
  }
}
</style>
