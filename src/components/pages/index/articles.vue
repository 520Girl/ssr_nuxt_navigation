<template>
    <div class="articless-container contents-bck" id="articless">
        <section class="articles-content mx-15-2">
            <Row type='flex' justify="space-between" class-name="articles-carousel" >
              <Col :xl="{ span: 7 }" :lg="{span: 11}" :xs="{ span: 24 }" class-name="carousel-content">
                  <Carousel v-model="carousel.pitchOnImg" :autoplay="true"  radius-dot :arrow="carousel.content.slide && carousel.content.slide.length === 1 ? 'never' :'hover'" style="height: 100%">
                      <CarouselItem  v-for="(item,index) in carousel.content.slide" style="height: 100%" :key="item._id" >
                          <div
                            @click="jumpUrl(item)"
                            class="carousel"
                            v-click-data="{name:item.title,hrefUrl:$common().handleHrefUrl({belong:'slide',hrefUrl:item.hrefUrl,title:item.title}),imgUrl:`/static/images/${item.belong}/${item.belong}/${item.imgUrl}`,belong:item.belong,id:item.belongId}" >
                              <nuxt-img preload  fit="cover" format="avif,webp,jpeg" loading="lazy" placeholder="/static/lazy/errorG2.png" :src="imgUrl(item.imgUrl,item.belong)" data-article="article1" :alt="item.title" width="518" height="300"/>
<!--                            <img v-lazy="`/static/images/${item.belong}` + item.imgUrl" data-article="article1" :alt="item.title" width="518" height="300">-->
                            <div class="text  applyBck" :data-index="index" >
                                  <h5 class="imgInIcon fontSize-text-colornoH">{{item.title}}</h5>
                              </div>
                          </div>
                      </CarouselItem>
                  </Carousel>
              </Col>
              <Col :xl="{ span: 3 }"  :lg="{span: 3}" :xs="{ span:0 }" class-name="sliders pdt-1-0" >
                  <div class="sliders-layout">
                    <Carousel   :autoplay="true" :autoplay-speed="1500" radius-dot :arrow="value && value.length === 1 ? 'never' : 'hover'"  v-for="(value,key,index1) in carousel.content" :key="key" v-if="value.length != 0 && key != 'slide'">
                      <CarouselItem  class="layout-li" v-for="(item,index) in value"  :key="item.imgUrl" >
                        <div
                          @click="jumpUrl(item)"
                          class="carousel"
                          v-click-data="{name:item.title,hrefUrl:$common().handleHrefUrl(item),imgUrl:`/static/images/${item.belong}/${item.imgUrl}`,belong:item.belong,id:item.belongId}" >
                          <h5 class="overflow-eclipse applyBck fontSize-text-colornoH">{{item.title}}</h5>
                          <nuxt-img preload  fit="cover" loading="lazy" format="avif,webp,jpeg"  :src="imgUrl(item.imgUrl,'slide')" placeholder="/static/lazy/errorH1.png" data-article="article2" :alt="item.title" width="134"  height="76"/>
<!--                          <img v-lazy="'/static/images/article'+ item.imgUrl" data-article="article2" :alt="item.imgAlt" width="134"  height="76">-->
                        </div>
                      </CarouselItem>
                    </Carousel>
                  </div>
              </Col>
              <Col :xl="{ span: 7 }"  :lg="{span: 0}" :xs="{ span:0 }" class-name="card pdt-1-0">
                <Card bordered >
                  <p slot="title" class="card-title fontSize-text-color ">
                    <Icon type="ios-stats fontSize-icon"></Icon>
                    {{$t('index.Top')}}
                  </p>
                  <router-link  slot="extra" tag="a"  class="card-change" :to="{path:`/rank`}" >
                    {{$t('index.other_news')}}
                    <Icon type="ios-arrow-forward"></Icon>
                  </router-link>
                  <ul class="card-main">
                    <li v-for="(item,index) in rankingList" class="main-item" :key="item.belongId" @mouseenter="mainItem = index">
                      <Icon type="md-star"  class="main-circle" :style="index == mainItem ? 'color:#f5a623;font-size:15px; ' : ''" v-if="index == 0"/>
                      <Icon type="md-radio-button-on" class="main-circle" :style="index == mainItem ? 'color:#f5a623;font-size:14px;' : 'font-size:12px;left:-15px; '"  v-else/>
                      <i class="main-line main-line-color"></i>
                      <div class="item-text">
                        <div
                          @click="jumpUrlCarousel(item)"
                          class="item-title"
                          v-click-data="{name:item.title,hrefUrl:$common().handleHrefUrl(item),imgUrl:`/static/images/${item.belong}/${item.imgUrl}`,belong:item.belong,id:item.belongId}">
                          {{ item.title }}
