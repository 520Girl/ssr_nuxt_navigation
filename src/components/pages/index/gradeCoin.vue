<template>
  <div class="gradeCoin-container contents-bck" id="gradeCoin">
    <section class="gradeCoin-content mx-15-2 ">
      <div class="gradeCoin-header  mx-2 auto-line-start applyBck">
        <div class="header-tag ">
          <Icon type="md-planet "/>
          评分宝
        </div>
        <div class="header-text fontSize-text ">
          <p class="overflow-eclipse">截止有<strong>{{ gradeCoinLists.allCount}}</strong>家公司加入,<strong>{{gradeCoinLists.commentAll}}</strong>名用户评价</p>
        </div>
      </div>
      <gradeCoin-box :GCGird="GCGird" :gradeCoinLists="gradeCoinLists"></gradeCoin-box>
      <loading-round :spinShow="gradeCoinSpin"></loading-round>
    </section>

  </div>
</template>
<script>
// import {Row, Col, Icon, Tooltip} from 'iview';
import gradeCoinBox from "@/components/pages/gradeCoin/gradeCoinBox";
import loadingRound from "@/components/common/loadingRound"; //loading
export default {
  name: 'gradeCoin',
  components: {gradeCoinBox,loadingRound},
  props:{
   gradeCoinLists:{
     type:Object,
     required:true,
     default:{}
   },
    gradeCoinSpin:{
     type:Boolean,
      required: false,
      default: true
    }
  },
  //    components: {Row, Col, Icon, Tooltip,countToNumber,gradeCoinBox},
  data() {
    return {
      GCGird:[4,6,8,12,24],
      spinShow:true,
    }
  },
  mounted() {

  },
  methods:{

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/commonmMixin.scss'; //引入gradeCoin-menu;
@import "~@/assets/css/animation.scss";
.gradeCoin-container {
  display: inline-block;
  width: 100%;

  .gradeCoin-content {
    position: relative;
    .gradeCoin-header {
      padding: 0.05rem 0;
      align-items: center;
      border-radius: 5px;
      min-height: 30px;
      .header-tag {
        color: #fd5813;
        font-size: 17px;
        font-weight: bold;
        padding-right: 0.1rem;
        box-sizing: border-box;
        white-space: nowrap;
        i {
          font-size: 28px;
          padding: 0 0.05rem;
          animation: headerTagI 3s infinite;
        }
      }
      .header-text {
        overflow: hidden;
        p {
          font-size: 17px;

          strong {
            padding: 0.05rem;
            font-size: 16px;

          }
        }
      }
    }
    @include gradeCoin-menu;
  }
}

</style>
