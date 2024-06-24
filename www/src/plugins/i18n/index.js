import Vue from 'vue'
import zh from './language/zh-CN'
import en from './language/en'


export default {
  defaultLocale: 'zh',
  // 根据项目情况，酌情配置
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English'
    },
    {
      code: 'zh',
      iso: 'zh-CN',
      name: '中文'
    }
  ],
  vueI18n: {
    fallbackLocale: 'zh',
    messages: {
      en: Object.assign(en, process.client ? `${require('iview/dist/locale/en-US')}` : ''),
      zh: Object.assign(zh, process.client ? `${require('iview/dist/locale/zh-CN')}` : '')
    }
  },
  // 浏览器语言检测
  detectBrowserLanguage: {
    useCookie: true
    // onlyOnRoot: true
  }
}

