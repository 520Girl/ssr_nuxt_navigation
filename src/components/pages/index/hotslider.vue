<template>
    <div class="hotslider-container" id="hotslider">
        <section class="hotslider-content mx-15-2" >
            <Row type='flex' justify="start" class-name="menu-button" >
                <Col class-name="newly-item">
                    <div class="button-layout">
                        <Button shape="circle" title="item.title" v-for="(item,index) in titleName" :key="index" @click="handletTitleButton(item.value)" :class="buttonSelect == index ? 'button-select':''">{{item.label}}</Button>
                    </div>
                    <!--                       <Button shape="circle"   title="最近点击" @click="titleButton.hotApp = !titleButton.hotApp">热门App</Button>
                                          <Button shape="circle"   title="编辑网址" @click="">热门书籍</Button>
                                          <Button shape="circle"   title="编辑网址" @click="1">大家喜欢</Button>
                                          <Button shape="circle"   title="编辑网址" @click="1">最新网址</Button> -->
                </Col>
            </Row>
            <div style="position: relative;" class="hotslider-content-item">
              <Row type='flex' justify="start" align="middle" class-name="hotWeb mx-2"  v-show="titleButton.hotWeb" style="height: unset;">
                <Col :xxl="{span:3}" :xl="{ span: 4 }" :md="{span:6}"  :sm="{ span:8}" :xs="{ span: 12 }" class-name="hotWeb-item " v-for="(item,index) in hotWebData" :key="index" >
                  <Tooltip :content="item.websiteInfo">
                    <a @click="$common.goto(item.hrefUrl)" href="javascript:void(0)" class="item-content auto-line-start applyBck" v-click-data="{name:item.title,hrefUrl:item.hrefUrl,imgUrl:'/static/images/hotWeb/' + item.imgUrl}" >
                      <img v-lazy="'/static/images/hotWeb/' + item.imgUrl" data-hotWeb="hotWeb1" :alt="item.title">
                      <div class="text">
                        <h5 class="fontSize-text overflow-eclipse">{{item.title}}</h5>
                        <small class="fontColor-t-d overflow-eclipse">这是一段简介</small>
                      </div>
                    </a>
                  </Tooltip>
                </Col>
              </Row>
              <Row type='flex' justify="start" align="middle" class-name="hotWeb hotApp mx-2" v-show="titleButton.hotApp" v-if="hotAppData.content">
                <Col :xl="{ span: 4 }" :lg="{span:12}" :md="{span:12}"  :sm="{span:12}" :xs="{ span: 24 }" class-name="hotWeb-item hotApp-item" v-for="(item,index) in hotAppData.content" :key="index">
                  <Tooltip :content="item.websiteInfo">
                    <div class="item-content auto-line-between applyBck" >
                      <router-link tag="a"  :to="{path:'/app',query:{id:item._id,title:item.title}}"  class="item-left" v-click-data="{name:item.title,hrefUrl:item.hrefUrl,imgUrl:'/static/images/app/' + item.imgUrl}" >
                        <img v-lazy="'/static/images/app/'+item.imgUrl" data-app="app1" :alt="item.title">
                      </router-link>
                      <div class="item-right ">
                        <div class="title ">
                          <router-link :to="{path:'/app',query:{id:item._id,title:item.title}}" tag="a" class="fontSize-text fontSize-text-app" v-click-data="{name:item.title,hrefUrl:item.hrefUrl,imgUrl:'/static/images/app/' + item.imgUrl}" >
                            <span class="new" v-if="item.new">New</span>{{item.title}} <span>-</span><span>{{item.version}}</span>
                          </router-link>
                        </div>
                        <div class="info overflow-eclipse fontSize-text-color">
                          {{item.explain}}
                        </div>
                        <div class="app-like">
                          <div class="app overflow-eclipse">
                            <a :href="item1.hrefUrl" v-for="(item1,index1) in item.belongTag" :key="index1" target="_blank">{{item1}}</a>
                          </div>
                        </div>
                      </div>
                      <div class="item-characteristic" >
                        <Icon :type="item1== 0 ? 'logo-apple':item1 == 1 ? 'logo-android' : item1 == 2 ? 'md-desktop': 'md-tablet-portrait'" v-for="(item1,index1) in item.state" :key="index1"  :title="item1"/>
                      </div>
                      <div @click="$common.goto(item.downloadUrl)" class="cloud-download" v-like="{title:'app',belong:'DN',id:item._id}">
                        <Icon type="md-cloud-download" />
                      </div>
                      <div class="like">
                        <Rate allow-half v-model="item.likeLevel" icon="md-heart" :max="100" style="vertical-align: initial;" @on-change="datas" v-like="{title:'app',belong:'LL',id:item._id}">
                        </Rate>
                        <span>
                           <Icon type="md-heart" />{{item.heartNum}}
                        </span>
                        <span>
                            <Icon type="md-download" />{{item.downloadNum}}
                        </span>
                      </div>
                    </div>
                  </Tooltip>
                </Col>
              </Row>
              <Row type='flex' justify="start" align="middle" class-name="hotComic hotApp mx-2" v-show="titleButton.hotComic" v-if="hotComicData.length>0">
                <Col :xxl={span:4} :xl="{ span: 6 }" :lg="{span:6}" :md="{span: 8}" :sm="{span: 8}" :xs="{ span: 12 }" class-name="hotComic-item hotApp-item auto-line-center" v-for="(item,index) in hotComicData" :key="index" v-show="item.lookState" >
                  <div class="main-item main-itemHover">
                    <span class="new" v-if="item.new " :style="'background-image:linear-gradient('+item.bg[0]+'deg,'+item.bg[1]+','+item.bg[2]+');background-color:'+item.bg[1]+';'">新</span>
                    <div class="infoBlockWrap">
                      <div class="wrapBg"></div>
                      <div class="infoBlock infoBlock-fasico">
                        <div class="bg commonBg" :style="'background:linear-gradient('+item.bg[0]+'deg,'+item.bg[1]+','+item.bg[2]+');background-color:'+item.bg[1]+';'" ></div>
