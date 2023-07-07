import React, {
  useState,
  useEffect,
  // createRef,
  lazy,
  useMemo
} from 'react'
import logoSvg from '@/assets/image/logo.svg'
import userPng from '@/assets/image/user.png'
import { HomeOutlined, UserOutlined, BgColorsOutlined, FolderOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, Dropdown, Avatar, App, ColorPicker, BreadcrumbProps } from 'antd'
import { useOutlet, useNavigate, useMatches } from 'react-router-dom'
import ToggleLanguage from '@/components/ToggleLanguage'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setColorPrimary } from '@/store/themeSlice'
import type { MenuDataItemType } from '@/views/personal-center/types'
// import { CSSTransition, SwitchTransition } from 'react-transition-group'
import useIndexStyles from './Index.style'
import { MenuItemType, SubMenuType } from 'antd/es/menu/hooks/useItems'
import { tokenLocalforage } from '@/storage/localforage'
import { useTranslation } from 'react-i18next'
import { logout } from '@/views/authenticate/servers'
import LinkPlus from '@/components/LinkPlus'
import KeepAlive, { AliveScope } from '@/components/KeepAlive'

const { Header, Content, Sider } = Layout

type MenuItem = MenuItemType | SubMenuType

const Index = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [collapsed, setCollapsed] = useState(false)
  const [currentRouteId, setCurrentRouteId] = useState('')
  const [keepAliveInclude, setKeepAliveInclude] = useState<string[]>([])
  const styles = useIndexStyles()

  const navigate = useNavigate()
  const matches = useMatches()
  const { modal, message } = App.useApp()

  const colorPrimary = useAppSelector((state) => state.theme.token?.colorPrimary)
  const menuData = useAppSelector((state) => state.menuData.data)
  const userInfo = useAppSelector((state) => state.userInfo)
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

  // 结合KeepAlive | Transtion使用
  const currentOutlet = useOutlet()
  // const nodeRef = createRef<HTMLDivElement>()

  // 用户菜单数据生成菜单组件items
  useEffect(() => {
    const generateMenuItems = (list: MenuDataItemType[], parent?: MenuDataItemType) => {
      let result: MenuItem[] = []
      list.forEach((menu) => {
        if (menu.children && menu.children.length) {
          let icon = <FolderOutlined />
          // 图标动态加载
          if (menu.icon) {
            const Module = lazy(() => import(`@ant-design/icons/es/icons/${menu.icon}.js`))
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

  // 面包屑
  const breadcrumbItems = useMemo(() => {
    const arr = matches.slice(1)
    let result: BreadcrumbProps['items'] = []
    arr.forEach((item, index) => {
      const handle = item.handle as any
      if (handle && result) {
        result.push({
          title:
            index < arr.length - 1 ? (
              <LinkPlus to={{ id: item.id }}>{t(handle.menuName)}</LinkPlus>
            ) : (
              t(handle.menuName)
            )
        })
      }
    })
    return result
  }, [t, matches])

  useEffect(() => {
    const route = matches[matches.length - 1]
    if (route.handle && !(route.handle as Record<string, unknown>).hidden) {
      setKeepAliveInclude([route.id])
    }
    setCurrentRouteId(route.id)
    // 如果开启动画 延后设置
    // setTimeout(() => {
    //   setCurrentRouteId(route.id)
    // })
  }, [matches])

  return (
    <AliveScope>
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
              {/* <SwitchTransition>
                <CSSTransition
                  nodeRef={nodeRef}
                  key={currentRouteId}
                  timeout={300}
                  classNames="fade"
                >
                  <div style={{ height: '100%' }} ref={nodeRef}> */}
              <KeepAlive include={keepAliveInclude} id={currentRouteId}>
                {currentOutlet}
              </KeepAlive>
              {/* </div>
                </CSSTransition>
              </SwitchTransition> */}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </AliveScope>
  )
}

export default Index
