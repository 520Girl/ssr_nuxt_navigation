//vue-countTo
<template>
        <span  :data-time="time" class="number-grow" :data-decimals="decimals" :data-value="value" :data-prefix="prefix" :data-suffix="suffix">
          {{displayValue}}
        </span>
</template>

<script>
  export default {
    name:"CountToNumber",
    props: {
      time: {
        type: Number,
        default: 2
      },
      value: {
        type: Number,
        default: 100
      },
      decimals:{
        type: Number,
        default:0
      },
      prefix:{ //数字前面的字符
        type:String,
        default:'',
      },
      suffix:{//数字后面的字符
        type:String,
        default:'',
      }
    },
    mounted () {
      this.numberGrow()
    },
    data(){
      return{
        displayValue:0
      }
    },
    computed:{
      // valueLoading(){
      //   let {loading,value}=''
      //   return {loading:this.$store.state.loadingHome,value:this.value}
      // }
    },
    methods: {
      numberGrow () {

        let _this = this

        let step = (_this.value * 10) / (_this.time * 1000)
        let current = 0
        let start = 0

        let t = setInterval(function () {
          start += step
          if (start > _this.value) {
            clearInterval(t)
            start = _this.value
            t = null
          }
          if (current === start) {
            return
          }
          current = start
          _this.displayValue = current.toFixed(_this.decimals).toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,') + _this.suffix
        }, _this.time)

      }
    },

    watch: {
      // valueLoading: {
      //   handler(event){
      //     this.numberGrow()
      //     console.log(888)
      //   },
      //   deep:true
      // }
    }
  }
</script>

<style>
    /*.number-grow-warp{*/
    /*    transform: translateZ(0);*/
    /*}*/
    /*.number-grow {*/
    /*    font-family: Arial-BoldMT;*/
    /*    font-size: 64px;*/
    /*    color: #ffaf00;*/
    /*    letter-spacing: 2.67px;*/
    /*    margin:110px 0 20px;*/
    /*    display: block;*/
    /*    line-height:64px;*/
    /*}*/
</style>
