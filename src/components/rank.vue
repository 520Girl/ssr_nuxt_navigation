<template>
  <div class="rank-container">
    <div class="rank-layout  mx-15-2 ">
      <Row type="flex" justify="center" align="top" class-name="rank-search">
          <div class=" search-continer">
            <div class="search-input">
              <search :placeholder="select.placeholder" :inputValue="select.inputValue"></search>
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
          </div>
      </Row>
      <Row type='flex' justify="center" align="top" class-name="rank">
        <Col :xxl="{ span: 6 }"  :lg="{span:6}"  :md="{span:8}" :sm="{span:24}"  class-name="rank-box" v-for="(item,index) in newsData" :key="item.title" >
          <div class="rank-box-wrap applyBck">
            <div class="wrap-header">
              <h1 :title="index" class="fontSize-text">
                <img v-lazy="require('@/assets/images/news/'+ item.belong+'.png')" data-article="article3" width="18" height="18"  :alt="item.title" >
                <span>{{item.title}}</span>
<!--                <sub>{{item.subtitle}}</sub>-->
              </h1>
              <sub class="wrap-hearder-time">{{item.subtitle}}</sub>
            </div>
            <div class="wrap-middle">
              <ul>
                <li @click="$common().goto($store.state.isMobile ? item1.mobilUrl : item1.url)"  class=" fontSize-text" v-for="(item1,index1) in item.content" :key="index1">
                    <p class="fontSize-text overflow-eclipse">
                      <span :class="'fontSize-text-colornoH order-'+(Number(item1.index) + 1)" >{{item1.index}}</span>
                      {{item1.title}}
                    </p>
                  <span class="time">{{hotText(item1.hot)}}</span>
                </li>
              </ul>
            </div>
            <div class="wrap-body">
              <Time :time="item.onlineTime" class="time" v-if="item.onlineTime" />
              <Icon type="md-refresh fontSize-text " class="refresh_quan refresh" @click="getNewsRefresh(item._id,item,index)" />
            </div>
            <loading-block :spinShow="item.status" ></loading-block>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import loadingBlock from '@/components/common/loadingBlock'
