<template>
  <router-link :to="{path:pathName,query:this.$route.name == 'image' ? '' : {tag:encodeURI(tagValue)}}" tag="div" class="tag" :style="'color:'+currentColor[0]+';'+'background-color:'+currentColor[1]">
    <span >{{tagValue}}</span>
  </router-link>
</template>

<script>
export default {
name: "randomTag",
  props:{
    tagValue:{type:[Number,String],default:'',required:''},
    pathName:{type:String,default: '',required:false}
  },
  data(){
    return{
      color:[
        ['#05c1ff','#05c1ff42'],
        ['#39c408','#39c40826'],
        ['#ffab05','#ffab0540'],
        ['#837adc','#847adc26'],
        ["#f1404b","#f9645a26"],
        ["#eb2f96","#eb2f9626"],
        ["#ffbb96","#ffbb9626"],
        ["#ff9900","#ff990026"],
        ["#515a6e","#79809026"],
        ["#07bdd0","#07bdd026"],
        ["#d007ae","#d007ae26"],
        ["#d00748","#d0074826"],
        ["#00ff01","#00ff0126"],
      ],
      currentColor:[]
    }
  },
  mounted() {
    this.randomColor()
  },
  methods:{
    randomColor(){
      let randomNum = Math.floor(Math.random() * this.color.length)
      this.currentColor = this.color[randomNum]
    }
  },
  filters:{
    queryuUrl:function (tag){

    }
  }
}
</script>

<style scoped lang="scss">
  .tag{
    display: inline-block;
    border-radius: 25px;
    background-color: #171616;
    margin-right: 5px;
    padding: 5px 9px;
    color: #dc4141;
    cursor: pointer;
    &:hover{
      opacity: 0.85;
      transform: scale(1.1);
      transition: all .25s;
    }
    span{
      font-size: 12px;
    }
  }
</style>
