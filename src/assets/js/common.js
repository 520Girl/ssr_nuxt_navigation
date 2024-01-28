// const CryptoJS = require('crypto-js'); //数据加密
// const analyze = require('rgbaster');//获取主题
// import store from '@/store/index'

//检测cookie
function getCookieValue(name) {
    let cookies = document.cookie;
		let list = cookies.split(";");          // 解析出名/值对列表
        for(let i in list) {
          let arr = list[i].replace(' ','').split("=");          // 解析出名和值
		  if(arr[0] == name) return decodeURIComponent(arr[1]);   // 对cookie值解码
		}
		return false
}

//添加cookie
function setUseCookies(name,value,expireTimesH){
	// 添加cookie,使用excape对字符串进行编码，使用unexcape反转
	let strCookie = name +"="+escape(value);
	let date = new Date();
	if(expireTimesH > 0){
			date.setTime(date.getTime() + expireTimesH*24*3600*1000);
			strCookie = strCookie + ";expires="+ date.toGMTString()
	}else if(expireTimesH < 0 ){
		   date.setTime(date.getTime() -1000)
			strCookie = strCookie + ";expires="+ date.toGMTString()
	}
	document.cookie = strCookie
}

//crypto加密解密
// const key= CryptoJS.enc.Utf8.parse('815842080RMB5205')//十六位十六进制数作为密钥
// const iv = CryptoJS.enc.Utf8.parse('CEDEFG1234123512');   //十六位十六进制数作为密钥偏移量
//解密方法
function Decrypt(word,key,iv) { //key[1] 八位 key[0] 一位
  if (!key){
    key = CryptoJS.enc.Utf8.parse('815842080RMB5205');
  }else {
    key= CryptoJS.enc.Utf8.parse(key[1]+'815842R'+key[0])
  }
  iv = CryptoJS.enc.Utf8.parse('CEDEFG1234123512');
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
//加密方法
function Encrypt(word,key,iv) {
  if (!key){
    key = CryptoJS.enc.Utf8.parse('815842080RMB5205');
  }else {
    key= CryptoJS.enc.Utf8.parse(key[1]+'815842R'+key[0])
  }
  iv = CryptoJS.enc.Utf8.parse('CEDEFG1234123512');
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}

//进一步加工接口返回的数据
const handleDecryptDate =(res)=>{
  let key = [],word=res.result.substring(2).replace(/[\n]/g, '')
  key[1]=Format(res.result.time)
  key[0]=res.result.substring(0,1)
  return JSON.parse(Decrypt(word,key))
}
// let key =[]
// key[1] = Format()
// key[0] = 5
// console.log(key)
// console.log(Encrypt(JSON.stringify({name:'55500'}),key))
// console.log(Decrypt(Encrypt(JSON.stringify({name:'55500'}).toUpperCase(),key),key))
//获取主题颜色
function rgbaster(imgUrl,opactiy =0.8,num=2){
  let results = []
  let arr = async ()=>{
    try{
      const result = await analyze(imgUrl, { ignore: [ 'rgb(255,255,255)', 'rgb(0,0,0)' ] }).then(res=>{return res})
      results = result
      return results
    }catch (e) {
      return e+imgUrl
    }
  }
  return arr().then(res=>{
    let obj ={color:[],count:[],colorArr:[],imgUrl:imgUrl}
    let rangeArr=[0,parseInt(res.length/4),parseInt(res.length/2),parseInt(res.length* (3/4))] //取四个数,方便后面的颜色配置
    console.log(rangeArr)
    for (let i = 0;i < num;i++){
      let colorRgb = res[rangeArr[i]].color.match(/\d+/g)
      obj.color[i] = `rgba(${colorRgb[0]},${colorRgb[1]},${colorRgb[2]},${opactiy})`
      obj.count[i] = rangeArr[i]
      obj.colorArr.push(colorRgb)
    }
    console.log(obj)
    return obj
  }).catch(err=>{
    console.log("图像加载出错"+err)
  })
}

//隐藏滚动条
function judegeScroll(oBox,oContent,scroller){
  //oBox 被滚动元素元素外框 oContent 被滚动的元素 scroller 滚动条
  // let contentHeight =  eleId.scrollHeight //元素总长度
  // eleIdScroll.style.height = (parseFloat( eleId.offsetHeight / contentHeight ).toFixed(2) * eleId.offsetHeight ).toFixed(2) + 'px' //滚动条高度

  //滚轮滚动----------------------------------------
  oBox = document.getElementById(oBox)
  oContent = document.getElementById(oContent)
  scroller = document.getElementById(scroller)
  scroller.style.height = parseInt(oBox.offsetHeight/oContent.offsetHeight * oBox.offsetHeight) + 'px'
  var dis_p = oContent.offsetHeight - oBox.offsetHeight; //p的高度减去box的高度
  var dis_span = oBox.offsetHeight - scroller.offsetHeight; //滑块移动距离

  //滚轮比率
  var wheel_rate = dis_span / dis_p;
  mouseWheel(oBox, function(dir) {
    if (dir) {
      var t = oContent.offsetTop - 30;
      if (t < -dis_p) t = -dis_p;
      oContent.style.top = t + 'px';
      scroller.style.top = -t * wheel_rate + 'px';
    } else {
      var t = oContent.offsetTop + 30;
      if (t > 0) t = 0;
      oContent.style.top = t + 'px';
      scroller.style.top = -t * wheel_rate + 'px';
    }
  });

  //封装滚轮事件-----------------------------------------------------
  function mouseWheel(obj, fn) { //封装滚轮
    if (window.navigator.userAgent.indexOf('Firefox') != -1) {
      obj.addEventListener('DOMMouseScroll', wheelFn, true);

    } else obj.onmousewheel = wheelFn;
    function wheelFn(ev) {
      if (dis_span == 0) {obj.removeEventListener('DOMMouseScroll',wheelFn);return false}
      ev = ev || event;
      var direct = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
      fn && fn(direct); //将direct作为参数传递出去
      if (window.event) { //IE
        ev.returnValue = false; //ie 阻止默认事件
        return false; //ie9 以上阻止
      } else {
        ev.preventDefault(); //阻止默认事件 firefox
      }
    };
  };

  //拖拽
  dragScroll(scroller,dis_span,dis_p,oContent)
}

//拖拽事件
function dragScroll(scroller,dis_span,dis_p,oContent){
  scroller.onmousedown = function(ev) {
    ev = ev || window.event;
    var mt = ev.clientY - this.offsetTop; //只取Y方向

    document.onmousemove = function(ev) {
      ev = ev || window.event;
      var t = ev.clientY - mt;
      if (t <= 0) t = 0; //限制顶部位置
      if (t >= dis_span - 2) t = dis_span; //限制底部位置
      //计算移动比率
      let move_rate = t / dis_span;
      oContent.style.top = -dis_p * move_rate + 'px'; //移动比率
      scroller.style.top = t + 'px';
    };
    document.onmouseup = function() {
      document.onmousemove = null;
    };
    return false; //阻止选中文字
  };
}

//滚动到顶部
const scrollClickTop=()=>{
  let scrollTop = Math.max(document.documentElement.scrollTop,document.body.scrollTop)
  let times,windowHeight = getScrollTop(),spend=10,time=10;
  times = setInterval(()=>{
    if (scrollTop > 1) {
      window.requestAnimationFrame(()=>{window.scrollTo(0,scrollTop -= scrollTop/spend,'smooth')})
    }else {
      clearInterval(times)
    }
  },time)
}

//y轴上滚动的距离
function getScrollTop(){
  var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  if(document.body){
    bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  }
  if(document.documentElement){
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}
//获取并设置语言，
function i18nLanguage (name='locale'){
  let localeCookie = getCookieValue(name)
  let localeSession = sessionStorage.getItem(name)
  let navigatorLocaale = navigator.language || navigator.userLanguage

  if (localeCookie){//cookie
    if (localeCookie.includes('zh') || localeCookie.includes('zh-CN')){
      return 'zh-CN,zh;q=0.8'
    }else if ('en'){
      return 'en;q=0.6'
    }
  }else if (localeSession){//session
    if(localeSession.includes('zh') || localeSession.includes('zh-CN')){
      return  'zh-CN,zh;q=0.8'
    }else if ('en'){
      return 'en;q=0.6'
    }
  }else if (navigatorLocaale){
    if (navigatorLocaale.includes('zh-CN') || navigatorLocaale.includes('zh') || navigatorLocaale.includes('zh_CN')){
      return 'zh-CN,zh;q=0.8'
    }else if ('en'){
      return 'en;q=0.6'
    }
  }else {
    return store.state.locale
  }
}

//获取服务器给的时间的 生成秘钥
function Format(time=new Date(),fmt='yyyyMMdd'){
    time = new Date(time)
    var o = {
      "M+": time.getMonth() + 1, //月份
      "d+": time.getDate(), //日
      "h+": time.getHours(), //小时
      "m+": time.getMinutes(), //分
      "s+": time.getSeconds(), //秒
      "q+": Math.floor((time.getMonth() + 3) / 3), //季度
      "S": time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//设置关键字颜色
function cruxText(text="美女",arr=["美女","美臀","走光","色情","视频","免费","女优"]){
  arr.some((item,index)=>{
    if (text.indexOf(item) > -1){
      let len = item.length;
      let texHT = `<span style="color:#f1404b">${item}</span>`
      text = `${text.substr(0,text.indexOf(item))}${texHT}${text.substr(text.indexOf(item)+len,text.length)}`
    }
  })
  return text
}

//获取屏幕的宽度高度
function getWindowHeightWidht(){
  if (window.innerWidth){
    return{
      width:window.innerWidth,
      height:window.innerHeight
    }
  }else if (document.compatMode === 'CSS1Compat'){
    return{
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }
  return{
    width: document.body.clientWidth,
    height: document.body.clientHeight
  }
}

//节流
const throttle = (fn,interval=300)=>{
  let that = this
  let run = true;
  return ()=>{
    if (!run) return;
    run = false;
    setTimeout(()=>{
      fn.apply(that,arguments)
      run = true;
    },interval)
  }
}

//防抖
const debounce = (fn,interval = 300)=>{
  let timeout = null;
  return (()=>{
    if(timeout){
      clearTimeout(timeout)
    }
    timeout = setTimeout(()=>{
      fn.apply(this,arguments)
    },interval)
  })()

}

// 跳转到新页面
const goto = (url)=>{
  if (!/(http|https|ftp)/.test(url)){
    url = `http://${url}`
  }
  window.open(url, '_blank');
  // window.location.href =
}

export default {
  getCookieValue,
  setUseCookies,
  Decrypt,
  Encrypt,
  rgbaster,
  judegeScroll,
  i18nLanguage,
  Format,
  handleDecryptDate,
  cruxText,
  getWindowHeightWidht,
  scrollClickTop,
  throttle,
  debounce,
  goto
}
