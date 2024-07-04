import store from '~/store'
import { v4 as uuid } from 'uuid'

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
        let obj = {
          name: value.name || document.title,
          hrefUrl: value.hrefUrl || window.location.href,
          imgUrl: value.imgUrl,
          onlineTime: Date.now(),
          id: uuid()
        }
        try {
          const clickData = JSON.parse(decodeURI(localStorage.getItem('clickData')))
          if (clickData && clickData instanceof Array) {
            //判断是否数据相同 相同更新时间
            for (const [i, v] of clickData.entries()) {
              if (v.name === obj.name) {
                clickData.splice(i, 1)
              }
            }
            let newData = clickData
            newData.push(obj)
            obj = newData
          } else {
            obj = [obj]
          }
          localStorage.setItem('clickData', encodeURI(JSON.stringify(obj)))
          store().commit('clickData', obj)
        } catch (e) { //当发现数据出现问题时直接将数据清空
          localStorage.removeItem('clickData',)
          store().commit('clickData', [])
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
        store().dispatch('clickLike/addData', value)
        el.classList.add('form-onlyRead')
      })
    },
    bind: function (el, { value }) { // 从内存中读取出点击数据，进行出来，渲染当是DN下载数据时不添加禁止点击事件
      let likeData = store().getters['clickLike/appMapData']
      // console.log(likeData, value)
      if (likeData.has(value.id)) {

        if (!value.belong.includes('DN') && likeData.get(value.id).includes(value.belong)) {
          switch (value.belong) {
            case "DN":
              break;
            case "HN":
              el.querySelector('.fontSize-icon').classList.add('eyeTagI')
              el.classList.add('form-onlyRead')
              break;
            case "EN":
              el.querySelector('.fontSize-icon').classList.add('headerTagI')
              el.classList.add('form-onlyRead')
              break;
          }

        }
      }
    }
  }
}
