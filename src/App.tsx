import React, { useState, useEffect } from 'react'
import { ConfigProvider, App as AntdApp, type ThemeConfig } from 'antd'
import { useTranslation } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import type { Locale } from 'antd/es/locale'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const App = () => {
  // TODO setTheme 注入到子组件
  const [
    theme
    // setTheme
  ] = useState<ThemeConfig>({})

  const [locale, setLocal] = useState<Locale>()
  const { i18n } = useTranslation()

  useEffect(() => {
    switch (i18n.language) {
      case 'zh-CN':
        dayjs.locale('zh-cn')
        setLocal(zhCN)
        break
      case 'en':
        dayjs.locale('en')
        setLocal(enUS)
        break
    }
  }, [i18n.language])

  return (
    <ConfigProvider locale={locale} theme={theme} input={{ autoComplete: 'off' }}>
      <AntdApp
        style={{
          height: '100%'
        }}
      >
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
