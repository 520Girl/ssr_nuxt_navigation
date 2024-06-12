<template>
  <div class="search-contiainer">
    <div class="search-input-text">
      <input :placeholder="placeholder" v-model="searchDate" class="search-b fontSize-text-color" @input="changeSearch" @focus="searchStatus = true" @keyup.enter="search(1)" @blur="searchBlur"/>
      <Button class="i-b-c adverseBac" type="primary" icon="ios-search" @click="search(2)" :loading="searchLoading">Search</Button>
    </div>
    <div class="search-substance search-b" v-show="searchStatus">
      <ul v-if="searchRe.length != 0">
        <li  v-for="(item,index) in searchRe.slice(0, 6)" :key="index">
          <a  class="overflow-eclipse fontSize-text-colornoH" @click="$common().goto(item.belongId)" :title="item.belongId">
            {{item.title}}
           </a>
          <Icon type="md-flame" v-if="index == 2" />
          <img src="@/assets/images/flame.gif" width="16" height="16" v-else>
        </li>
      </ul>
      <div class="ul" v-else>
        <svg-icon name="empty" height="100" width="100%"></svg-icon>
        <h2 style="text-align: center;padding: 12px 0px;" class="fontSize-text-colornoH">无内容</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  props:{
    inputValue:String,
    searchSelect:Object,
    placeholder:{
      type:String,
      default:()=>{}
    }
  },
  data(){
    return{
      searchDate:this.inputValue,
      searchStatus:false,
      searchRe:[],
      searchLoading:false
    }
  },
  methods:{
    search(type){
      // this.searchStatus = false
      console.log('search',this.searchSelect)


      if (this.searchDate === '') return this.searchRe = []
      // 如果type 为2表示点击搜索键，如果是点击搜索并且是站外搜索的话直接跳转到站外
      if (type ===2 && this.searchSelect.type !== 'nei'){
        window.open(`${this.searchSelect.value}${this.searchDate}`,'_block')
      }
      this.searchLoading = true
      //?站内搜索
      if (this.searchSelect.type === 'nei'){
        this.$api.mutulal.getCSearch({data:this.searchDate}).then(res=>{
          if (res.status === 1){
            this.searchRe = res.common.content
          }

        })
        this.searchLoading = false
        return
      }

      // ?站外搜索
      switch (this.searchSelect.type){
        case 'sougou':
          window.sogou = {sug:''}
          window.sogou.sug = this.handleSogouData
          break;
        case 'bing':
          window.bing = {sug:''}
          window.bing.sug = this.handleBingData
        case 'google':
          window.google = {sug:''}
          window.google.sug = this.handleGoogleData
          break;
      }
      this.$api.mutulal.getSearch(this.searchSelect.reqUrl,this.searchDate,this.searchSelect.type).then(res=>{
        this.searchLoading = false
       switch (this.searchSelect.type) {
         case 'baidu':
           this.searchRe = res.g.map(item=>{
             item.title = item.q
             item.belong = "baidu"
             item.belongId = this.searchSelect.value+item.q
             return item
           })
           break
         case 'bing':
           console.log('bind',res)
           this.searchRe = res.webPages.value.map(item=> {
             item.title = item.name
             item.belong = "bing"
             item.belongId = this.searchSelect.value + item.url
             return item
           })
         case '360':
           if (res.errorcode === 0){
             this.searchRe = res.result.map(item=>{
               item.title = item.word
               item.belong = "360"
               item.belongId = `${this.searchSelect.value}${item.word}&ext=${item.ext}&version=${item.version}&ssid=${item.ssid}&version=${item.version}`
               return item
             })
           }
           break;
         case 'taobao':
           if (res.result.length > 0) {
             this.searchRe = res.result.map(item => {
               let item1 = {}
               item1.title = item[0]
               item1.belong = "taobao"
               item1.belongId = `${this.searchSelect.value}${item[0]}`
               item.num = item[1]
               return item1
             })
           }
           break;
         case 'jingdong':
           if (res.length > 0){
             this.searchRe = []
            res.some(item => {
                 if (!Object.keys(item).includes('keyword')) return true
                 let item1 = {}
                 item1.title = item.keyword
                 item1.belong = "jingdong"
                 item1.belongId = `${this.searchSelect.value}${item.keyword}`
                 this.searchRe.push(item1)
             })
           }
         case 'yitao':
           if (res.result.length > 0){
             this.searchRe = []
             this.searchRe = res.result.map(item => {
               let item1 = {}
               item1.title = item[0]
               item1.belong = "yitao"
               item1.belongId = `${this.searchSelect.value}${item[0]}&spm=${item[1]}`
               return item1
             })

           }
         case 'shenma':
           if (res.r.length > 0){
             this.searchRe = []
             this.searchRe = res.r.map(item => {
               item.title = item.w
               item.belong = "shenma"
               item.belongId = `${this.searchSelect.value}${item.w}`
               return item
             })
           }
       }
        this.searchLoading = false
    })
      this.searchLoading = false
    },
    handleBingData(res){
      if ('AS' in res){
        res = res.AS
        if (res.FullResults === 1) {
          if (res.Results.length <= 0) {
            this.searchRe = [{
              title: this.searchDate,
              belong: "bing",
              belongId: this.searchSelect.value + this.searchDate
            }]
            return
          }
         res.Results.some(item => {
           console.log('bingitems',item)
            if (item.Type.indexOf('AS') !== -1) {
              this.searchRe = item.Suggests.map(item1=>{
                item1.title = item1.Txt
                item1.belong = "bing"
                item1.belongId = `${this.searchSelect.value}${item1.Txt}&qs=${item1.Type}&sk=${item1.Sk}`
                return item1
              })
              return true
            }

          })
        }
      }
    },
    handleSogouData(res){
      if (res.length > 2){
        this.searchRe = res[1].map(item=> {
          let item1 ={}
          item1.title = item
          item1.belong = "sogou"
          item1.belongId = `${this.searchSelect.value}${item}`
          return item1
        })
      }
    },
    handleGoogleData(res){
      if (res.length > 1){
        this.searchRe = res[1].map(item => {
          let item1 = {}
          item1.title = item[0]
          item1.belong = "google"
          item1.belongId = `${this.searchSelect.value}${item[0]}`
          return item1
        })
      }
    },
    changeSearch(){
      this.$common.debounce(this.search,500)
      this.searchStatus = true
    },
    searchBlur(){
      this.$common.debounce(()=>{
        this.searchStatus = false
      },500)

      // this.searchRe = []
    }
  },
  watch:{
    'searchSelect':{
      handler(){
        console.log('我发生了变化')
        this.searchStatus = true
        this.searchRe = []
        this.search()
      },
      deep:true

    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/css/_themes.scss";
    .search-contiainer{
      font-size: 24px;
      margin: 0.2rem 0px;
      text-align: left;
      position: relative;
      //&:hover .search-substance{
      //  display: block;
      //}
      .search-input-text{
        width: 100%;
        position: relative;
        input{
          padding: 9pt;
          height: 45px;
          line-height: 45px;
          font-size: 14px;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          width: 100%;
        }
        button{
          position: absolute;
          right: 0.1rem;
          margin-top: 6px;
        }
      }
      .search-substance{
        display: block;
        position: absolute;
        width: 100%;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        min-height: 114px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        ul{
          width: 100%;
          li{
            width: 100%;
            display: flex;
            align-items: baseline;
            &:hover{
              background: #7756561a;
            }
            a{
              color: black;
              padding: 6px 5px 12px 16px;
              text-decoration: none;
              display: block;
            }
            i{
              color:#f1404b;
              font-size: 15px;
              margin-right: 0.01rem;
              vertical-align: bottom;
              padding-right: 16px;
            }
            img{

            }
          }
        }
      }
    }
</style>
