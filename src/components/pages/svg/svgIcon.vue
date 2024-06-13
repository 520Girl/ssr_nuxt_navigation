<template>
  <svg :width="width" :height="height" aria-hidden="true" :fill="fill" :name="name">
    <use :xlink:href='`#icon-${name}`' :fill="fill"></use>
  </svg>
</template>

<script>
export default {
  name: "svgIcon",
  props:{
    name: {
      type: [String,Number],
      required: true,
      default: ''
    },
    fill: {
      type: String,
      default: 'currentColor'
    },
    height: {
      type: String,
      default: '1em'
    },
    width: {
      type: String,
      default: '1em'
    }
  }
}
</script>

<style scoped>
</style>
