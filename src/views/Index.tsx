import React, { useState, useEffect } from 'react'
import logoSvg from '../assets/image/logo.svg'
import userPng from '../assets/image/user.png'
import { GlobalOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, Space, Dropdown, Avatar, type BreadcrumbProps } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Index.module.less'

const { Header, Content, Sider } = Layout

const Index = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbProps['items']>([])

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { i18n } = useTranslation()

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

  return (
    <Layout className={styles.wrap}>
      <Header className={styles.header}>
        <div className={styles.header_logo}>
          <a href="/">
            <img src={logoSvg} alt="logo" />
            {process.env.REACT_APP_SYSTEM_NAME}
          </a>
        </div>
        <div className={styles.header_center}></div>
        <Space>
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
                  key: 'logout'
                }
              ]
            }}
          >
            <span className={styles.header_user}>
              <Avatar size="small" src={userPng} />
              <span className={styles.header_user_name}>viho</span>
            </span>
          </Dropdown>
          <Dropdown
            menu={{
              onClick(info) {
                i18n.changeLanguage(info.key)
              },
              selectedKeys: [i18n.language],
              items: [
                {
                  label: 'English',
                  key: 'en'
                },
                {
                  label: '中文',
                  key: 'zh-CN'
                }
              ]
            }}
          >
            <span className={styles.header_lng}>
              <GlobalOutlined />
            </span>
          </Dropdown>
        </Space>
      </Header>
      <Layout>
        <Sider collapsible width={200} theme="light">
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
            items={[]}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumb}></Breadcrumb>
          <Content
            style={{
              background: '#fff'
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Index
