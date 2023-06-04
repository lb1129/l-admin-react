import React, { useState, useEffect } from 'react'
import { ConfigProvider, App as AntdApp } from 'antd'
import { useTranslation } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { useAppSelector } from '@/store/hook'
import type { Locale } from 'antd/es/locale'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const App = () => {
  const [locale, setLocal] = useState<Locale>()
  const { i18n } = useTranslation()
  const theme = useAppSelector((state) => state.theme)

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