<!--                        <div class="infoIcon background-cover" v-lazy:background-image="'/static/images/cartoon/'+item.belongLogo1+'/'+item.imgUrl" data-cartoon="cartoon1" ></div>-->
                        <div class="infoIcon background-cover" :style="'background-image:url('+ './static/images/cartoon/'+item.belongLogo1+'/'+item.imgUrl+')'" ></div>
                        <div class="infoWrap">
                          <div class="info-title fontSize-text-colornoH" >{{item.title}}</div>
                          <div class="info-desc overflow-eclipse-2 fontSize-text-colornoH">{{item.explain}}</div>
                          <router-link class="set_button raised hoverable button" :to="{path:'/cartoon/'+item.belongLogo1,query:{title:item.title}}"  v-click-data="{name:item.title,hrefUrl:'/cartoon/'+item.belongLogo1,imgUrl:'/static/images/cartoon/'+item.belongLogo1+'/'+item.imgUrl}" >
                            <Icon type="logo-codepen anim" style="vertical-align: text-top;" />
                            <span>嗅探观赏</span>
                          </router-link>
                          <router-link :to="{path:'/cartoon/'+item.belongLogo1}" class="new-chapters">最新章节：{{item.LChapters.name}}</router-link>
                        </div>
                      </div>
                    </div>
                    <div class="infoBlock-name fontSize-text-mains">
                      {{item.title}}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row type='flex' justify="start" align="middle" class-name="allLike hotApp mx-2" v-show="titleButton.allLike" >
                <Col :xxl={span:4} :xl="{ span: 6 }" :lg="{span:6}"  :xs="{ span: 12 }" class-name="allLike-item hotApp-item " v-for="(item,index) in allLike" :key="index">
                  <router-link :to="{path:'/image/'+item.belongLogo1,query:{title:item.title}}" class="allLike-content applyBck"  v-click-data="{name:item.title,hrefUrl:'/image/'+item.belongLogo1,imgUrl:'/static/image/'+item.belongLogo1+'/'+item.imgUrl[0]}"  >
                    <div class="allLike-img">
                      <div class="img" v-lazy:background-image="'/static/image/'+item.belongLogo1+'/'+item.imgUrl[0]" data-name="image1"></div>
                      <div class="tagSlope">
                        <span>{{item.allNum}}</span>
                      </div>
                    </div>
                    <div class="allLike-content-main">
                      <div class="time auto-line-between">
                        <Time  :time="item.onlineTime" :type="(item.onlineTime / (1000 * 60)).toFixed(1) >= 30 ? 'date' :'relative'"></Time>
                        <span>{{item.allNum}}P</span>
                      </div>
                      <div class="title overflow-eclipse">
                        <h5>{{item.title}}</h5>
                      </div>
                      <div class="tags">
                        <div class="tags-Num">
                            <span class="views"><Icon type="md-pricetags" color="#c300ff" v-if="item.belong == 0"/> <Icon type="md-contacts" color="#ff88af" v-else /></span>
                            <span class="like"><Icon type="md-heart" />{{item.heartNum }}</span>
                            <span class="comments"><Icon type="md-eye" />{{item.eyeNum}}</span>
                        </div>
                        <div class="tags-belong">
                          <span v-for="(item1,index1) in item.relatedTag">{{item1}}</span>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </Col>
              </Row>
              <Row  type='flex' justify="start" align="middle" class-name="newWeb  mx-2" v-show="titleButton.newAddress">
                <Col :xl="{ span: 2}"  :lg="{ span:4}" :xs="{ span: 6 }" class-name="newWeb-item hotApp-item "  v-for="(item,index) in newWebData" :key="index">
                  <Tooltip >
                    <a @click="$common.goto(item.hrefUrl)" href="javascript:void(0)" class="item-master auto-line-between applyBck" v-click-data="{name:item.title,hrefUrl:item.hrefUrl,imgUrl:'/static/images/app/' + item.imgUrl}" >
                      <div style="width: 80%;overflow: hidden;">
                        <img  :src="item.imgUrl" :title="item.title" />
                        <span class="fontSize-text-color overflow-eclipse">{{item.title}}</span>
                      </div>
                      <Icon type="ios-arrow-dropright" />
                    </a>
                    <div slot="content"  class="item-tooltip">
                      <div class="tooltipUrl">
                        {{item.url}}
                      </div>
                      <div class="tooltipInfo">
                        {{item.websiteInfo}}
                      </div>
                      <div  class="tooltipTag auto-line-center">
                        <strong v-for="(item2,index2) in item.websiteTag">
                          <Tag checkable :color="item2.color" >{{item2.content}}</Tag>
                        </strong>
                      </div>
                    </div>
                  </Tooltip>
                </Col>
              </Row>
              <Row  type='flex' justify="start" align="middle" class-name="newWeb  mx-2" v-show="false">
                <Col :xl="{ span: 2}"  :lg="{ span:4}" :xs="{ span: 6 }" class-name="newWeb-item hotApp-item" >
                  <Tooltip >

                  </Tooltip>
                </Col>
              </Row>
              <loading-round :spinShow="spinShow"></loading-round>
            </div>
        </section>
    </div>
