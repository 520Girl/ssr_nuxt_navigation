<template>
  <div class="content-container contents-bck" id="myNav">
    <section class="content-customize-menu">
      <div class="no-margin"></div>
      <Row type='flex' justify="space-between" class-name="menu-button"  >
        <Col   class-name="newly-item">
          <Button shape="circle"  icon="md-reorder"  :title=" $t('index.me_nav')" @click="myNavigationWay" :class="buttonSelect === 0 ? 'button-select':''" >{{$t('index.me_nav')}}</Button>
          <Button shape="circle"  icon="md-clipboard" :title=" $t('index.recent_click')" @click="newlyClickWay" :class="buttonSelect === 1 ? 'button-select':''" >{{$t('index.recent_click')}}</Button>
        </Col>
        <Col class-name="newly-edit newly-item">
          <Button shape="circle"  icon="md-build" :title="$t('index.edit_url')" @click="editWebWay" :class="buttonSelect === 2 ? 'button-select':''" >{{$t('index.edit_url')}}</Button>
        </Col>
      </Row>
      <!--            我的导航 three-->
      <Row type='flex' justify="space-between" align="middle" class-name="menu-text newly-layout mx-15-2" v-show="MyNavAdd">
        <Col :lg="{span:24,}" :xs="{ span: 24 }" class-name="menu-item newly-item ">
          {{ $t('index.no_data')}}
        </Col>
      </Row>
      <!--            我的点击 five-->
      <Row type='flex' justify="space-between" align="middle" class-name="menu-text newly-layout mx-15-2" v-show="newlyClickText">
        <Col :lg="{span:24,}" :xs="{ span: 24 }" class-name="menu-item newly-item ">
         {{ $t('index.no_data_join')}}
        </Col>
      </Row>

