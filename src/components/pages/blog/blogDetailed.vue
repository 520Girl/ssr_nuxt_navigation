<template>
  <blog-oneself>
    <div slot="blogOneselfLeft" class="blogOneselfLeft2" v-if="detailedList">
      <div class="blogOneselfLeft2-layout">
        <header class="left2-layout-header applyBck">
          <h1 class="left2-header-title fontSize-text-color">{{ detailedList.title }}</h1>
          <div class="left2-header-main auto-line-between">
            <div class="headerLeft">
              <a href="javascript:void (0)" class=" fontSize-text-orange ">
                <Icon type="md-list-box"/>
                <span >{{ detailedList.author }}</span>
              </a>
              <a href="javascript:void (0)" class="fontColor-t-d" v-if="detailedList.onlineTime">
                <Icon type="md-clock"/>
                <span ><Time :time="new Date(detailedList.onlineTime)"/></span>
              </a>
            </div>
            <div class="headerRight">
              <a href="javascript:void (0)">
                <Icon type="md-eye"/>
                <count-to-number :value="detailedList.eyeNum" :time="2" ></count-to-number>
              </a>
              <a href="javascript:void (0)">
                <Icon type="md-text"/>
                <count-to-number :value="detailedList.commentsLength" :time="2" ></count-to-number>
              </a>
              <a
                href="javascript:void (0)"
                v-if="detailedList.title"
                v-like="{url:`/blog/${detailedList._id}?title=${detailedList.title}`,belong:'blog',title:detailedList.title,type:'HN',id:detailedList._id}">
                <Icon type="ios-thumbs-up " class="fontSize-like" />
                <count-to-number :value="detailedList.heartNum" :time="2" ></count-to-number>
              </a>
            </div>
          </div>
        </header>
        <main class="left2-layout-main applyBck">
          <section class="mainContents" v-html="detailedList.content" >
            <!--            {{ detailedList.content }}-->
          </section>
          <section class="mainUnit">
            <div class="mainUnit-tag fontSize-icon" >
              <Icon type="md-pricetags"/>
              <random-tag :tagValue="item" :pathName="'/blog'" v-for="(item,index) in detailedList.blogTag"
                          :key="index"></random-tag>
              <!--                            <Tag color="default" type="border" v-for="(item,index) in detailedList.blogTag" :key="index" >{{item}}</Tag>-->
            </div>
            <share ></share>
          </section>
        </main>
        <footer class="left2-layout-footer ">
          <div class="footer-address applyBck">
            <address class="auto-line-start" v-if="detailedList.belongUser">
              <span>版权声明:</span>
              <p>{{ detailedList.belongUser.name }} 发表于
                <Time :time="detailedList.onlineTime" type="datetime" style="padding-left: 0.05rem;">。</Time>
              </p>
            </address>
            <address class="auto-line-start">
              <span>转载请注明:</span>
              <p>{{ detailedList.title }} <span>|</span>{{ $route.meta.title }}</p>
            </address>
          </div>
          <div class="footer-nextLast auto-line-between applyBck" >
            <!--            <div class="lastNextId" @click="allStart(1,detailedList.lastId)" v-if="detailedList.lastId && detailedList.lastId.title !== ''">-->
            <router-link tag="div" class="lastNextId" :to="{path:`/blog/${detailedList.lastId.id}`,query:{title:detailedList.lastId.title}}" v-if="detailedList.lastId && detailedList.lastId.title !== ''">
              <h5>上一篇</h5>
              <p>{{ detailedList.lastId.title }}</p>
            </router-link>
            <div class="lastNextId disabled" @click="noArticle" v-else>
              <h5>上一篇</h5>
              <p>没有文章了</p>
            </div>
            <!--            <div class="lastNextId" @click="allStart(1,detailedList.nextId)" v-if="detailedList.nextId && detailedList.nextId.title !== ''">-->
            <router-link tag="div" class="lastNextId" :to="{path:`/blog/${detailedList.nextId.id}`,query:{title:detailedList.nextId.title}}" v-if="detailedList.nextId && detailedList.nextId.title !== ''">
              <h5>下一篇</h5>
              <p>{{ detailedList.nextId.title }}</p>
            </router-link>
            <div class="lastNextId disabled" @click="noArticle" v-else>
              <h5>下一篇</h5>
              <p>没有文章了</p>
            </div>
          </div>
          <div class="footer-words">
            <app-guestbook :commentsList="commentsList" @pageSkip="getCommentsList($event)" @addCommentsData="addCommentsData(arguments)"></app-guestbook>
          </div>
        </footer>
      </div>
    </div>
<!--    <blog-oneself-right slot="blogOneselfRight" :value="value" @allStart="allStart" ></blog-oneself-right>-->
  </blog-oneself>
