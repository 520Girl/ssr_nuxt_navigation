<template>
    <div class="guestbook-container" id="gradecoin" ref="gradecoin">
        <section class="guestbook-layout  mx-15-2">
            <div class="yellow-game tool">
                <div class="tool-header auto-line-between " style="margin-bottom: .2rem">
                    <div class="left">
                        <div class="heade-icon">
                          <Icon type="ios-chatbubbles fontSize-icon" />
                        </div>
                        <h5 class="fontSize-text-mains" v-if="commentsList.count" >{{$t('app.comments.score')}}</h5>
                        <h5 class="fontSize-text-mains"  v-else>{{$t('app.comments.no_score_yet')}}</h5>
                    </div>
                    <div class="right auto-line-between">
                        <div class="number fontSize-text" v-if="commentsList.count">
                          {{$t('app.comments.current_session')}}<span class='nums'>{{commentsList.allCount}}</span>{{$t('app.a')}}
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
<!--                          滑轮-->
                            <div class="respond-grade grade-width" :data="divDescribe = $t('app.comments.divDescribe')" :current_quantity="current_quantity =  $t('app.comments.current_score')">
                              <Col :xl="{ span: 12 }" :lg="{span:12}" :md="{span:12}" :xs="{ span: 24 }" class-name="gradeCoin-item" v-for="(item,index) in $t('app.comments.divDescribe')" :key="index" >
                                    <div class="progress-item auto-line-start" >
                                        <em @click.sync="textareaUpage(divDescribeTitle(index))" class="fontSize-text-color">{{divDescribeTitle(index)}}</em>
                                        <Slider v-model="item.scoreNum" :max="10"  :step="0.1" :tip-format="grade"></Slider>
                                        <em class="score fontSize-text-orange">{{item.scoreNum}}</em>
                                    </div>
                                </Col>
                            </div>
