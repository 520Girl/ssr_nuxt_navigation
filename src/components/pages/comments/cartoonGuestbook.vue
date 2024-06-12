<template>
  <div class="guestbook-container">
    <section class="guestbook-layout  mx-15-2">
      <div class="yellow-game tool">
        <div class="tool-header auto-line-between ">
          <div class="left">
            <div class="heade-icon">
              <Icon type="ios-chatbubbles fontSize-icon" />
            </div>
            <h5 class="fontSize-text-mains" >漫评</h5>
          </div>
          <div class="right auto-line-between">
            <div class="number fontSize-text" >
              <span class='nums'>{{commentsList.allCount || 0}}</span>条评论
            </div>
            <!--                        <span class="line"></span>-->
            <!--                        <div class="more fontSize-text">更多-->
            <!--                            <Icon type="ios-arrow-forward" />-->
            <!--                        </div>-->
          </div>
        </div>
        <Row type='flex' justify="start" align="middle" class-name="mains-menu">
          <div class="guestbook-body">
            <div class="guestbook-respond" v-if="reply.replyEle">
              <div class="respond-logo">
                <img v-lazy="'/static/images/cartoon/'+belong+'/'+titleImg" alt="" data-cartoon="cartoon6">
              </div>
              <!--                          @click="respondText()"-->
              <div class="respond-text"  >
                <div class="text-textarea">
                  <Input v-model="params.textarea"  type="textarea" :autosize="{minRows: 3,maxRows: 24}" placeholder="Enter something..." :maxlength="100" show-word-limit  ></Input>
                </div>
                <div class="text-button" >
                  <div class="icon-wrap" style="vertical-align: top;">
<!--                    <Icon type="md-happy" class="icon-img" @click="iconImgState =! iconImgState" @mouseover.native="iconImgState=true"/>-->
                    <svg-icon name="expression" class="icon-img" @click.native="iconImgState = !iconImgState" @mouseover.native="iconImgState=true"></svg-icon>
                    <div class="icon-more-img" v-show="iconImgState" >
                      <ol class="auto-line-start wrapper">
                        <li v-for="(item,index)  in iconImgArr" :key="index" @click="params.textarea += item.name">
                          <img :src="item.imgUrl" :alt="item.name">
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div  class="fontSize-text-color debunk" @click="setCommentsLists('6206551a5f110000ae007926')">吐槽一下</div>
                </div>
                <div class="text-nothing backgroundNoThing"  v-if="!commentsList.allCount">
                  <span>暂无评论</span>
                </div>
                <div class="text-button-tabtitle" v-if="commentsList.allCount">
                  <span :class="{'tabtitle-active':commentState.heart}" @click="changeComment(1)">热门评论</span>
                  <span :class="{'tabtitle-active':commentState.new}" @click="changeComment(2)">最新评论</span>
                </div>
              </div>
            </div>
            <div class="guestbook-comments" style="position:relative;">
              <ul class="comments-list" v-if="commentsList.content">
                <li class="comments-record mx-15-2" v-for="(item,index) in commentsList.content" :key="index">
                  <div class="auto-line-start">
                    <div class="profile">
<!--                      <img :src="'/static/images/cartoon/'+belong+'/chatImg/'+item.title" alt="">-->
                      <img src="@/assets/images/cartoon/title.png" :alt="$route.query.title">
                    </div>
                    <section class="record" >
                      <h5>{{item.name}}</h5>

                      <div class="chatContent" v-html="textareaTo(item.chatContent)">
                      </div>
                      <div class="chatfooter auto-line-between">
                        <Time :time="time(item.onlineTime)" class="shallowColor" :key="Math.random()"></Time>
                        <div class="right">
                          <span class="heart">
                            <Icon type="ios-thumbs-up" />{{item.heartNum}}
                          </span>
                          <span @click="replyComments(index)" class="reply">回复</span>
                        </div>

                      </div>
                    </section>
                  </div>
                  <!--                                  回复-->
                  <div class="guestbook-respond" v-if="reply.replyEle == false && reply.replyIndex == index">
                    <div class="respond-logo">
                      <img :src="'/static/images/cartoon/'+belong+'/'+titleImg" alt="">
                    </div>
                    <div class="respond-text">
                      <div class="text-textarea">
                        <Input v-model="params.textarea" show-word-limit type="textarea" autofocus="autofocus" :autosize="{minRows: 3,maxRows: 24}" placeholder="有事没事说两句..." :maxlength="10000" ref="commentsTextarea"></Input>
                      </div>
                      <div class="text-button">
                        <div class="icon-wrap" style="vertical-align: top;">
                          <svg-icon name="expression" class="icon-img" @click.native="iconImgState = !iconImgState" @mouseover.native="iconImgState=true"></svg-icon>
