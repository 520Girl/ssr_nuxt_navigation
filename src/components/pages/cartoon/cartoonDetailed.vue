<template>
<!--  <header-nav ref="header" @cartoonDetailed="setScrollDistance" @cartoonChapter="cartoonChapter($event)">-->
    <div class="cartoon-detailed-container" >
      <div class="cartoon-detailed-layout" >
        <Row type="flex" justify="center" align="top" class-name="carousel-article">
          <Col :xl="{ span: 24 }" :lg="{span:24}" :sm="{ span: 24 }" :xs="{span:24}" class-name="cartoon-detailed" >
            <div class="cartoon-detailed-header-wrap" :style="{height:chaptersHandle.nav ? '' : '0px'}">
              <div class="cartoon-detailed-header auto-line-between header-bck">
                <div class="header-nav">
                  <router-link :to="{path:'/'}" class="home">首页</router-link>
                  <span class="nextIcon">></span>
                  <router-link :to="{path:'/cartoon/'+$route.params.belong,query:{title:cartoonData.title}}" class="aside">{{cartoonData.title}}</router-link>
                </div>
                <div class="header-title" v-if="cartoonData.content">{{cartoonData.content.chaptername}}</div>
                <div class="header-help">
                  <Icon type="md-help-circle" />帮助
                </div>
              </div>
            </div>
            <aside class="cartoon-detailed-main" v-if="cartoonData.state == 1" >
              <ul class="comic-contain">
                <li :data-index="index" v-for="(item,index) in cartoonData.content" :key="index" ref="comic_contain_li">
                  <div class="reader" >
                    <img v-lazy="'/static/images/cartoon/'+$route.params.belong+'/'+$route.params.class+'/'+item" data-cartoon="cartoon5" :alt="index">
                  </div>
                  <span class="comic-ft fontSize-text-colornoH">{{(index+1)+'/'+cartoonData.content.length}}</span>
                </li>
              </ul>
            </aside>
            <div class="cartoon-onData" v-else>呀！ 暂无数据,如需 请点击帮助</div>
            <p class="chapters-index-footer" ref="chapters_index_footer" v-if="(cartoonData.content instanceof Array)">
              {{cartoonData.title+' '+chaptersHandle.pageNum+'/'+cartoonData.content.length || 0}}{{(cartoonData.content instanceof Array)}}
            </p>
            <div class="cartoon-detailed-footer header-bck" :style="{height:chaptersHandle.nav ? '' : '0px'}">
<!--            <div class="cartoon-detailed-footer header-bck" >-->
              <div class="inner">
                <div class="right">
                  <p :class="{active:chaptersHandle.catalog,'chapters-btn':true}" @click="cartoonALLChapter"  >
                    <Icon type="md-list-box" />
                    章节目录
                  </p>
                  <p class="chapters-btn form-onlyRead">
                    <Icon type="ios-bookmarks" />
                    左右翻页
                  </p>
                  <p :class="{active:!chaptersHandle.rolling,'chapters-btn':true}" @click="scrollClickTop(chaptersHandle.rolling=!chaptersHandle.rolling)">
                    <Icon type="md-arrow-dropleft-circle" />
                    自动滚动
                  </p>
                </div>
                <div class="middle">
                  <span class="middle-chapters-num" v-if="cartoonData.content">{{chaptersHandle.pageNum+'/'+ cartoonData.content.length || 1}}</span>
