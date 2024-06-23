<template>
<!--  <transition name="fade-transform" mode="out-in">-->
<!--    <Nuxt keep-alive :keep-alive-props="{ include:cachedViews }">-->
<!--      <router-view :key="key" />-->
<!--    </Nuxt >-->
<!--  </transition>-->
<transition name="fade-transform" mode="out-in">
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    cachedViews() {
      console.log('this.$store.state.tagsView.cachedViews',this.$store.state.tagsView.cachedViews)
      return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>
<style scoped>
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
  font-size:40px;
}
</style>
