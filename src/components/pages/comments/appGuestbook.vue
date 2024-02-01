<template>
  <div class="guestbook-container">
    <section class="guestbook-layout  mx-15-2">
      <div class="yellow-game tool">
        <div class="tool-header auto-line-between " style="margin-bottom: .2rem">
          <div class="left">
            <div class="heade-icon">
              <Icon type="ios-chatbubbles fontSize-icon" />
            </div>

            <h5 class="fontSize-text-mains" v-if="this.commentsList.count" >评分</h5>
            <h5 class="fontSize-text-mains"  v-else>暂无评分</h5>
          </div>
          <div class="right auto-line-between">
            <div class="number fontSize-text" v-if="this.commentsList.count">
              当前会话<span class='nums'>{{this.commentsList.count}}</span>个
            </div>
            <div class="number fontSize-text" v-else>

            </div>
            <!--                        <span class="line"></span>-->
            <!--                        <div class="more fontSize-text">更多-->
            <!--                            <Icon type="ios-arrow-forward" />-->
            <!--                        </div>-->
          </div>
        </div>
        <Row type='flex' justify="start" align="middle" class-name="mains-menu applyBck"  >
          <div class="guestbook-body">
            <div class="guestbook-respond" v-if="reply.replyEle">
              <div class="respond-logo">
                <Icon type="logo-pinterest" color="red" />
              </div>
              <!--                          @click="respondText()"-->
              <div class="respond-text"  >
                <div class="text-textarea">
                  <Input v-model="params.textarea" show-word-limit type="textarea" :autosize="{minRows: 3,maxRows: 24}" placeholder="Enter something..." :maxlength="10000" ></Input>
                </div>
                <div class="text-option auto-line-around">
                  <Col :xl="{ span: 8 }" :lg="{span:8}" :xs="{ span: 24 }" class-name="option auto-line-center">
                    <Input v-model="params.name" placeholder="昵称" clearable  />
                  </Col>
                  <Col :xl="{ span: 8 }" :lg="{span:8}" :xs="{ span: 24 }" class-name="option auto-line-center">
                    <Input v-model="params.email.input" class="email" placeholder="邮箱" clearable>
                      <Icon type="md-at" slot="prepend" style="font-size: 20px;" />
                      <Select v-model="params.email.lastTailing" slot="append" style="width: 70px">
                        <Option value=".com">.com</Option>
                        <Option value=".cn">.cn</Option>
                        <Option value=".me">.me</Option>
                        <Option value=".app">.app</Option>
                        <Option value=".run">.run</Option>
                        <Option value=""> 手动</Option>
                      </Select>
                    </Input>
                  </Col>
                  <Col :xl="{ span: 8 }" :lg="{span:8}" :xs="{ span: 24 }" class-name="option auto-line-center">
                    <Input v-model="params.addressUrl.input"  placeholder="地址" clearable >
                      <Select v-model="params.addressUrl.firstTailing"  slot="prepend" style="width: 70px">
                        <Option value="http://">http://</Option>
                        <Option value="https://">https://</Option>
                      </Select>
                    </Input>
                  </Col>
                </div>
                <div class="text-button">
                  <Button type="warning" style="background-color: red;" class="fontColor "  v-show="agentWant" @click="agentWantHandle()">再想想</Button>
                  <Button type="primary" class="fontSize-text-color" @click="setCommentsLists()">发表评论</Button>
                </div>
                <div class="text-nothing backgroundNoThing" v-if="commentsList.content && commentsList.content.length == 0">
                  <span>暂无评论</span>
                </div>
              </div>
            </div>
            <div class="guestbook-comments">
              <ul class="comments-list" v-if="commentsList.content">
                <li class="comments-record mx-15-2" v-for="(item,index) in commentsList.content" :key="index">
                  <div class="auto-line-start">
                    <div class="profile">
                      <img :src="require('@/assets/images/guestbook/' + item.title)" :alt="item.name">
                    </div>
                    <section class="record" >
                      <h5>{{item.name}}</h5>

                      <div class="chatContent" v-html="textareaTo(item.chatContent)">
                      </div>
                      <div class="chatfooter auto-line-between">
                        <Time :time="(new Date(item.onlineTime)).getTime()" class="shallowColor"></Time>
                        <span @click="replyComments(index)" >回复</span>
                      </div>
                    </section>
                  </div>
                  <!--                                  回复-->
                  <div class="guestbook-respond" v-if="reply.replyEle == false && reply.replyIndex == index">
                    <div class="respond-logo">
                      <Icon type="logo-pinterest" color="red" />
                    </div>
                    <div class="respond-text">
                      <div class="text-textarea">
                        <Input v-model="params.textarea" show-word-limit type="textarea" :autosize="{minRows: 3,maxRows: 24}" placeholder="Enter something..." :maxlength="10000" autofocus="autofocus"  ref="commentsTextarea"></Input>
                      </div>
                      <div class="text-option auto-line-center">
                        <Col :xl="{ span: 8 }" :lg="{span:8}" :xs="{ span: 24 }" class-name="option auto-line-center">
                          <Input v-model="params.name" placeholder="昵称" clearable  />
                        </Col>
                        <Col :xl="{ span: 8 }" :lg="{span:8}" :xs="{ span: 24 }" class-name="option auto-line-center">
                          <Input v-model="params.email.input" class="email" placeholder="邮箱" clearable>
                            <Icon type="md-at" slot="prepend" style="font-size: 20px;" />
                            <Select v-model="params.email.lastTailing" slot="append" style="width: 70px">
                              <Option value=".com">.com</Option>
                              <Option value=".cn">.cn</Option>
                              <Option value=".run">.run</Option>
                              <Option value=""> 手动</Option>
                            </Select>
                          </Input>
                        </Col>
                        <Col :xl="{ span: 8 }" :lg="{span:8}" :xs="{ span: 24 }" class-name="option auto-line-center">
                          <Input v-model="params.addressUrl.input"  placeholder="地址" clearable >
                            <Select v-model="params.addressUrl.firstTailing"  slot="prepend" style="width: 70px">
                              <Option value="http">http://</Option>
                              <Option value="https">https://</Option>
                            </Select>
                          </Input>
                        </Col>
                      </div>
                      <div class="text-button">
                        <Button type="warning" style="background-color: red;" class="fontColor" v-show="agentWant" @click="agentWantHandle()">再想想</Button>
                        <Button type="primary" class="fontSize-text-color" @click="setCommentsLists(item._id,false,index)">发表评论</Button>
                      </div>
                    </div>
                  </div>
                  <ul class="comments-childer" v-if="item.childersChat && item.childersChat.length">
                    <li class="comments-childer-item" v-for="(item3,index3) in  item.childersChat" :key="index3">
                      <div class="auto-line-start">
                        <div class="profile">
                          <canvas :ref="'randomTitle' + index3 + index"  :data="updataRandomTitle('randomTitle' + index3 + index,name=item3.name)" ></canvas>
                        </div>
                        <section class="record">
                          <h5>{{item3.name}}  --- <Time :time="(new Date(item3.onlineTime)).getTime()"></Time></h5>
                          <div class="chatContent" v-html="textareaTo(item3.chatContent)">
                          </div>
                        </section>
                      </div>
                    </li>
                  </ul>
                </li>
                <div class="comments-list-page auto-line-center">
                  <Page :total="commentsList.allCount" show-total :current.sync="nowPage"  :page-size="commentsList.pageSize" @on-change="$emit('pageSkip',nowPage);"	 />
                </div>
              </ul>
            </div>
          </div>
        </Row>
      </div>
    </section>
  </div>
