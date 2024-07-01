<template>
  <div class="website-one" >
    <div class="website-one-list"  v-for="(item,index) in websiteData" :key="index" v-if="websiteData.length>0" >
      <div class="tool-header auto-line-between">
        <div class="left">
          <div class="heade-icon" v-if="item.icon">
<!--            <img :src="require(`../../../assets/images/web/${data.icon}`)" :alt="data.title" height="28" width="28">-->
          </div>
          <h5 class="fontSize-text-mains" :style="'color:'+item.bcColor+'!important'">{{item.title}}</h5>
        </div>
        <div class="right auto-line-between">
          <div class="number fontSize-text">
            {{$t('index.current_quantity')}}<span class='nums'>{{item.allNum || 0}}</span>{{$t('index.a')}}
          </div>
          <template v-if="type !== 'favorites'">
            <span class="line"></span>
            <div :class="form_onlyRead ? 'more fontSize-text refresh-icon form-onlyRead' :'more fontSize-text refresh-icon'" @click="refresh(item.belong,item.allNum,index)">
              {{$t('index.swap_it_out')}}
              <Icon type="md-refresh refresh" :class="{refresh_quan:quan}" />
            </div>
            <span class="line"></span>
            <div class="more fontSize-text" @click="moreContent(item.belong)">
              {{$t('index.more')}}
              <Icon type="ios-arrow-forward" />
            </div>
          </template>
        </div>
      </div>
<!--      :style="'color:'+item.bcColor+'!important'"-->
      <div class="tool-info overflow-eclipse fontColor-t-d"  v-html="$common().cruxText(item.explain)">
      </div>
      <Row type='flex' justify="start" align="middle" class-name="mains-menu hotWeb mx-2"  >
        <Col :xxl="{span:spanGrid.xxl}" :xl="{ span: spanGrid.xl }" :md="{span:spanGrid.md}"  :sm="{ span:spanGrid.sm}" :xs="{ span: spanGrid.xs }"
             class-name="hotWeb-item"
             v-for="(item1,index1) in item.content" :key="index1"  v-if="item1.state"
             v-click-data="{name:item1.title,hrefUrl:item1.hrefUrl,imgUrl:'/static/images/website/'+item.belongOne +'/'+ item1.favicon,belong:'website',id:`${item.belongOne}/${item.belong}/${item1.favicon}`}"
        >
          <Tooltip :content="item1.explain" :disabled="item1.explain.length<=0">
            <a :href="item1.hrefUrl" target="_blank" class="item-content auto-line-start applyBck" >
              <span class="item-badge" title="推荐" v-if="item1.eyeNum>=15">推荐</span>
              <div class="item-muted ">
                <p><Icon type="ios-bookmarks" />{{item1.eyeNum}}</p>
                <p><Icon type="ios-thumbs-up" />{{item1.heartNum}}</p>
              </div>
              <div class="item-content-img">
                <img v-lazy="`/static/images/website/${item.belongOne}/${item1.favicon}`" :alt="item1.title" height="38" width="38" data-hotweb="hotWeb1">
