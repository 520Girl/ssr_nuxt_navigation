

<template>
  <div >
    <Loading ref="globalLoading" />
    <transition name="fade">
      <LoadingSwitch v-if="loadingSwitch"  />
    </transition>
    <transition name="fade">
      <template v-if="!loadingSwitch">
        <Nuxt  />
      </template>
    </transition>
  </div>
</template>
<script>
import Loading from '@/components/common/loadingHome.vue'
import LoadingSwitch from '@/components/common/loading.vue'
export default {
  // transition: "fade-transform" ,
  name: 'default',
  components: { Loading,LoadingSwitch },
  data() {
    return {
      loadingSwitch: false,
      routerChangeStartTime:null
    }
  },
  created() {
    this.$nuxt.$on('routeChangeStart', ()=>{
      this.startLoading();
    });
    this.$nuxt.$on('routeChangeComplete', ()=>{
      this.stopLoading()
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.globalLoading.finishLoading();
    });

  },
  methods: {
    startLoading() {
      this.routeChangeStartTime = Date.now();
      this.loadingSwitch = true;
    },
    stopLoading() {
      const elapsedTime = Date.now() - this.routeChangeStartTime;
      if (elapsedTime < 500) {
        setTimeout(() => {
          this.loadingSwitch = false;
        }, 500 - elapsedTime);
      } else {
        this.loadingSwitch = false;
      }
    }
  },
  watch: {
    // $route(to, from) {
    //   this.$refs.globalLoading.start();
    //   this.$nextTick(() => {
    //     this.$refs.globalLoading.finish();
    //   });
    // }
  },

}
</script>
<style scoped lang="scss">

</style>
