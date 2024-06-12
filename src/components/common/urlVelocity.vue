<template>
      <Tag :color="color">
            <time>{{urlItems}}</time>
            <Spin fix v-show="loading">
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
      </Tag>
</template>
<script>
    export default {
      name:'urlVelocity',
      props:{
        url:{type:String,default:process.browser ? window.location.href : ''}
      },
      data(){
        return{
            urlItems:'',
            color:'cyan',
            loading:true,
        }
      },
      mounted() {
        this.getSpeedWithImg(this.url).then((resolve)=>{
          this.urlItems = resolve
          this.loading = false
          if (resolve <= 500){
            this.color = 'green'
          }else if (resolve>=500 && resolve<=1000) {
            this.color = 'orange'
          }else (
            this.color ='red'
          )
        })
      },
      methods:{
        getSpeedWithImg(imgUrl) {
          return new Promise((resolve, reject) => {
            let start,end = null;
            let img = document.createElement('img');
            start = new Date().getTime();
              img.onerror = function (e) {
                  end = new Date().getTime();
                // const speed = (fileSize * 1000) / (end - start) //kb
                const speed = (end - start)
                resolve(speed);
              }

            img.src = `${imgUrl}/${Math.random()}`;
          }).catch(err => { throw err });
        }
      }
    }
</script>