</template>
<script>
// import {Row,Col,Time,Icon,Tag,ButtonGroup,Button,Slider,Input,} from 'iview'; //iview
import blogOneself from '@/components/pages/blog/blogOneself'//blo
import blogOneselfRight from "@/components/pages/blog/blogOneselfRight"; //blog右侧
// import share from "@/components/common/share"//分享
import randomTag from "@/components/common/randomTag"//分享
import countToNumber from "@/components/common/countToNumber"//分享
import appGuestbook from "@/components/pages/comments/appGuestbook";
// import {Notice} from "iview";
export default {
  name: 'BlogDetailed',
  components: {blogOneself, blogOneselfRight, randomTag, appGuestbook,countToNumber},
  // components:{Row,Col,blogOneself,blogOneselfRight,Time,Icon,Tag,ButtonGroup,Button,Slider,Input,share,randomTag,appGuestbook},
  async asyncData({ $api, route }) {
    let {blog} = await $api.blog.getBlogDetailedInfo(route.params.id)
    const {comment} = await $api.user.getCommentsLists({per_page:5,order:-1,page:1,version:'B',order_type:1,id:route.params.id})
    let detailedList = blog.content[0]
    detailedList.commentsLength = blog.commentsLength
    detailedList.lastId = blog.lastId
    detailedList.nextId = blog.nextId
    comment.version = 'B'
        return {
          detailedList,
          commentsList:comment
        }
  },
  data() {
    return {
      text: '',
      detailedList: {},
      commentsList: {},
      commentsVersion:'B', //app聊天版本
      value: 0
    }
  },
  created() {
    // this.allStart()
  },
  mounted() {

  },
  methods: {
    allStart(state = 0, item) {
      if (state === 0) {
        Promise.all([this.getBlogDetailedInfo(),this.getCommentsList()]).then(res => {
          this.$nextTick(() => {
            this.$store.commit('getLoadingHome', false)
          })
        })
      } else {
        //跳转页面，
        if (this.$route.params.id == item.id) {
          this.$Notice.close('weiyi')
          this.$Notice.warning({
            title: '提示',
            desc: '您点击的是当前博客',
            duration:1,
            name:'weiyi'
          })
          return false
        }
        this.$store.commit('getLoadingHome', true)
        this.$router.replace({
          params:{
            id:item.id,
          },
          query:{
            title:item.title
          }
        })
        Promise.all([this.getBlogDetailedInfo(),this.getCommentsList()]).then(res => {
          this.$nextTick(() => {
            setInterval(() => {
              this.$store.commit('getLoadingHome', false)
            }, 1000)
          })
        })
      }
    },
    getBlogDetailedInfo() {
      this.$api.blog.getBlogDetailedInfo(this.$route.params.id).then(res => {
        if (res.status === 1) {
          let DeResult = res.blog
          this.detailedList = DeResult.content[0]
          this.detailedList.commentsLength = DeResult.commentsLength
          this.detailedList.lastId = DeResult.lastId
          this.detailedList.nextId = DeResult.nextId
        }
      })
    },
    noArticle() {
      this.$Notice.warning({
        title: '文章',
        desc: '没有文章了！ 别点我了',
        duration: 0.5
      })
    },
    //请求聊天记录
    getCommentsList(newPage=1,id=this.$route.params.id){
      return new Promise((resolve, reject) => {
        let params = {per_page:5,order:-1,page:newPage,version:this.commentsVersion,order_type:1,id:id}
        this.$api.user.getCommentsLists(params).then((res)=>{
          if (res.status == 1){
            this.commentsList = res.comment
            this.commentsList.version = this.commentsVersion
            console.log(this.commentsList)
            return resolve(1)
          }
        }).catch((error)=>{
          console.warn(error)
          return reject(1)
        })
      })

    },
    //添加用户输入的数据
    addCommentsData(data){
      console.log(5555,data)
      data[0].params.onlineTime = new Date()
      if (data[0].reply){
        data[0].params._id = data[2]
        this.commentsList.content.unshift(data[0].params)
      }else {
        for (let i =0;i<this.commentsList.content.length;i++){
          if (i == data[1]){
            if ('childersChat' in this.commentsList.content[i] ){
              this.commentsList.content[i].childersChat.unshift(data[0].params )
            }else{
              this.commentsList.content[i].childersChat=[]
              this.commentsList.content[i].childersChat.unshift(data[0].params )
            }
            return
          }
        }
      }
    },
  },
  computed:{
    routerQuery(){
      console.log(33,this.$route.params)
      return this.$route
    }
  },
  watch:{
    routerQuery(newValue,oldVal){
      if (Object.keys(newValue).length === 0) return;
      if (newValue.id == oldVal.id) return;
      console.log(889,newValue.params.id,oldVal.params.id)
      this.allStart(1,{id:newValue.params.id,title:''})
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/css/components/blogDetailed.scss";
</style>

