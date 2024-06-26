<template>
  <div class="bulletin-container contents-bck" id="bulletin">
    <transition name="bulletinShow" mode="in-out">
      <section class="bulletin-content mx-15-2  applyBck">
        <!--              //上下滚动-->
        <div class="bulletin-toBottom auto-line-between"  v-if="bulletinShow">
          <div class="content ">
            <div class="suona">
              <Icon type="md-megaphone" />
            </div>
            <transition-group name="bulletinShow" mode="in-out" tag="div" style="display: flex;flex-direction: column;">
              <div class="text-content auto-line-start " v-for="(item,index) in bulletinData " :key="index+20"
                v-show="bulletin == index">
                <div class="text">{{item.content}}</div>
                <Time :time="item.publishTime" class="time" v-if="item.publishTime" />
              </div>
            </transition-group>
          </div>
          <div class="close">
            <Icon type="md-close" />
          </div>
        </div>

        <!--              左右滚动-->
        <!--                <div class="bulletin-leftRight bulletin-toBottom " ref="leftRightContainer" >-->
        <!--                    <div class="suona applyBck" ref="leftIcon">-->
        <!--                        <Icon type="md-megaphone" />-->
        <!--                    </div>-->
        <!--                    <div class="content" ref="centerTextContainer">-->
        <!--                        <div class="text-content auto-line-start " ref="centerText" v-for="(item,index) in bulletinData " :key="index"  >-->
        <!--                            <div class="text">{{item.content}}</div>-->
        <!--                            <Time :time="((new Date()).getTime() - item.onlineTime)" class="time" />-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                    <div class="close applyBck" ref="rightIcon" @click="bulletinShow = !bulletinShow">-->
        <!--                        <Icon type="md-close" />-->
        <!--                    </div>-->
        <!--                </div>-->
      </section>
    </transition>
  </div>
</template>
<script>
  // import {Row, Col, Icon, Time} from 'iview';
  // import DeviceInfo from '@/assets/js/UAparser'
  export default {
    name: "bulletin",
    // components: {Row, Col, Icon, Time},
    data() {
      return {
        bulletinData: [
          { content: '这是第一个消息2', publishTime: 1648178094122, },
          { content: '这是第二个消息3', publishTime: 1648178094122, }
        ],
        bulletin: 0,
        bulletinShow: true,
        switch1: true
      }
    },
    created() {
      // this.setUserInfo()
      // this.getBulletin()
      //! 服务端获取的数据
      const state = this.$store.state.async_data
      if (state.bulletinData.length > 0){
        this.bulletinData = state.bulletinData
      }
    },
    mounted() {
      this.trundleToBottomBulletin()
      // this.trundleLeftRightBulletin()
    },
    methods: {
      change(status) {
        this.$Message.info('开关状态：' + status);
      },
      //从后端获取数据
      getBulletin() {
        let params = {
          pre_page: 4,
        }
        this.$api.bulletin.getBulletin(params).then(res => {
          if (res.code === 200) {
            this.bulletinData = res.bulletin.content
            return ture
          }
        })
      },
      //上向下滚动公告
      trundleToBottomBulletin() {
        setInterval(() => {
          this.bulletin++
          if (this.bulletin > this.bulletinData.length - 1) {
            this.bulletin = 0
          }
        }, 2000)
      },
      // 从左向右滚动
      // trundleLeftRightBulletin() {
      //   let marginLeft = 0;
      //   setInterval(() => {
      //     //总长度
      //     let leftRightContainer = this.$refs.leftRightContainer.clientWidth
      //     //左边icon长度
      //     let leftIcon = this.$refs.leftIcon.clientWidth
      //     //右边icon长度
      //     let rightIcon = this.$refs.rightIcon.clientWidth
      //     //中间活动长度
      //     let centerTextContainer = this.$refs.centerTextContainer.clientWidth
      //     let centerText = this.$refs.centerText[0].clientWidth
      //     marginLeft += 1
      //     if (marginLeft > centerTextContainer + rightIcon) {
      //       marginLeft = -centerText
      //       this.$refs.centerText[0].style.marginLeft = `${marginLeft}px`
      //     } else {
      //       this.$refs.centerText[0].style.marginLeft = `${marginLeft}px`
      //     }
      //   }, 20)
      // },
      // 统计用户信息
      // setUserInfo(){
      //   this.$api.user.setUserInfo(DeviceInfo()).then((res)=>{
      //     console.log(res)
      //   })
      // }
    },
  }
</script>
<style lang="scss" scoped>
  /* @import '~/assets/css/_bianlian.scss'; */
  .bulletin-container {
    display: flex;
    width: 100%;

    .bulletin-content {
      margin: 0.1rem 2%;
      height: 0.3rem;
      min-height: 20px;
      border-radius: 5px;
      width: 100%;

      .bulletin-toBottom {
        height: 100%;
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;

        .suona {
          display: inline-block;
          color: red;
          padding: 0px $padding10;
          font-size: 18px;
        }

        .content {
          flex: 1 1 auto;
          overflow: hidden;
          display: flex;
          align-items: inherit;

          .text-content {
            display: inline-block;
            align-items: center;
            overflow: hidden;
            white-space: nowrap;
            vertical-align: sub;

            .text {
              display: inline-block;
              color: red;
              font-size: 14px;
            }

            .time {
              color: red;
              font-size: 14px;
            }

          }
        }

        .close {
          color: red;
          padding: 0px $padding10;
          font-size: 18px;
          transition: transform .3s;

          &:hover {
            transform: rotate(180deg)
          }
        }
      }

      .bulletin-leftRight {
        position: relative;
        height: 100%;
        overflow: hidden;

        .text-content {}
      }
    }
  }

  //关闭动画
  .bulletinShow-enter,
  .bulletinShow-leave-to {
    transform: translateY(-50px);
    opacity: 0;
  }

  .bulletinShow-enter-active {
    transition: all .5s cubic-bezier(.645, .045, .355, 1), stroke .2s ease;
  }

  .bulletinShow-leave-active {
    transition: all .5s cubic-bezier(.645, .045, .355, 1), stroke .2s ease;
  }
</style>
