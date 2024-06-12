<template>
    <div class="blogOneselfLeft1-container ">
        <header class="tool">
            <div class="tool-header auto-line-between mx-24">
                <div class="left">
                    <div class="heade-icon">
                      <Icon type="md-paper fontSize-icon" />
                    </div>
                    <h5 class="fontSize-text-mains">博客</h5>
                </div>
                <div class="right auto-line-between">
                    <div class="number fontSize-text">
                        当前数量<span class='nums'>{{blogLists.allCount}}</span>个
                    </div>
                    <span class="line"></span>
                    <div class="more fontSize-text">更多
                        <Icon type="ios-arrow-forward" />
                    </div>
                </div>
            </div>
            <div class="tool-info">
              博客就像是一本魔法书，每篇文章都是一道道魔法咒语，让读者穿越时空，探索知识的宝藏。在这个充满奇幻色彩的世界里，文字是魔杖，想象是翅膀，每一个博客都是一次奇妙的冒险
            </div>
        </header>
        <Scroll :on-reach-bottom="getBlogLists" :distance-to-edge="-24" :loading-text="loadingText" color="yellow" class="left-item" height="740" v-if="blogLists.content.length >0">
            <article class="item-layout applyBck auto-line-start" v-for="(item,index) in blogLists.content" :key="index">
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
                        <a class="" href="javascript:void(0)" >
                          <Icon type="md-list-box" />
                          {{item.author}}
                        </a>
                        <a class="" href="javascript:void(0)">
                          <Icon type="ios-contact" />
                          admin
                        </a>
                      </div>
                      <Time :time="(new Date(item.onlineTime).getTime())" class="fontColor-t-d"  />
                    </div>
                </Col>
            </article>
        </Scroll>
    </div>
</template>
<script>
  // import {Row, Col, Icon, Button, Tooltip,Tag,Scroll,Time,} from 'iview';//iview 导入
  export default{
    name:"blogOneselfLeft1",
    // components:{Row, Col, Icon, Button, Tooltip,Tag,Scroll,Time,},
    props:['blogOneself'],
    data(){
      return{
        time2:(new Date()).getTime() - 86400 * 3 * 1000,
        params:{page:1,per_page:5,tag:'',order:-1},
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
      this.getBlogLists()
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
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import '~@/assets/css/components/blog.scss';
</style>
