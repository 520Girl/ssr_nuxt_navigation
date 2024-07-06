

<template>
  <div>
      <Loading ref="globalLoading" />
      <Nuxt  />
  </div>
</template>
<script>
import Loading from '@/components/common/loadingHome.vue'
export default {

  transition: "fade-transform" ,
  name: 'default',
  components: { Loading },
  data() {
    return {
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.globalLoading.finishLoading();
    });
  },
  methods: {

  },
  watch: {

  },

}
</script>
<style scoped lang="scss">

</style>