<!--                          <Icon type="md-happy" class="icon-img" @click="iconImgState =! iconImgState" @mouseover.native="iconImgState=true"/>-->
                          <div class="icon-more-img" v-show="iconImgState" >
                            <ol class="auto-line-start wrapper">
                              <li v-for="(item,index)  in iconImgArr" :key="index" @click="params.textarea += item.name">
                                <img :src="item.imgUrl" :alt="item.name">
                              </li>
                            </ol>
                          </div>
                        </div>
                        <div class="fontSize-text-color debunk" @click="setCommentsLists(item._id,index,false)">吐槽一下</div>
                      </div>
                    </div>
                  </div>
                  <ul class="comments-childer" v-if="item.childersChat && item.childersChat.length">
                    <li class="comments-childer-item" v-for="(item3,index3) in  item.childersChat" :key="index3">
                      <div class="auto-line-start">
                        <div class="profile">
                          <canvas :ref="'randomTitle' + index3 + index"  :data="updataRandomTitle('randomTitle' + index3 + index,name=item3.name)" :data-ref="'randomTitle' + index3 + index" width="36" height="36" ></canvas>
                        </div>
                        <section class="record">
                          <h5>{{item3.name}}<Time :time="time(item3.onlineTime)" :key="Math.random()"></Time></h5>
                          <div class="chatContent" v-html="textareaTo(item3.chatContent)">
                          </div>
                        </section>
                      </div>
                    </li>
                  </ul>
                </li>
                <div class="comments-list-page auto-line-center" v-if="commentsList.allCount">
                  <Page :total="commentsList.allCount" show-total :current.sync="nowPage"  :page-size="commentsList.pageSize" @on-change="changePage"	 />
                </div>
              </ul>
              <loading :spinShow="loadingStatus"></loading>
            </div>
          </div>
        </Row>
      </div>
    </section>
  </div>
