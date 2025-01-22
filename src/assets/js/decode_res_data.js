import { Decrypt, Format } from '@/assets/js/common';

//处理后端 传过来的加密数据
export default (res, redirect) => {
  try {

    //将后端返回的结果进行处理
    // let data ={};
    // data.result = res.data;
    // data.time=res.headers.date
    // res.data = data
    // let key = [],word=res.result.substring(2).replace(/[\n]/g, '')
    // key[1]=Format(res.result.time)
    // key[0]=res.result.substring(0,1)
    // return JSON.parse(Decrypt(word,key))

    //1.判断是请求的是什么方法，从而的到响应头{'user':{content:....},msg:'',status:1}
    let resData = ["gradeCoins", "user", "comment", "cartoon", "blog", "app", "image", "website", "userInfo", 'slide', 'bulletin', 'news', 'common']
    let headerValue = 'user'
    for (let item of resData) {
      if (res.config.url.includes(item)) { headerValue = item }
    }
    //1.2 判断数据是否加密
    if (res.data[headerValue].content && Array.isArray(res.data[headerValue].content) ||
      Object.prototype.toString.call(res.data[headerValue].content) === '[object Object]') {
      return res
    }
    //2. 组装秘钥的到数据
    let [key, word] = [
      [res.data[headerValue].content.substring(0, 1), Format(res.headers.date)],
      res.data[headerValue].content.substring(2).replace(/[\n]/g, '')
    ]
    //3.
    console.log()
    res.data[headerValue].content = JSON.parse(Decrypt(word, key))
    return res
  } catch (e) {
    console.log(e)
    redirect('/error')
  }
}