<!--                  <div class="middle-scale"  @dragover="dragOver" @dragenter="dragEnter" @drop="droP">-->
<!--&lt;!&ndash;                    dragStart 拖动开始, drag 拖动过程持续运动&ndash;&gt;-->
<!--                    <i draggable="true" @dragstart="dragStart($event)"  @drag="drag($event)" id="fdaffda" ></i>-->
<!--                  </div>-->
                  <div class="middle-scale" v-if="cartoonData.content">
                    <Slider v-model="chaptersHandle.pageNum" :step="1" show-stops :max="cartoonData.content.length-1" :min="0" @on-input="sliderDrag"></Slider>
                  </div>
                  <div class="middle-tb-chapters ">
                    <p :class="cartoonData.prevId == -1 ? 'chapters-btn form-onlyRead' : 'chapters-btn'" @click="allStart({state:1,item:cartoonData.prevId})">
                      <Icon type="md-skip-backward " />
                      上一话
                    </p>
                    <p :class="cartoonData.nextId == -2 ? 'chapters-btn form-onlyRead' : 'chapters-btn'" @click="allStart({state:1,item:cartoonData.nextId})">
                      <Icon type="md-skip-forward" />
                      下一话
                    </p>
                  </div>
                </div>
                <div class="left" >
                  <div :class="{'left-btn-all':true,'form-onlyRead':cartoonData.state == 0,active:chaptersHandle.fullScreen}" @click="fullScreen">
                    <b class="border-color"></b>
                    <b class="border-color"></b>
                    <b class="border-color"></b>
                    <b class="border-color"></b>
                    全屏
                  </div>
                  <div class="left-btn-scale border-color">
                    <b :class="cartoonData.state == 0 ? 'cut border-color form-onlyRead':'cut border-color'" @click="amplifyNarrow(2)">-</b>
                    <span class="percent border-color">{{chaptersHandle.bigNum.show}}%</span>
                    <b :class="cartoonData.state == 0 ? 'add border-color form-onlyRead':'add border-color'" @click="amplifyNarrow(1)">+</b>
                  </div>
                </div>
                <div class="chapters-content" :style="chaptersHandle.catalog ? 'left:60px' : ''" >
                  <h1>{{cartoonData.title}}目录</h1>
                  <div class="chapters-content-main">
                    <ul class="main-wrap" v-if="cartoonChapter.content" >
                      <li class="item overflow-eclipse" v-for="(item,index) in cartoonChapter.content" :key="index" @click="allStart({state:1,item:{id:item.chapterId,title:item.chapterName}})">
                        <a href="javascript:void(0)" :title="cartoonData.title">
                          <span>[{{index+1}}]</span>
                          <span>{{item.chapterName}}</span>
                          <span v-if="item.state == 0"><Icon type="ios-book" color="red"/></span>
                          <span v-else><Icon type="ios-book" color="green"/></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h1 >共{{cartoonChapter.contentL}}话</h1>
                </div>
              </div>
            </div>
            <div style="position: fixed;z-index: 3;top: 0;bottom: 0;right: 0;left: 0;"  v-show="!chaptersHandle.rolling" @click="scrollClickTop(true)"></div>
          </Col>
        </Row>
      </div>
      <cartoon-side @cartoonDetailed="setScrollDistance" @cartoonChapter="handleCartoonChapter($event)" :cartoonData="cartoonData" v-if="ele"></cartoon-side>
    </div>
</template>

<script>
import headerNav from "@/components/common/headerNav";
import cartoonSide from "@/components/pages/cartoon/side"

