import React, { useState, useEffect } from 'react'
import logoSvg from '@/assets/image/logo.svg'
import userPng from '@/assets/image/user.png'
import { HomeOutlined, ShopOutlined, UserOutlined, BgColorsOutlined } from '@ant-design/icons'
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
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import ToggleLanguage from '@/components/ToggleLanguage'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import { setColorPrimary } from '@/store/theme-slice'
import useIndexStyles from './Index.style'

const { Header, Content, Sider } = Layout

const Index = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbProps['items']>([])
  const [collapsed, setCollapsed] = useState<boolean>()
  const styles = useIndexStyles()

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { modal } = App.useApp()

  const colorPrimary = useAppSelector((state) => state.theme.token?.colorPrimary)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // 左侧菜单选中项与路由联动
    setSelectedKeys([pathname])
    // 左侧菜单打开项与路由联动
    const pathnameArr = pathname.split('/')
    setOpenKeys(pathnameArr.slice(1, -1))
    // 面包屑与路由联动
    setBreadcrumb(
      pathnameArr.slice(1).reduce<BreadcrumbProps['items']>((prev, current, index, arr) => {
        prev!.push({
          title: current,
          onClick() {
            navigate(`/${arr.slice(0, index + 1).join('/')}`)
          }
        })
        return prev
      }, [])
    )
  }, [pathname, navigate])

  useEffect(() => {
    // 左侧菜单由收起到展开时 重新设置openKeys
    if (!collapsed) {
      // 左侧菜单打开项与路由联动
      const pathnameArr = pathname.split('/')
      setOpenKeys(pathnameArr.slice(1, -1))
    }
  }, [collapsed, pathname])

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
                  label: <span>个人中心</span>,
                  key: 'personalCenter',
                  onClick() {
                    navigate('/userManagement/personalCenter')
                  }
                },
                {
                  type: 'divider'
                },
                {
                  label: <span>退出登录</span>,
                  key: 'logout',
                  onClick() {
                    modal.confirm({
                      title: '提示',
                      content: '确定注销登录吗？',
                      onOk() {
                        navigate('/authenticate/login', { replace: true })
                      }
                    })
                  }
                }
              ]
            }}
          >
            <span className={`${styles.headerRightItem} ${styles.headerRightItemUser}`}>
              <Avatar size="small" src={userPng} />
              <span style={{ marginLeft: '8px' }}>viho</span>
            </span>
          </Dropdown>
          <ToggleLanguage className={styles.headerRightItem} />
        </div>
      </Header>
      <Layout>
        <Sider onCollapse={setCollapsed} collapsible collapsedWidth={48} width={208} theme="light">
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
              items={[
                {
                  key: '/',
                  icon: <HomeOutlined />,
                  label: '首页'
                },
                {
                  key: 'productManagement',
                  icon: <ShopOutlined />,
                  label: '产品管理',
                  children: [{ key: '/productManagement/productList', label: '产品列表' }]
                },
                {
                  key: 'userManagement',
                  icon: <UserOutlined />,
                  label: '用户管理',
                  children: [{ key: '/userManagement/personalCenter', label: '个人中心' }]
                }
              ]}
            />
          </div>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumb}></Breadcrumb>
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Index
