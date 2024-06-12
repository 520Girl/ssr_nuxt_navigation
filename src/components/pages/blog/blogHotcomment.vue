<!--blog right 热门文章 热评文章-->
<template>
  <div class="guestbook-left-wraper oneself-main-hot">
        <div  class="guestbook-left-item applyBck">
            <div class="guestbook-left-header fontSize-icon auto-line-start">
              <Icon :type="blogOC.icon" class="fontSize-icon" :color="blogOC.color"/>{{blogOC.title}}
            </div>
            <div class="guestbook-left-content" >
                <article   class="oneself-main-item  auto-line-start" v-for="(item,index) in blogOC.content " :key="index" @click="handleClick(item)">
                    <div class="main-item-img">
<!--                        <a class="background-cover" :style="'background-image: url('+require('../../../assets/images/blog/'+item.imgUrl+'') +');'" :alt="item.title"></a>-->
<!--                        <a class="background-cover" :style="`background-image: url(./static/images/blog/${item.imgUrl});`" :alt="item.title"></a>-->
                        <a class="background-cover" v-lazy:background-image="`./static/images/blog/${item.imgUrl}`"  :alt="item.title" data-grade="gradeCoin1"></a>
                    </div>
                    <div class="main-item-content ">
                        <h5 class="overflow-eclipse-2 fontSize-text-color">{{item.title}}</h5>
                        <div class="main-item-footer auto-line-between">
                            <Time :time="item.onlineTime" class="shallowColor"  />
                          <a class="fontSize-text-colornoH" :href="item.mainUrl" >
                            <template v-if="blogOC.type === 'eye'">
                              <svg-icon name="eye"></svg-icon>
                              <span>{{item.eyeNum}}</span>
                            </template>
                            <template v-else>
                              <svg-icon name="comment" width="20" height="20"></svg-icon>
                              <span>{{item.commentsLen}} </span>
                            </template>
                          </a>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>
<script>
  // import {Icon,Tag,Time} from 'iview'; //iview
    export default {
      name:'blogOneselfHotcomment',
      // components:{Time,Icon,Tag},
      props:{
        blogOC:{type:Object,default:{
            title:"热门文章",
            icon:"ios-clock",
            type:"",
            content:[
              {imgUrl:"https://i1.wp.com/www.ymrkou.com/wp-content/uploads/2020/08/d3f513902a5b1471d55d3c7d9d2b508d.gif?fit=960%2C540&ssl=1",
                title:'这是一个标题',
                onlineTime:259200000,
                mainIcon:"logo-octocat",
                hrefUrl:'www.baidu.com',
                mainBelong:"官方微博"}
            ]
          }},
      },
      data(){
        return{
          time2:(new Date()).getTime() - 86400 * 3 * 1000,

        }
      },
      methods:{
        handleClick(item){
          if (item._id === this.$route.params.id){
            this.$Notice.close('woshinide')
              this.$Notice.warning({
                title:'提示',
                desc:'你选择是当前新闻',
                duration:1,
                name:"woshinide"
              })
              return
          }else {
            this.$router.push({path:`/blog/${item._id}`,query:{title:item.title}} )
          }
        }
      }
    }
</script>
<style lang="scss" scoped>
    @import "~@/assets/css/commonmMixin.scss"; //公共样式tool-header
    @include guestbook-left-wraper;
    .oneself-main-hot{
      margin-right: 0;
      margin-left:0;
    }
    .guestbook-left-content{
      padding: 0.1rem 0!important;
      .oneself-main-item{
        margin-bottom: 0.1rem;
        .main-item-img{
          min-height: 0.66rem;
          border-radius: 0.05rem;
          position: relative;
          flex: 0 0 33.3%;
        }
        .main-item-content{
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          min-height: 0.66rem;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: pre-wrap;
          margin-left: 0.1rem;
          h5{
            flex: 1 1 auto;
          }
          .main-item-footer{
            margin-top: 0.15rem;
            a{
              svg{
                margin-right: 0.02rem;
                vertical-align: top;
              }
            }
          }
        }
      }

    }
</style>
