import React, { useState, useEffect, createRef } from 'react'
import logoSvg from '@/assets/image/logo.svg'
import userPng from '@/assets/image/user.png'
import { HomeOutlined, UserOutlined, BgColorsOutlined } from '@ant-design/icons'
import {
  Breadcrumb,
  Layout,
  Menu,
  Dropdown,
  Avatar,
  App,
  ColorPicker,
  type BreadcrumbProps
} from 'antd'
import { useOutlet, useNavigate, useLocation } from 'react-router-dom'
import ToggleLanguage from '@/components/ToggleLanguage'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import { setColorPrimary } from '@/store/theme-slice'
import { type MenuDataItemType } from '@/store/menuDataSlice'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import useIndexStyles from './Index.style'
import { MenuItemType, SubMenuType } from 'antd/es/menu/hooks/useItems'
import { tokenLocalforage } from '@/utils/localforage'
import { useTranslation } from 'react-i18next'

const { Header, Content, Sider } = Layout

type MenuItem = MenuItemType | SubMenuType

const Index = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbProps['items']>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const styles = useIndexStyles()

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { modal, message } = App.useApp()

  const colorPrimary = useAppSelector((state) => state.theme.token?.colorPrimary)
  const menuData = useAppSelector((state) => state.menuData.data)
  const userInfo = useAppSelector((state) => state.userInfo)
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  useEffect(() => {
    // 左侧菜单选中项与路由联动
    setSelectedKeys([pathname])
    // 左侧菜单打开项与路由联动
    const pathnameArr = pathname.split('/')
    setOpenKeys(pathnameArr.slice(1, -1).map((key) => `/${key}`))
    // 面包屑与路由联动
    setBreadcrumb(
      pathnameArr.slice(1).reduce<BreadcrumbProps['items']>((prev, current) => {
        prev!.push({
          title: t(current)
        })
        return prev
      }, [])
    )
  }, [pathname, navigate, t])

  // 结合Transtion使用
  const currentOutlet = useOutlet()
  const nodeRef = createRef<HTMLDivElement>()

  // 用户菜单数据生成菜单组件items
  useEffect(() => {
    const generateMenuItems = (list: MenuDataItemType[], parent?: MenuDataItemType) => {
      let result: MenuItem[] = []
      list.forEach((menu) => {
        if (!menu.hidden) {
          let item: MenuItem = {
            key: parent ? `${parent.path}${menu.path}` : menu.path,
            icon: menu.icon,
            label: t(menu.name)
          }
          if (menu.children && menuData.length) {
            ;(item as SubMenuType).children = generateMenuItems(menu.children, menu)
          }
          result.push(item)
        }
      })
      return result
    }
    setMenuItems([
      {
        key: '/',
        icon: <HomeOutlined />,
        label: t('homePage')
      },
      ...generateMenuItems(menuData),
      {
        key: '/personalCenter',
        icon: <UserOutlined />,
        label: t('personalCenter')
      }
    ])
  }, [menuData, t])

  return (
    <Layout className={styles.wrap}>
      <Header className={styles.header}>
        <div className={styles.headerLogo}>
          <a href="/">
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
                    navigate('/personalCenter')
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
                      onOk() {
                        message.loading(t('signingOutPleaseWait'), 0)
                        // mock 退出登录流程
                        setTimeout(() => {
                          tokenLocalforage.clear().then(() => {
                            message.destroy()
                            navigate('/login', { replace: true })
                          })
                        }, 500)
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
          onCollapse={(collapsed) => {
            // 左侧菜单由收起到展开时 重新设置openKeys
            if (!collapsed) {
              const pathnameArr = pathname.split('/')
              setOpenKeys(pathnameArr.slice(1, -1).map((key) => `/${key}`))
            }
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
                navigate(menuInfo.key)
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
          <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumb}></Breadcrumb>
          <Content className={styles.content}>
            <SwitchTransition>
              <CSSTransition
                nodeRef={nodeRef}
                key={pathname}
                timeout={300}
                classNames="transition-scale"
                unmountOnExit
              >
                <div style={{ height: '100%' }} ref={nodeRef}>
                  {currentOutlet}
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
