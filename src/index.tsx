import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import reportWebVitals from '@/reportWebVitals'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { Provider } from 'react-redux'
import store from '@/store'
import { BrowserRouter } from 'react-router-dom'
import '@/assets/style/global.less'
import '@/assets/style/transition.less'
import 'antd/dist/reset.css'
// TODO 文档中 增加登录流程 页面刷新流程 页面操作权限控制 等说明
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