<!--                  添加网站 four-->
<!--                  <transition name="menuText" mode="in-out">-->
<!--                      <Row type='flex' justify="space-between" align="middle" class-name="menu-text mx-15-2 " v-show="true">-->
<!--                          <Col :lg="{span:4,}"  :xs="{ span: 12 }"  class-name="menu-item" >-->
<!--                              <span @click="addWeb" style="display:inline-block;width:100%;height:100%;">+</span>-->
<!--                          </Col>-->
<!--                      </Row>-->
<!--                  </transition>-->
<!--                  添加网站数据展示two-->
      <Row type='flex' justify="start" align="middle" class-name="menu-text my-layout mx-15-2"  v-show="customizeMenu.myNav" style="position:relative;">
        <Col :xxl="{span:3}" :xl="{ span: 4 }" :md="{span:6}"  :sm="{ span:8}" :xs="{ span: 12 }" class-name="menu-item my-item" v-for="(item,index) in menuData.myNavigation" :key="index">
         <div class="applyBck menu-item-layout">
           <div class="close">
             <div class="close-top">
               <Icon type="md-close-circle" @click="closeforData(item,index)" />
             </div>
             <div @click="$common().goto(item.url)"  class="close-bottom">
               <Tag  :color="index1 == 0 ? 'magenta' : index1 == 1 ? 'volcano': index1 == 2 ? 'orange' : 'green'" :class="'tag'+(index1+1)" v-for="(item1,index1) in item.state" :key="index1">{{item1}}</Tag>
             </div>
           </div>
           <ListItemMeta :avatar="item.favicon" :title="item.name" :description="item.explain" class="fontSize-text-color " style="min-height: 70px" />
         </div>
        </Col>
        <Col :xxl="{span:3}" :xl="{ span: 4 }" :md="{span:6}"  :sm="{ span:8}" :xs="{ span: 12 }" class-name="menu-item" style="border: 2px dashed rgba(136, 136, 136, 0.5);text-align: center;max-height: 97px;" v-show="menuData.myNavigation.length > 0" >
          <span @click="addWeb" style="display:inline-block;width:100%;height:100%;">+</span>
        </Col>
      </Row>
      <!--          访问数据展示-->
      <Row v-show="customizeMenu.newClick" type='flex' justify="start" align="middle" class-name="menu-text my-layout mx-15-2">
        <Col :xxl="{span:3}" :xl="{ span:4 }" :md="{span:6}"  :sm="{ span:8}" :xs="{ span: 12 }" class-name="clickData-item" v-for="(item,index) in $store.state.clickData" :key="index" >
          <a  @click="$common().goto(item.hrefUrl,item.name)"
             :href="hrefUrl(item.hrefUrl).url"
             :target="hrefUrl(item.hrefUrl).target" class="item-content auto-line-start applyBck" >
            <img v-lazy="item.imgUrl" data-hotWeb ="hotWeb1" :alt="item.name" class="ivu-avatar">
            <div class="text">
              <h5 class="fontSize-text overflow-eclipse">{{item.name}}</h5>
              <small class="fontColor-t-d overflow-eclipse"><Time :time="item.onlineTime" /></small>
            </div>
          </a>
        </Col>
      </Row>
      <!--            添加网站数据 one-->
      <component v-if="popup" :is="popup"  :popup="customizeMenu.editNav" @close="editWebWay" :z_index="501">
        <Row  class-name="menu-text add-layout" slot="popupMain" style="width: 359px;">
            <Form  v-model="formData" class="fontSize-text-colornoH" :label-width="0">
            <FormItem  prop="name" >
              <input v-focus :placeholder="$t('index.site_name')" v-model="formData.name" class="search-b fontSize-text-color"/>
            </FormItem>
            <FormItem  prop="url">
              <input :placeholder="$t('index.site_url')" v-model="formData.url" class="search-b fontSize-text-color"/>
            </FormItem>
            <FormItem  prop="explain">
              <input :placeholder="$t('index.info')" v-model="formData.explain" class="search-b fontSize-text-color"/>
            </FormItem>
            <FormItem  prop="state">
              <CheckboxGroup  v-model="formData.state" style="width:100%;">
                <Checkbox :label="$t('index.tool')"></Checkbox>
                <Checkbox :label="$t('index.news')"></Checkbox>
                <Checkbox :label="$t('index.game')"></Checkbox>
                <Checkbox :label="$t('index.assets')"></Checkbox>
              </CheckboxGroup>
            </FormItem>
            <!--                  <FormItem label="时间">-->
            <!--                    <Input text="url" disabled required="required" value="2021-12-12"  v-model="formData.time">-->
            <!--                      <Icon type="md-paper" slot="prepend"></Icon>-->
            <!--                    </Input>-->
            <!--                    <DatePicker type="date" placeholder="时间" format="yyyy-MM-dd" v-model="formData.time" :value="'2016-01-01'"  @on-change="formData.time = $event" ></DatePicker>-->
            <!--                  </FormItem>-->
            <FormItem style="text-align: center;">
              <Button type="primary" :loading="addWebLoading" icon="ios-power" @click="formDataSubmit">
                <span v-if="!addWebLoading"> {{$t('index.add')}} </span>
                <span v-else>Loading...</span>
              </Button>
            </FormItem>
          </Form>
        </Row>
      </component>
    </section>
  </div>
