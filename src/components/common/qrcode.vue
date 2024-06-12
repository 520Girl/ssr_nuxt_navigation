<template>
  <div class="qrcode-container">
    <div class="qrcode-layout">
      <div id="qrcode" ref="qrcode" ></div>
      <!--        <div id="qrcode" ref="qrcode" v-if="imgData==''"></div>-->
      <!--          <img v-else alt="5555" :src="imgData" style="width: 200px;height: 200px;" />-->
    </div>
  </div>
</template>
<script>
//npm install qrcodejs2 --save
//npm install --save html2canvas
// import html2canvas from 'html2canvas'
// import QRCode from 'qrcodejs2'
export default{
  name:"qrcode",
  props:{
    qrcodeUrl:{type:String,required:false,default:process.browser?window.location.origin:''}
  },
  data(){
    return{
      imgData:''
    }
  },
  mounted() {
    this.qrcode()
  },
  methods:{
    //生成二维码
    qrcode(){
      new this.$qrcode(this.$refs.qrcode,{
        width: 150,
        height: 150,
        text:this.qrcodeUrl,
        colorDark: '#333333', // 二维码颜色
        colorLight: '#ffffff', // 二维码背景色
        correctLevel: this.$qrcode.CorrectLevel.H// 容错率，L/M/Q/H,遮挡越来越多都能识别
      })
      // this.createPicture()
    },
    // //生成图片
    // createPicture(){
    //   html2canvas(this.$refs.qrcode, {
    //     // backgroundColor: '#ffffff',
    //     width: 150,
    //     height: 150
    //   }).then(canvas => {
    //     var imgData = canvas.toDataURL('image/jpeg')
    //     this.imgData = imgData
    //     console.log(this.imgData)
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
$qrcodeWidth:1.6rem;
$qrcodeHeight:1.6rem;
.qrcode-container{
  width: $qrcodeWidth;
  height: $qrcodeHeight;
  .qrcode-layout{
    width: 100%;
    height: 100%;
    background: #ffffff;
    text-align: center;
    #qrcode{
      width: $qrcodeWidth;
      height: $qrcodeHeight;
      margin:auto;
      padding-top: 0.05rem;
      padding-left: 0.05rem;

    }
  }
}
::v-deep img{
  width: $qrcodeWidth;
  height: $qrcodeHeight;
  padding-right: 0.1rem;
  padding-bottom: 0.1rem;
}
</style>
