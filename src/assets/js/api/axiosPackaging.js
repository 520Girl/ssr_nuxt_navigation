// import store from '@/store/index';
// import common from "@/assets/js/common";
import decode_res_data from "@/assets/js/decode_res_data";
import reqApi from "@/assets/js/api/reqModule";
import { NGINX_SERVER_IP} from "../constant";

export default ({app, $axios, store, redirect},inject) => {
//创建一个axios 实例  ,设置默认post请求头 ，跨域请求时是否默认携带cookie
  const instance = $axios.create({timeout: 5000}) //超时时间为1000ms
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  // instance.defaults.headers['Accept-Language'] = common.i18nLanguage()
  instance.defaults.withCredentials = true
  if (process.env.NODE_ENV === 'development') {
    if (process.server){
      instance.defaults.baseURL = 'http://localhost:3000/api';
    }else{
      instance.defaults.baseURL = '/api/api';
    }
  } else if (process.env.NODE_ENV === 'debug') {
    instance.defaults.baseURL = ' '
  } else if (process.env.NODE_ENV === 'production') {
    if (process.server){
      instance.defaults.baseURL = 'https://navai.vip/api';
    }else{
      instance.defaults.baseURL = '/api'
    }
  }
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
  /*
  *对请求头做携带token处理
  * */
  instance.interceptors.request.use(
    (req) => {
      /*每一次请求将token携带传给后台，由后台判断token是否过期，返回状态码*/
      const token = store.state.token;
      req.headers.Authorization = token;
      req.headers['ip-forwarded-for'] = req.headers['x-real-ip'] = NGINX_SERVER_IP.ip;
      return req
    },
    error => {
      return Promise.reject(error);
    }
  )

  /*
  * 对响应头拦截做处理
  * */
  instance.interceptors.response.use(
    (res) => {
      //这里是为了加密做处理,并且解密
      res = decode_res_data(res,redirect)
      return res.status === 200 || 202 ? Promise.resolve(res.data) : Promise.reject(res)
    },
    error => {
      if (error) {
        // 请求已发出，但是不在2xx的范围
        if (Object.prototype.toString.call(error) === '[object Object]' && 'response' in error && error.response.status){
          const {response} = error; //这个必须要输出才是一个对象
          errorHandle(response.status, response.data.msg);
        }
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
  const API = reqApi(instance)
  inject('api',API)
}
