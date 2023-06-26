import React, { useState, useEffect, createRef, lazy, useMemo } from 'react'
import logoSvg from '@/assets/image/logo.svg'
import userPng from '@/assets/image/user.png'
import { HomeOutlined, UserOutlined, BgColorsOutlined, FolderOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, Dropdown, Avatar, App, ColorPicker } from 'antd'
import { useOutlet, useNavigate, useMatches } from 'react-router-dom'
import ToggleLanguage from '@/components/ToggleLanguage'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setColorPrimary } from '@/store/themeSlice'
import { RouteOperateState } from '@/store/routeOperateState'
import type { MenuDataItemType } from '@/views/personal-center/types'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import useIndexStyles from './Index.style'
import { MenuItemType, SubMenuType } from 'antd/es/menu/hooks/useItems'
import { tokenLocalforage } from '@/storage/localforage'
import { useTranslation } from 'react-i18next'
import { logout } from '@/views/authenticate/servers'
import LinkPlus from '@/components/LinkPlus'

const { Header, Content, Sider } = Layout

type MenuItem = MenuItemType | SubMenuType

const Index = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [collapsed, setCollapsed] = useState(false)
  const [delayedOutlet, setDelayedOutlet] = useState<React.ReactNode>()
  const styles = useIndexStyles()

  const navigate = useNavigate()
  const matches = useMatches()
  const { modal, message } = App.useApp()

  const colorPrimary = useAppSelector((state) => state.theme.token?.colorPrimary)
  const menuData = useAppSelector((state) => state.menuData.data)
  const userInfo = useAppSelector((state) => state.userInfo)
  const routeOperateState = useAppSelector((state) => state.routeOperateState)
  const transitionKey = useAppSelector((state) => state.transitionKey)
  const breadcrumb = useAppSelector((state) => state.breadcrumb)
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  useEffect(() => {
    // 左侧菜单选中项与路由联动
    setSelectedKeys([matches[matches.length - 1].id])
    // 左侧菜单打开项与路由联动
    if (!collapsed) {
      setOpenKeys(matches.slice(1, -1).map((item) => item.id))
    }
  }, [matches, collapsed])

  // 结合Transtion使用
  const currentOutlet = useOutlet()
  const nodeRef = createRef<HTMLDivElement>()

  // 延后的outlet 确保路由动画正常执行
  useEffect(() => {
    setTimeout(() => {
      setDelayedOutlet(currentOutlet)
    })
    // 仅依赖路由变更 currentOutlet 每次返回都不是同一个引用 会导致无限循环
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches])

  // 用户菜单数据生成菜单组件items
  useEffect(() => {
    const generateMenuItems = (list: MenuDataItemType[], parent?: MenuDataItemType) => {
      let result: MenuItem[] = []
      list.forEach((menu) => {
        if (menu.children && menu.children.length) {
          let icon = <FolderOutlined />
          // 图标动态加载
          if (menu.icon) {
            const Module = lazy(() => import(`@ant-design/icons/lib/icons/${menu.icon}.js`))
            icon = (
              <React.Suspense fallback={<FolderOutlined />}>
                <Module />
              </React.Suspense>
            )
          }
          result.push({
            key: menu.name,
            icon,
            label: t(menu.name),
            children: generateMenuItems(menu.children, menu)
          })
        } else {
          if (!menu.hidden) {
            result.push({
              key: menu.pageUrl!.split('/')[1],
              label: t(menu.name)
            })
          }
        }
      })
      return result
    }
    setMenuItems([
      {
        key: 'Home',
        icon: <HomeOutlined />,
        label: t('homePage')
      },
      ...generateMenuItems(menuData),
      {
        key: 'PersonalCenter',
        icon: <UserOutlined />,
        label: t('personalCenter')
      }
    ])
  }, [menuData, t])

  // 路由动画
  const transitionName = useMemo(() => {
    return routeOperateState === RouteOperateState.forward
      ? 'slide-left'
      : routeOperateState === RouteOperateState.back
      ? 'slide-right'
      : 'fade'
  }, [routeOperateState])

  // 面包屑
  const breadcrumbItems = useMemo(() => {
    return breadcrumb.map((item, index) => ({
      title:
        index === breadcrumb.length - 1 ? (
          t(item.menuName)
        ) : (
          <LinkPlus to={index + 1 - breadcrumb.length}>{t(item.menuName)}</LinkPlus>
        )
    }))
  }, [breadcrumb, t])

  return (
    <Layout className={styles.wrap}>
      <Header className={styles.header}>
        <div className={styles.headerLogo}>
          <a href={process.env.REACT_APP_NOT_SUPPORT_HISTORY === 'false' ? '/' : '#/'}>
            <img src={logoSvg} alt="logo" />
            {process.env.REACT_APP_SYSTEM_NAME}
          </a>
        </div>
        <div className={styles.headerCenter}></div>
        <div className={styles.headerRight}>
          <ColorPicker
            trigger="hover"
            value={colorPrimary}
            onChange={(value, hex) => {
              dispatch(setColorPrimary(hex))
            }}
            presets={[
              {
                label: t('builtInThemes'),
                colors: [
                  '#1677ff',
                  '#f5222d',
                  '#fa541c',
                  '#faad14',
                  '#13c2c2',
                  '#52c41a',
                  '#2f54eb',
                  '#722ed1'
                ]
              }
            ]}
          >
            <BgColorsOutlined style={{ fontSize: '16px' }} className={styles.headerRightItem} />
          </ColorPicker>
          <Dropdown
            menu={{
              items: [
                {
                  label: <span>{t('personalCenter')}</span>,
                  key: 'personalCenter',
                  onClick() {
                    navigate({
                      id: 'PersonalCenter'
                    })
                  }
                },
                {
                  type: 'divider'
                },
                {
                  label: <span>{t('logOut')}</span>,
                  key: 'logOut',
                  onClick() {
                    modal.confirm({
                      title: t('tip'),
                      content: t('areYouSureToLogOut'),
                      onOk: async () => {
                        message.loading(t('signingOutPleaseWait'), 0)
                        try {
                          await logout()
                          await tokenLocalforage.clear()
                          message.destroy()
                          navigate({
                            id: 'Login',
                            replace: true
                          })
                        } catch (error) {
                          message.destroy()
                        }
                      }
                    })
                  }
                }
              ]
            }}
          >
            <span className={`${styles.headerRightItem} ${styles.headerRightItemUser}`}>
              <Avatar size="small" src={userPng} />
              <span style={{ marginLeft: '8px' }}>{userInfo.userName}</span>
            </span>
          </Dropdown>
          <ToggleLanguage className={styles.headerRightItem} />
        </div>
      </Header>
      <Layout>
        <Sider
          breakpoint="md"
          onCollapse={(collapsed) => {
            setCollapsed(collapsed)
          }}
          collapsible
          collapsedWidth={48}
          width={208}
          theme="light"
        >
          <div className={styles.sliderContent}>
            <Menu
              mode="inline"
              onClick={(menuInfo) => {
                navigate({
                  id: menuInfo.key
                })
              }}
              selectedKeys={selectedKeys}
              onSelect={(info) => {
                setSelectedKeys([info.key])
              }}
              openKeys={openKeys}
              onOpenChange={(keys) => {
                setOpenKeys(keys)
              }}
              items={menuItems}
            />
          </div>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems}></Breadcrumb>
          <Content className={styles.content}>
            <SwitchTransition>
              <CSSTransition
                nodeRef={nodeRef}
                key={transitionKey}
                timeout={300}
                classNames={transitionName}
              >
                <div style={{ height: '100%' }} ref={nodeRef}>
                  {delayedOutlet}
                </div>
              </CSSTransition>
            </SwitchTransition>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Index
