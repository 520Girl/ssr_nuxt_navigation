import store from '~/store'
import { v4 as uuid } from 'uuid'

const handleBelong = (belong) => {
  switch (belong) {
    case "cartoon":
      return 'ca'
      break;
    case "blog":
      return 'bl'
      break;
    case "app":
      return 'ap'
      break;
    case "gradeCoin":
      return 'gr'
      break;
    case "website":
      return 'wb'
      break;
  }
}

export default {
  focus: { // 获取焦点
    inserted: function (el, { value }) { //value 为绑定的值v-focus="value"
      el.focus();
      // console.log(el)
      // if (value) {
      //   el.focus();
      // }
    }
  },
  clickData: { //读取点击事件确定 访问过什么，用于数据展示
    inserted: function (el, { value }) {
      el.addEventListener('click', () => {
        const vuexStore = window.$nuxt.$store
        let obj = {
          name: value.name || document.title,
          hrefUrl: value.hrefUrl || window.location.href,
          imgUrl: value.imgUrl,
          onlineTime: Date.now(),
          id: uuid()
        }
        let params = { t: { "e": 1 }, b: handleBelong(value.belong), i: value.id, u: value.hrefUrl, tt: value.name }
        let status = false //判断是否访问过
        try {
          const clickData = JSON.parse(decodeURI(localStorage.getItem('clickData')))
          if (clickData && clickData instanceof Array) {
            //判断是否数据相同 相同更新时间
            for (const [i, v] of clickData.entries()) {
              if (v.name === obj.name) {
                clickData.splice(i, 1)
                status = true
              }
              if (v.name === obj.name && (obj.onlineTime - v.onlineTime) >= 86400000 * store.state.webBase.saveTime) {
                clickData.splice(i, 1)
                vuexStore.dispatch('clickLike/askAddData', params)
                status = true
              }
            }
            let newData = clickData
            newData.push(obj)
            obj = newData
          } else {
            obj = [obj]
          }
          //! 如果没有添加过就 请求添加访问数据
          if (!status) {
            vuexStore.dispatch('clickLike/askAddData', params)
          }
          localStorage.setItem('clickData', encodeURI(JSON.stringify(obj)))
          vuexStore.commit('clickData', obj)
        } catch (e) { //当发现数据出现问题时直接将数据清空
          localStorage.removeItem('clickData',)
          vuexStore.commit('clickData', [])
        }
      })

    },
  },
  goto: {
    bind(el, binding) {
      // console.log("--------------------")
      // console.log(binding)
      window.open(binding.value, '_block')
    },
    update() { },
    unbind() { }
  },
  clickLike: { // 实现点赞，评星 等功能 ,添加禁止点击事件
    inserted: function (el, { value }) {
      el.addEventListener('click', () => {
        const vuexStore = window.$nuxt.$store
        el.style.color = 'yellow'
    
        // vuexStore.dispatch('clickLike/addData', value)
        vuexStore.dispatch('clickLike/addData',value)
        let obj = { t: {}, b: value.belong, i: value.id, u: value.url, tt: value.title }
        el.classList.add('form-onlyRead')
        //请求接口数据
        obj.i = value.id
        obj.b = handleBelong(value.belong)
        //判断是什么类型的数据请求
        switch (value.type) {
          case "DN":
            break;
          case "LL": //评分
            el.querySelector('.fontSize-like').classList.add('scoreTagI')
            obj.type.s = value.price
            break;
          case "HN": //点赞
            el.querySelector('.fontSize-like').classList.add('headerTagI')
            obj.t.h = 1
            vuexStore.dispatch('clickLike/askAddData', obj)
            break;
          case "EN": //观看
            el.querySelector('.fontSize-like').classList.add('eyeTagI')
            obj.type.e = 1
            break;
        }
      })
    },
    bind: function (el, { value }) { // 从内存中读取出点击数据，进行出来，渲染当是DN下载数据时不添加禁止点击事件
      const vuexStore = window.$nuxt.$store
      let likeData = vuexStore.getters['clickLike/appMapData']
      console.log('likeData',likeData, value,el)
      if (likeData.has(value.id)) {

        if (!value.belong.includes('DN') && likeData.get(value.id).includes(value.belong)) {
           el.style.color = 'yellow'
          switch (value.type) {
            case "DN":
              break;
            case "HN":
              // el.querySelector('.fontSize-icon')?.classList.add('eyeTagI')
              el.classList.add('form-onlyRead','eyeTagI')
              break;
            case "EN":
              // el.querySelector('.fontSize-icon')?.classList.add('headerTagI')
              el.classList.add('form-onlyRead','headerTagI')
              break;
            case "HN": //点赞
              // el.querySelector('.fontSize-like')?.classList.add('headerTagI')
              el.classList.add('form-onlyRead','headerTagI')
              break;
          }

        }
      }
    }
  }
}
