import React, { useState, useEffect } from 'react'
import { ConfigProvider, App as AntdApp } from 'antd'
import { useTranslation } from 'react-i18next'
import { useRoutes, type RouteObject } from 'react-router-dom'
import { setMenuData, setMenuDataDone } from '@/store/menuDataSlice'
import type { MenuDataItemType } from '@/views/personal-center/types'
import { setUserInfo } from '@/store/userInfoSlice'
import { setColorPrimary } from '@/store/themeSlice'
import baseRoutes from '@/router/baseRoutes'
import { lazyLoad } from '@/router/tools'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { colorPrimaryLocalforage } from '@/storage/localforage'
import type { Locale } from 'antd/es/locale'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { isLogin } from '@/views/authenticate/servers'
import { getUserInfo, getMenu } from '@/views/personal-center/servers'

const App = () => {
  const [routes, setRoutes] = useState<RouteObject[]>(baseRoutes)
  const [locale, setLocal] = useState<Locale>()
  const { i18n } = useTranslation()
  const theme = useAppSelector((state) => state.theme)
  const menuData = useAppSelector((state) => state.menuData)

  const dispatch = useAppDispatch()

  // 初始主题色
  useEffect(() => {
    colorPrimaryLocalforage.get().then((colorPrimary) => {
      if (colorPrimary) dispatch(setColorPrimary(colorPrimary))
    })
  }, [dispatch])

  useEffect(() => {
    isLogin()
      .then(async () => {
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
    const dynamicRoutes: RouteObject[] = []
    const generateRoutes = (list: MenuDataItemType[], parentPath?: string) => {
      list.forEach((record) => {
        if (record.children && record.children.length) {
          generateRoutes(record.children, `${parentPath ?? ''}${record.path}`)
        } else if (record.pageUrl) {
          dynamicRoutes.push({
            path: `${parentPath ?? ''}${record.path}`,
            element: lazyLoad(`${record.pageUrl}`)
          })
        }
      })
    }
    generateRoutes(menuData.data)
    // 动态路由在基础路由的首页及个人中心之间插入
    const insertTo = baseRoutes[0].children
    if (insertTo && insertTo.length) {
      baseRoutes[0].children = [insertTo[0], ...dynamicRoutes, insertTo[insertTo.length - 1]]
    }
    // 菜单获取状态为完成后 为404路由添加element
    if (menuData.done) baseRoutes[baseRoutes.length - 1].element = lazyLoad('sundry/NotFound')
    setRoutes([...baseRoutes])
  }, [menuData])

  const element = useRoutes(routes)

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
        {element}
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
