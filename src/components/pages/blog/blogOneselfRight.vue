<!--bolg 首页-->
<template>
    <div class="right-oneself ">
        <header class="oneself-header applyBck" v-if="oneselfDate">
            <div class="oneselfImg">
                <div class="header-background" :style="'background-image: url('+ require('~/assets/images/blog/wHoOcfQGhqvlUkd.jpg')+');'"></div>
                <div class="header-title applyBck">
                  <img src="~/assets/images/blog/avatar.png" alt="">
                </div>
            </div>
            <div class="header-author ">
                <div class="name" v-if="oneselfDate.content">
                    "{{oneselfDate.content.name}}"
                    <small class="name-summary">{{oneselfDate.content.explain}}</small>
                </div>
                <div class="details"></div>
                <div class="gutter auto-line-around">
                    <div class="gutter-item overflow-eclipse">
                        <count-to-number :value="oneselfDate.web" :time="2" ></count-to-number>
                        <small class="gutter-item-news ">收录网站</small>
                    </div>
                    <div class="gutter-item overflow-eclipse">
                        <count-to-number :value="oneselfDate.comments" :time="2"></count-to-number>
                        <small class="gutter-item-news ">评论次数</small>
                    </div>
                    <div class="gutter-item overflow-eclipse">
                        <count-to-number :value="oneselfDate.blog" :time="2" ></count-to-number>
                        <small class="gutter-item-news ">文章</small>
                    </div>
                    <div class="gutter-item overflow-eclipse">
                      <count-to-number :value="oneselfDate.eye" :time="2" ></count-to-number>
                      <small class="gutter-item-news ">访客</small>
                    </div>
                </div>
            </div>
        </header>
        <main class="oneself-main">
          <div class="guestbook-left-wraper oneself-main-hot" v-if="eyeHotDate">
                <div  class="guestbook-left-item applyBck">
                    <div class="guestbook-left-header fontSize-icon auto-line-start">
                      <Icon type="md-flame fontSize-icon" color="red!important"/>热门文章
                    </div>
                    <div class="guestbook-left-content ">
                        <article  @click="allStart(1,item)"  class="oneself-main-item  auto-line-start" v-for="(item,index) in eyeHotDate.content " :key="index">
                            <div class="main-item-img">
<!--                                <a class="background-cover" :style="'background-image: url('+require('../../../assets/images/blog/'+item.imgUrl+'') +');'" :alt="item.title"></a>-->
                                <a class="background-cover" :style="'background-image: url(/static/images/blog/test3.jpg);'" :alt="item.title"></a>
                            </div>
                            <div class="main-item-content ">
                                <h5 class="overflow-eclipse-2 fontSize-text-color">{{item.title}}</h5>
                                <div class="main-item-footer auto-line-between">
                                    <Time :time="item.onlineTime" class="shallowColor"  />
                                    <a class="fontSize-text-colornoH" :href="item.mainUrl" ><Icon type="ios-clock" />{{item.eyeNum}}</a>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
          <div class="guestbook-left-wraper oneself-main-hot" v-if="commentsHotDate">
            <div  class="guestbook-left-item applyBck">
              <div class="guestbook-left-header fontSize-icon auto-line-start">
                <Icon type="ios-create fontSize-icon" color="#ff6f00!important"/>热评文章
              </div>
              <div class="guestbook-left-content">
                <article @click="allStart(1,item)" class="oneself-main-item  auto-line-start" v-for="(item,index) in commentsHotDate.content " :key="index">
                  <div class="main-item-img">
                    <!--                    <a class="background-cover" :style="'background-image:url('+require('../../../assets/images/blog/'+item.imgUrl+'') +');'" :alt="item.title"></a>-->
                    <a class="background-cover" :style="'background-image:url(/static/images/blog/test2.jpg)'" :alt="item.title"></a>
                  </div>
                  <div class="main-item-content ">
                    <h5 class="overflow-eclipse-2">{{item.title}}</h5>
                    <div class="main-item-footer auto-line-between">
                      <Time :time="item.onlineTime" class="shallowColor"  />
                      <a class="" href="javascript:void(0)" ><Icon type="ios-clock" />{{item.commentsLen}}</a>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </main>
        <footer class="oneself-footer">
            <div class="guestbook-left-wraper oneself-main-hot">
                <a href="" class="guestbook-left-item applyBck">
                    <div class="guestbook-left-header fontSize-icon auto-line-start">
                      <Icon type="md-list-box fontSize-icon" />热门标签
                    </div>
                    <div class="guestbook-left-content oneself-footer-content">
                        <Tag color="default" class="tag" type="border">default</Tag>
                        <Tag color="primary" type="border">primary</Tag>
                        <Tag color="success" type="border">success</Tag>
                        <Tag color="error" type="border">1</Tag>
                        <Tag color="warning" type="border">warning</Tag>
                        <Tag color="magenta" type="border">magenta</Tag>
                        <Tag color="red" type="border">red</Tag>
                        <Tag color="volcano" type="border">volcano</Tag>
                        <Tag color="orange" type="border">orange</Tag>
                        <Tag color="gold" type="border">gold</Tag>
                        <Tag color="yellow" type="border">yellow</Tag>
                    </div>
                </a>
            </div>
        </footer>
    </div>