<!--                          <nuxt-img preload  fit="fill" loading="lazy"  :src="imgUrl(item.imgUrl,item.belong)" data-article="article3" placeholder="/static/images/app/errorA4.png"  height="78" width="256" v-if="item.imgUrl" :alt="item.title"/>-->
                          <img v-lazy="`/static/images/${item.belong}/${item.imgUrl}`" height="12" width="12"  data-article="article3" alt="" v-if="item.imgUrl" />

                          <Icon type="ios-stats-outline" v-else/>
                        </div>
                        <span style="display: inline-block;min-height: 26px;min-width: 70px;">
                          <template v-if="item.score != 0" >
                            <Rate allow-half disabled :count="5"  v-model="item.score" >
                                <span class="fontSize-text-color">{{item.score}}</span>
                            </Rate>
                          </template>
                          <template v-else>
                            <svg-icon name="hot" style="font-size: 16px;" v-for="item in 5" :key="index+Math.random()"></svg-icon>
                          </template>
                        </span>
                      </div>
                      <div class="item-img" v-show="index == mainItem">
                        <div class="item-img-reserve"   @click="jumpUrlCarousel(item)"
                        >
                          <nuxt-img preload  fit="fill" loading="lazy"   format="avif,webp,jpeg"   :src="imgUrl(item.imgUrl,item.belong)" height="78" width="256"  :title="item.title" placeholder="/static/lazy/errorA4.png" data-article="article4"/>
<!--                          <img  v-lazy="`/static/images/${item.belong}/${item.imgUrl}`" data-article="article4" :title="item.title">-->
                        </div>
                        <template v-if="item.belong != 'news'">
                          <div class="item-order"
                            :style="item.status === true ? 'background: #48ff47;' : ''"
                            @click="item.status = true" v-like="{url:$common().handleHrefUrl(item),belong:item.belong,title:item.title,type:'EN',id:item.belongId}">
                            <span :class="item.status ? 'refresh_quan' : ''"></span>
                            <span class="fontSize-like">{{item.status === true ? $t('index.booked') : $t('index.booking')}}</span>
                          </div>
                        </template>
                        <template v-else>
                          <div class="item-order"
                            :style="item.status === true ? 'background: #48ff47;' : ''"
                            @click="item.status = true" v-like="{url:$common().handleHrefUrl(item),belong:item.belong,title:item.belong,type:'EN',id:item.belongId}">
                            <span :class="item.status ? 'refresh_quan' : ''"></span>
                            <span class="fontSize-like">{{item.status === true ? $t('index.booked') : $t('index.booking')}}</span>
                          </div>
                        </template>
                      </div>
                    </li>
                  </ul>
                </Card>
              </Col>
              <Col :xl="{ span: 7 }" :lg="{span: 10}"  :xs="{ span: 24 }" class-name="collapse pdt-1-0">
                    <Collapse v-model="collapse.pitchOnTag" >
                        <Panel :name="String(index)" v-for="(item,index) in collapse.allCollapse" :key="item._id">
                            <span class="fontSize-text-color header-desc">{{item.title}}</span>
                            <Badge :count="item.heartNum" overflow-count="99" color="magenta"></Badge>
                            <router-link tag="p"
                             :to="{path:`/blog/${item._id}`,query:{title:item.title}}"
                             v-click-data="{name:item.title,hrefUrl:$common().handleHrefUrl({belong:'blog',belongId:item._id,title:item.title}),imgUrl:'/static/images/blog' + item.imgUrl,belong:'blog',id:item._id}"
                             slot="content" class="fontSize-text-color"
                            >
                                {{item.explain}}
                            </router-link>
                            <span class="sign" >
                                <router-link :to="{path:`/blog/${item._id}`,query:{title:item.title}}"
                                             v-click-data="{name:item.title,hrefUrl:$common().handleHrefUrl({belong:'blog',belongId:item._id,title:item.title}),imgUrl:'/static/images/blog' + item.imgUrl,belong:'blog',id:item._id}"
                                             class="bottom fontSize-text-orange" >
                                    <sub class="left-sign">
                                        <Time :time="item.onlineTime" type="date" v-if="item.onlineTime"></Time>
                                    </sub>
                                    <sub class="right-sign">
                                        {{item.author}}
                                    </sub>
                                </router-link>
                                <router-link tag="a" :to="{path:'/blog'}" class="top" v-if="index == 0" >
                                    <sup class="top-sign">
                                    {{$t('index.all_blog')}}
                                    </sup>
                                </router-link>
                            </span>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </section>
    </div>
