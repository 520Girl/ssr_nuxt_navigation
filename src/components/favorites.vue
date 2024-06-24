<template>
  <div class="favorites-container">
    <div class="favorites-layout  mx-15-2">
      <Row type='flex' justify="space-between" align="top" class-name="blog article">
        <Col :xl="{ span: 18 }" :lg="{span:16}" :md="{span: 16}" :sm="{ span: 14 }" :xs="{span:24}"  class-name="blog-content-left">
          <website-one :websiteData="websiteData" :spinShow="spinShow" :spanGrid="spanGrid" :Page="params" :type="'favorites'" ></website-one>
        </Col>
        <Col :xl="{ span: 6 }" :lg="{span:8}" :md="{span: 8}" :sm="{ span: 10 }" :xs="{span:0}" class-name="blog-content-right">
          <blog-oneself-right  :userInfoB="userInfoB"  :blogHotComment="blogHotComment" :blogHotEye="blogHotEye" :hotTags="hotTags"></blog-oneself-right>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import websiteOne from "@/components/pages/mains/websiteOne";
import blogOneselfRight from "@/components/pages/blog/blogOneselfRight"; //blog右侧
import setting from '@/setting'
export default {
  head(){
    const {fullPath,meta} = this.$route;
    // const {title:asyncData_title,websiteInfo} = this.gradeCoinContent.content
    // const title = `${meta.title.slice(0,meta.title.indexOf(',')+1)}-${asyncData_title}的${meta.title.slice(meta.title.indexOf(',')+1)}`
    // const description = `${meta.description.slice(0,meta.description.indexOf(',')+1)}${websiteInfo},${meta.description.slice(meta.description.indexOf(',')+1)}`
    // const imgUrl = `${setting.website}static/images/gradeCoin/${asyncData_imgUrl}`
    const title = meta.title
    const description = meta.description
    const imgUrl = ''
    return {
      title: title,
      meta: [
        {hid: 'description', name: 'description', content:description},
        {hid: 'keywords', name: 'keywords', content: title},
        {name:'twitter:url', property: 'og:url', content:`${setting.website}${fullPath}`},
        {name:'twitter:title', property: 'og:title', content:title},
        {name:'twitter:description', property: 'og:description', content:description},
        // {name:'twitter:image', property: 'og:image', content: imgUrl},
        {hid: 'author', name: 'author', content: 'navai'},
      ]
    }
  },
  name: "Favorites",
  components:{websiteOne,blogOneselfRight},
  async asyncData({ $api, params }) {
    const {website} = await $api.webSite.getWebsite({belong:params.belong,per_page:100,page:1,type:2})
    const { user } = await $api.user.getUserInfoB()
    const blogHotComment = await $api.blog.getBlogHot({per_page:4,belong:'comment',order:-1})
    const blogHotEye = await $api.blog.getBlogHot({per_page:4,belong:'eye',order:-1})
    const hotTags = await $api.mutulal.getHotTag({belong:'eye',order:-1,per_page:15})
    return {
      userInfoB: user,
      blogHotComment: blogHotComment,
      blogHotEye: blogHotEye,
      hotTags: hotTags.common.content,
      websiteData:website.content,
    }
  },
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
    // this.getWebsite(this.$route.params.belong)
  },
  mounted() {
    this.params.allCount = this.websiteData[0].allNum
  },
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