</template>
<script>
  // import {Icon,Tag,Time} from 'iview'; //iview
  import  blogOneselfHotcomment from '@/components/pages/blog/blogOneselfHotcomment' //热门评论
  import countToNumber from "@/components/common/countToNumber";//数字组件
  export default {
      name:"blogOneselfRight",
      // components:{Icon,Tag,Time,blogOneselfHotcomment},
      components:{countToNumber, blogOneselfHotcomment},
      props:['values'],
      data(){
        return{
          blogOC:{
            title:"热门文章",
            icon:"ios-clock",
            content:[
              {mainImg:"https://i1.wp.com/www.ymrkou.com/wp-content/uploads/2020/08/d3f513902a5b1471d55d3c7d9d2b508d.gif?fit=960%2C540&ssl=1",mainContent:'这是一个标题',mainTime:259200000,mainIcon:"logo-octocat",mainUrl:'www.baidu.com',mainNumber:"5"}
            ]
          },
          oneselfDate:{},//个人信息数据
          eyeHotDate:{}, //热门文章
          commentsHotDate:{}, //热评文章
        }
      },
      mounted(){
        this.allStart()
      },
      methods:{
        allStart(start=0,item){
          if (start === 0){ // 进入首页显示
            Promise.all([this.getUserInfoB(),this.getBlogHot(),this.getBlogHot({per_page:4,belong:'eye',order:-1})])
          }else { // 点击跳转显示的内容
            if (this.$route.query.id === item._id){
              this.$Notice.warning({
                title:'提示',
                desc:'你选择是当前新闻',
                // duration:0
              })
              return
            }
            this.$store.commit('getLoadingHome',true)
            // blog页面
            if (this.$route.name == 'Blog'){
              this.$router.push({
                path:'/blog/detailed',
                query:{
                  id:item._id,
                  title:item.title
                }
              })
            }else {
              this.$router.replace({
                params:{
                  id:item._id,
                  title:item.title
                }
              })
            }

            this.$emit('allStart',0)
            Promise.all([this.getUserInfoB(),this.getBlogHot(),this.getBlogHot({per_page:4,belong:'eye',order:-1})]).then(()=>{
              this.$nextTick(()=>{
                this.$store.commit('getLoadingHome',false)
              })
            })

          }
        },
        getUserInfoB(){
          this.$api.user.getUserInfoB().then(res=>{
            if (res.status == 1){
              this.oneselfDate = res.user
              //虚假数据
              if (this.oneselfDate.web <= 156) this.oneselfDate.web = 156
              if (this.oneselfDate.blog <= 28) this.oneselfDate.blog = 28
              if (this.oneselfDate.comments  <= 75  ) this.oneselfDate.comments = 75
              console.log(this.oneselfDate)
            }
          })
        },
        getBlogHot(params={per_page:4,belong:'comment',order:-1}){
          this.$api.blog.getBlogHot(params).then(res=>{
            if (res.status == 1){
              if (params.belong == 'comment'){
                this.commentsHotDate = res.blog
              }else {
                this.eyeHotDate = res.blog
              }
              console.log(this.eyeHotDate)
            }
          })
        }
      }
    }
</script>
<style lang="scss" scoped>
  /* //公共样式grade-width */
    @import "~/assets/css/commonmMixin.scss"; 
    @import "~/assets/css/components/blog/blogOneselfRight.scss";
</style>
