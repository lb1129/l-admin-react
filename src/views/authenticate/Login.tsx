import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, App } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLinkStyle } from '@/hooks/common-style'
import Layout from './Layout'
import { tokenLocalforage } from '@/utils/localforage'
import { useAppDispatch } from '@/store/hook'
import { setMenuData } from '@/store/menuDataSlice'
import { setUserInfo } from '@/store/userInfoSlice'
import userMenuData from '@/router/userMenuData.json'

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { notification, message } = App.useApp()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const linkStyle = useLinkStyle()
  const dispatch = useAppDispatch()

  const onFinish = (values: { userName: string; password: string }) => {
    setLoading(true)
    // mock 登录流程
    setTimeout(async () => {
      // 该用户有menuData 登录成功 否则失败 提示用户名错误
      const menuData = userMenuData[values.userName as keyof typeof userMenuData]
      if (menuData) {
        // token存储用户名称
        await tokenLocalforage.set(values.userName)
        // 更新redux内的菜单数据
        dispatch(setMenuData(menuData))
        // 更新redux内的用户信息
        dispatch(setUserInfo({ userName: values.userName }))
        // 跳转菜单页
        navigate('/', { replace: true })
        // 欢迎提示
        setTimeout(() => {
          notification.success({
            message: t('welcome'),
            description: values.userName
          })
        }, 500)
      } else {
        message.error(t('userNameError'))
      }
      setLoading(false)
    }, 500)
  }

  return (
    <Layout>
      <Form size="large" onFinish={onFinish}>
        <Form.Item
          name="userName"
          rules={[{ required: true, message: t<string>('pleaseEnterAccount') }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
            placeholder={`${t<string>('account')}${Object.keys(userMenuData).join('/')}`}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t<string>('pleaseEnterPassword') }]}
        >
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
            type="password"
            placeholder={t<string>('password')}
          />
        </Form.Item>
        <Form.Item>
          <Link to="/register" className={linkStyle}>
            {t<string>('signUp')}
          </Link>
          <Link
            className={linkStyle}
            style={{
              float: 'right'
            }}
            to="/findPassword"
          >
            {t<string>('forgotPassword')}
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" block loading={loading} htmlType="submit">
            {t<string>('login')}
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default Login