</template>
<script>
  // import{Row,Col,Button,Tooltip,Icon,Tag,Rate,Time,Spin } from 'iview';
  import loadingRound from "@/components/common/loadingRound"; //loading
  export default  {
    name:"hotslider",
    components:{loadingRound},
    // components:{Row,Col,Button,Tooltip,Icon,Tag,Rate,Time,Spin },
    data() {
      return {
        titleName:[
          {label:'热门网址',value:'hotWeb'},
          {label:'热门App',value:'hotApp'},
          {label:'热门漫画',value:'hotComic'},
          {label:'大家喜欢',value:'allLike'},
          {label:'最新网址',value:'newAddress'},
        ], //button 标题
        titleButton:{hotWeb:false,hotApp:false,newAddress:false,hotComic:true,allLike:false}, //button 的开关 需要配合buttonSelect显示第几个
        buttonSelect:2,
        time2: (new Date()).getTime() - 86400 * 3 * 1000,
        newWebData:[
          { id:1,title:'汾西网汾西网汾西网',imgUrl:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2051294088,2164049373&fm=26&gp=0.jpg",
            hrefUrl:'https://www.baidu.com',
            websiteInfo:'提示消息提示消息提示消息提示消息提示消息提示消息',
            websiteTag:[
              {content:'一',color:"red"},
              {content:'标签一',color:"volcano"},
              {content:'标签一',color:"orange"},
              {content:'标签一',color:"yellow"},
            ]
          },
        ],
        hotWebData:[
          { id:1,
            title:'香港服务器',
            imgUrl:'https://api.iowen.cn/favicon/www.go141.com.png',
            hrefUrl:'https://www.google.com/',
            websiteInfo:'这个是香港的一个服务器，位置位于香港这个是香港的一个服务器，位置位于香港'},
        ],
        hotAppData:[],//热门App
        hotComicData:[],//热门漫画
        allLike:[], //大家喜欢的图片
        spinShow:false, //加载中动画
      }
    },
    created() {

    },
    mounted() {
      setTimeout(()=>{
        this.spinShow = false
      },2000)
      this.getCartoon()
    },
    methods: {
      //点击选择标签
      handletTitleButton(type){
        for(let [index,item] of this.titleName.entries()){
          if(type == item.value){
            this.titleButton[type] = true;
            this.buttonSelect = index
          }else{
            this.titleButton[item.value] = false;
          }
        }
        if (type == 'hotApp' && this.hotAppData.length <= 0 ){
          this.spinShow = true
          this.getAppLists()
          return
        }
        if (type == 'hotComic' && this.hotComicData.length <= 0 ){
          this.spinShow = true
          this.getCartoon()
          return
        }
        if (type == 'allLike' && this.allLike.length <= 0){
          this.spinShow = true
          this.getImage()
          return
        }
      },
      //加载热门app的数据
      getAppLists(){
        this.$api.appList.getAppLists({per_page:2,order:-1,page:1}).then(res=>{
          if (res.status === 1){
            this.hotAppData = res.app
            console.log(this.hotAppData )
            setTimeout(()=>{
              this.spinShow = false
            },1000)
          }
        })
      },
      //加载热门漫画数据
      getCartoon(){
        this.$api.cartoon.getCartoon({per_page:12,page:1,order:-1}).then(res=>{
          if (res.status === 1){
            let result = res.cartoon.content
            console.log(result)
            result.some((item,index)=>{
                item.bg = this.cartoonBagAdd(index)
              }
            )
            this.hotComicData = result
            console.log(this.hotComicData)
            setTimeout(()=>{
              this.spinShow = false
            },500)
          }
        }).catch(error=>{
          console.warn(error)
        })
      },
      //加载热门图片数据
      getImage(){
        this.$api.image.getImage({level:1,per_page:12,page:1,belong:''}).then(res=>{
          if (res.status === 1){
            this.allLike = res.image.content
            setTimeout(()=>{
              this.spinShow = false
            },1000)
          }
        }).catch(error => {
          console.warn(error)
        })
      },

      cartoonBagAdd(num=0){
        var bg = [
          ['145','#3eb5f8','#06e5f8'],
          ['50','#64edea','#64aaf2'],
          ['90','#f8c84c','#f8788b'],
          ['90','#f26768','#f65589'],
          ['60','#fe80fb','#c467ff'],
          ['70','#32dab7','#38cf7a'],
          ['80','#44aaf8','#b376ff'],
          ['90','#7ee1f9','#6cbaf8'],
        ]
        if (num <= 7) return bg[num]
        let nums = (num) % 8
        return bg[nums]
      },
      //提交用户访问数据给服务器
      datas(){alert(555)}
    },
  }
</script>
<style lang="scss" scoped>
    @import "~/assets/css/components/index/hotslider.scss";
</style>
