

<template>
  <div>
      <Loading />
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
  created() {

  },
  methods: {

  },
  watch: {

  },

}
</script>
<style scoped lang="scss">

</style>
