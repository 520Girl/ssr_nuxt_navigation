<template>
  <div :class="{'page-container auto-line-start':true,'hideSidebar':!hideSidebar}">
    <div :class="sidebarOnOff ? 'page-sidebar width-six sidebar-bck widthOnOff' : 'page-sidebar width-six sidebar-bck '">
      <div class="sidebar-logo">
        <a href="/" class="logo-expanded auto-line-center boxSizing"
           :style="sidebarOnOff ? 'display:block;' : 'display:none;'">
          <nuxt-img preload loading="lazy" format="webp" :src="imgUrl(logoUrl)"  height="62" width="50" :alt="title"/>
        </a>
        <a href="" class="logo-collapsed auto-line-center boxSizing"
           :style="sidebarOnOff ? 'display:none;' : 'display:block;'">
          <!--          <img :src="logoUrl" alt="logo" :alt="title">-->
          <nuxt-img preload loading="lazy" :src="mobileLogo" alt="logo" :alt="title" width="220" height="71"/>
        </a>
      </div>

      <div class="menu-top">
        <div class="menu-app"  v-for="(item,index) in oneLevelWebsite" v-if="item.status === 1" :key="index" >
          <Tooltip placement="right" :disabled="!sidebarOnOff" >
            <div class="app-icon-left "
               @click="appSidebarOnoffClick(index)" :title="item.title">
              <svg-icon :name="item.belong" height="28" width="28"></svg-icon>
              <transition name="menuText" mode="in-out">
                <div class="app auto-line-center" v-show="!sidebarOnOff">
                  <span class="footSize-text-slidebar">{{item.title}}</span>
                  <i :class="appSidebarOnoff === index ? 'iconfont icon-arrow-right footSize-icon-slidebar mx-20 applyStoreIcon' : 'iconfont icon-arrow-right footSize-icon-slidebar mx-20 '">
                    <sub></sub>
                  </i>
                </div>
              </transition>
            </div>
            <!--          当是左导航是关闭的时候  start-->
            <ul class="app-sidebar" slot="content" >
              <li style="white-space: nowrap;padding-top: 5px;" v-for="(item1,index1) in item.content" :key="index1">
                <router-link tag="a" :to="{path:`/favorites/${item1.belong}`}" class="fontSize-text" :title="item1.title">{{item1.title}}</router-link>
              </li>
            </ul>
            <!--          当是左导航是关闭的时候  end-->
            <!--          当是左导航是开启的时候   start-->
            <transition name="iconDown" mode="in-out">
              <ul class="app-sidebar" v-show="appSidebarOnoff === index">
                <li class="app-sidebar-item  pdl-52" v-for="(item1,index1) in item.content" :key="index1">
                  <router-link tag="a" :to="{path:`/favorites/${item1.belong}`}"  class="footSize-text-slidebar">{{item1.title}}</router-link>
                </li>
              </ul>
            </transition>
            <!--          当是左导航是开启的时候  end-->
          </Tooltip>
        </div>
      </div>

      <div class="menu-bottom">
        <div class="menu-app">
          <Tooltip placement="right" :disabled="!sidebarOnOff">
            <router-link tag="a"  :to="{path:'/embody'}"  class="app-icon-left auto-line-start" :title="$t('SubmitUrl')">
              <i class="iconfont icon-link footSize-icon-slidebar mx-1 pdt-1-4"></i>
              <div class="app" :style="sidebarOnOff ? 'opacity: 0;' : 'opacity: 1;'">
                <transition name="menuText" mode="in-out">
                  <router-link tag="span"  :to="{path:'/embody'}" class="footSize-text-slidebar" v-show="!sidebarOnOff">{{$t('SubmitUrl')}}</router-link>
                </transition>
              </div>
            </router-link>
            <router-link tag="span"  :to="{path:'/embody'}" class="fontSize-text" style="white-space: nowrap;padding-top: 5px;" slot="content" :title="$t('SubmitUrl')">{{$t('SubmitUrl')}}</router-link>
          </Tooltip>
        </div>
        <div class="menu-app">

          <Tooltip placement="right" :disabled="!sidebarOnOff">
            <router-link tag="a" :to="{path:'/advertising'}"  class="app-icon-left auto-line-start" :title="$t('advert')">
              <i class="iconfont icon-lishiyouxi footSize-icon-slidebar mx-1 pdt-1-4"></i>
              <div class="app" :style="sidebarOnOff ? 'opacity: 0;' : 'opacity: 1;'">
                <transition name="menuText" mode="in-out">
                  <router-link tag="span"  :to="{path:'/advertising'}" class="footSize-text-slidebar" v-show="!sidebarOnOff">{{$t('SubmitUrl')}}</router-link>
                </transition>
              </div>
            </router-link>
            <router-link tag="span" :to="{path:'/advertising'}"  class="fontSize-text" style="white-space: nowrap;padding-top: 5px;" slot="content" :title="$t('advert')" >{{$t('advert')}}</router-link >
          </Tooltip>
        </div>
      </div>

    </div>
    <div :class="sidebarOnOff ? 'page-content contents-bck' : 'page-content contents-bck widthOnOffcon'" >
      <header :class="{'auto-line-between headersScroll boxSizing header-bck':true,'is-scroll':isscroll,'hideHeader': !hideHeader }"  ref="header" >
        <div class="header-left">
          <div :class=" sidebarOnOff ? 'sidebarOn left-nav-icon':'left-nav-icon' ">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
                 @click="handleHideSidebar([sidebarOnOff,sidebarOnOff,'header'])"
                 class="modileSVG">
              <path class="line--1" d="M0 40h62c18 0 18-20-17 5L31 55"></path>
              <path class="line--2" d="M0 50h80"></path>
              <path class="line--3" d="M0 60h62c18 0 18 20-17-5L31 45"></path>
            </svg>
            <img :src="mobileLogo" :alt="title" class="modileIMG" width="222" height="66" @click="handleHideSidebar([sidebarOnOff,sidebarOnOff])">
          </div>
          <div v-if="!isMobile" class="left-nav auto-line-center" >
            <div class="left-nav-item">
              <router-link tag="span"  :to="{path:'/embody'}"class=" iconfont icon-link fontSize-icon"></router-link>
              <router-link tag="span"  :to="{path:'/embody'}" class="fontSize-text">{{$t('SubmitUrl')}}</router-link>
            </div>
            <div class="left-nav-item">
              <router-link tag="span" :to="{path:'/advertising'}" >
                <i class=" iconfont icon-lishiyouxi fontSize-icon"></i>
                <span class="fontSize-text">{{$t('advert')}}</span>
              </router-link>
            </div>
            <div class="left-nav-item" @click="changeLcale('zh-CN')" v-if="isLocale === 'zh-CN'">
              <svg-icon name="china"></svg-icon>
              <span class="fontSize-text">{{$t('china')}}</span>
            </div>
            <div class="left-nav-item" @click="changeLcale('en')" v-if="isLocale === 'zh-CN'">
              <svg-icon name="usa"></svg-icon>
              <span class="fontSize-text">{{$t('english')}}</span>
            </div>
            <div class="left-nav-item" @click="changeLcale('en')" v-if="isLocale === 'en'">
              <svg-icon name="usa"></svg-icon>
              <span class="fontSize-text">{{$t('english')}}</span>
            </div>
            <div class="left-nav-item" @click="changeLcale('zh-CN')" v-if="isLocale === 'en'">
              <svg-icon name="china"></svg-icon>
              <span class="fontSize-text">{{$t('china')}}</span>
            </div>
            <!--                        <a href="javascript:void(0)" class="cloud">-->
            <!--                            <div id="he-plugin-simple"></div>-->
            <!--                        </a>-->
          </div>
        </div>
        <!--        <img src="@/assets/images/24710.gif" style="width: 16%;padding-top: 0.5rem;">-->
        <div class="header-right auto-line-center">
          <div  class="auto-line-center search-icon" @click="handleSidebar($event,2)">
            <i class=" iconfont icon-sousuo fontSize-icon"></i>
          </div>
          <div  class="auto-line-center mobileSidebar search-icon" @click="handleSidebar">
            <i class=" iconfont icon-category fontSize-icon"></i>
          </div>
        </div>
      </header>
      <!--          语言导航栏-->

      <component v-if="popup" :is="popup" :popup="languageSideOnOff" :type="'slider'" @close="handleSidebar">
        <div class="auto-line-center left-nav " slot="popupMain" >
          <div class="left-nav-item">
            <router-link tag="i"  :to="{path:'/embody'}" class=" iconfont icon-link fontSize-icon"></router-link>
            <router-link tag="span"  :to="{path:'/embody'}" class="fontSize-text">{{$t('SubmitUrl')}}</router-link>
          </div>
          <router-link tag="a" :to="{path:'/advertising'}" >
            <i class=" iconfont icon-lishiyouxi fontSize-icon"></i>
            <span class="fontSize-text">{{$t('advert')}}</span>
          </router-link>
          <div class="left-nav-item" @click="changeLcale('zh-CN')" v-if="isLocale === 'zh-CN'">
            <svg-icon name="china"></svg-icon>
            <span class="fontSize-text">{{$t('china')}}</span>
          </div>
          <div class="left-nav-item" @click="changeLcale('en')" v-if="isLocale === 'zh-CN'">
            <svg-icon name="usa"></svg-icon>
            <span class="fontSize-text">{{$t('english')}}</span>
          </div>
          <div class="left-nav-item" @click="changeLcale('en')" v-if="isLocale === 'en'">
            <svg-icon name="usa"></svg-icon>
            <span class="fontSize-text">{{$t('english')}}</span>
          </div>
          <div class="left-nav-item" @click="changeLcale('zh-CN')" v-if="isLocale === 'en'">
            <svg-icon name="china"></svg-icon>
            <span class="fontSize-text">{{$t('china')}}</span>
          </div>
          <!--                        <a href="javascript:void(0)" class="cloud">-->
          <!--                            <div id="he-plugin-simple"></div>-->
          <!--                        </a>-->
        </div>
      </component>
      <!--          语言导航栏-->

      <!--   搜索框使用   -->
      <component  v-if="popup && search" :is="popup" :popup="searchOnOff" :type="'search'" @close="handleSidebar($event,2)" :z_index="502">
        <div class="header-bck boxSizing search search-modal" slot="popupMain">
          <div class=" search-continer">
            <div class="search-input">
              <div class="search-input-select" >
                <Tooltip placement="bottom" max-width="100" >
                  <p>
                    {{ searchSle.title }}
                    <Icon type="ios-arrow-forward" />
                  </p>
                  <div class="tooltip-content" slot="content">
                    <span v-for="(item,index) in searchData" @click="handleSelected(index)">{{item.title}}</span>
                  </div>
                </Tooltip>
                <ul>
                  <li :class="searchSle.select.classState === index ? 'search-b' : ''" v-for="(item,index) in searchSle.data" @click="handleSelectedLI(index)">
                    {{item.layout}}
                  </li>
                </ul>
              </div>
              <component :is="search" :placeholder="searchSle.select.placeholder" :inputValue="searchSle.select.inputValue" :searchSelect="searchSle.select" class="search-components"></component>
            </div>

            <div class="search-hot">
              <Icon type="md-flame" />
              <span class="hot">热门推荐：</span>
            </div>
            <div class="search-menu ">
              <router-link class="search-b" tag="p" :to="{path:'/favorites/6090'}">
                AI 大模型
              </router-link>
              <router-link class="search-b" tag="p" :to="{path:'/favorites/1508'}">
                AI 训练模型
              </router-link>
            </div>
            <div class="search-icon">
              <Icon type="ios-close-circle-outline fontSize-icon" @click="searchOnOff=!searchOnOff"  />
            </div>
          </div>
        </div>
      </component>
      <!--   搜索框使用   -->

      <main>
        <!-- 内容区域 -->
        <!--        <slot name="main"></slot>-->
        <appMain />

      </main>

      <slot name="footer"></slot>

      <footers v-show="$route.name !== 'CartoonDetailed'" :hotAppData="hotAppData" @handleHideSidebar="handleHideSidebar($event)" @cartoonChapter="cartoonChapter($event)"></footers>
    </div>
  </div>
