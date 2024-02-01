<template>
  <!--        <grade-background slot="main"></grade-background>-->
  <div class="blog-container contents-bck">
      <div class="blog-layout" >
          <Row type='flex' justify="space-between" align="top" class-name="blog article">
              <Col :xl="{ span: 16 }" :lg="{span:16}" :md="{span: 14}" :sm="{ span: 15 }" :xs="{span:24}"  class-name="blog-content-left">
                  <slot name="blogOneselfLeft"></slot>
              </Col>
              <Col :xl="{ span: 8 }" :lg="{span:8}" :md="{span: 10}" :sm="{ span: 9 }" :xs="{span:0}" class-name="blog-content-right">
                  <slot name="blogOneselfRight"></slot>
              </Col>
          </Row>
      </div>
  </div>
</template>
<script>
  // import {Row, Col} from 'iview';//iview 导入
  import {headerNav,gradeBackground} from '@/components/common'; //头部和左边导航
    export default{
      name:"blogOneself",
      // components:{Row, Col, gradeBackground,headerNav},
      components:{ gradeBackground,headerNav},
      data(){
        return{
          value:'我是卡超数据'
        }
      },
      mounted() {

      },
      methods:{

      }
    }
</script>
<style lang="scss">
    @import '~/assets/css/components/blog.scss';
</style>