<!--                          @click="respondText()"-->
                            <div class="respond-text"  >
                                <div class="text-textarea">
                                    <Input v-model="params.textarea" show-word-limit type="textarea" :autosize="{minRows: 3,maxRows: 24}" placeholder="Enter something..." :maxlength="10000"  ref="commentsTextarea" ></Input>
                                </div>
                                <div class="text-button">
                                  <Button type="warning" style="background-color: red;" class="fontColor"  v-show="agentWant" @click="agentWantHandle()">{{$t('app.comments.Think_again')}}</Button>
                                  <Button
                                    type="primary"
                                    @click="setCommentsLists()"
                                    v-like="{url:$route.fullPath,belong:'gradeCoin',title:$route.query.title,type:'LL',id:$route.params.id}"
                                  >
                                    <span class="fontSize-like">
                                          {{$t('app.comments.post_a_comment')}}
                                    </span>
                                  </Button>
                                </div>
                                <div class="text-nothing backgroundNoThing" v-if="commentsList.content && commentsList.content.length == 0">
                                  <span>{{$t('app.comments.no_score_yet')}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="guestbook-comments">
                            <ul class="comments-list" v-if="commentsList.content && commentsList.content.length != 0">
                                <li class="comments-record mx-15-2" v-for="(item,index) in commentsList.content" :key="index">
                                  <div class="auto-line-start">
                                    <div class="profile">
                                      <img :src="require('@/assets/images/guestbook/' + item.title)" alt="">
                                    </div>
                                    <section class="record" >
                                      <h5>{{item.name}}</h5>
                                      <div class="grade-width">
                                        <Col :xl="{ span: 12 }" :lg="{span:12}" :md="{span:12}" :xs="{ span: 24 }" class-name="gradeCoin-item " v-for="(item2,index2) in item.scoreNum" :key="index2">
                                          <div class="progress-item auto-line-start">
                                            <em>{{divDescribeTitle(index2)}}:</em>
                                            <div class="item-tip" >
                                              <div class="tip" :style="{width: gradeWidth(item2)}"></div>
                                            </div>
                                            <em class="score" >{{ item2 }}</em>
                                          </div>
                                        </Col>
                                      </div>
                                      <div class="chatContent" v-html="textareaTo(item.chatContent)"></div>
                                      <div class="chatfooter auto-line-between">
                                        <Time :time="(new Date(item.onlineTime)).getTime()" class="shallowColor"></Time>
                                        <span @click="replyComments(index)" >{{$t('app.comments.reply')}}</span>
                                      </div>
                                    </section>
                                  </div>
<!--                                  回复-->
                                  <div class="guestbook-respond" v-if="reply.replyEle == false && reply.replyIndex == index">
                                    <div class="respond-logo">
                                      <Icon type="logo-pinterest" color="red" />
                                    </div>
<!--                                    滑轮-->
                                    <div class="respond-grade grade-width" :data="divDescribe = $t('app.comments.divDescribe')">
                                      <Col :xl="{ span: 12 }" :lg="{span:12}" :md="{span:12}" :xs="{ span: 24 }" class-name="gradeCoin-item " v-for="(item,index) in $t('app.comments.divDescribe')" :key="index">
                                        <div class="progress-item auto-line-start">
                                          <em @click.sync="textareaUpage(divDescribeTitle(index))">{{divDescribeTitle(index)}}:</em>
                                          <Slider v-model="item.scoreNum" :max="10"  :step="0.1" :tip-format="grade"></Slider>
                                          <em class="score">{{item.scoreNum}}</em>
                                        </div>
                                      </Col>
                                    </div>
                                    <div class="respond-text">
                                      <div class="text-textarea">
                                        <Input v-model="params.textarea" show-word-limit type="textarea" :autosize="{minRows: 3,maxRows: 24}" placeholder="Enter something..." :maxlength="10000" autofocus="autofocus"  ref="commentsTextarea"></Input>
                                      </div>
                                      <div class="text-button">
                                        <Button type="warning" style="background-color: red;" class="fontColor" v-show="agentWant" @click="agentWantHandle()">{{$t('app.comments.Think_again')}}</Button>
                                        <Button type="primary" @click="setCommentsLists(item._id,false,index)">{{$t('app.comments.post_a_comment')}}</Button>
                                      </div>
                                    </div>
                                  </div>
                                  <ul class="comments-childer" v-if="item.childersChat && item.childersChat.length" >
                                    <li class="comments-childer-item" v-for="(item3,index3) in  item.childersChat" :key="index3">
                                      <div class="auto-line-start">
                                        <div class="profile">
                                          <canvas :ref="'randomTitle' + index3 + index" :id="'randomTitle' + index3 + index"  v-once>{{updataRandomTitle('randomTitle' + index3 + index,item3.name)}}</canvas>
                                        </div>
                                        <section class="record">
                                          <h5>{{item3.name}}  --- <Time :time="(new Date(item3.onlineTime)).getTime()"></Time></h5>
                                          <div class="grade-width">
                                            <Col :xl="{ span: 12 }" :lg="{span:12}" :md="{span:12}" :xs="{ span: 24 }" class-name="gradeCoin-item " v-for="(item4,index4) in item3.scoreNum" :key="index4">
                                              <div class="progress-item auto-line-start">
                                                <em>{{divDescribeTitle(index4)}}:</em>
                                                <div class="item-tip" >
                                                  <div class="tip" :style="{width: gradeWidth(item4)}" ></div>
                                                </div>
                                                <em class="score">{{item4}}</em>
                                              </div>
                                            </Col>
                                          </div>
                                          <div class="chatContent" v-html="textareaTo(item3.chatContent)">
                                          </div>
                                        </section>
                                      </div>
                                    </li>
                                  </ul>
                                </li>
                                <div class="comments-list-page auto-line-center">
                                  <Page :total="commentsList.allCount" show-total :current.sync="nowPage"  :page-size="commentsList.pageSize" @on-change="$emit('pageSkip',nowPage),flag=[]"	 />
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
import {Slider, Row, Col, Icon, Input, Button, Time, Page, Select, Option, Notice} from 'iview';
    export default {
      name:"guestbook",
      components:{Slider,Row,Col,Icon,Input,Button,Time,Page,Select,Option,Notice },
      props:{
        commentsList:{type:Object,required:false,default:{}}
      },
      data(){
        return{
          divDescribe:[{title:'用户体验',scoreNum:7},{title:'品牌荣誉',scoreNum:8},{title:'响应速度',scoreNum:9},{title:'服务质量',scoreNum:10}], //评分title 文字, //评分title 文字
          reply:{replyEle:true,replyIndex:-1}, //处理留言框
          agentWant:false, //处理再想一想button
          params:{id:'',textarea:''}, //留言板数据
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
          addComments_id:'',
          current_quantity:''
        }
      },
      created() {

      },
      mounted() {


      },
      computed:{
        //计算机属性传值,处理评分宽度
        gradeWidth(){
          return (item)=>{
            return `${item * 10}%`
          }
        },
        //处理评分title 文字
        divDescribeTitle(){
          return (index)=>{
            // index4 ==0 ? divDescribe[0].title : index4 == 1 ? divDescribe[1].title : index4 == 2 ? divDescribe[2].title : index4 == 3 ? divDescribe[3].title : '游戏平台'
            for (let i =0;i<this.divDescribe.length;i++){
              if (i == index){
                return this.divDescribe[i].title
              }
            }
            }
          }

        },
      methods:{
        //slider 滑轮提示
        grade(value){
          return this.current_quantity +'\t' +value+'\t'+'分'
        },
        //回复
        replyComments(index,big=false){
          this.big = big
          this.reply.replyEle = false
          this.reply.replyIndex = index
          this.$nextTick(()=>{
            if (this.big){
              this.$refs.commentsTextarea.focus()
            }else{
              this.$refs.commentsTextarea[0].focus()
            }
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
          console.log(this.commentsList)
          if (!this.params.textarea){
            Notice.warning({
              title:'留言板',
              desc:'您还没有输入内容',
              // duration:0
            })
            return
          }

          //滑轮数据组装
          let scoreNum =[],name='',params={};
          this.divDescribe.forEach((value,index)=>{
            scoreNum.push(value.scoreNum)
          })
          //名称，big=true表示不是回复别人的评价,自己评价
          name = big ? '将' : '卒'
          if (big){
            params ={id:this.$route.params.id,reply:big,params:{name:name,chatContent:this.deleteTag(this.params.textarea),scoreNum:scoreNum,title:'title.png'},version:this.commentsList.version}
          }else{
            if (chat_id){
              params ={id:chat_id,reply:big,params:{name:name,chatContent:this.deleteTag(this.params.textarea),scoreNum:scoreNum},version:this.commentsList.version}
            }else {
              params ={id:this.addComments_id,reply:big,params:{name:name,chatContent:this.deleteTag(this.params.textarea),scoreNum:scoreNum},version:this.commentsList.version}
            }
          }
          // 需要将评分数据传出去
          this.datasChange({t:{"s":scoreNum},b:'gr',i:this.$route.params.id,u:`/gradeCoin/${this.$route.params.id}?title=${this.$route.query.title}`,tt:this.$route.query.title})

          this.$api.user.setCommentsLists(params).then((res)=>{
            if (res.status === 1){
                Notice.success({
                  title:'留言板',
                  desc:'留言成功',
                  // duration:0
                })

                this.params.textarea = ''
                this.reply.replyEle = true
                this.addComments_id = res.comment.content._id
                this.$emit('addCommentsData',params,index,this.addComments_id);
            }
          }).catch(error => {
            console.warn(error)
          })
        },
        //随机头像
        randomTitle(ele,name="匿",width=36,height=36,bcColorArr=this.titleColor,fontSize='14',fontColor="#ffffff",fontWeight='900'){
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
              context.fillStyle = fontColor;
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
        //点击标签添加
        textareaUpage(data){
          let text = ''
          if (this.params.textarea.length > 0 ){
            if (!this.params.textarea.includes(data)){
              text = `\n${data}:`
            }
          }else {
            text =`${data}:`
          }
          this.params.textarea += text
          this.$nextTick(()=>{
            if (this.big){
              this.$refs.commentsTextarea.focus()
            }else {
              this.$refs.commentsTextarea[0].focus()
            }
          })
        },
        //去掉 标签符号
        deleteTag(data){
          return data.replace(/<\/?.+?>/g," ")
        },
        //提交用户访问数据给服务器
        datasChange(item){
          this.$api.mutulal.getCUpvote(item)
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
    @import "~@/assets/css/commonmMixin.scss"; //公共样式grade-width
    @import "~@/assets/css/components/comments/appGuestbook.scss";
</style>