</template>
<script>
import footers from '@/components/common/footer'; //底部，以及主题控制
// import popup from '@/components/common/popup'; //底部，以及主题控制
// import search from '@/components/common/search'; //底部，以及主题控制
import appMain from "@/components/pages/mains/appMain";
import setting from "@/setting"
import {mapGetters} from "vuex";
export default {
  name: "headerNav",
  components: {footers,appMain},
  props:{
    // hotAppData:{type:Array,required:false,default:()=>[]}
    hotAppData:{type:[Object,Array],required:false,default:()=>[]}
  },
  //!1. 基础数据获取
  async fetch ({$api,store,app,route}){
    // if (!process.server) return
    await store.dispatch('addBaseConfig')
    await store.dispatch('async_data/actions_oneLevelWebsite')
  },
  data() {
    return {
      sidebarOnOff: this.$store.state.sidebarOnOff, //侧栏打开显示 false 为打开
      appSidebarOnoff: false,	 //应用商店
      popup:false, //表示 弹出框组件未加载
      search:false, //表示 搜索组件未加载
      websiteLeft:false,//侧栏打开，点击大项显示小项
      boonSidebarOnoff: false, //福利导航
      languageSideOnOff: false, // 切换语言状态栏改变
      searchOnOff:false, //搜索框内容
      navItemOnoff: false,
      navItemIconOnoff: false,
      boonSidebarItem: [
        {url: '', name: '站长推荐'},
        {url: '', name: '站长推荐'},
        {url: '', name: '站长推荐'}
      ],
      appSidebarItem: [
        {url: '', name: '站长推荐'},
        {url: '', name: '站长推荐'},
        {url: '', name: '站长推荐'},
        {url: '', name: '站长推荐'},
        {url: '', name: '站长推荐'}
      ],
      isscroll:false, //是否滚动超过了header高度
      hideSidebar:this.$store.state.hideSidebar,//当图片详情页面调用 v-viewer组件时隐藏侧导航
      hideHeader:this.$store.state.hideHeader,// header 显示与隐藏
      eleHeightData:{},//所有元素的高度
      // eleHeightDataArr:[],
      windowScrollTop:{isScrollTB:true,minSpace:'',distance:0},//isScrollTB确认true向下，false向上,minSpace最小间距元素,distance y轴上滚动的距离
      cityList:[
        {
        value: 'New York',
        label: 'New York'
      },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }],
      //一级网站标签分类
      oneLevelWebsite:[],
      //search 内容
      // const baiduResults = await this.fetchSearchResults('https://www.baidu.com/sugrec', 'wd', this.query);
      // const bingResults = await this.fetchSearchResults('https://api.bing.com/qsonhs.aspx', 'q', this.query);
      // const _360Results = await this.fetchSearchResults('http://sug.so.360.cn/suggest', 'word', this.query);
      // const sogouResults = await this.fetchSearchResults('https://www.sogou.com/suggnew/ajajjson', 'key', this.query, 'sogou');
      // const smResults = await this.fetchSearchResults('https://sugs.m.sm.cn/web', 'q', this.query);
      searchData:[
        {title:'站外搜索',data:[
            {layout:'搜索更多内容',type:'world',placeholder:'海外工具请输入需要梯子',value:'https://www.google.com/search?q=',reqUrl:'https://suggestqueries.google.com/complete/search?client=youtube&jsonp=window.google.sug&q='},
            {layout:'Bing',type:'bing',placeholder:'Bing搜索',value:'https://cn.bing.com/search?q=',reqUrl:'https://api.bing.com/qsonhs.aspx?type=cb&cb=window.bing.sug&q='},
            {layout:'百度',type:'baidu',placeholder:'百度搜索',value:'https://www.baidu.com/s?wd=',reqUrl:'https://www.baidu.com/sugrec?prod=pc&wd='},
            {layout:'360',type:'360',placeholder:'360搜索',value:'https://www.so.com/s?q=',reqUrl:'http://sug.so.360.cn/suggest?word='},
            {layout:'搜狗',type:'sougou',placeholder:'搜狗搜索',value:`https://www.sogou.com/web?&_asf=${setting.website}&query=`,reqUrl:'https://sor.html5.qq.com/api/getsug?type=pc&key='},
            {layout:'淘宝',type:'taobao',placeholder:'淘宝搜索',value:'https://uland.taobao.com/sem/tbsearch?keyword=',reqUrl:'https://suggest.taobao.com/sug?code=utf-8&q='},
            {layout:'京东',type:'jingdong',placeholder:'京东搜索',value:'http://search.jd.com/Search?keyword=',reqUrl:'https://dd-search.jd.com/?key='},
            {layout:'google',type:'google',placeholder:'谷歌搜索',value:'https://www.google.com/search?q=',reqUrl:'https://suggestqueries.google.com/complete/search?client=youtube&jsonp=window.google.sug&q='},
            {layout:'一淘',type:'yitao',placeholder:'一淘搜索',value:'https://www.etao.com/search.htm?nq=',reqUrl:'https://suggest.taobao.com/sug?area=etao&code=utf-8&callback=KISSY.Suggest.callback&q='},
            {layout:'神马',type:'shenma',placeholder:'神马搜素',value:'https://m.sm.cn/s?from=smor&safe=1&snum=6&q=',reqUrl:'https://sugs.m.sm.cn/web?t=w&uc_param_str=dnnwnt&scheme=https&_=1712294770174&callback=jsonp16&q='},
          ]},
        {title:'站内搜索',data:[{layout:'搜索更多内容',placeholder:'请输入',value:'...',type:'nei'},]}
      ],
      searchSle:{title:'站内搜索',select:{placeholder:'请输入需要查询的内容',classState:0,value:'',inputValue:'',type:'nei'},data:[{layout:'搜索更多内容',placeholder:'请输入',value:'...'}]}
    }
  },
  created() {
    //当时mobile 模式下 直接关闭侧边栏开启状态
    this.$store.state.isMobile ? this.sidebarOnOff = true : ''
    if (this.oneLevelWebsite.length === 0){
      this.oneLevelWebsite = this.$store.state.async_data.oneLevelWebsite
    }
  },
  mounted() {
    // if (process.browser){
    //   this.getWebsiteOne()
    // }
    this.changeLcale(this.isLocale)
    //只有首页才加载
    if (this.$route.name == 'index'){
        process.browser ? document.addEventListener('scroll',this.handleScroll(this.handleScrollHeader,60,false),true) : ''

      // setTimeout(()=>{
      //   this.eleHeight()
      //   this.setAsyncData()
      // },2500)
    }
    this.addTags()
  },
  deactivated() {
    process.browser ? document.removeEventListener("scroll",this.handleScroll(this.handleScrollHeader,60,false)) : ''
  },
  methods: {
    // 使用异步加载组件需要要使用import()函数
    async asyncPopupLanguage(){
      if (!this.popup){
        const {default: popup} = await import('@/components/common/popup')
        this.popup = popup
      }
    },
    async asyncPopupSearch(){
      if (!this.popup){
        const {default: popup} = await import('@/components/common/popup')
        const {default: search} = await import('@/components/common/search')
        console.log(popup,search,'77777777777777777777777')
        this.popup = popup
        this.search = search
      }
    },
    //改变语言
    changeLcale: function (locale) {
      // console.log(this.$i18n)
      this.$i18n.locale = locale
      this.$store.commit("setLocale", locale)
      this.$common().setUseCookies('locale', locale)
    },
    //处理弹窗,mobile下的 黑色遮蔽罩
    handleSidebar(event,state = 1) {
      if (state === 1){
        if (!this.popup){
          this.asyncPopupLanguage().then(()=>{
            this.languageSideOnOff = !this.languageSideOnOff;
            this.appSidebarOnoff = false;
            this.searchOnOff = false
          })
        }else{
          this.languageSideOnOff = !this.languageSideOnOff;
          this.appSidebarOnoff = false;
          this.searchOnOff = false
        }

      }else{
        console.log(this.popup,this.search)
        if (!this.popup || !this.search){
          this.asyncPopupSearch().then(()=>{
            this.searchOnOff = !this.searchOnOff
            this.languageSideOnOff = false
          })
        }else{
          this.searchOnOff = !this.searchOnOff
          this.languageSideOnOff = false
        }

      }
    },
    //导航栏隐藏显示时 节流加载
    handleScroll(func,delay,immediate){
      let timer = null;
      return ()=>{
        //清除的是cartoonDetailed的鼠标移动事件
        document.onmousemove = null
        let content = this;
        let args = arguments;
        if (timer) clearTimeout(timer)
        if (immediate){
          let doNow = !timer;
          timer = setTimeout(function(){
            timer = null;
          },delay);
          if(doNow){
            func.apply(context,args);
          }
        }else {
          timer = setTimeout(()=>{
            func.apply(content,args)
            // content.setAsyncData(this.getScrollTop())
            //获取一下最新距离
            this.windowScrollTop.distance = this.getScrollTop()
            this.$emit('cartoonDetailed',this.windowScrollTop.distance)
          },delay)
        }

      }
    },
    //导航栏隐藏显示
    handleScrollHeader(){
      //元素高度 距离屏幕最上面  使用offsetTop
      //屏幕可视高度 window.innerHeight
      //元素高度使用 offsetHeight
      let windowScrollTop = this.getScrollTop()
      console.log(windowScrollTop)
      if (windowScrollTop > 100){
        this.isscroll = true
      }else {
        this.isscroll = false
      }
    },
    //隐藏侧边栏是为了，点开图片查看器时出现留白
    handleHideSidebar(arg=[this.hideSidebar,this.hideHeader]){
      console.log(arg)
      if (this.$route.name === 'ImageDetailed' || this.$route.name === 'CartoonDetailed'){
        if (arg[2]){
          this.hideSidebar = true
          this.sidebarOnOff = !this.sidebarOnOff
          this.appSidebarOnoff = false;
          this.boonSidebarOnoff = false;
          return
        }
        this.hideSidebar = arg[0]
        this.hideHeader = arg[1]
        this.$store.commit('setHeadeSidebar',arg)
      }
      this.sidebarOnOff = !this.sidebarOnOff;


    },
    // 获取一级标签内容
    getWebsiteOne(){
      const websiteClass = localStorage.getItem('websiteClass')
      if (!websiteClass){
        this.$api.webSite.getWebsiteOne().then(res=>{
          if (res.status === 1){
            const  website= res.website.content
            this.oneLevelWebsite = website
            if(website.length > 0){
              localStorage.setItem('websiteClass',JSON.stringify(res.website.content))
            }
          }
        })
      }else{
        this.oneLevelWebsite = JSON.parse(websiteClass)
        console.log('this.oneLevelWebsite',this.oneLevelWebsite)
      }

    },
    //点击开启侧边栏的情况下 打开小项
    appSidebarOnoffClick(index){
      if (!this.sidebarOnOff){ //这是侧边栏打开的情况下
        if (this.appSidebarOnoff === index){
          this.appSidebarOnoff = false
          return
        }
        this.appSidebarOnoff = index
      }
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
    getScrollTop(){
      let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      if(document.body){
        bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      }
      if(document.documentElement){
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
    cartoonChapter(state){
      this.$emit('cartoonChapter',state)
    },
    addTags() {
      console.log(this.$store.state.tagsView.visitedViews)
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    //处理搜索选中大项，将数据传给小项
    handleSelected(index){
      this.searchSle.data = this.searchData[index].data
      this.searchSle.title = this.searchData[index].title
      this.searchSle.select.type=this.searchSle.data[0].type
      this.searchSle.select.placeholder=this.searchSle.data[0].placeholder
      this.searchSle.select.classState=0
      this.searchSle.select.reqUrl=this.searchSle.data[0].reqUrl
      this.searchSle.select.value=this.searchSle.data[0].value
    },
    handleSelectedLI(index){
      console.log('index',index)
      this.searchSle.select.placeholder=this.searchSle.data[index].placeholder
      this.searchSle.select.value=this.searchSle.data[index].value
      this.searchSle.select.reqUrl=this.searchSle.data[index].reqUrl
      this.searchSle.select.type=this.searchSle.data[index].type
      this.searchSle.select.classState=index
      console.log(this.searchSle)
    },
    searchSubmit(){
      this.$common().goto(this.searchSle.select.value + this.searchSle.select.inputValue)
    },
    // 定义事件处理程序
    preventTouchmove(e) {
      e.preventDefault(); // 阻止触摸滚动的默认行为
    }
  },
  computed:{
    ...mapGetters(['logoUrl','title','mobileLogo']),
    handleHeaderSider(){
      return this.$store.state.hideHeader
    },
    isLocale(){
      return this.$store.state.locale
    },
    isMobile(){
      return this.$store.state.isMobile
    },
    // searchOption(){
    //   return
    // }
    // asyncLoadingData(){
    //   return this.windowScrollTop.distance
    // }
  },
  watch:{
    $route() {
      this.addTags()
    },
    handleHeaderSider:function (newv,oldv){
      this.handleHideSidebar([newv,newv])
    },
    sidebarOnOff:{
      handler(newv,olodv){
        if (this.sidebarOnOff){
          this.appSidebarOnoff = false
          // 移除事件监听
          process.browser ? document.removeEventListener('touchmove', this.preventTouchmove, { passive: false }) : '';
        }else{
          // 添加事件监听
          process.browser ? document.addEventListener('touchmove', this.preventTouchmove, { passive: false }) : '';
        }
      },
      immediate:true
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
@import "~@/assets/css/components/headerNav.scss";
</style>
