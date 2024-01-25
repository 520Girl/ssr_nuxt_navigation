<template>
  <transition name="fade-transform" mode="out-in">
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'appMain',
  computed: {
    key() {
      return '/'
    },
    cachedViews() {
      return []
      // return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>
<style scoped>

</style>