export default {
  name: "CartoonDetailed",
  components:{headerNav,cartoonSide},
  async asyncData({$api,route}){
    const {cartoon} = await $api.cartoon.getCartoonLook({belong:route.params.belong,id:route.params.class})
    return{
      cartoonData:cartoon
    }
  },
  data(){
    return{
      cartoonData:{},//漫画数据
      cartoonChapter:[],//章节数据
      imgWh:{width:800,height:1131,originalWidth:800,originalHeight:1131},//图片的宽度高度
      chaptersHandle:{catalog:false,flip:false,rolling:true,nav:false,fullScreen:false,bigNum:{space:100,show:100},pageNum:0},//控制章节目录，左右翻页，自动滚动，导航，全屏，放大缩小数值,滑动页数
      dragData:{startSite:0},//拖动数据
      distance:0,//滚动的距离
      mousemoveStatus:false,//鼠标是否再次移动
      scrollClickTopTimer:null,//自动滚动
      ele:false
    }
  },
  created() {
    // this.allStart({state:0})
  },
  mounted() {
    //! nuxt 的数据进行处理
    this.cartoonData.state === 0 ? this.chaptersHandle.pageNum = 0 : ''
    console.log(`https://${window.location.host}/static/images/cartoon/${this.$route.params.belong}/${this.$route.params.class}/${this.cartoonData.content[0]}`)
    this.getImgWH(`https://${window.location.host}/static/cartoon/${this.$route.params.belong}/${this.$route.params.class}/${this.cartoonData.content[0]}`)
    this.handleCartoonMove()
    // let store = this.$store.state
    // this.$store.commit('setHeadeSidebar',[!store.hideSidebar,!store.hideHeader])
    window.onresize = ()=>{
      this.handleOnresize()
    }
    setTimeout(()=>{
      this.ele = true
    },500)
  },
  beforeDestroy(){ // 当组件销毁时
    console.log(888)
    this.$store.commit('setHeadeSidebar',[true,true])
  },
  methods:{
    //开始
    allStart(params){
      console.log(params)
      if (params.state == 0 ){
        Promise.all([this.getCartoonLook()]).then(res=>{
          this.$nextTick(()=>{
            this.$store.commit('getLoadingHome',false)
          })
        })
      }else {
        this.$router.replace({
          params:{
            class:params.item.id
          },
          query:{
            title:params.item.title
          }
        })
        this.chaptersHandle.pageNum = 1
        Promise.all([this.getCartoonLook()]).then(res=>{
          this.$nextTick(()=>{
            this.$store.commit('getLoadingHome',false)
          })
        })
      }
    },
    //获取章节数据 0 表示还未爬取数据
    getCartoonLook(id=this.$route.params.class){
      if (id == -1){
        this.$Notice.warning({title:'漫画',desc:'已是最新章节',})
        return ;
      }
      if (id == -2){
        this.$Notice.warning({title:'漫画',desc:'已是最后章节',})
        return ;
      }
      this.$api.cartoon.getCartoonLook({belong:this.$route.params.belong,id:id}).then(res=>{
        if (res.status === 1){
          this.cartoonData = res.cartoon
          this.cartoonData.state == 0 ? this.chaptersHandle.pageNum = 0 : ''
          console.log(this.cartoonData)
          console.log(`https://${window.location.host}/static/images/cartoon/${this.$route.params.belong}/${this.$route.params.class}/${this.cartoonData.content[0]}`)
          this.getImgWH(`https://${window.location.host}/static/cartoon/${this.$route.params.belong}/${this.$route.params.class}/${this.cartoonData.content[0]}`)

          this.handleCartoonMove()
        }
      })
    },
    //获取图片宽高，用于定位高度
    getImgWH(imgurl){ //避免从缓存中获取图片带上时间戳
      console.log(imgurl)
      let img_url = `${imgurl}?${Date.now()}`;
      let img = new Image();
      img.src = img_url;
      //定时获取图片宽高，因为我们知道，在图片还没有被下载下来就已经有占位符了，这时就可以获取到图片高度，不需要等待onload，这样会耗时过久
      let checkImg = ()=>{
        if (img.height > 0){
          this.$nextTick(()=>{
            this.imgWh.height = img.height;
            this.imgWh.width = img.width;
            this.imgWh.originalWidth = img.width;
            this.imgWh.originalHeight = img.height;
            this.handleOnresize()
          })
          clearInterval(timer)
        }
      }
      let timer = setInterval(checkImg,40);
    },
    //当页面刷新时判断图片的宽度,节流，
    handleOnresize(){
      let timer = null;
      if (timer) clearTimeout(timer);
      timer = setTimeout(()=>{
        //判断屏幕宽度大于图片宽度， 大于则等于图片宽度
        //小于 则，通过计算图片高度于图片高度的比例值， 再用屏幕宽度-40的留白，  已知图片宽度，宽高比值，可计算出图片高度
        let windowWidth = this.$common().getWindowHeightWidht().width;
        let specificImg = ((this.imgWh.width)/this.imgWh.height).toFixed(3);
        // let setWidthHeight ={width:this.imgWh.width,height: this.imgWh.height};
        if (windowWidth <= this.imgWh.width ){
          this.imgWh.width = (windowWidth - 40)
          this.imgWh.height = (this.imgWh.width / specificImg).toFixed(1)
        }
        this.$refs.comic_contain_li.some((item,index)=>{
          item.style.width = this.imgWh.width+'px'
          item.style.height = this.imgWh.height+'px'
        })
        console.log(this.imgWh.width)
        //设置章节的显示的位置
        this.$refs.chapters_index_footer.style.marginLeft=- this.imgWh.width/2+'px'
      },100)
    },
    //滑轮划过的距离,父组件传过来的值
    setScrollDistance(distance){
      this.distance = distance //用于鼠标经过handleCartoonMove
      this.handleCartoonMove()
      //到屏幕底部的高度，判断小于滑动的高度就位当前看到的章节
      let bottomDistance = distance + this.$common().getWindowHeightWidht().height
      this.$refs.comic_contain_li.some((item,index)=>{
        if (bottomDistance < (item.offsetTop+parseInt(item.style.height))){
          this.chapters=index+1
          return true
        }
      })

    },
    //s鼠标滑动 显示漫画导航，与隐藏
    handleCartoonMove(){
      //y ,距离y轴高度，event 鼠标元素
      var pos = (y, event) =>{  //鼠标定位赋值函数

        this.mousemoveStatus = false
        var posX = 0, posY = 0;  //临时变量值
        var e = event || window.event;  //标准化事件对象
        if (e.pageX || e.pageY) {  //获取鼠标指针的当前坐标值 ，不兼容ie
          // posX = e.pageX;
          posY= e.pageY;
        } else if (e.clientX || e.clientY) { //不兼容safari
          // posX = event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
          posY = event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
        }

        if ((posY - this.distance ) <= 64 ||  ((this.distance + this.$common().getWindowHeightWidht().height - posY)) <= 64){
          this.chaptersHandle.nav = true
          this.mousemoveStatus = true
          // console.log(posY - this.distance)
          // console.log(((this.distance + this.$common.getWindowHeightWidht().height - posY)))
          // console.log(`start：posY${posY},鼠标位置${((this.distance - posY + this.$common.getWindowHeightWidht().height - 64))},到顶部距离${this.distance}`)
        }
        // if (this.timers !== null) clearTimeout(this.timers)
        if (this.chaptersHandle.nav == true && this.mousemoveStatus == false){
          console.log(99999)
          setTimeout(()=>{
            // this.chaptersHandle.nav = false
            this.chaptersHandle.nav = false
          },1500)
        }
      }
      let timer = null
        document.onmousemove = function (event) {
          if (timer !== null) clearTimeout(timer)
          timer = setTimeout(function(){
            pos (64, event);
          },100)
        }
    },
    //全屏显示
    fullScreen() {
      if (this.cartoonData.state == 0) {return }
      this.chaptersHandle.fullScreen = !this.chaptersHandle.fullScreen
      if (!this.chaptersHandle.fullScreen){this.exitFullscreen();return }
      let element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      }
    },
    //退出全屏
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    //点击自动滚动
    scrollClickTop(stopScroll=false){
      //scrollTop 为窗口的顶部位置，需要加上浏览器的高度为底部位置
      //每次重新开始需要减去滚动条高度 滚动条高度 = 容器高度/内容高度 * 容器高度
      //容器高度
      let containerHeight = this.$common().getWindowHeightWidht().height
      //通过计算图片总高度获取需要滚动的距离，50 为上下margin之和
      let scrollTopImg = (this.imgWh.height * this.cartoonData.content.length + this.cartoonData.content.length * 50).toFixed(1)
      //滚动条高度
      // let ScrollBarHeight =  parseInt(containerHeight /scrollTopImg * containerHeight) || 0
      //页面可视底部到 元素顶部距离
      let scrollTop = Math.max(document.documentElement.scrollTop || document.body.scrollTop) + containerHeight
      //点击是否清除滚动
      if (stopScroll) {
        this.chaptersHandle.rolling = true
        clearInterval(this.scrollClickTopTimer);
        console.log(`结束滚动条高度${scrollTop}`);
        return;
      }else {
        //需要减去 可视窗口高度......... 搞了半天
        scrollTop = scrollTop -  containerHeight
      }
      console.log(`开始滚动条高度${scrollTop}${stopScroll}`)
      // console.log(`滚动条高度为：${ScrollBarHeight }` )
      let spend=5,time=20;

      this.scrollClickTopTimer = setInterval(()=>{
        if ((scrollTop+containerHeight) <= scrollTopImg ) {
          window.requestAnimationFrame(()=>{window.scrollTo(0,scrollTop+=spend,'smooth')})
          console.log(`scrollTop:${scrollTop},height:${scrollTopImg}`)
          //   }
        }else {
          console.log(this.$common().getWindowHeightWidht())
          this.chaptersHandle.rolling = true
          clearInterval(this.scrollClickTopTimer)
          return;
        }
      },time)
    },
    //点击放大缩小status 为点击add 为 1 ，cut 为2 ,最大1200 最小 为图片原始宽度
    amplifyNarrow(status=1){
      if (this.cartoonData.state == 0) {return }

      let windowWidth = this.$common().getWindowHeightWidht().width;
      let specificImg = ((this.imgWh.width)/this.imgWh.height).toFixed(3);

      if (status === 1){ //ADD
         this.imgWh.width+=Number(this.chaptersHandle.bigNum.space)
          windowWidth <= this.imgWh.width || this.imgWh.width >=1200  ? this.imgWh.width = (windowWidth >= 1200 ? 1200 : windowWidth)  : this.chaptersHandle.bigNum.show+=10
      }else { //CUT
        this.imgWh.width-=Number(this.chaptersHandle.bigNum.space)
        if (this.imgWh.width <= this.imgWh.originalWidth){
          this.imgWh.width = this.imgWh.originalWidth;
          this.chaptersHandle.bigNum.show = 100
        }else{
          this.chaptersHandle.bigNum.show-=10
        }
      }
      this.imgWh.height = (this.imgWh.width / specificImg).toFixed(2)

      let setWidthHeight ={width:this.imgWh.width,height: this.imgWh.height};
      this.$refs.comic_contain_li.some((item,index)=>{
        item.style.width = setWidthHeight.width+'px'
        item.style.height = setWidthHeight.height+'px'
      })
    },
    //滑轮滑动, 这里需要使用
    sliderDrag(data){
      console.log(data,1)
      //通过计算图片总高度获取需要滚动的距离，50 为上下margin之和
      this.$common().debounce(()=>{
        let pageImgInterval =(data * 64)
        let scrollTopImg = (this.imgWh.height * data + pageImgInterval).toFixed(1)
        window.scrollTo(0,scrollTopImg,'smooth')
      })

    },
    //footer 上一章下一章
    handleCartoonChapter(state){
      if (state == -1){ //表示上一章
       const {id,title} = this.cartoonData.prevId
        this.allStart({state:1,item:{id:id,title:title}})
      }else{ // 表示下一章
        const {id,title} = this.cartoonData.nextId
        this.allStart({state:1,item:{id:id,title:title}})
      }

    },
    //获取章节全部数据
    cartoonALLChapter(){
      this.chaptersHandle.catalog = !this.chaptersHandle.catalog
      if (this.cartoonChapter.length > 0)return ;
      this.$api.cartoon.getCartoonChapters({belong:this.$route.params.belong}).then(res=>{
        if (res.status === 1){
          this.cartoonChapter = res.cartoon
        }
      })

    },
    //拖动开始---------------------------------------------------
    dragStart(event){
      //计算滚动的比例
      // let wrapWidth = this.$refs.dragEleWrap.offsetWidth;
      event.dataTransfer.setData('Text',event.target.id)
      this.dragData.startSite = event.x
      console.log("拖动开始")
      console.log(event)
      event.target.style.backgroundColor='red'
      // event.target.style.left='20px'
    },
    dragEnter(){ //只有拖进目标就会触发，不是持续触发
      console.log("拖进目标元素")
    },
    drag(event){ //与dragOver同步进行，在其之后执行
      this.chaptersHandle.pageNum++
      console.log(event.target.style.left =  event.x - this.dragData.startSite + 'px'  )
      this.dragData.startSite = event.x
      console.log(event)
      console.log("拖动结束2")
    },
    dragOver(event){ //再enter之后触发。持续触发

      event.preventDefault()
      console.log("拖动目标元素并移动")
    },
    droP(event){
      this.dragData.startSite = event.x
      console.log(event)
      console.log(event.dataTransfer.getData('Text'))
      console.log("拖拽结束")
      console.log(event.x)
    },
    //拖动结束----------------------

  },
  computed:{},
  filters:{
    imageHandle(value){
      if (value.includes('.image.png')){
        //
        value = value.split('~')
        value = value[0] + '_tplv-obj.jpg'
      }
      return value
    }
  },
  watch:{
  },
  deactivated() { //keep-alive 多的两个生命周期，第一个为销毁时，第二个为激活时
    this.$destroy('CartoonDetailed')
  },
  activated(){}
}
</script>

<style scoped lang="scss">
  @import "~@/assets/css/components/cartoon/cartoonDetailed.scss";
</style>