import search from '@/components/common/search'; //底部，以及主题控制
import setting from '@/setting'
export default {
  head(){
    const {fullPath,meta} = this.$route;
    // const {title:asyncData_title,websiteInfo} = this.gradeCoinContent.content
    // const title = `${meta.title.slice(0,meta.title.indexOf(',')+1)}-${asyncData_title}的${meta.title.slice(meta.title.indexOf(',')+1)}`
    // const description = `${meta.description.slice(0,meta.description.indexOf(',')+1)}${websiteInfo},${meta.description.slice(meta.description.indexOf(',')+1)}`
    // const imgUrl = `${setting.website}static/images/gradeCoin/${asyncData_imgUrl}`
    const title = meta.title
    const description = meta.description
    const imgUrl = ''
    return {
      title: title,
      meta: [
        {hid: 'description', name: 'description', content:description},
        {hid: 'keywords', name: 'keywords', content: title},
        {name:'twitter:url', property: 'og:url', content:`${setting.website}${fullPath}`},
        {name:'twitter:title', property: 'og:title', content:title},
        {name:'twitter:description', property: 'og:description', content:description},
        // {name:'twitter:image', property: 'og:image', content: imgUrl},
      ]
    }
  },
  name: "Rank",
  components:{loadingBlock,search},
  async asyncData({ $api, route }){
    const {news} = await $api.news.getNews()
    let newsData = news.content
    newsData = newsData.map(item=>{
      item.status = false
      return item
    })
    return{
      newsData
    }
  },
  data(){
    return{
      select:{placeholder:'请输入需要查找的内容',inputValue:''},
      newsData:[
        {title:'微博1',belong:'wbHot'}
        ,{title:'微博2',belong:'wbHot'},{title:'微博4',belong:'wbHot'},
        {title:'微博3',belong:'wbHot'},{title:'微博5',belong:'wbHot'},
        {title:'微博u',belong:'wbHot'},{title:'微博0',belong:'wbHot'},
        {title:'微博6',belong:'wbHot'},{title:'微博99',belong:'wbHot'},
        {title:'微博8',belong:'wbHot'},{title:'微博9',belong:'wbHot'},
        {title:'微博55',belong:'wbHot'}],
      spinShow:'',
    }
  },
  created() {
    // this.getNews()
  },
  methods:{
    search(){
      alert("点击搜索")
    },
    getNews(){
      this.$api.news.getNews().then(res=>{
          if (res.status === 1){
            this.newsData = res.news.content
            this.newsData = this.newsData.map(item=>{
              item.status = false
              return item
            })
          }
      })
    },
    getNewsRefresh(id,item,index){
      this.spinShow = id
      this.$set(item,'content','')
      this.$set(item,'status',true)
      this.$api.news.getNewsRefresh(id).then(res=>{
        if (res.status === 1){
          this.$set(item,'content',res.news.content.content)
          this.$set(item,'status',false)
        }
      })
    }
  },
  computed:{
    hotText(){
      return (hot)=>{
        if (hot.indexOf('个内容') > -1){
          return hot.replace('个内容','')
        }
        return hot
      }

      }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/commonmMixin.scss"; //公共样式分享
.rank-container{
  .rank-layout{
    .rank-search{
      margin:0 .5rem .25rem;
      .search-continer{
        width: 50%;
        margin: auto 0.1rem;
        .search-hot{
          padding-left: 0.01rem;
          margin-bottom: 0.1rem;
          text-align: left;
          font-weight: 500;
          line-height: 1.2;
          i{
            color:#f1404b;
            font-size: 22px;
            margin-right: 0.01rem;
            vertical-align: bottom;
          }
          span{
            font-size: 16px;
            line-height: 1.2;
          }
          .hot{

          }
        }
        .search-menu{
          margin-bottom: 0.2rem;
          width: 100%;
          display: flex;
          flex-wrap: wrap; // 强制换行
          justify-content: flex-start; //所有元素右对齐
          p{
            display: inline-block;
            margin: 4px;
            padding: 0.08rem;
            border-radius: 50px;
          }
        }
      }
    }
    .rank{
      margin:0 0.5rem;
      .rank-box{
        margin-bottom: 20px;
        padding: 0 8px;
        text-align: center;
        box-sizing: border-box;
        mib-height: 289px;
        .rank-box-wrap{
          padding: 0 8px;
          width: 100%;
          border-radius: 5px;
          position: relative;
            .wrap-header{
              display: flex;
              justify-content: space-between;
              padding: 12px 8px;
              border-bottom: 1px solid #EBEBEB;
              h1{
                margin: 0;
                position: relative;
                img{
                  display: inline-block;
                  height: 18px;
                  margin-right: 2px;
                  margin-bottom: 4px;
                  border-radius: 6px;
                }
                sub{
                  line-height: 13px;
                  text-align: center;
                  padding-right: 5px;
                  position: absolute;
                  left: 40px;
                  bottom: -9px;
                  font-size: 10px;
                }
              }
              .wrap-hearder-time{
                bottom: -1.1em;
              }
            }
            .wrap-middle{
              *::-webkit-scrollbar{
                background: none!important;
                width: 0;
              }
              ul{
                overflow-y: scroll;
                height: 200px;
                @include order-sequence;
                li{
                  line-height: 20px;
                  padding:0px 8px 10px;
                  display: flex;
                  justify-content: space-between;
                  flex: 1 1 auto;
                  cursor: pointer;
                    p{
                      text-align: left;
                      flex: 85%;
                      span{
                        line-height: 18px;
                        width: 18px;
                        border-radius: 5px;
                        display: inline-block;
                        text-align: center;
                        margin-right: 5px;
                        font-size: 12px;

                      }
                    }
                  .time{
                    flex: 22%;
                    display: inline-block;
                  }
                }
              }
            }
            .wrap-body{
              padding: 12px 8px;
              text-align: right;
              margin-right: 20px;
              .time{
                padding-right: 20px;
              }
              .refresh_quan{
                //@import url("~@/assets/css/animation.scss");
                animation: quan 0.8s linear infinite ;
              }
              .refresh{
                transition: all 0.5s;
                cursor:pointer;
              }
              &:hover{
                .refresh{
                  transform: rotate(-1turn);
                }
              }
              i{
                font-size: 18px;
              }
            }
        }
      }
    }
  }
}
</style>
