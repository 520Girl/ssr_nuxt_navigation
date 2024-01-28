<template>
  <transition name="topUp" mode="out-in" >
    <div class="modal-backdrop" v-show="popups" @click="close">
      <div ref="popupMain" :class="popupMain" >
        <slot name="popupMain" ></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "popup",
  props:{
    popup:{
      type:Boolean,
      default:false
    },
    type:{
      type:String,
      default:'header'
    }
  },
  data(){
    return{
      popups:false,
      popupMain: 'popupMain '
    }
  },
  created(){
    if (this.type === 'slider'){
      this.popupMain += 'slider '
    }
  },
  methods:{
    close(event){
      if (!this.$refs.popupMain.contains(event.target)) {
        this.popups = false
        this.$emit('close',false)
      }

    }
  },
  computed:{
    popupWatch(){
      return this.popup
    }
  },
  watch:{
    popupWatch(newVal){
      console.log(newVal)
      this.popups = newVal
      if (newVal) {
        document.getElementsByTagName("html")[0].style.overflowY = 'hidden'
        return
      }
      document.getElementsByTagName("html")[0].style.overflowY= 'auto'
    }
  }
}
</script>

<style lang="scss" scoped>
.topUp-leave-active {
  transition: transform .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.topUp-enter, .topUp-leave-to {
  transform: translateY(-929px);
  opacity: 0;
}
.popupMain{
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 340px;
  margin: auto;
}
.slider{
  width:auto;
  top:unset;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 499;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  opacity: 1;
  transition: all .5s cubic-bezier(.645, .045, .355, 1), stroke .2s ease;
}

</style>
