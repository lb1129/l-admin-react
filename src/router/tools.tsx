import React, { lazy, useEffect, useState } from 'react'
import { Spin } from 'antd'
import { Navigate } from 'react-router-dom'
import isAuthenticated from '@/router/isAuthenticated'

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
  // 是否需要身份验证
  needAuth?: boolean
}
export const Authenticate = ({ children, needAuth }: AuthenticateProps) => {
  const [res, setRes] = useState<JSX.Element>(loading)
  useEffect(() => {
    isAuthenticated.value
      .then(() => {
        if (needAuth === false) setRes(<Navigate to="/" replace />)
        else setRes(children)
      })
      .catch(() => {
        if (needAuth === true) setRes(<Navigate to="/login" replace />)
        else setRes(children)
      })
  }, [children, needAuth])
  return res
}
