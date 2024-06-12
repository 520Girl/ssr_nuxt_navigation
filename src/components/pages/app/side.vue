<template>
  <div class="side-app footer-tools" :style="slideHide ? 'transform: translateX(0px);' : ''">
    <a
      href="javascript:void(0)"
      class="btn auto-line-center fontSize-like"
      style="background-color: #8444da!important;"
      @click.prevent.once="headerTagIHandle(1)"
      v-like="{title:$route.query.title,type:'HN',id:$route.params.id,url:`/app/${$route.params.id}?title=${$route.query.title}`,belong:'app'}">
      <Icon type="ios-thumbs-up" class="fontSize-icon fontSize-like"  />
      <canvas id="cavs" width="300" height="150" >您的浏览器不支持canvas标签~</canvas>
      <canvas id="cavs2" width="300" height="150" >您的浏览器不支持canvas标签~</canvas>
    </a>
    <Badge
      :count="hotAppData.heartNum"
      :offset="[5,6]"
      overflow-count="999"
      v-if="hotAppData"
      v-like="{title:$route.query.title,type:'EN',id:$route.params.id,url:`/app/${$route.params.id}?title=${$route.query.title}`,belong:'app'}
">
      <a href="javascript:void(0)" class="btn auto-line-center " @click.prevent.once="headerTagIHandle(0)">
        <Icon type="md-heart" :class="{'fontSize-icon fontSize-like':true,'headerTagI':heartNumClick}" />
      </a>
    </Badge>
  </div>
</template>

<script>
import JumpBubble from "@/assets/js/jumpBubble";

export default {
  name: "AppSide",
  props:{
    // hotAppData:{type:Array,required:false,default:()=>[]}
    hotAppData:{type:[Object,Array],required:false,default:()=>[]}
  },
  data(){
    return{
      heartNumClick:false, //0
      cavsClick:false, // 1
      cavasImgaes:[
        require('@/assets/images/app/2.png'),
        require('@/assets/images/app/1.png'),
        require('@/assets/images/app/3.png'),
        require('@/assets/images/app/4.png'), //注：路径是相对html的路径，因为该路径最终会放到img标签的src上
      ],
      times:'',
      slideHide:false,
      canvas:null
    }
  },
  mounted() {
    this.JumpBubble()
    this.slideHide = true
  },
  computed:{
    hotAppDataID(){
      console.log(this.hotAppData)
      return this.hotAppData.commentsLen
    }
  },
  methods:{
    //点击喜欢
    headerTagIHandle(id){
      if (id === 0){
        this.heartNumClick = true;
        this.hotAppData.heartNum += 1;
      }else {
        this.cavsClick = true,
        this.cavasImgaes = this.cavasImgaes.slice(0,1)
        clearInterval(this.times)
        const c = document.getElementById("cavs");
        const tempCanvas = document.getElementById('cavs2');
        // let parent = c.parentNode;
        // tempCanvas.width = 80
        // tempCanvas.height = 115
        // parent.insertBefore(tempCanvas,c)
        // console.log(tempCanvas)

        const tempCtx = this.JumpBubble(this.cavasImgaes,tempCanvas)
        this.canvas.ctx.clearRect(0,0,c.width, c.height)
        // this.canvas.ctx.drawImage(tempCanvas,10,10)

      }

    },
    //点赞冒泡
    JumpBubble(list=this.cavasImgaes,id=''){
      if (!id){
        id = document.getElementById('cavs')
      }
      this.canvas = new JumpBubble(id);
      let s = 0
      this.times = setInterval(() => {
        if (s > list.length - 1) {
          s = 0;
        }
        this.canvas.create(list[s]);
        s++
      }, 250);
    },
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/css/animation.scss";
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
.side-app{
  transition: all 1s;
  transform: translateX(80px);
}
</style>
