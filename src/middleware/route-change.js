export default function ({store,redirect,route}) {
  console.log('this.store.afterEach',888);
  if (process.client) {
    window.$nuxt.$emit('routeChangeStart');
    // route.meta.transition = 'fade';

    // 监听路由切换完成事件
    window.$nuxt.$router.afterEach(() => {
      window.$nuxt.$emit('routeChangeComplete');
    });
  }
}
