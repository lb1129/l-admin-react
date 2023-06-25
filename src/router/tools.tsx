import React, { lazy, Suspense } from 'react'
import { Spin } from 'antd'

export const loading = (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" />
  </div>
)

// views目录视图组件懒加载
export const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`@/views/${moduleName}`))
  return (
    <Suspense fallback={loading}>
      <Module />
    </Suspense>
  )
}

export const getChildrenPath = (path: string) => {
  if (/^\/.*/.test(path)) {
    return path.slice(1)
  }
  return path
}
