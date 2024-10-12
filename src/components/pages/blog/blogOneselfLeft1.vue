<template>
    <div class="blogOneselfLeft1-container ">
        <header class="tool">
            <div class="tool-header auto-line-between mx-24">
                <div class="left">
                    <div class="heade-icon">
                      <Icon type="md-paper fontSize-icon" />
                    </div>
<!--                    <h5 class="fontSize-text-mains">{{$t('blog.title')}}</h5>-->
                    <h5 class="fontSize-text-mains">{{blogTitle}}</h5>
                </div>
                <div class="right auto-line-between">
                    <div class="number fontSize-text">
                      {{$t('blog.current_quantity')}}<count-to-number class='nums' :value="blogLists.allCount || 0" :time="3" ></count-to-number>{{$t('blog.a')}}
                    </div>
<!--                    <span class="line"></span>-->
<!--                    <div class="more fontSize-text">{{$t('blog.more')}}-->
<!--                        <Icon type="ios-arrow-forward" />-->
<!--                    </div>-->
                </div>
            </div>
            <div class="tool-info">
              {{blogExplain}}
<!--              {{$t('blog.intro')}}-->
            </div>
        </header>
      <div class="left-item ">
        <article class="item-layout applyBck auto-line-start " v-for="(item,index) in blogLists.content" :key="index">
          <div :class="'order order-'+(index + 1)">
            <span class="">{{index + 1}}</span>
          </div>
          <Col :xl="{ span: 8 }" :lg="{span:6}" :sm="{ span: 12 }" :xs="{span:24}" class-name="blog-item-img">
            <!--                    <router-link :to="{path:'/blog/detailed',query:{id:item._id}}" class="background-cover" :style="'background-image: url('+require('../../../assets/images/blog/'+item.imgUrl+'') +');'" alt=""></router-link>-->
            <router-link :to="{path:`/blog/${item._id}`,query:{title:item.title}}" class="background-cover" v-lazy:background-image="`./static/images/blog/${item.imgUrl}`" data-blog="blog1" ></router-link>
          </Col>
          <Col :xl="{ span: 16 }" :lg="{span:16}" :sm="{ span: 12 }" :xs="{span:24}" class-name="blog-item-info">
            <div class="info-body">
              <router-link :to="{path:`/blog/${item._id}`,query:{title:item.title}}"  class="fontSize-text-color overflow-eclipse">{{item.title}}</router-link>
              <a href="javascript:void (0)" class="overflow-eclipse fontColor-t-d">{{item.explain}}</a>
            </div>
            <div class="info-footer auto-line-between">
              <div>
                <router-link tag="a" :to="{path:`/blog/tag/${item.author_id}/1`}"  class="changeColor" href="javascript:void(0)" >
                  <Icon type="md-list-box" />
                  {{item.author}}
                </router-link>
                <a class="" href="javascript:void(0)">
                  <Icon type="ios-contact" />
                  admin
                </a>
              </div>
              <Time :time="(new Date(item.onlineTime).getTime())" class="fontColor-t-d" type="date"   />
            </div>
          </Col>
        </article>
        <Page :total="blogLists.allCount" class-name="comments-list-page"  :current.sync="params.page"  :page-size="params.per_page" @on-change="getPage"	 />
      </div>    </div>
</template>
<script>
  // import {Row, Col, Icon, Button, Tooltip,Tag,Scroll,Time,} from 'iview';//iview 导入
  import countToNumber from "@/components/common/countToNumber.vue";
  import {mapGetters}  from "vuex";
  export default{
    name:"blogOneselfLeft1",
    // components:{Row, Col, Icon, Button, Tooltip,Tag,Scroll,Time,},
    components:{countToNumber},
    props:['blogOneself'],
    data(){
      return{
        time2:(new Date()).getTime() - 86400 * 3 * 1000,
        params:{page:1,per_page:5,tag:'',author:'',order:-1},
        blogLists:{allCount:6,content:[]},
        loadingText:'加载中',
      }
    },
    created() {
      this.params.tag = this.$route.query.tag
      //! nuxt数据
      if ('content' in this.blogOneself){
        let blogsContent = this.blogLists.content
        this.blogLists = this.blogOneself
        blogsContent = blogsContent.concat(this.blogOneself.content)
        this.blogLists.content = blogsContent
      }
    },
    mounted() {
      this.params.page = this.$route.params.page  ? Number(this.$route.params.page) : 1
      this.params.author = this.$route.params.author_id  ? this.$route.params.author_id  : ''
      // this.getBlogLists()
    },
    computed:{
      ...mapGetters(['blogAuthor']),
      blogTitle(){
        const author_id = this.$route.params.author_id  ? this.$route.params.author_id  : 'news'
        if (Array.isArray(this.blogAuthor)){
          const blog_Author_arr =  this.blogAuthor.filter(item=>item.author_id === author_id)[0]
          if (Array.isArray(blog_Author_arr) && blog_Author_arr.length > 0){
            return blog_Author_arr[0].title
          }
          if(Object.prototype.toString.call(blog_Author_arr) === '[object Object]'){
            return blog_Author_arr.title
          }
        }
        return 'AI新闻'

      },
      blogExplain(){
        const author_id = this.$route.params.author_id  ? this.$route.params.author_id  : 'news'
        if (Array.isArray(this.blogAuthor)){
          const blog_Author_arr =  this.blogAuthor.filter(item=>item.author_id === author_id)[0]
          if (Array.isArray(blog_Author_arr) && blog_Author_arr.length > 0){
            return blog_Author_arr[0].explain
          }
          if(Object.prototype.toString.call(blog_Author_arr) === '[object Object]'){
            return blog_Author_arr.explain
          }
        }
        return 'navai.vip的AI新闻功能使用先进的人工智能技术来实时收集、整理和发布最新的新闻报道。这种全自动的新闻生产方式不仅大大提高了新闻发布的效率，而且能够确保报道的立场中立和事实准确。通过我们的AI新闻，您可以随时随地获取到最新、最热门的新闻动态。'

      },
    },
    methods:{
      getBlogLists(){
          if (this.blogLists.allCount > this.params.page * this.params.per_page){//判断请求的数据是否超过总条数，超过停止请求
            this.params.page+=1
            this.params.tag = this.$route.query.tag
            this.$api.blog.getBolgLists(this.params).then(res=>{
              if (res.status === 1){
                let result = res.blog
                let blogsContent = this.blogLists.content
                this.blogLists = result
                blogsContent = blogsContent.concat(result.content)
                this.blogLists.content = blogsContent
              }
            })
          }else {
            this.loadingText ='请求你别托我了'
          }
      },
      getPage(page){
        console.log('page',page)
        if (this.$route.params.author_id ){
          this.$router.push('/blog/tag/'+this.$route.params.author_id+`/${Number(page)}`)
        }else{
          console.log('page',page)
          this.$router.push('/blog/page/'+Number(page))
        }

      }
    }
  }
</script>
<style lang="scss" scoped>
    @import '~@/assets/css/components/blog.scss';
</style>
