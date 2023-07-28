import React, { lazy, Suspense, useState, useEffect } from 'react'
import isAuthenticated from './isAuthenticated'
import NavigatePlus from '@/components/NavigatePlus'
import PageLoading from '@/components/PageLoading'

// views目录视图组件懒加载
export const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`@/views/${moduleName}`))
  return (
    <Suspense fallback={<PageLoading />}>
      <Module />
    </Suspense>
  )
}

// 是否已登录路由跳转控制
export const Authenticate = ({
  children,
  needAuth
}: {
  children: JSX.Element
  needAuth?: boolean
}) => {
  const [res, setRes] = useState<JSX.Element>(<PageLoading />)
  useEffect(() => {
    isAuthenticated.value
      .then(() => {
        if (needAuth === false) setRes(<NavigatePlus to={{ id: 'Index' }} replace />)
        else setRes(children)
      })
      .catch(() => {
        if (needAuth === true) setRes(<NavigatePlus to={{ id: 'Login' }} replace />)
        else setRes(children)
      })
  }, [children, needAuth])
  return res
}

export const getChildrenPath = (path: string) => {
  if (/^\/.*/.test(path)) {
    return path.slice(1)
  }
  return path
}
