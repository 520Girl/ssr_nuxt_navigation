<template>
  <transition name="topUp" mode="out-in" >
    <div class="modal-backdrop" v-show="popups" @click="close" :style="{zIndex:z_index}"  >
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
    },
    z_index:{
      type:Number,
      default:499
    },
    width:{
      type:Number,
      default:340
    }
  },
  data(){
    return{
      popups:false,
      popupMain: 'popupMain'
    }
  },
  created(){
    console.log(this.popup)
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
.search-input{
  font-size: 24px;
  margin: 0.2rem 0px;
  text-align: left;
  .search-input-select{
    background: red;
    .ivu-select-single{
      background: yellow;
      .ivu-select-selection{
        border: none!important;
        background: #0e0f0f;
        display: flex;
      }
    }

  }
  .search-input-text{}
}
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
  left: 50%;
  transform: translate(-50%,-50%);
  //width: 340px;
  margin: auto;
  padding: 0px 10px;
  display:inline-block;
  text-align: center;
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
