import React, { useState } from 'react'
import { ConfigProvider, App as AntdApp, type ThemeConfig } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from './router'

const App = () => {
  // TODO setTheme 注入到子组件
  const [
    theme
    // setTheme
  ] = useState<ThemeConfig>({})
  return (
    <ConfigProvider theme={theme}>
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
