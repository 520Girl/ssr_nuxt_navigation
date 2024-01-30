<template>
  <div :class="{'page-container auto-line-start':true,'hideSidebar':!hideSidebar}" @touchmove.prevent>
    <div
      :class="sidebarOnOff ? 'page-sidebar width-six sidebar-bck widthOnOff' : 'page-sidebar width-six sidebar-bck '">
      <div class="sidebar-logo">
        <a href="" class="logo-expanded auto-line-center boxSizing"
          :style="sidebarOnOff ? 'display:block;' : 'display:none;'">
          <img src="https://s1.xmcdn.com/yx/ximalaya-web-static/last/dist/images/default-ad_a4a9be6.jpg" alt="logo">
        </a>
        <a href="" class="logo-collapsed auto-line-center boxSizing"
          :style="sidebarOnOff ? 'display:none;' : 'display:block;'">
          <img src="https://s1.xmcdn.com/yx/ximalaya-web-static/last/dist/images/default-ad_a4a9be6.jpg" alt="">
        </a>
      </div>

      <div class="menu-top">
        <div class="menu-app">
          <Tooltip placement="right" :disabled="!sidebarOnOff">
            <a href="javascript:void(0)" class="app-icon-left auto-line-start"
              @click="sidebarOnOff ? appSidebarOnoff = false : appSidebarOnoff = !appSidebarOnoff">
              <i class="iconfont icon-yingyong footSize-icon-slidebar mx-1"></i>
              <div class="app" :style="sidebarOnOff ? 'opacity: 0;' : 'opacity: 1;'">
                <transition name="menuText" mode="in-out">
                  <span class="footSize-text-slidebar" v-show="!sidebarOnOff">{{$t('applyStore')}}</span>
                </transition>
                <i
                  :class="appSidebarOnoff ? 'iconfont icon-arrow-right footSize-icon-slidebar mx-20 applyStoreIcon' : 'iconfont icon-arrow-right footSize-icon-slidebar mx-20 '"></i>
              </div>
            </a>
            <!--          当是左导航是关闭的时候  start-->
            <ul class="app-sidebar" slot="content">
              <li style="white-space: nowrap;" v-for="(item,index) in appSidebarItem" :key="index">
                <a :href="item.url" class="footSize-text-slidebar">{{item.name}}</a>
              </li>
            </ul>
            <!--          当是左导航是关闭的时候  end-->
            <!--          当是左导航是开启的时候   start-->
            <transition name="iconDown" mode="in-out">
              <ul class="app-sidebar" v-show="appSidebarOnoff">
                <li class="app-sidebar-item  pdl-52" v-for="(item,index) in appSidebarItem" :key="index">
                  <a :href="item.url" class="footSize-text-slidebar">{{item.name}}</a>
                </li>
              </ul>
            </transition>
            <!--          当是左导航是开启的时候  end-->
          </Tooltip>
        </div>
        <div class="menu-app">
          <!-- :style="boonSidebarOnoff ? 'height:500px;opacity:1;' : 'height:0;opacity:0;'" -->
          <Tooltip placement="right" :disabled="!sidebarOnOff">
            <a href="javascript:void(0)" class="app-icon-left auto-line-start"
              @click=" sidebarOnOff ? boonSidebarOnoff = false : boonSidebarOnoff = !boonSidebarOnoff ">
              <i class="iconfont icon-category footSize-icon-slidebar mx-1"></i>
              <div class="app" :style="sidebarOnOff ? 'opacity: 0;' : 'opacity: 1;'">
                <transition name="menuText" mode="in-out">
                  <span class="footSize-text-slidebar" v-show="!sidebarOnOff">{{$t('welfareNav')}}</span>
                </transition>
                <i
                  :class="boonSidebarOnoff ? 'iconfont icon-arrow-right footSize-icon-slidebar mx-20 applyStoreIcon' : 'iconfont icon-arrow-right footSize-icon-slidebar mx-20 '"></i>
              </div>
            </a>
            <ul class="app-sidebar overflow-scorll" slot="content">
              <li style="white-space: nowrap;" v-for="(item,index) in boonSidebarItem" :key="index">
                <a :href="item.url" class="footSize-text-slidebar">{{item.name}}</a>
              </li>
            </ul>
            <transition name="iconDown" mode="in-out">
              <ul class="app-sidebar" v-show="boonSidebarOnoff">
                <li class="app-sidebar-item  pdl-52" v-for="(item,index) in boonSidebarItem" :key="index">
                  <a :href="item.url" class="footSize-text-slidebar">{{item.name}}</a>
                </li>
              </ul>
            </transition>
          </Tooltip>
        </div>
      </div>

      <div class="menu-bottom">
        <div class="menu-app">
          <Tooltip placement="right" :disabled="!sidebarOnOff">
            <a href="javascript:void(0)" class="app-icon-left auto-line-start">
              <i class="iconfont icon-link footSize-icon-slidebar mx-1 pdt-1-4"></i>
              <div class="app" :style="sidebarOnOff ? 'opacity: 0;' : 'opacity: 1;'">
                <transition name="menuText" mode="in-out">
                  <span class="footSize-text-slidebar" v-show="!sidebarOnOff">{{$t('SubmitUrl')}}</span>
                </transition>
              </div>
            </a>
            <span class="footSize-text-slidebar" style="white-space: nowrap;" slot="content">{{$t('SubmitUrl')}}</span>
          </Tooltip>
        </div>
        <div class="menu-app">

          <Tooltip placement="right" :disabled="!sidebarOnOff">
            <a href="javascript:void(0)" class="app-icon-left auto-line-start">
              <i class="iconfont icon-lishiyouxi footSize-icon-slidebar mx-1 pdt-1-4"></i>
              <div class="app" :style="sidebarOnOff ? 'opacity: 0;' : 'opacity: 1;'">
                <transition name="menuText" mode="in-out">
                  <span class="footSize-text-slidebar" v-show="!sidebarOnOff">{{$t('advert')}}</span>
                </transition>
              </div>
            </a>
            <span class="footSize-text-slidebar" style="white-space: nowrap;" slot="content">{{$t('advert')}}</span>
          </Tooltip>
        </div>
      </div>

    </div>
    <div :class="sidebarOnOff ? 'page-content contents-bck' : 'page-content contents-bck widthOnOffcon' ">
      <header
        :class="{'auto-line-between headersScroll boxSizing header-bck':true,'is-scroll':isscroll,'hideHeader': !hideHeader }"
        ref="header">
        <div class="header-left">
          <a href="javascript:void(0)" :class=" sidebarOnOff ? 'sidebarOn left-nav-icon':'left-nav-icon' ">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
              @click="handleHideSidebar([sidebarOnOff,sidebarOnOff,'header'])" class="modileSVG">
              <path class="line--1" d="M0 40h62c18 0 18-20-17 5L31 55"></path>
              <path class="line--2" d="M0 50h80"></path>
              <path class="line--3" d="M0 60h62c18 0 18 20-17-5L31 45"></path>
            </svg>
            <img
              src="https://sta-op.douyucdn.cn/dycatr/2032866a1ea599a9677df7e129d57293.png?x-oss-process=image/format,webp/quality,q_75"
              alt="" width="40" height="40" class="modileIMG" @click="handleHideSidebar([sidebarOnOff,sidebarOnOff])">
          </a>
          <div v-if="!$store.state.isMobile" class="left-nav auto-line-center">
            <a href="">
              <i class=" iconfont icon-link fontSize-icon"></i>
              <span class="fontSize-text">{{$t('SubmitUrl')}}</span>
            </a>
            <a href="">
              <i class=" iconfont icon-lishiyouxi fontSize-icon"></i>
              <span class="fontSize-text">{{$t('advert')}}</span>
            </a>
            <a href="javascript:void(0)" @click="changeLcale('zh-CN')" v-if="this.$store.state.locale == 'zh-CN'">
              <img :src="require('~/assets/images/svg/china.svg')" alt="china">
              <span class="fontSize-text">{{$t('china')}}</span>
            </a>
            <a href="javascript:void(0)" @click="changeLcale('en')" v-if="this.$store.state.locale == 'zh-CN'">
              <img :src="require('~/assets/images/svg/usa.svg')" alt="china">
              <span class="fontSize-text">{{$t('english')}}</span>
            </a>
            <a href="javascript:void(0)" @click="changeLcale('en')" v-if="this.$store.state.locale == 'en'">
              <img :src="require('~/assets/images/svg/usa.svg')" alt="china">
              <span class="fontSize-text">{{$t('english')}}</span>
            </a>
            <a href="javascript:void(0)" @click="changeLcale('zh-CN')" v-if="this.$store.state.locale == 'en'">
              <img :src="require('~/assets/images/svg/china.svg')" alt="china">
              <span class="fontSize-text">{{$t('china')}}</span>
            </a>
            <!--                        <a href="javascript:void(0)" class="cloud">-->
            <!--                            <div id="he-plugin-simple"></div>-->
            <!--                        </a>-->
          </div>
        </div>

        <div class="header-right auto-line-center">
          <a href="" class="auto-line-center">
            <i class=" iconfont icon-sousuo fontSize-icon"></i>
          </a>
          <a href="javascript:void(0)" class="auto-line-center mobileSidebar" @click="handleSidebar">
            <i class=" iconfont icon-category fontSize-icon"></i>
          </a>
        </div>
      </header>
      <!--          语言导航栏-->
      <popup :popup="languageSideOnOff" :type="'slider'" @close="handleSidebar">
        <div class="left-nav auto-line-center" slot="popupMain">
          <a href="">
            <i class=" iconfont icon-link fontSize-icon"></i>
            <span class="fontSize-text">{{$t('SubmitUrl')}}</span>
          </a>
          <a href="">
            <i class=" iconfont icon-lishiyouxi fontSize-icon"></i>
            <span class="fontSize-text">{{$t('advert')}}</span>
          </a>
          <a href="javascript:void(0)" @click="changeLcale('zh-CN')" v-if="this.$store.state.locale == 'zh-CN'">
            <img :src="require('~/assets/images/svg/china.svg')" alt="china">
            <span class="fontSize-text">{{$t('china')}}</span>
          </a>
          <a href="javascript:void(0)" @click="changeLcale('en')" v-if="this.$store.state.locale == 'zh-CN'">
            <img :src="require('~/assets/images/svg/usa.svg')" alt="china">
            <span class="fontSize-text">{{$t('english')}}</span>
          </a>
          <a href="javascript:void(0)" @click="changeLcale('en')" v-if="this.$store.state.locale == 'en'">
            <img :src="require('~/assets/images/svg/usa.svg')" alt="china">
            <span class="fontSize-text">{{$t('english')}}</span>
          </a>
          <a href="javascript:void(0)" @click="changeLcale('zh-CN')" v-if="this.$store.state.locale == 'en'">
            <img :src="require('~/assets/images/svg/china.svg')" alt="china">
            <span class="fontSize-text">{{$t('china')}}</span>
          </a>
          <!--                        <a href="javascript:void(0)" class="cloud">-->
          <!--                            <div id="he-plugin-simple"></div>-->
          <!--                        </a>-->
        </div>
      </popup>
      <!--          语言导航栏-->
      <main>
        <!-- 内容区域 -->
        <!--        <slot name="main"></slot>-->
        <appMain />

      </main>

      <slot name="footer"></slot>

      <footers :hotAppData="hotAppData" @handleHideSidebar="handleHideSidebar($event)"
        @cartoonChapter="cartoonChapter($event)"></footers>
    </div>
  </div>
