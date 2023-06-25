import React, { useState, useEffect } from 'react'
import { ConfigProvider, App as AntdApp } from 'antd'
import { useTranslation } from 'react-i18next'
import { RouterProvider, type RouteObject } from 'react-router-dom'
import { setMenuData, setMenuDataDone } from '@/store/menuDataSlice'
import type { MenuDataItemType } from '@/views/personal-center/types'
import { setUserInfo } from '@/store/userInfoSlice'
import { setColorPrimary } from '@/store/themeSlice'
import baseRoutes from '@/router/baseRoutes'
import router from '@/router'
import { lazyLoad, getChildrenPath } from '@/router/tools'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { themeLocalforage } from '@/storage/localforage'
import type { Locale } from 'antd/es/locale'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { isLogin } from '@/views/authenticate/servers'
import { getUserInfo, getMenu } from '@/views/personal-center/servers'
import NavigatePlus from '@/components/NavigatePlus'

const App = () => {
  const [locale, setLocal] = useState<Locale>()
  const { i18n } = useTranslation()
  const theme = useAppSelector((state) => state.theme)
  const menuData = useAppSelector((state) => state.menuData)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // 初始主题色
    themeLocalforage.get().then((themeColor) => {
      dispatch(setColorPrimary(themeColor))
    })
  }, [dispatch])

  useEffect(() => {
    isLogin()
      .then(async () => {
        // 已登录 初始菜单数据 用户信息
        const userInfoRes = await getUserInfo()
        const menuRes = await getMenu()
        // 更新redux内的菜单数据
        dispatch(setMenuData(menuRes.data))
        // 将redux内菜单数据获取状态设置为完成
        dispatch(setMenuDataDone(true))
        // 更新redux内的用户信息
        dispatch(setUserInfo(userInfoRes.data))
      })
      .catch(() => {
        // 将redux内菜单数据获取状态设置为完成
        dispatch(setMenuDataDone(true))
      })
  }, [dispatch])

  // 用户菜单数据生成动态路由
  useEffect(() => {
    const generateRoutes = (list: MenuDataItemType[], indexRoute?: RouteObject) => {
      const res: RouteObject[] = []
      if (indexRoute) {
        res.push(indexRoute)
      }
      list.forEach((record) => {
        const children = record.children
        if (children && children.length) {
          const redirectChild = children.find((child) => !child.hidden)
          let redirectRoute: RouteObject | undefined
          if (redirectChild && redirectChild.pageUrl) {
            redirectRoute = {
              index: true,
              element: <NavigatePlus to={{ id: redirectChild.pageUrl.split('/')[1] }} />
            }
          }
          res.push({
            id: record.name,
            path: getChildrenPath(record.path),
            children: generateRoutes(children, redirectRoute)
          })
        } else if (record.pageUrl) {
          const handle: Record<string, unknown> = { needAuth: true, menuName: record.name }
          if (record.hidden) handle.hidden = true
          res.push({
            id: record.pageUrl.split('/')[1],
            handle,
            path: getChildrenPath(record.path),
            element: lazyLoad(`${record.pageUrl}`)
          })
        }
      })
      return res
    }
    const routes = generateRoutes(menuData.data)
    // 将动态路由插入
    const insertTo = baseRoutes[0].children
    if (insertTo && insertTo.length) {
      baseRoutes[0].children = [insertTo[0], ...routes, insertTo[insertTo.length - 1]]
    }
    // 菜单获取状态为完成后
    if (menuData.done) {
      // 为404路由添加element
      baseRoutes[baseRoutes.length - 1].element = lazyLoad('sundry/NotFound')
      // 重设路由
      router._internalSetRoutes([...baseRoutes])
      // 触发重新匹配
      const { pathname, search, hash } = router.state.location
      router.navigate(pathname + search + hash, {
        replace: true
      })
    }
  }, [menuData])

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
