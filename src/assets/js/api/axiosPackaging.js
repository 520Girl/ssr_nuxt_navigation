
import reqModule from './reqModule'

// https://axios.nuxtjs.org/setup/ api
/*
* 请求失败后统一处理状态码 
* */
const errorHandle = (status, other) => {
  switch (status) {
    case 401: //未登陆请跳转到登陆页面
      console.log("未登陆！")
      break;
    case 403:
      console.log("登陆过期！")
      break;
    case 404:
      console.log("您请求的资源不存在！")
      break;
    default:
      console.log("对不起您在状况之外！")
  }
}

export default ({ $axios, store }, inject) => {

  $axios.defaults.timeout = 50000
  $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  if (process.env.NODE_ENV == 'development') {
    $axios.defaults.baseURL = '/api/api';
  } else if (process.env.NODE_ENV == 'debug') {
    $axios.defaults.baseURL = ''
  } else if (process.env.NODE_ENV == 'production') {
    $axios.defaults.baseURL = '/api'
  }
  $axios.interceptors.request.use(
    (config) => {
      if (process.client) { // 判断请求是否是登录接口
        // config.headers.token = localStorage.getItem("token"); // 如果不是登录接口，就给请求头里面设置token
        /*每一次请求将token携带传给后台，由后台判断token是否过期，返回状态码*/
        const token = store.state.token;
        config.headers.Authorization = token;
        return config
      }
      return config; // 返回这个配置对象，如果没有返回，这个请求就不会发送出去
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  // // 响应拦截器
  $axios.interceptors.response.use(
    (res) => {
      //这里是为了加密做处理,并且解密
      // res = decode_res_data(res)
      return res.status === 200 || 202 ? Promise.resolve(res.data) : Promise.reject(res)

      // 请求已发出，但是不在2xx的范围
      const { response } = error; //这个必须要输出才是一个对象
      errorHandle(response.status, response.data.msg);
      return Promise.reject(error);

    },
    (error) => {
      if (error) {
        // 请求已发出，但是不在2xx的范围
        const { response } = error; //这个必须要输出才是一个对象
        // errorHandle(response.status, response.data.msg);
        return Promise.reject(error);
      } else {
        if (!window.navigator.onLine) {
          console.log("恭喜您断网了！")
        } else {
          return Promise.reject(error);
        }
      }
    }
  )

  //将所有 api 放到 $axios.api
  // inject('api', indexApi(axiosConfig($axios.create())))
  // let util = new axiosUtil($axios);
  // $axios.api = util;
  // console.log(gradeCoin)
  // const API = {}
  // API.gradeCoin = gradeCoin
  inject('api', {...reqModule($axios)})
}