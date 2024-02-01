<!--blog right 热门文章 热评文章-->
<template>
        <div class="guestbook-left-wraper oneself-main-hot">
            <a href="" class="guestbook-left-item applyBck">
                <div class="guestbook-left-header fontSize-icon auto-line-start">
                    <Icon :type="blogOC.icon +' fontSize-icon'" />{{blogOC.title}}
                </div>
                <div class="guestbook-left-content">
                    <article class="oneself-main-item  auto-line-start" v-for="(item,index) in blogOC.content " :key="index">
                        <div class="main-item-img">
                            <a class="background-cover" :style="'background-image: url('+ item.mainImg +')'" alt=""></a>
                        </div>
                        <div class="main-item-content ">
                            <h5 class="overflow-eclipse">{{item.mainContent}}</h5>
                            <div class="main-item-footer auto-line-between">
                                <Time :time="(new Date().getTime() - item.mainTime)"  />
                                <a class="" :href="item.mainUrl" ><Icon :type="item.mainIcon" />{{item.mainNumber}}</a>
                            </div>
                        </div>
                    </article>
                </div>
            </a>
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
            content:[
              {mainImg:"https://i1.wp.com/www.ymrkou.com/wp-content/uploads/2020/08/d3f513902a5b1471d55d3c7d9d2b508d.gif?fit=960%2C540&ssl=1",
                mainContent:'这是一个标题',
                mainTime:259200000,
                mainIcon:"logo-octocat",
                mainUrl:'www.baidu.com',
                mainBelong:"官方微博"}
            ]
          }},
      },
      data(){
        return{
          time2:(new Date()).getTime() - 86400 * 3 * 1000,

        }
      }
    }
</script>
<style lang="scss" scoped>
    /* //公共样式tool-header */
    @import "~/assets/css/commonmMixin.scss"; 
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
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                display: -webkit-box;
                white-space: pre-wrap;
                margin-left: 0.1rem;
                h5{
                    flex: 1 1 auto;
                }
                .main-item-footer{
                    margin-top: 0.15rem;
                }
            }
        }

    }
</style>