</template>
<script>
// import {Slider, Row, Col, Icon, Input, Button, Time, Page, Select, Option, Notice} from 'iview';
import loading  from '@/components/common/loadingBlock';
export default {
  name:"cartoonGuestbook",
  components:{loading},
  // components:{Slider,Row,Col,Icon,Input,Button,Time,Page,Select,Option },
  props:{
    commentsList:{type:Object,required:false,default:()=>{}},
    titleImg:{type:String,required:false,default:()=>{}},
    belong:{type:[String,Number],required:false,default:()=>{}}
  },
  data(){
    return{
      divDescribe:[{title:'用户体验',scoreNum:7},{title:'品牌荣誉',scoreNum:8},{title:'响应速度',scoreNum:9},{title:'服务质量',scoreNum:10}], //评分title 文字
      reply:{replyEle:true,replyIndex:-1}, //处理留言框
      params:{id:'',textarea:'',name:''}, //留言板数据
      titleColor:[ //随机颜色
        ['#FFFFCC','#FFCCCC','#FF6666','#FF6666','#FF0033'],
        ['#CCFFFF','#FFFF99','#FFFF66','#FFFF00','#333399'],
        ['#99CCCC','#0099CC','#CC3333','#CC0033','#CC0033'],
        ['#CC9999','#CC9966','#CCCC99','#993333','#999933'],
        ['#996699','#FF6666','#CCCC00','#990033','#99CC00']
      ],
      nowPage:1,
      flag:[],//防止输入刷新canvas，输入canvas 改变是因为vue 数据变化页面重新渲染
      big:true,//commentsTextarea这个选择器的是数组还是一个对象，当在循环中是数组，当在头部是对象
      iconImgArr:[
        {name:'[666]',imgUrl:require('@/assets/images/guestbook/666.png')},
        {name:'[奥利给]',imgUrl:require('@/assets/images/guestbook/aoligei.png')},
        {name:'[大哭]',imgUrl:require('@/assets/images/guestbook/ku.png')},
        {name:'[毒奶]',imgUrl:require('@/assets/images/guestbook/dunai.png')},
        {name:'[绿头盔]',imgUrl:require('@/assets/images/guestbook/lvtoukui.png')},
        {name:'[吐彩虹]',imgUrl:require('@/assets/images/guestbook/tucaihong.png')},
        {name:'[屎]',imgUrl:require('@/assets/images/guestbook/cc.png')},
        {name:'[绿靓仔]',imgUrl:require('@/assets/images/guestbook/lv.png')},
        {name:'[炸弹]',imgUrl:require('@/assets/images/guestbook/zhadan.png')},
        {name:'[真香]',imgUrl:require('@/assets/images/guestbook/zhenxiang.png')},
        {name:'[狗蛋]',imgUrl:require('@/assets/images/guestbook/goudan.png')},
        // {name:'[刷机]',imgUrl:require('@/assets/images/guestbook/666_img.png')},
        {name:'[就这]',imgUrl:require('@/assets/images/guestbook/jiuzhe.png')},
        // {name:'[嘻嘻]',imgUrl:require('@/assets/images/guestbook/666_img.png')},
      ], //聊天图片
      iconImgState:false, //聊天图片显示关闭
      commentState:{heart:true,new:false},//显示聊天记录状态
      loadingStatus:true,//loading状态
    }
  },
  created() {

  },
  mounted() {
    // this.loadingStatus = false
  },
  computed:{
      time(time){
        return function (time) {
          return (new Date(time)).getTime()
        }
      },
    //处理textarea的数据
    textareaTo(ele){
        return function (ele){
          //将'\n'替换成 html，已经空格
          let reg = new RegExp('\n','g');
          let regSpace=new RegExp(" ","g");
          ele = ele.replace(reg,"<br>");
          ele = ele.replace(regSpace,"&nbsp;");

          //将文字替换成图
          let icon = ele.match(/\[.*?\]/g) || []
          icon.some((item)=>{
            this.iconImgArr.some((item2,index2)=>{
              if(item == item2.name){
                ele+=`<img src="${this.iconImgArr[index2].imgUrl}" alt="${item2.name}" height="25"/>`
                ele = ele.replace(item2.name,'')
                return  true
              }
            })
          })

          return ele
        }
    },
  },
  methods:{
    //回复
    replyComments(index){
      this.reply.replyEle = false
      this.reply.replyIndex = index
      this.$nextTick(()=>{
        this.$refs.commentsTextarea[0].focus()
      })
    },
    //再想想
    agentWantHandle(){
      this.reply.replyEle = true
      this.reply.replyIndex = -1
      for (let item in this.params){
        this.params[item] = ''
      }
    },
    //发表评论
    setCommentsLists(chat_id,index,big=true){
      this.loadingStatus = true
      if (!this.params.textarea){
        this.$Notice.warning({
          title:'留言板',
          desc:'您还没有输入内容',
          // duration:0
        })
        return
      }
      //组装数据
      let name='',params={};
      params.belong = this.$route.params.belong;
      params.id = chat_id
      params.version = 'O';
      params.reply = true
      params.params = {}
      params.params.name = this.deleteTag(this.params.textarea,1).substr(0,3)
      params.params.onlineTime = Date.now()
      params.params.chatContent = this.deleteTag(this.params.textarea)
      params.params.title = ''
      if (!big){
        params.reply =false
      }
      console.log(params)
      // return
      this.$api.user.setCommentsLists(params).then((res)=>{
        if (res.status === 1){
          this.$Notice.success({
            title:'留言板',
            desc:'留言成功',
            // duration:0
          })

          this.params.textarea = ''
          this.params.name=''
          this.reply.replyEle = true
          //评论 big = true, 回复 big = false
          if (big){
            this.commentsList.content.unshift(res.comment.content)
          }else {
            this.commentsList.content[index].childersChat.unshift(res.comment.content)
            // this.$forceUpdate()
          }
          this.loadingStatus = false
          // this.$emit('addCommentsData',params,index,this.addComments_id);
        }
      })
    },
    //随机头像
    randomTitle(ele,name="匿",width=36,height=36,bcColorArr=this.titleColor,fontSize='14',fontColor='red',fontWeight='900'){
      this.$nextTick(()=>{
        {
          var canvas =this.$refs[ele][0]
          canvas.width = width;
          canvas.height = height;
          let context = canvas.getContext("2d");
          let linearGradient = context.createLinearGradient(0,0,200,0);
          linearGradient.addColorStop(0,bcColorArr[Math.floor(Math.random() * bcColorArr.length)][Math.floor(Math.random() * bcColorArr.length)]);
          linearGradient.addColorStop(0.25,bcColorArr[Math.floor(Math.random() * bcColorArr.length)][Math.floor(Math.random() * bcColorArr.length)]);
          linearGradient.addColorStop(0.50,bcColorArr[Math.floor(Math.random() * bcColorArr.length)][Math.floor(Math.random() * bcColorArr.length)]);
          linearGradient.addColorStop(0.60,bcColorArr[Math.floor(Math.random() * bcColorArr.length)][Math.floor(Math.random() * bcColorArr.length)]);
          context.fillStyle = linearGradient;
          context.beginPath();
          context.arc(18,18,18,0,2*Math.PI);
          context.fill();

          //字体
          context.fillStyle = "#ffffff";
          context.font = fontWeight + " " + fontSize + "px sans-serif";
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillText(name.substring(0,1), 18, 18);
          return canvas.toDataURL("image/png")
        }
      })
    },
    //头像只更新一次, 点击热门，最新评论 聊天记录需要清空
    updataRandomTitle(ele,name){
      if (this.flag.indexOf(ele) == -1){
        this.flag.push(ele)
        this.randomTitle(ele,name)
      }else {
        return
      }
    },
    //去掉 标签符号
    deleteTag(data,status=2){
      data = data.replace(/<\/?.+?>/g,"")
      status === 1 ? data = data.replace('[',"") : ''
      return data
    },
    //修改最新查看状态
    changeComment(status){
      //开启loading，将flag canvas刷新清空
      this.loadingStatus = true;
      this.flag =[]
      this.nowPage = 1
      if (status === 1){
        this.commentState.heart = true;
        this.commentState.new = false;
        this.$emit('pageSkip',[this.nowPage,'heart'])
        return
      }else {
        this.commentState.heart = false;
        this.commentState.new = true;
        this.$emit('pageSkip',[this.nowPage,'new'])
        return;
      }
    },
    //改变页面的时候
    changePage(){
      this.$emit('pageSkip',[this.nowPage,this.commentState.new == true ? 'new' : 'heart']);
    }
  },
  watch:{
    'params.textarea':function (newVal,oldVal){
      this.agentWant = true
    },
    'commentsList':{
        handler(newV,oldV){
          this.$nextTick(()=>{
            this.loadingStatus = false
          })
        },
        deep:true
    }
  }
}
</script>
<style scoped>
.nums{
  font-family: Impact;
  font-size: 20px;
}
.respond-logo{
  height: 32px;
  width: 32px;

}
.respond-logo img{
  height: 100%;
  width: 100%;
  border-radius: 18px;
}
</style>
<style lang="scss" scoped>
@import "~@/assets/css/commonmMixin.scss"; //公共样式grade-width
@import "~@/assets/css/components/comments/appGuestbook.scss";
// 和appGuestbook不同的地方
.debunk{
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 16px;
  border: 0;
  outline: none;
  font-size: 16px;
  display: inline-block;
  background-color: #009eec;
  color: #fff;
  border-radius: 8px 8px 8px 0;
  opacity: .9;
  cursor: pointer;
  &:before{
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    left: -5px;
    bottom: 0;
    border-bottom: 5px solid #009eec;
    border-left: 5px dashed transparent;
    border-right: 5px dashed transparent;
  }
}
.chatfooter{
  margin-top:$margin15;
  .heart{
    padding-right: 10px;
    font-size: 12px;
    i{
      vertical-align: bottom;
      font-size: 14px;
      padding-right: 2px;
    }
  }
  .reply{}
  span{
    cursor:pointer;
    display: inline-block;
  }
}

</style>