</template>
<script>
// import {Row,Col,Button,List,Tag,Form,CheckboxGroup,Checkbox,Input,Icon,DatePicker } from 'iview'
// import popup from "@/components/common/popup";
import store from "@/store";
import {v4 as uuid} from 'uuid'
export default {
  name:'contents',
  // components:{FormItem:Form.Item,Icon,   Row,Col,Button,List,Form,  ListItem:List.Item, ListItemMeta:List.Item.Meta, Tag,CheckboxGroup,Checkbox,Input,DatePicker},
  // components:{popup},
  data() {
    return {
      customizeMenu:{myNav:true,newClick:false,editNav:false},
      menuData:{myNavigation:[],newlyClick:[],}, //我的导航，最近点击数据
      formData:{name:'',favicon:'',url:'http://',explain:'',time:Date.now(),state:[]}, //提交表单数据
      addWebLoading:false, //提交加载动画
      buttonSelect:0,//x选中颜色
      onepopupLoading:false,
      popup:false // 动态加载弹窗
    }
  },
  mounted() {

    this.allStart()
  },
  computed:{
    newlyClickText(){
      return (this.$store.state.clickData === null || this.$store.state.clickData.length  <= 0) && this.buttonSelect === 1
    },
    MyNavAdd(){
      return this.menuData.myNavigation.length <= 0 && this.buttonSelect === 0
    }
  },
  methods: {
    allStart(){
      try {
        //this.$common.Decrypt(localStorage.getItem('formData'))
        let formData = decodeURI(localStorage.getItem('formData'))
        if (formData !== 'null'){
          this.menuData.myNavigation = JSON.parse(decodeURI(localStorage.getItem('formData')))
        }
      }catch (e) {
        localStorage.removeItem('formData',)
        store.commit('formData',[])
      }
      try {
        let clickData = JSON.parse(decodeURI(localStorage.getItem('clickData')))
        this.menuData.newlyClick = clickData
        this.$store.commit('clickData',clickData)

      }catch (e) {
        localStorage.removeItem('clickData',)
        store.commit('clickData',[])
      }
    },
    // 使用异步加载组件需要要使用import()函数
    async asyncPopupLanguage(){
      if (!this.popup){
        const {default: popup} = await import('@/components/common/popup')
        this.popup = popup
      }
    },
    myNavigationWay(){
      this.buttonSelect = 0
      this.customizeMenu.myNav = true
      this.customizeMenu.newClick = false
    },
    newlyClickWay(){
      this.buttonSelect = 1
      this.customizeMenu.myNav = false
      this.customizeMenu.newClick = true
      this.customizeMenu.editNav = false
    },
    editWebWay(event){
      console.log(event)
    if (!this.popup){
       this.asyncPopupLanguage().then(() => {
         this.buttonSelect = 2
         this.customizeMenu.myNav = true
         this.customizeMenu.newClick = false
         this.customizeMenu.editNav = !this.customizeMenu.editNav
       })
    }else{
      this.buttonSelect = 2
      this.customizeMenu.myNav = true
      this.customizeMenu.newClick = false
      this.customizeMenu.editNav = !this.customizeMenu.editNav
    }
      // this.$set(this.customizeMenu,'editNav',!this.customizeMenu.editNav)
    },
    addWeb(){
      this.customizeMenu.editNav = !this.customizeMenu.editNav
    },
    //提交表单数据
    formDataSubmit(){
      //判断师傅符合要求
      if (!this.formData.name){
        this.$Notice.warning({title:'提示',desc:'名称不能为空!',})
        return
      }
      if (!this.formData.url ){
        this.$Notice.warning({title:'提示',desc:'地址不能为空! ',})
        return
      }
      let reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
      if (!this.formData.url.match(reg) ){
        this.$Notice.warning({title:'提示',desc:'地址格式错误! ',})
        return
      }

      //处理数据
      this.addWebLoading = true
      this.formData.favicon = `http://favicon.cccyun.cc/${this.formData.url}`
      this.formData.id = uuid()
      let formData = JSON.parse(JSON.stringify(this.formData))
      this.menuData.myNavigation.push(formData);
      // localStorage.setItem('formData',this.$common.Encrypt(JSON.stringify(this.menuData.myNavigation)))
      localStorage.setItem('formData',encodeURI(JSON.stringify(this.menuData.myNavigation)))
      this.customizeMenu.editNav = false
      this.addWebLoading = false
      //
      this.formData.name = ''
      this.formData.favicon = ''
      this.formData.url= 'http://'
      this.formData.state = []
      this.formData.explain = ''
      this.formData.id = ''

    },
    //删除收藏数据
    closeforData(item,index){
      for (let [index1,item1] of this.menuData.myNavigation.entries()){
        if (index == index1){
          this.menuData.myNavigation.splice(index,1)
        }
      }
      localStorage.setItem('formData',encodeURI(JSON.stringify(this.menuData.myNavigation)))
    },
    //判断访问数据是否数据完整
    handleNewlyClick(data){
      if (data instanceof Array){
        let i = data.length
        while (i > 0){
         let keysArr =['hrefUrl','name','imgUrl','onlineTime','id']
         let data = data[--i]
         let keys = Object.keys(data)
          if (keys.length != 5){
            data.splice(i,1)
            continue;
          }
          if (!uuid.validate(data.id)){
            data.splice(i,1)
            continue;
          }
         for ( let key of keys){
           if (!(keysArr.includes(key))){
             data.splice(i,1)
             continue;
           }
         }
        }
        return data
      }
    }
  },
  watch:{
    // 'customizeMenu':{
    //   handler:function () {
    //     if (this.customizeMenu.two){
    //       this.customizeMenu.editNav = false
    //     }
    //   },
    //   deep:true
    // }
  }
}
</script>
<style scoped lang="scss">
  @import "~@/assets/css/components/index/contents.scss";
  .search-b{
      padding: 9pt;
      height: 45px;
      line-height: 45px;
      font-size: 14px;
      border-radius: 5px;
      width: 100%;
    }
</style>
