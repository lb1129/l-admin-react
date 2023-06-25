import {
  createBrowserRouter,
  createHashRouter,
  generatePath,
  createSearchParams,
  type To
} from 'react-router-dom'
import type { RouterNavigateOptions, AgnosticDataRouteObject } from '@remix-run/router'
import baseRoutes from './baseRoutes'
import store from '@/store'
import { setBreadcrumb } from '@/store/breadcrumb'
import { getChildrenPath } from './tools'

// 根据运行或部署环境是否支持history路由模式 选取不同路由模式及basename
let createRouter = createBrowserRouter
let basename: string | undefined = process.env.PUBLIC_URL
if (process.env.REACT_APP_NOT_SUPPORT_HISTORY === 'true') {
  createRouter = createHashRouter
  basename = undefined
}
const router = createRouter(baseRoutes, { basename })

export interface NavigateByIdOptions {
  id: string
  query?: {}
  params?: {}
  replace?: boolean
}

export const getRouteById = (id: string) => {
  let iterativeRoutes = [...router.routes]
  let route
  let path: AgnosticDataRouteObject[] = []
  while (iterativeRoutes.length) {
    const record = iterativeRoutes.shift() as AgnosticDataRouteObject
    if (
      path.length &&
      path[path.length - 1].children?.findIndex((child) => child.id === record.id) === -1
    )
      path = []
    if (record.id === id) {
      path.push(record)
      route = record
      break
    } else {
      const children = record.children
      if (children && children.length) {
        path.push(record)
        iterativeRoutes = [...children, ...iterativeRoutes]
      }
    }
  }
  return {
    route,
    path
  }
}

export const getPathstring = (path: AgnosticDataRouteObject[]) => {
  let result = ''
  path.forEach((item) => {
    result += `/${getChildrenPath(item.path ?? '')}`
  })
  return result
}

export const getFullPath = (opts: NavigateByIdOptions) => {
  const { id, query, params } = opts
  const { path } = getRouteById(id)
  let fullPath = getPathstring(path)
  if (fullPath) {
    // 处理params
    if (params) fullPath = generatePath(fullPath, params)
    // 处理query
    if (query) {
      const routeQuery = createSearchParams(query)
      fullPath = `${fullPath}?${routeQuery.toString()}`
    }
  }
  return fullPath
}

// 路由开始跳转后触发的监听 只能做后置处理
router.subscribe((state) => {
  console.log(state)
  // 面包屑
  const currentRoute = state.matches.slice(-1)[0].route
  let breadcrumb =
    currentRoute.handle && currentRoute.handle.menuName
      ? [
          {
            routeName: currentRoute.id,
            menuName: currentRoute.handle.menuName
          }
        ]
      : []
  const toHistory = createSearchParams(state.location.search).get('history') as string
  if (toHistory) {
    breadcrumb = toHistory
      .split(',')
      .map((history) => {
        const { route } = getRouteById(history)
        return {
          routeName: history,
          menuName: route?.handle.menuName
        }
      })
      .concat(breadcrumb)
  }
  store.dispatch(setBreadcrumb(breadcrumb))
})

// 重写navigate
const { navigate } = router
router.navigate = (to: To | null | number | NavigateByIdOptions, opts?: RouterNavigateOptions) => {
  if (typeof to === 'number') return navigate(to)
  // 支持路由id跳转
  if ((to as NavigateByIdOptions).id) {
    const { id, query, params, replace } = to as NavigateByIdOptions
    // 获取pathname
    const { path, route } = getRouteById(id)
    let pathString = getPathstring(path)
    const pathname = generatePath(pathString, params)
    // 处理query search
    const currentRoute = router.state.matches[router.state.matches.length - 1].route
    const currentRouteQuery = createSearchParams(router.state.location.search)
    const currentRouteQueryHistory = currentRouteQuery.get('history')
    // url上携带历史记录
    const routeQuery = createSearchParams(query)
    if (route && route.handle.hidden) {
      routeQuery.set(
        'history',
        currentRouteQueryHistory
          ? `${currentRouteQueryHistory},${currentRoute.id}`
          : currentRoute.id
      )
    }
    return navigate(
      {
        pathname,
        search: routeQuery.toString()
      },
      {
        replace
      }
    )
  }
  return navigate(to as To, opts)
}

export default router
