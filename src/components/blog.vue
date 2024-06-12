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
    export default {
      name:"Blog",
      components:{ blogOneselfRight,blogOneselfLeft1,blogOneself},
      async asyncData({ $api,route}) {
        const { blog } = await $api.blog.getBolgLists({page:1,per_page:5,tag:route.query.tag,order:-1})
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