</template>
<script>
// import {Slider, Row, Col, Icon, Input, Button, Time, Page, Select, Option, Notice} from 'iview';
export default {
  name:"appGusetbook",
  // components:{Slider,Row,Col,Icon,Input,Button,Time,Page,Select,Option },
  props:{
    commentsList:{type:Object,required:false,default:{}}
  },
  data(){
    return{
      divDescribe:[{title:'提款速度',scoreNum:7},{title:'品牌荣誉',scoreNum:8},{title:'响应速度',scoreNum:9},{title:'服务质量',scoreNum:10}], //评分title 文字
      reply:{replyEle:true,replyIndex:-1}, //处理留言框
      agentWant:false, //处理再想一想button
      params:{id:'',textarea:'',email:{input:'',lastTailing:''},addressUrl:{input:'',firstTailing:''},name:''}, //留言板数据
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

    }
  },
  created() {

  },
  mounted() {
    console.log(this.$route.name == 'app')

  },
  computed:{

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
        if (item == 'email') {this.params.email.input = this.params.email.lastTailing = '';continue;};
        if (item == 'addressUrl') {this.params.addressUrl.input = this.params.addressUrl.firstTailing = '';continue};
        this.params[item] = ''
      }
    },
    //发表评论
    setCommentsLists(chat_id,big=true,index){
      if (!this.params.textarea){
        this.$Notice.warning({
          title:'留言板',
          desc:'您还没有输入内容',
          // duration:0
        })
        return
      }


      let name='',params={},email='',addressUrl='';

      //名称，big=true表示不是回复别人的评价,自己评价
      name = this.params.name ?  this.params.name  : big ? '将' : '卒'
      email = this.params.email.input+this.params.email.lastTailing
      addressUrl = this.params.addressUrl.firstTailing+this.params.addressUrl.input

      if (big){
        params ={id:this.$route.query.id,reply:big,params:{name:name,chatContent:this.deleteTag(this.params.textarea),title:'title.png',email:email,addressUrl:addressUrl},version:this.commentsList.version}
      }else{
        if (chat_id){
          params ={id:chat_id,reply:big,params:{name:name,chatContent:this.deleteTag(this.params.textarea),email:email,addressUrl:addressUrl},version:this.commentsList.version}
        }else {
          params ={id:this.addComments_id,reply:big,params:{name:name,chatContent:this.deleteTag(this.params.textarea),email:email,addressUrl:addressUrl},version:this.commentsList.version}
        }
      }
      this.$api.user.setCommentsLists(params).then((res)=>{
        if (res.status){
          this.$Notice.success({
            title:'留言板',
            desc:'留言成功',
            // duration:0
          })

          this.params.textarea = ''
          this.params.email.input=''
          this.params.email.lastTailing=''
          this.params.addressUrl.input=''
          this.params.addressUrl.firstTailing=''
          this.params.name=''
          this.reply.replyEle = true
          this.addComments_id = res.comment.content._id
          this.$emit('addCommentsData',params,index,this.addComments_id);
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
    //头像只更新一次
    updataRandomTitle(ele,name){
      if (this.flag.indexOf(ele) == -1){
        this.flag.push(ele)
        this.randomTitle(ele,name)
      }else {
        return
      }
    },
    //处理textarea的数据
    textareaTo(ele){
      let reg = new RegExp('\n','g');
      let regSpace=new RegExp(" ","g");
      ele = ele.replace(reg,"<br>");
      ele = ele.replace(regSpace,"&nbsp;");
      return ele
    },
    //去掉 标签符号
    deleteTag(data){
      return data.replace(/<\/?.+?>/g," ")
    }
  },
  watch:{
    'params.textarea':function (newVal,oldVal){
      this.agentWant = true
    }
  }
}
</script>
<style lang="scss" scoped>
  /* //公共样式grade-width */
@import'~/assets/css/commonmMixin.scss'; 
@import "~/assets/css/components/comments/appGuestbook.scss";
</style>
