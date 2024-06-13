<template>
  <div class="favorites-container">
    <div class="favorites-layout  mx-15-2">
      <Row type='flex' justify="space-between" align="top" class-name="blog article">
        <Col :xl="{ span: 18 }" :lg="{span:16}" :md="{span: 16}" :sm="{ span: 14 }" :xs="{span:24}"  class-name="blog-content-left">
          <website-one :websiteData="websiteData" :spinShow="spinShow" :spanGrid="spanGrid" :Page="params" :type="'favorites'" ></website-one>
        </Col>
        <Col :xl="{ span: 6 }" :lg="{span:8}" :md="{span: 8}" :sm="{ span: 10 }" :xs="{span:0}" class-name="blog-content-right">
          <blog-oneself-right  :values="values"></blog-oneself-right>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import websiteOne from "@/components/pages/mains/websiteOne";
import blogOneselfRight from "@/components/pages/blog/blogOneselfRight"; //blog右侧
export default {
  name: "favorites",
  components:{websiteOne,blogOneselfRight},
  data(){
    return{
      spinShow:false,
      spanGrid:{
        'xxl':6,
        'xl':6,
        'md':8,
        'sm':12,
        'xs':12
      },
      websiteData:[],
      values:"我是父插槽",
      params:{
        allCount:0,
        page:1,
        per_page:100,
        belong:this.$route.params.belong
      }
    }
  },
  created() {
    this.getWebsite(this.$route.params.belong)
  },
  mounted() {},
  methods:{
    getWebsite(belong){
      this.$api.webSite.getWebsite({belong:belong,per_page:this.params.per_page,page:this.params.page,type:2}).then(res=>{
        if (res.status === 1){
          this.params.allCount = res.website.content[0].allNum
          this.websiteData = res.website.content
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
