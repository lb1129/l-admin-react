import React, { lazy, useState } from 'react'
import { Spin } from 'antd'
import { Navigate } from 'react-router-dom'
import { tokenLocalforage } from '@/storage/localforage'

export const loading = (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" />
  </div>
)

// views目录视图组件懒加载
export const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`@/views/${moduleName}`))
  return (
    <React.Suspense fallback={loading}>
      <Module />
    </React.Suspense>
  )
}

// 身份验证 自动导航组件
interface AuthenticateProps {
  children: JSX.Element
  // 是否不需要身份验证 例如 登录 注册 忘记密码
  noNeedAuth?: boolean
}
export const Authenticate = ({ children, noNeedAuth }: AuthenticateProps) => {
  const [res, setRes] = useState<JSX.Element>(loading)
  tokenLocalforage.get().then((token) => {
    // mock 是否已登录校验流程
    if (token) {
      // 校验token是否有效
      setTimeout(() => {
        // 假设都有效
        if (noNeedAuth) setRes(<Navigate to="/" replace />)
        else setRes(children)
      }, 500)
    } else {
      if (noNeedAuth) setRes(children)
      else setRes(<Navigate to="/login" replace />)
    }
  })
  return res
}