</template>
<script>
  // import {Row,Col,Collapse,Panel,Carousel,CarouselItem,Badge,Card,Icon,Rate,Time   } from 'iview';
  export default {
    name:"articles",
    // components:{Row,Col,Collapse,Panel,Carousel,CarouselItem,Badge,Card,Icon,Rate,Time    },
    props: {
      // 接收父组件传过来的数据
      slideList: {
        type: Object,
        default: () => ({})
      },
      blogList: {
        type: Array,
        default: () => ([])
      },
      ranking: {
        type: Array,
        default: () => ([])
      }
    },
    data() {
      return {
        //博客数据
        collapse:{
          pitchOnTag:'0',
          allCollapse:[
            {id:1,heartNum:12,title:'小小鸟',explain:'我是一只小小鸟，怎么飞也飞不高，'},
            {id:1,heartNum:14,title:'飞鹏',explain:'我是一只小小鸟，怎么飞也飞不高，'},
            {id:1,heartNum:12,title:'小小鸟',explain:'我是一只小小鸟，怎么飞也飞不高，'},
          ],
        },
        //轮播图
        carousel:{
          pitchOnImg: 0,
          pitchOnImg1: 0,
          pitchOnImg2: 0,
          pitchOnImg3: 0,
          content:{
            slide:[
              // {id:1,imgHref:"www.baidu.com",imgUrl:'https://i2.wp.com/se-zhan.xyz/wp-content/uploads/2020/09/20200914084541.png',imgAlt:'易用vpn',imgWidth:202,imgHeight:89},
              // {id:1,imgHref:"www.baidu.com",imgUrl:'https://i2.wp.com/se-zhan.xyz/wp-content/uploads/2020/09/20200914084541.png',imgAlt:'易用vpn',imgWidth:202,imgHeight:89},
              // {id:1,imgHref:"www.baidu.com",imgUrl:'https://i2.wp.com/se-zhan.xyz/wp-content/uploads/2020/09/20200914084541.png',imgAlt:'易用vpn',imgWidth:202,imgHeight:89}
            ],
            website:[],
            blog:[],
            app:[],
            cartoon:[],
            image:[],
            gradeCoin:[]
          }
        }, //轮播图数据
        number: '',
        mainItem:0,//鼠标经过排行榜
        rankingList: [
          {
            name: '易用vpn',
            url: 'https://movie.douban.com/subject/1292052/',
            rate: 4.9,
            favicon:'data:image/jpeg;base64,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'
          },
          {
            name: '易用vpn',
            url: 'https://movie.douban.com/subject/1292052/',
            rate: 4.9,
            favicon:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIIAgQMBEQACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAQQFBgIDBwj/xABAEAABAwIBBQoMBgIDAAAAAAABAAIDBAURBhIhMWETQVFSVXFykZTRBxUWIjM1dIGhsbPSIzJCgsHwFGIkhKL/xAAaAQEAAgMBAAAAAAAAAAAAAAAAAgMBBAUG/8QALBEAAgIBBAEDAwIHAAAAAAAAAAECAxEEEiFRMQUyQSJxgWGRExRCodHh8P/aAAwDAQACEQMRAD8A7igKplll1aclY9zqHGornNzmUkRGdsLj+kf0AqddUpvgw2chvXhVynuL3Clnit0P6WUzAXDnc7HH3ALdjpoLzyRyVyfKe/z47rfLk4nX/wAt4+RVqqgvgZY38dXfle5dtl+5Z2Q6MB46u/K9y7ZL9ybIdAPHV35XuXbJfuWdkegHjq78r3Ltkv3Jsh0A8dXfle5dsl+5NkOgHjq78r3Ltkv3Jsj0A8c3fle5dsl+5NkOgHjq78r3Ltsv3LGyHQN0OUd9h9Fe7m3/ALch/lYdcH8Gck9afCdlVbpG59e2tjB0x1cYdiOcYH4quWnrYydYyK8JFrylcyknb/g3J2gQPfi2Q/6O0Y82APPrWnZTKBJPJdwVUZFQFU8ImVjMlLEZ4811dUEx0sbhiM7DS4jgb/IG+rKq/wCJLBhs83VVRNWVMtTVSvmnmeXySPOLnE75XTiklhEDUpAEAIAQAgBAIgFQAgBACAEAAlrg5pLXA4gg4EHhCxjIPQfgnyzdlHbHUNwkzrnRtGc865o9Qfz7x24HRiubdVsl+hNMvmKpMnnnwyXZ9xy0mpg78GgjbAxv+xGc4+/ED9q6GmjiGeyDKMtkwCAEAIAQEjZrLWXeUtp25sTfzzPHmt7zsWMmzptJZqJYh47LrQ5HWmnYP8hklVINbpHkDqbgmTuV+lURS3LLNtVkjZZ2EMp3U7sND4ZDiPccR8FnKFnpunl4WH+hTL9k9V2d2efxqUnRM0atjhvfJDi6nRz0/PldkOhqAgBACAEBYPB/d32XLC2VQcRG+YQSgD8zH+aeokH9qpvjugzKZ6gwPCuXgmeVMrJjUZU3iUkkurptex5H8Lq1LEEVvyRStAIAQAgLDk9kzLcC2orQ6Gl1tGp0vNwDb1cKpnYlwdXRemSu+uziP92X2mhipoWQ08bY4mDBrGjABQ35PRwrjXFRisJG3OU1IMQvUskGa5S17XNeA5rhgQRiCFnJVJLHJSL/AJNbjnVNsaXR63Qay3o8I2a+BZTOFqtDs+qvx0VfFSOYKgBACAA/ciJASCzzgRvYaVGS4B6l8cbT1LmbCeTzPfvX919un+o5dKPsRAZKYBAK1rnuaxjS5zjgGgYklYbCW5pIuWT+SzYcyqubQ6XW2DWG9LhOzUufbrFJ4j4PR6H0lRxZfy+vgtmKpjM7WAxVqmYYhcpqZBmDnqxSKmaXyKaZTJjeSVSyUSZXb1aIqsunp8I59Z3mv5+A7VNM5mp08Z8ryVaSN8T3MlYWvbrBUjmNNPDMVkwCAwn9DJ0T8k+QejcSuaSOBX71/dPbZ/qOW/D2r7IiMlMBvrALzklaI6WjjrpWh1RM3OaSPyNOoDnGn4Lia3VOU3XHwj1PpWjjXUrZe5/9+5YwtRSOuLirVMwxC5XRmQZg5ytUitmp71apFMmNpJFbFmvNjSWVWJmtKQ0klU0a8pEVc4GVUZOA3Vo8138KSZp3RU1lleCsNIVAYT+gk6JQHoxcwkcDv3r+6e2z/UcuhD2L8ERkpgQjFAdIyarY660QFrhukTRHI3ikDD4jArzGtqlVc8+Hyj2Pp18btPHHlLDJRa6kbwmKtjICYq6MiuTMSQr4yKJSNT807y2Y8mrOYyqWlululvyVyia7tTI6WXapoolIZyy61YjXlIZVE4jY5x3tSmjWnLghFM1QWQYT+gk6JQHoxcwkcDv3r+6e2z/UcuhD2L8ERkpgEA5t9fUW2pE9K/B2pzTqeOAqm+iF0Ns0X6fUWaee+DL/AGW9011j8w7nOB50LjpG0cIXndTpJ6d9rs9Vo9fXqY9S6JFUReTbbEJV0WVSZqcVtQZrTka3OW3WaVkzU4rdrRz7bCNrqQuBfDr32cPMrZUZWYlC1WOJEDVVAhBz9DuLvqtRfgzOxeURM0zpnYu0DeHArUsGrKTlya1kwCAwn9BJ0SgPRi5hI4HfvX909tn+o5dCHsX4IjJTAIBWtL3BrQSTqAQw3gk6KmdTyNmDiJmnFrm/p5lCSU1tZV/HlGWYPBbrXd93Aiqs1suoO1B3cf7sXF1Xp7hmVXjro9DoPWo24rveJd/D/wBkoStKJ1pywanLagalkzU5b1aOfbM1ldCqOTm22GiSTN0NGJXUop3cvg4+p1O3hcsiblbY64GQnMnGp4GvYVdbo42LjhmtTrp1v6+V0Viop5aaYxTtLXD47QuTOuVctskdquyNkd0Xwa1EmCAwn9BJ0SgPRi5hI4HfvX909tn+o5dCHsX4IjJTAICct1EGQNeR57xjzDgVbkatlmXgetgTJQ5GwQ6NSymVSngk6KsfGBHNi5g1O3x3rT1GhjP64cM6+i9YlViF3K76/wAj8Pa9uLHAg8C01XKDxJHW/ma7Y7oSyYP0a9C3KYtvCNG+1RWWxtJJj+TDaV29Pp0uZnn9Trd3FZpzV1InJk0xQ3BWjI1uVCytpXRkYPAxjdwFU6ilWwx8mxptQ6Jp/BS/guAelBAYT+gk6JQHoxcwkcDv3r+6e2z/AFHLoQ9q/BEZKYBAWqxTMrKNrQfxYgGvb8AVRPhmjfFxefgkxT7FDJrbsGW47FJSK3IyEOxWxkVSZkIsFamn5IbmvDF3M7+nnWxBlcpN+Q3PYtmEithmLYjIrbEzVsRkYzyNLjVMoaV80h06mN4zt4KF1yrhll+mpldZtRRtfOvPHqRVkGE/oJOiUB6MXMJHA796/uvt0/1HLoQ9qIjJTAIDZTzy00zZoHlj26iPlzLDSawyMoqSwy62K809zAhlwhquJvP2t7vmtWyDjz8HN1FEq+V4Jkw4bygmaLljyJuKmpFbkG57FdGRFsQxbFfGRBsx3PYtmEytmJYtqE+jBHXe5wW2PB4Ek5GLIgdPOeALM9Sq1+ptabST1D/TspdbWT105lqH4n9Ld5o4AFzLLJWS3SPQ1UwpjtgjQoFoIDCf0EnRPyReQejFzSRwjKaLcMpbvGdYrp/qOW9W8wREjVYAQAsAASCC0kEHEEbxQFwydypac2ku7sNGDKk/J/f18K1rKccxObqdF/VX+xcDGCMRpB1ELWUjkPyYGNWxmQyY5ivjMi32YmPgC2IyI5yVm/ZRR0hdTUBbLUanP1tj7z8vgrXc0sI6el9P3/Xb46KbI98sjpJHOe9xxc5xxJKpfLyzuJKK2rhCIZBACAxc3PaWcYYLDeFkHp/xVJ/QuZuRM4j4Wba+3Zc17i38OrzamM4YDBwwP/prluaeWa/sRfkqC2DAIAQAgBAT2TuU1Rac2nmaZ6LiY+dH0e75Ki2lT5+TT1Ojjdz4l2XiivVqr2Z1PWxZ2vMe4MeOdp0rTcJx8o4lumtqb3Rf3QtZdLdSMzqitgZzvBceYDSVZDc+MEK9PbZhQi/uUy/5UyVodT24OhpiMHSHQ+T7R8eZbkI4OzpdBGp7rOWVoaBgBhgpnRFQAgBACAl8j7Y68ZUWuhYCRJUtL9GIDWnOdj7mlVWy2wZlHqnOC5WSZQ/Czkg/KKzR1dAwvuNDnOjYNcrDhnM59AI2jDfV9FuyXPgw1k89kYHDg0LpkAQAgBACAEAhGI0gHnRMym14AADHAAcyZDbfkVDAIAQAgBAB0DEoDtngWyQfQU78oLhGWT1MeZSxu1tiOBLjtdgMNg2rn6i3c9qJpHU8FqmRSsg5zl34L6S+yy3GzyMo7i/F0jHD8Kc8Jw/Kdo94V9V7hw/Bho47eclb7ZJSy42uqjGPpGsz4z+9uI+K3Y3Ql4ZHBCbozEjPbo2qzJgXPZxh1rIDPZx29aAM9nHb1oAz2cdvWgDPZx29aAM9nHb1oAz2cdvWgDPZxh1oBDIzA+e3RtWASlqsF4vEgjtlsqqknU5kZzPe84NHvKhKyMfLB1jIjwSx0ksdflM6OomaQ5lGw4xtO8Xn9R2DRzrTt1DlxEmkdXAw0DUtYyKsAFkCFAA4EA2mttBOcZ6Kmk6cTT8wsqTQG/iCy8kW/szO5Z3y7GA8n7LyPb+ys7k3y7GA8n7LyPb+ys7k3y7GA8n7LyPb+ys7k3y7GA8n7LyPb+ys7k3y7GA8n7LyPb+ys7k3y7GA8n7LyPb+ys7k3y7GA8QWXki39mZ3Jvl2DdDardB6G30kfQhaP4WMsDsAAAAADgCwAGpAKgBAf//Z'
          },{
            name: '悠悠国际象棋',
            url: 'https://movie.douban.com/subject/1295644/',
            rate: 4.4
          },{
            name:'中央新闻',
            url:'https://www.baidu.com',
            rate:2
          },{
            name:'中央新闻',
            url:'https://www.baidu.com',
            rate:2
          }
        ], //排行榜数据
        time2: (new Date()).getTime() - 86400 * 300 * 1000,

      }
    },
    created() {
     this.collapse.allCollapse = this.blogList
      this.carousel.content = this.slideList
      this.rankingList = this.ranking
    },
    methods:{
      // 获取轮播图
      getSlide() {
        this.$api.slide.getSlide({pre_page:5}).then(res=>{
          if (res.code === 200){
            this.carousel.content = res.slide.content
          }
        })
      },
      // 获取博客数据
      getBlogLists(){
        this.$api.blog.getBolgLists(  {page:1,per_page:5,tag:'',order:-1}).then(res=>{
          if (res.status === 1){
            this.collapse.allCollapse = res.blog.content
          }
        })
      },
      //获取排行榜数据
      getCountUpDate(){
        this.$api.news.getCountUpDate().then(res=>{
          if (res.status === 1){
            this.rankingList = res.news.content
          }
        })
      },
    // 跳转页面
    jumpUrl(item){
      if(item.hrefUrl){
        window.open(item.hrefUrl, '_blank')
      }else{
        this.$router.push({path:`${item.belong}/${item.belongId}`,query:{title:item.title}})
      }
    },
      jumpUrlCarousel(item){
        if(/http(s)?:\/\//.test(item.belongId)){
          window.open(item.belongId, '_blank')
        }else{
          this.$router.push({path:`${item.belong}/${item.belongId}`,query:{title:item.title}})
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
    @import "~@/assets/css/components/index/articles.scss";
    //@import "~@/assets/css/animation.scss";
</style>
