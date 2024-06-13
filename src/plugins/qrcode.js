// import html2canvas from 'html2canvas'
// import QRCode from 'qrcodejs2'
// import Vue from 'vue'
// Vue.use(QRCode,html2canvas)

import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2'
import Vue from 'vue'
Vue.prototype.$qrcode = QRCode
Vue.prototype.$html2canvas = html2canvas
// 使用的时候需要导入 qrcode 组件
