<!--bolg 首页-->
<template>
    <div class="right-oneself ">
        <header class="oneself-header applyBck" v-if="oneselfDate">
            <div class="oneselfImg">
                <div class="header-background" :style="'background-image: url('+ require('../../../assets/images/blog/wHoOcfQGhqvlUkd.jpg')+');'"></div>
                <div class="header-title applyBck">
                  <img :src="`./static/images/user/${oneselfDate.content.imgUrl}`" alt="">
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
                        <small class="gutter-item-news ">{{$t('blog.Inclusion_sites')}}</small>
                    </div>
                    <div class="gutter-item overflow-eclipse">
                        <count-to-number :value="oneselfDate.comments" :time="2"></count-to-number>
                        <small class="gutter-item-news ">{{$t('blog.Number_of_comments')}}</small>
                    </div>
                    <div class="gutter-item overflow-eclipse">
                        <count-to-number :value="oneselfDate.blog" :time="2" ></count-to-number>
                        <small class="gutter-item-news ">{{$t('blog.article')}}</small>
                    </div>
                    <div class="gutter-item overflow-eclipse">
                      <count-to-number :value="oneselfDate.eye" :time="2" ></count-to-number>
                      <small class="gutter-item-news ">{{$t('blog.visitors')}}</small>
                    </div>
                </div>
            </div>
        </header>
        <main class="oneself-main">

          <blogOneselfHotcomment :blogOC="eyeHotDate" :title="eyeHotDateTitle" ></blogOneselfHotcomment>

          <blogOneselfHotcomment :blogOC="commentsHotDate" :title="commentsHotDateTitle"></blogOneselfHotcomment>
        </main>
        <footer class="oneself-footer">
            <div class="guestbook-left-wraper oneself-main-hot">
                <a href="" class="guestbook-left-item applyBck">
                    <div class="guestbook-left-header fontSize-icon auto-line-start">
                      <Icon type="md-list-box fontSize-icon" color="#00dcff!important"/>{{$t('blog.hot_tags')}}
                    </div>
                    <div class="guestbook-left-content oneself-footer-content">
                      <random-tag :tagValue="item.title" :pathName="'/favorites/'+item.belong" v-for="item in hotTag" :key="item.belong"></random-tag>
                    </div>
                </a>
            </div>
        </footer>
    </div>
</template>
<script>
  // import {Icon,Tag,Time} from 'iview'; //iview
  import  blogOneselfHotcomment from '@/components/pages/blog/blogHotcomment' //热门评论
  import countToNumber from "@/components/common/countToNumber";//数字组件
  import randomTag from "@/components/common/randomTag";//数字组件
  export default {
      name:"blogOneselfRight",
      // components:{Icon,Tag,Time,blogOneselfHotcomment},
      components:{countToNumber,randomTag, blogOneselfHotcomment},
      props:{
        blogHotComment:{type:Object,default:()=>{}},
        blogHotEye:{type:Object,default:()=>{}},
        userInfoB:{type:Object,default:()=>{}},
        hotTags:{type:Array,default:()=>[]},
      },
      data(){
        return{
          blogOC:{
            title:this.$t('blog.hot_article'),
            icon:"ios-clock",
            content:[
              {mainImg:"https://i1.wp.com/www.ymrkou.com/wp-content/uploads/2020/08/d3f513902a5b1471d55d3c7d9d2b508d.gif?fit=960%2C540&ssl=1",mainContent:'这是一个标题',mainTime:259200000,mainIcon:"logo-octocat",mainUrl:'www.baidu.com',mainNumber:"5"}
            ]
          },
          oneselfDate:{content:{imgUrl:''},web:0,blog:0,comments:0,eye:0},//个人信息数据
          eyeHotDate:{title:this.$t('blog.hot_article'),icon:'md-flame',color:'red!important',type:'eye'}, //热门文章
          commentsHotDate:{title:this.$t('blog.hot_comment'),icon:'ios-create',color:"#ff6f00!important",type:'comment'}, //热评文章
          hotTag:[]
        }
      },
      created(){
        //!nuxt 数据的处理
        //? 1.获取个人信息数据
        this.oneselfDate = {...this.oneselfDate,...this.userInfoB}
        //虚假数据
        if (this.oneselfDate.web <= 156) this.oneselfDate.web = 156
        if (this.oneselfDate.blog <= 28) this.oneselfDate.blog = 28
        if (this.oneselfDate.comments  <= 75  ) this.oneselfDate.comments = 75
        //? 2.获取热门文章数据
          this.commentsHotDate = {...this.commentsHotDate,...this.blogHotComment.blog}
          this.eyeHotDate = {...this.eyeHotDate,...this.blogHotEye.blog}
        //? 3.获取热门标签数据
          this.hotTag = this.hotTags

      },
      mounted(){
        // this.allStart()
      },
      computed:{
        eyeHotDateTitle(){
          return this.$t('blog.hot_article')
        },
        commentsHotDateTitle(){
          return this.$t('blog.hot_comment')
        }
      },
      methods:{
        allStart(start=0,item){
          if (start === 0){ // 进入首页显示
            Promise.all([this.getUserInfoB(),this.getBlogHot(),this.getBlogHot({per_page:4,belong:'eye',order:-1}),this.getHotTag()])
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
                query:{
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
                this.commentsHotDate = {...this.commentsHotDate,...res.blog}
              }else {
                this.eyeHotDate = {...this.eyeHotDate,...res.blog}
              }
            }
          })
        },
        //获取热门标签
        getHotTag(){
          this.$api.mutulal.getHotTag({belong:'eye',order:-1,per_page:15}).then(res=>{
            if (res.status === 1){
              console.log('res',res)
              this.hotTag = res.common.content
            }
          })
        }
      }
    }
</script>
<style lang="scss" scoped>
    @import "~@/assets/css/commonmMixin.scss"; //公共样式grade-width
    @import "~@/assets/css/components/blog/blogOneselfRight.scss";
</style>