</template>
<script>
  import common from '@/assets/js/common' //getCookie方法
  import { footers, popup } from '@/components/common'; //底部，以及主题控制
  import appMain from "@/components/pages/mains/appMain";
  export default {
    name: "headerNav",
    components: { footers, popup, appMain },
    props: {
      // hotAppData:{type:Array,required:false,default:()=>[]}
      hotAppData: { type: [Object, Array], required: false, default: () => [] }
    },
    data() {
      return {
        sidebarOnOff: true, //侧栏打开显示
        appSidebarOnoff: false,	 //应用商店
        boonSidebarOnoff: false, //福利导航
        languageSideOnOff: false, // 切换语言状态栏改变
        navItemOnoff: false,
        navItemIconOnoff: false,
        boonSidebarItem: [
          { url: '', name: '站长推荐' },
          { url: '', name: '站长推荐' },
          { url: '', name: '站长推荐' }
        ],
        appSidebarItem: [
          { url: '', name: '站长推荐' },
          { url: '', name: '站长推荐' }
        ],
        isscroll: false, //是否滚动超过了header高度
        hideSidebar: this.$store.state.hideSidebar,//当图片详情页面调用 v-viewer组件时隐藏侧导航
        hideHeader: this.$store.state.hideHeader,// header 显示与隐藏
        eleHeightData: {},//所有元素的高度
        // eleHeightDataArr:[],
        windowScrollTop: { isScrollTB: true, minSpace: '', distance: 0 },//isScrollTB确认true向下，false向上,minSpace最小间距元素,distance y轴上滚动的距离

      }
    },
    created() {

      // window.WIDGET = {
      //   CONFIG: {
      //     "modules": "02", //设置显示那些信息 城市， 温度
      //     "background": 5,  //设置背景颜色
      //     "tmpColor": "4A4A4A",
      //     "tmpSize": 16,
      //     "cityColor": "4A4A4A",
      //     "citySize": 16,
      //     "aqiSize": 16,
      //     "weatherIconSize": "32",
      //     "alertIconSize": "20",
      //     "padding": "4px  4px",
      //     "shadow": "1",
      //     "language": "auto",
      //     "borderRadius": "20",
      //     "fixed": "false",
      //     "vertical": "middle",
      //     "horizontal": "center",
      //     "right": "20",
      //     "top": "500",
      //     "key": "a922adf8928b4ac1ae7a31ae7375e191"
      //   }
      // }
    },
    mounted() {
      //是否是mobile
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      console.log('flag' + flag, flag ? 'true' : 'false')
      flag ? this.$store.commit("getIsMobile", true) : this.$store.commit("getIsMobile", false)

      //只有首页才加载
      if (this.$route.name == 'index') {
        document.addEventListener('scroll', this.handleScroll(this.handleScrollHeader, 60, false), true)
        // setTimeout(()=>{
        //   this.eleHeight()
        //   this.setAsyncData()
        // },2500)
      }
      this.addTags()
    },
    deactivated() {
      document.removeEventListener("scroll", this.handleScroll(this.handleScrollHeader, 60, false))
    },
    methods: {
      //改变语言
      changeLcale: function (locale) {
        // console.log(this.$i18n)
        this.$i18n.locale = locale
        this.$store.commit("setLocale", locale)
        common.setUseCookies('locale', locale)
      },
      //处理弹窗,mobile下的 黑色遮蔽罩
      handleSidebar(event) {
        this.languageSideOnOff = !this.languageSideOnOff;
        this.appSidebarOnoff = false;
      },
      //导航栏隐藏显示时 节流加载
      handleScroll(func, delay, immediate) {
        let timer = null;
        return () => {
          //清除的是cartoonDetailed的鼠标移动事件
          document.onmousemove = null
          let content = this;
          let args = arguments;
          if (timer) clearTimeout(timer)
          if (immediate) {
            let doNow = !timer;
            timer = setTimeout(function () {
              timer = null;
            }, delay);
            if (doNow) {
              func.apply(context, args);
            }
          } else {
            timer = setTimeout(() => {
              func.apply(content, args)
              // content.setAsyncData(this.getScrollTop())
              //获取一下最新距离
              this.windowScrollTop.distance = this.getScrollTop()
              this.$emit('cartoonDetailed', this.windowScrollTop.distance)
            }, delay)
          }

        }
      },
      //导航栏隐藏显示
      handleScrollHeader() {
        //元素高度 距离屏幕最上面  使用offsetTop
        //屏幕可视高度 window.innerHeight
        //元素高度使用 offsetHeight
        let windowScrollTop = this.getScrollTop()
        console.log(windowScrollTop)
        if (windowScrollTop > 100) {
          this.isscroll = true
        } else {
          this.isscroll = false
        }
      },
      //隐藏侧边栏是为了，点开图片查看器时出现留白
      handleHideSidebar(arg = [this.hideSidebar, this.hideHeader]) {
        console.log(arg)
        if (this.$route.name == 'ImageDetailed' || this.$route.name == 'CartoonDetailed') {
          if (arg[2]) {
            this.hideSidebar = true
            this.sidebarOnOff = !this.sidebarOnOff
            this.appSidebarOnoff = false;
            this.boonSidebarOnoff = false;
            return
          }
          this.hideSidebar = arg[0]
          this.hideHeader = arg[1]






          this.$store.commit('setHeadeSidebar', arg)
        }
        this.sidebarOnOff = !this.sidebarOnOff;


      },

      //确定 所有元素高度
      // eleHeight(){
      //   let eleHeight = {
      //     innerHeight:this.handleEleTopHeight('innerHeight'), //视窗可以看到屏幕的高度
      //     scrollHeight:this.handleEleTopHeight('scrollHeight'), //文档高度
      //   }
      //   //添加到数据中方便后边找出间距最小的，从而异步请求数据
      //   let eleHeightArr = []
      //   //遍历获取高度
      //   let state = this.$store.state.asyncLoadingData
      //   for (let item in state){
      //     let obj ={}
      //     if (item == 'scrollState') continue; //状态元素
      //     eleHeight[item]=this.handleEleTopHeight('offsetTop',item)
      //     obj[item] = ''
      //     obj[item]= eleHeight[item]
      //     eleHeightArr.push(obj)
      //   }
      //   this.eleHeightData = eleHeight
      //   console.log(this.eleHeightData)
      //   // this.eleHeightDataArr = eleHeightArr
      //   // console.log(this.eleHeightDataArr)
      // },

      // handleEleTopHeight(methods,ele){
      //   let height = 0
      //   switch (methods){
      //     case 'innerHeight':
      //       height = this.$common.getWindowHeightWidht().height
      //       break;
      //     case 'offsetHeight':
      //       height = document.getElementById(ele).offsetHeight
      //       break;
      //     case 'scrollHeight':
      //       height = this.getScrollHeight()
      //       break;
      //     case 'offsetTop':
      //       height=document.getElementById(ele).offsetTop
      //       break;
      //   }
      //   return height
      // },
      //滚动条在Y轴上滚动的距离
      getScrollTop() {
        let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
          bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        }
        if (document.documentElement) {
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
      },
      //文档的高度
      // getScrollHeight(){
      //   var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
      //   if(document.body){
      //     bodyScrollHeight = document.body.scrollHeight;
      //   }
      //   if(document.documentElement){
      //     documentScrollHeight = document.documentElement.scrollHeight;
      //   }
      //   scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
      //   return scrollHeight;
      // },
      //处理滚动条滚到到相应位置加载改变相应数据的加载状态
      // setAsyncData(){
      //   //当前滚动的高度减去 元素的高度, 深度拷贝删除视窗高度，和 页面高度，方便后面的确认位置
      //   let cutObj = [],newObj={};
      //   Object.assign(newObj,this.eleHeightData)
      //   console.log(newObj)
      //   // delete newObj.innerHeight;
      //   // delete newObj.scrollHeight;
      //   //确定屏幕大小
      //   let windowWidth = this.$common.getWindowHeightWidht().width
      //   if (windowWidth <= 576 || windowWidth > 768){
      //     //当前为最小屏幕，滑动到顶屏加载
      //     // this.$common.scrollClickTop()
      //     let windowRangeMax = this.windowScrollTop.distance + newObj.innerHeight
      //     let lookEleArr=[]
      //
      //     for (let item in newObj){
      //       if (item == 'innerHeight' || item == 'scrollHeight') continue;
      //       if (newObj[item] <= windowRangeMax && newObj[item] >= this.windowScrollTop.distance){ //确定区间添加元素
      //         lookEleArr.push(item)
      //       }
      //     }
      //
      //     if (lookEleArr.length == 2 || lookEleArr.length == 1){ //判断页面中是否有第三个元素
      //       newObj[lookEleArr[0]]-100 > this.windowScrollTop.distance  ? this.getLastNext(newObj,lookEleArr,0) : '';
      //       newObj[lookEleArr[1]]+100 > this.windowScrollTop.distance+ newObj.innerHeight  ? this.getLastNext(newObj,lookEleArr,1) : '';
      //     }
      //     console.log(lookEleArr,1)
      //   }else if (windowWidth > 576 && windowWidth <= 768 ) { //1250 可能会直接占满全屏用943的方法不适合
      //     let lookEleArr=[]
      //     for (let item in newObj){
      //       if (item.includes('website')){
      //         if((this.windowScrollTop.distance < (newObj[item]+1250)) && (this.windowScrollTop.distance >= newObj[item])){ //一个元素占据全屏的时候
      //           lookEleArr.push(item)
      //           continue
      //         }
      //
      //       }
      //     }
      //     if ((this.windowScrollTop.distance < (newObj[lookEleArr[0]]+1250)) && ((this.windowScrollTop.distance+newObj.innerHeight) >= (newObj[lookEleArr[0]]+1250))){
      //       console.log(lookEleArr,2)
      //       this.getLastNext(newObj,lookEleArr,2)
      //     }
      //     console.log(lookEleArr,3)
      //   }
      //   // else if (windowWidth > 768 ){ //943
      //   //   let windowRangeMax = this.windowScrollTop.distance + newObj.innerHeight
      //   //   let lookEleArr=[]
      //   //
      //   //   for (let item in newObj){
      //   //     if (item == 'innerHeight' || item == 'scrollHeight') continue;
      //   //     if (newObj[item] <= windowRangeMax && newObj[item] >= this.windowScrollTop.distance){ //确定区间添加元素
      //   //       lookEleArr.push(item)
      //   //     }
      //   //   }
      //   //
      //   //   if (lookEleArr.length == 2 || lookEleArr.length == 1){ //判断页面中是否有第三个元素
      //   //     newObj[lookEleArr[0]]-100 > this.windowScrollTop.distance  ? this.getLastNext(newObj,lookEleArr,0) : '';
      //   //     newObj[lookEleArr[1]]+100 > this.windowScrollTop.distance+ newObj.innerHeight  ? this.getLastNext(newObj,lookEleArr,1) : '';
      //   //   }
      //   //   console.log(lookEleArr)
      //   // }
      //   // else if (windowWidth > 1600){ //648
      //   //
      //   // }
      //
      // },

      // getLastNext(newObj,lookEleArr,state){
      //   delete newObj.innerHeight;
      //   delete newObj.scrollHeight;
      //   let d;
      //   if (state === 0){ //上一个
      //     Object.keys(newObj).some((items,index)=>{
      //       if (items == lookEleArr[0]) {
      //         d = Object.keys(newObj)[index >= 1 ? index-1 : index]
      //         return true
      //       }
      //     })
      //
      //   }else if (state === 1){ //下一个
      //     Object.keys(newObj).some((items,index)=>{
      //       if (items == lookEleArr[1]) {
      //         d = Object.keys(newObj)[index <= Object.keys(newObj).length-2 ? index+1 : index]
      //         return true
      //       }
      //     })
      //   }else{
      //     Object.keys(newObj).some((items,index)=>{
      //       if (items == lookEleArr[0]) {
      //         d = Object.keys(newObj)[index <= Object.keys(newObj).length-2 ? index+1 : index]
      //         return true
      //       }
      //     })
      //   }
      //   lookEleArr.indexOf(d) > -1 ? '' : lookEleArr.push(d)
      //   return lookEleArr
      // },
      cartoonChapter(state) {
        this.$emit('cartoonChapter', state)
      },
      addTags() {
        console.log(this.$store.state.tagsView.visitedViews)
        const { name } = this.$route
        if (name) {
          this.$store.dispatch('tagsView/addView', this.$route)
        }
        return false
      },
    },
    computed: {
      handleHeaderSider() {
        return this.$store.state.hideHeader
      }
      // asyncLoadingData(){
      //   return this.windowScrollTop.distance
      // }
    },
    watch: {
      $route() {
        this.addTags()
      },
      handleHeaderSider: function (newv, oldv) {
        this.handleHideSidebar([newv, newv])
      }
      // '$store.state.backdrop':function (newVal,oloVal){
      //   if (!newVal){
      //     this.sidebarOnOff = !this.sidebarOnOff
      //   }
      // }
      // asyncLoadingData:function (newV,oldV) {
      //   console.log(`top 新：${newV}，旧：${oldV}`)
      //   if (newV > oldV){
      //     this.windowScrollTop.isScrollTB = true
      //   }else if (newV < oldV){
      //     this.windowScrollTop.isScrollTB = false
      //   }
      //   this.setAsyncData()
      // }
    }
  }
</script>
<style scoped lang='scss'>
  @import "~/assets/css/components/headerNav.scss";
  .sidebarOn {
        .line--1, .line--3, .line--2 {
          --total-length: 85;
        }

        .line--1, .line--3 {
          --length: 24;
        }
      }
</style>