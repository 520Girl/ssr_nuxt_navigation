<template>
  <div class="website-one">
    <div class="website-one-list" v-for="(item,index) in websiteData" :key="index" v-if="websiteData.length>0">
      <div class="tool-header auto-line-between">
        <div class="left">
          <div class="heade-icon" v-if="item.icon">
            <!--            <img :src="require(`../../../assets/images/web/${data.icon}`)" :alt="data.title" height="28" width="28">-->
          </div>
          <h5 class="fontSize-text-mains" :style="'color:'+item.bcColor+'!important'">{{item.title}}</h5>
        </div>
        <div class="right auto-line-between">
          <div class="number fontSize-text">
            当前数量<span class='nums'>{{item.allNum}}</span>个
          </div>
          <span class="line"></span>
          <div
            :class="form_onlyRead ? 'more fontSize-text refresh-icon form-onlyRead' :'more fontSize-text refresh-icon'"
            @click="refresh(item.belong,item.allNum,index)">
            换一换
            <Icon type="md-refresh refresh" :class="{refresh_quan:quan}" />
          </div>
          <span class="line"></span>
          <div class="more fontSize-text" @click="moreContent(item.belong)">
            更多
            <Icon type="ios-arrow-forward" />
          </div>
        </div>
      </div>
      <!--      :style="'color:'+item.bcColor+'!important'"-->
      <div class="tool-info overflow-eclipse fontColor-t-d" v-html="$common.cruxText(item.explain)">
      </div>
      <Row type='flex' justify="start" align="middle" class-name="mains-menu hotWeb mx-2">
        <Col :xxl="{span:3}" :xl="{ span: 4 }" :md="{span:6}" :sm="{ span:8}" :xs="{ span: 12 }"
          class-name="hotWeb-item " v-for="(item1,index1) in item.content" :key="index1" v-if="item1.state">
        <Tooltip :content="item1.explain">
          <a :href="item1.hrefUrl" target="_blank" class="item-content auto-line-start applyBck">
            <!--              <img :src="require(`../../../assets/images/web/${data.language}/${data.belong}/${item1.belong}/favicons.png`)" :alt="item1.title" height="40" width="40">-->
            <div class="text">
              <h5 class="fontSize-text overflow-eclipse">{{item1.title}}</h5>
              <small class="fontColor-t-d overflow-eclipse">{{item1.hrefUrl}}</small>
            </div>
          </a>
        </Tooltip>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>

  export default {
    name: "websiteOne",
    props: ['websiteData', 'spinShow'],
    data() {
      return {
        params: { page: 1, per_size: 8, belong: '' },
        form_onlyRead: false,//禁止点击
        clickNum: 0,
        quan: false,
      }
    },
    mounted() {
      // this.getWebsite()
    },
    methods: {
      getWebsite(belong, address) {
        this.params.belong = belong
        this.quan = true
        this.$api.webSite.getWebsite(this.params).then(res => {
          if (res.status === 1) {

            this.websiteData[address].content = [...this.websiteData[address].content, ...res.website.content]
            console.log(this.websiteData2)
            this.$forceUpdate()
            this.quan = false
          }
        })
      },
      moreContent() {
        this.$Notice.warning({ title: '更多', desc: '还在开发中哦,敬请期待...', })
      },
      refresh(belong, allNum, address) {
        console.log(belong, allNum, address)
        if (parseInt(allNum) <= (this.params.page * this.params.per_size)) {
          if (this.clickNum === 1) return false
          this.$Notice.warning({ title: '刷新', desc: '没有给多了,求求你别刷了...', })
          this.form_onlyRead = true
          this.clickNum++
        } else {
          this.params.page++
          this.getWebsite(belong, address)
        }
      }
    },
    computed: {
      // websiteData2:{
      //   get:function (){
      //     console.log("====================")
      //     return this.websiteData2
      //   },
      //   set:function (newValue){
      //     this.websiteData2 = newValue
      //     console.log(this.websiteData2)
      //   }
      // }
      // websiteData:{
      //   get:function (){
      //     console.log('---------------------')
      //     console.log(this.websiteData)
      //     return this.websiteData
      //   },
      //   set:function (newValue){
      //     this.websiteData = [...newValue]
      //   }
      // }
    },
    watch: {
    }
  }
</script>

<style scoped lang="scss">
  @import "~/assets/css/commonmMixin.scss"; 
  @import "~/assets/css/components/mains/websiteOne.scss"; 
</style>