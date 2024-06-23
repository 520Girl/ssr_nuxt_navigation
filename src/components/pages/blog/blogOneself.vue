<template>
  <!--        <grade-background slot="main"></grade-background>-->
  <div class="blog-container contents-bck">
      <div class="blog-layout" >
          <Row type='flex' justify="space-between" align="top" class-name="blog article">
              <Col :xl="{ span: 18 }" :lg="{span:16}" :md="{span: 16}" :sm="{ span: 14 }" :xs="{span:24}"  class-name="blog-content-left">
                  <slot name="blogOneselfLeft"></slot>
              </Col>
              <Col :xl="{ span: 6 }" :lg="{span:8}" :md="{span: 8}" :sm="{ span: 10 }" :xs="{span:0}" class-name="blog-content-right">
                  <slot name="blogOneselfRight"></slot>
              </Col>
          </Row>
      </div>
  </div>
</template>
<script>
  // import {Row, Col} from 'iview';//iview 导入
  import gradeBackground from '@/components/common/gradeBackground'; //头部和左边导航
  import headerNav from '@/components/common/headerNav'; //头部和左边导航
    export default{
      name:"blogOneself",
      // components:{Row, Col, gradeBackground,headerNav},
      components:{ gradeBackground,headerNav},
      data(){
        return{

        }
      },
      mounted() {
      },
      methods:{

      }
    }
</script>
<style lang="scss">
    @import '~@/assets/css/components/blog.scss';
</style>
