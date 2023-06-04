import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zhCN from './resources/zh-CN'
import en from './resources/en'

i18n.use(initReactI18next).init({
  resources: {
    en: en,
    'zh-CN': zhCN
  },
  lng: 'zh-CN',
  fallbackLng: 'zh-CN',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