<!--                <img v-lazy="lazyImgUrl(item1.favicon,'website',item.belongOne)" :alt="item1.title" height="38" width="38" data-hotweb="hotWeb1">-->
              </div>
              <div class="text">
                <h5 class="fontSize-text overflow-eclipse">{{item1.title}}</h5>
                <small class="fontColor-t-d overflow-eclipse">{{item1.explain}}</small>
              </div>
            </a>
          </Tooltip>
        </Col>
      </Row>
      <template v-if="type === 'favorites' && Page.allCount > Page.per_page">
        <div class="comments-list-page auto-line-center">
          <Page :total="Page.allCount" show-total :current.sync="Page.page"  :page-size="Page.per_page" @on-change="getWebsite($route.params.belong,'',3,2);"	 />
        </div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: "websiteOne",
  props:{
    spanGrid:{
      type:Object,
      default:()=>{
        return {
          'xxl':3,
          'xl':4,
          'md':6,
          'sm':8,
          'xs':12
        }
      }
    },
    Page:{
      type:Object,
      default:()=>{
        return {
          allCount:0,
          page:1,
          per_page:100,
        }
      }
    },
    websiteData:{
      type:Array,
      default:[]
    },
    spinShow:{
      type:Boolean,
      default:false
    },
    type:{
      type:String,
      default:'website'
    },
  },
  data(){
    return{
      params:{page:1,per_page:8,nowPage:1,belong:this.$route.params.belong,total:50,},
      form_onlyRead:false,//禁止点击
      clickNum:0,
      quan:false,
    }
  },
  mounted() {
    // this.getWebsite()
  },
  methods:{
    //type为2 存在belong 时表示获去三级内容多条 favorites页面
    //type为3 存在belong 获取的是当前belong下的其他项，也就是换一换
    //type为1 没有belong 就表示获取二级分类 4条并且还有二级标签内容
    // state 2 表示favorite 的下一页,其他都是index的
    getWebsite(belong,address,type=1,state=2){
      this.params.belong =  belong
      this.params.type =  type
      this.quan = true
      this.Page.belong = belong
      this.Page.page = this.params.page
      this.Page.type = type
      if (type === 3){
        this.Page.per_page = 8
      }
      console.log(belong,address,type,state)
      this.$api.webSite.getWebsite(this.Page).then(res=>{
        if (res.status === 1){
          if (type === 3 && state !== 2){
            if (res.website.content[0].belong === belong){
              this.websiteData[address].content=[...this.websiteData[address].content,...res.website.content[0].content]
              this.$forceUpdate()
            }
            this.quan = false
          }else{
            this.websiteData[0].content = res.website.content
          }
        }
      })
    },
    moreContent(belong){
      // this.$Notice.warning({title:'更多',desc:'还在开发中哦,敬请期待...',})
      this.$router.push(`/favorites/${belong}`)
    },
    refresh(belong,allNum,address){
      console.log(belong,allNum,address)
      if (parseInt(allNum) <= (this.params.page * this.params.per_size )){
        if (this.clickNum === 1) return false
        this.$Notice.warning({title:'刷新',desc:'没有给多了,求求你别刷了...',})
        this.form_onlyRead=true
        this.clickNum ++
      }else {
        this.params.page++
        this.getWebsite(belong,address,3,1)
      }
    }
  },
  computed:{
    // websiteData2:{
    //   get:function (){
    //     console.log("====================")
    //     return this.websiteData2
    //   },
    //   set:function (newValue){
    //     this.websiteData2 = newValue
    //     console.log(this.websiteData2)
    //   }
    // }
    // websiteData:{
    //   get:function (){
    //     console.log('---------------------')
    //     console.log(this.websiteData)
    //     return this.websiteData
    //   },
    //   set:function (newValue){
    //     this.websiteData = [...newValue]
    //   }
    // }
  },
  watch:{
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/css/commonmMixin.scss"; //公共样式分享 相关内容栏 tool-header
.website-one{
  //min-height:648px ;
  position: relative;
  overflow:hidden;
  .website-one-list{
    margin-top: 0.2rem;
    min-height: 142px;
    @include tool-header;
    .mains-menu{
      .one-item{
        min-width: 300px;
        height:100%;
        margin-bottom: 0.2rem;
        .ivu-tooltip{
          height: 100%;
          margin: auto;
          width: 100%;
          ::v-deep.ivu-tooltip-rel{
            height: 100%;
            margin: auto;
            width: 100%;
          }
        }
        .item-content{
          padding: $padding15 $padding20;
          position: relative;
          align-items: flex-start!important;
          margin: 0 .1rem;
          justify-content: flex-start;
          padding-left: .05rem;
          border-radius: 5px;
          &:hover{
            .item-characteristic{
              i{
                &:first-child{
                  color: #ff5b56;
                }
                &:nth-child(2){
                  color: #52ff24;
                }
                &:nth-child(3){
                  color: #27fffc;
                }
                &:last-child{
                  color: #363cff;
                }
              }

            }
            .cloud-download{
              i{
                color: #c000ff;
              }
            }

          }
          .item-left{
            max-height: 70px;
            width: 70px;
            max-width: 30%;
            border-radius: 15%;
            display: inline-block;
            //background: red;
            img{
              width: 100%!important;
              height: 100%!important;
            }
          }
          .item-right{
            max-width: 70%;
            height: 100%;
            display: flex;
            flex-direction: column;
            flex:  0 0 auto;
            padding-left: $padding15;
            .title{
              margin-bottom: 8px;
              .new{
                background-color: red;
                padding: 3px;
                color: #ffffff;
                border-radius: 5px;
                font-size: 12px;
                margin-right: 4px;
              }
            }
            .info{
              font-size: 0.12rem;
              color: #6c757d;
            }
            .app-like{
              margin-top: 5px;
              display: flex;
              justify-content: flex-start;
              position: relative;
              a{
                font-size: 0.12rem;
                color: #6c757d;
                padding: 2px;
                background: rgba(134, 134, 134, 0.1);
                color: #888;
                border-radius: 15px;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
              }

            }
          }
          .item-characteristic{
            position: absolute;
            top: 2px;
            right: 2px;
            i{
              &:first-child{
                transition: color 0.5s;
              }
              &:nth-child(2){
                transition: color 1s;
              }
              &:nth-child(3){
                transition: color 1.5s;
              }
              &:last-child{
                transition: color 2s;
              }
            }

          }
          .cloud-download{
            position: absolute;
            bottom: 23px;
            font-size: 39px;
            right: 3px;
            color: #000000;
            i{
              transition: color 3s;
            }
          }
          .like{
            position: absolute;
            right: 5px;
            bottom: 5px;
            // background: white;
            overflow: hidden;
            text-align: right;
            width:70%;
            white-space:nowrap;
            span{
              display: inline-block;
              font-size: 0.12rem;
              color: #6c757d;
            }
          }
        }
      }
    }
    .hotWeb{

      .hotWeb-item{
        box-sizing: border-box;
        height: 70px;
        margin-bottom: $margin10;
        vertical-align: middle;
        //min-width:294px;
        .ivu-tooltip{
          height: 100%;
          margin: auto;
          width: 100%;
          .ivu-tooltip-rel{
            background-color:red;
            height: 100%;
            margin: auto;
            width: 100%;
            .item-content{
              align-items: center;
              height: 70px;
              margin: 0 $margin10 ;
              background: #ffffff;
              border-radius: 5px;
              padding-left: $padding05;
              padding-right: $padding15;
              box-sizing: content-box;
              transition: all 0.3s;
              position: relative;
              .item-badge{
                position: absolute;
                left: 0px;
                top: 0px;
                z-index: 1;
                font-weight: normal;
                font-size: 10px;
                padding: 2px 5px;
                background: rgb(255 0 20 / 0.7);
                border-radius: 100px;
                transform: rotate(-15deg);
              }
              .item-muted{
                position: absolute;
                right: 5px;
                top: 5px;
                z-index: 1;
                display: flex;
                vertical-align: center;
                p{
                  padding-right: 5px;
                  font-size: 12px;
                  opacity: 0;
                  transition: opacity .3s;
                  i{vertical-align: top;transition: color 2s;}
                }
              }
              &:hover{
                transform: translateY(-5px);
                .item-characteristic{
                  i{
                    &:first-child{
                      color: #ff5b56;
                    }
                    &:nth-child(2){
                      color: #52ff24;
                    }
                    &:nth-child(3){
                      color: #27fffc;
                    }
                    &:last-child{
                      color: #363cff;
                    }
                  }
                }
                .item-muted {
                  p{
                    opacity: 1;
                    &:first-child{
                      color: #ff5b56;
                    }
                    &:nth-child(2){
                      color: #52ff24;
                    }
                  }
                }
                .cloud-download{
                  i{
                    color: #c000ff;
                  }
                }
                .badge{
                  color: #ffffff;
                }
              }
              .item-content-img{
                height: 40px;
                width: 40px;
                border-radius: 50%;
                img{
                  animation: changeColorBG 25s cubic-bezier(0.97, -0.1, 0, 1.57) infinite;
                  height: 38px;
                  border-radius: 50%;
                  width: 38px;
                  transition: all 0.8s;

                  &:hover{
                    transform: rotate(720deg);
                  }
                }
              }
              .text{
                padding-left: $padding10;
                overflow: hidden;
                h5{
                  font-weight: bolder;
                  font-size: 14px;
                }
                small{
                  font-size: 12px;
                  margin-top: 0.05rem;
                  margin-left: 0.05rem;
                  display: block;
                }
              }

            }
          }
        }

      }
    }
  }
}
</style>
