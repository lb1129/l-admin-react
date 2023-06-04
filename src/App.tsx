import React, { useState } from 'react'
import { ConfigProvider, App as AntdApp, type ThemeConfig } from 'antd'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'

const App = () => {
  // TODO setTheme 注入到子组件
  const [
    theme
    // setTheme
  ] = useState<ThemeConfig>({})
  return (
    <ConfigProvider theme={theme} input={{ autoComplete: 'off' }}>
      <AntdApp
        style={{
          height: '100%'
        }}
      >
        <I18nextProvider i18n={i18n}>
          <RouterProvider router={router} />
        </I18nextProvider>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
