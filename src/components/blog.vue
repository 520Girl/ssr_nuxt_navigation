<template>
    <blog-oneself>
        <blog-oneself-left1 slot="blogOneselfLeft" ></blog-oneself-left1>
        <blog-oneself-right slot="blogOneselfRight" :values="values"></blog-oneself-right>
    </blog-oneself>
</template>
<script>
  import blogOneselfLeft1 from '@/components/pages/blog/blogOneselfLeft1'//blog左侧
  import blogOneselfRight from "@/components/pages/blog/blogOneselfRight"; //blog右侧
  import blogOneself from '@/components/pages/blog/blogOneself'//blog布局组件
    export default {
      name:"Blog",
      components:{ blogOneselfRight,blogOneselfLeft1,blogOneself},
      data(){
        return{
          list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,],
          time2:(new Date()).getTime() - 86400 * 3 * 1000,
          values:"我是父插槽"
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
