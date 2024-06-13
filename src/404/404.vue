<template>
  <div class="error-container">
    <svg-icon name="404" width="256" height="256" fill="#c6c9cf" ></svg-icon>
    <p class="text-sm text-muted mt-3" style="user-select: auto;">抱歉，没有你要找的内容...</p>
    <Button shape="circle" icon="ios-home"  to="/" >返回首页</Button>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return 'The webmaster said that you can not enter this page...'
    }
  }
}
</script>

<style lang="scss" scoped>
.error-container{
  position: relative;
  margin:0 auto;
  text-align: center;
  svg {
    margin: 0 auto;
    display: block;
  }
  p{
    font-size: 1em;
    margin: 0 auto;
    display: block;
    text-align: center;
  }
  button,a{
    text-align: center;
    margin-top: 20px;
    box-shadow: 3px 2px 20px rgba(147,5,5,.2);
  }
  @media (max-width: 768px) {
    //p{
    //  transform: translate(-50%, 284%);
    //}
    //button{
    //  transform: translate(-50%, 310%);
    //}
  }
}
</style>
