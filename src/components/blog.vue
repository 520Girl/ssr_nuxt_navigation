<template>
    <blog-oneself>
        <blog-oneself-left1 slot="blogOneselfLeft" :blogOneself="blog"  ></blog-oneself-left1>
        <blog-oneself-right slot="blogOneselfRight" :userInfoB="userInfoB"  :blogHotComment="blogHotComment" :blogHotEye="blogHotEye" :hotTags="hotTags" ></blog-oneself-right>
    </blog-oneself>
</template>
<script>
  import blogOneselfLeft1 from '@/components/pages/blog/blogOneselfLeft1'//blog左侧
  import blogOneselfRight from "@/components/pages/blog/blogOneselfRight"; //blog右侧
  import blogOneself from '@/components/pages/blog/blogOneself'//blog布局组件
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
          ]
        }
      },
      name:"Blog",
      components:{ blogOneselfRight,blogOneselfLeft1,blogOneself},
      async asyncData({ $api,route}) {
        const { blog } = await $api.blog.getBolgLists({page:1,per_page:5,tag:route.query.tag,author:route.params.author_id,order:-1})

        const { user } = await $api.user.getUserInfoB()
        const blogHotComment = await $api.blog.getBlogHot({per_page:4,belong:'comment',order:-1})
        const blogHotEye = await $api.blog.getBlogHot({per_page:4,belong:'eye',order:-1})
        const hotTags = await $api.mutulal.getHotTag({belong:'eye',order:-1,per_page:15})
        return {
          blog: blog,
          userInfoB: user,
          blogHotComment: blogHotComment,
          blogHotEye: blogHotEye,
          hotTags: hotTags.common.content
        }
      },
      data(){
        return{
          list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,],
          time2:(new Date()).getTime() - 86400 * 3 * 1000,
          values:"我是父插槽",
          blog:{},
          blogHotComment:{},
          blogHotEye:{},
          hotTags:[],
          userInfoB:{},
        }
      },
      mounted() {

      },
      methods:{

      }
    }
</script>
<style lang="scss" scoped>
    @import '~@/assets/css/components/blog.scss';
</style>
