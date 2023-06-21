import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import reportWebVitals from '@/reportWebVitals'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { Provider } from 'react-redux'
import store from '@/store'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import 'antd/dist/reset.css'
import '@/global.style'
import '@/mock'
// TODO 面包屑 路由操作状态 路由keep-alive
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// 根据运行或部署环境是否支持history路由模式 选取不同路由模式及basename
let Router = BrowserRouter
let basename: string | undefined = process.env.PUBLIC_URL
if (process.env.REACT_APP_NOT_SUPPORT_HISTORY === 'true') {
  Router = HashRouter
  basename = undefined
}
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router basename={basename}>
          <App />
        </Router>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
