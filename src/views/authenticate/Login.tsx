import React, { useCallback, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from './Layout'
import { tokenLocalforage } from '@/storage/localforage'
import { useAppDispatch } from '@/store/hooks'
import { setMenuData } from '@/store/menuDataSlice'
import { setUserInfo } from '@/store/userInfoSlice'
import { loginServe } from '@/serves/auth'
import { getUserInfoServe } from '@/serves/user'
import { getMenuServe } from '@/serves/menu'
import LinkPlus from '@/components/LinkPlus'
import { notification } from '@/utils/antdAppPlaceholder'

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const onFinish = useCallback(
    async (values: { username: string; password: string }) => {
      setLoading(true)
      try {
        const res = await loginServe(values)
        // 存储token
        await tokenLocalforage.set(res.data)
        const userInfoRes = await getUserInfoServe()
        const menuRes = await getMenuServe()
        // 更新redux内的菜单数据
        dispatch(setMenuData(menuRes.data))
        // 更新redux内的用户信息
        dispatch(setUserInfo(userInfoRes.data))
        // 跳转首页
        navigate({
          id: 'Index',
          replace: true
        })
        // 欢迎提示
        setTimeout(() => {
          notification.success({
            message: t('welcome'),
            description: userInfoRes.data.nickname
          })
        }, 200)
      } catch (error) {
        setLoading(false)
      }
    },
    [dispatch, navigate, t]
  )

  return (
    <Layout>
      <Form size="large" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: t<string>('pleaseEnterAccount') }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
            placeholder={t<string>('account')}
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
          <LinkPlus to={{ id: 'Register' }}>{t<string>('signUp')}</LinkPlus>
          <LinkPlus
            style={{
              float: 'right'
            }}
            to={{
              id: 'FindPassword'
            }}
          >
            {t<string>('forgotPassword')}
          </LinkPlus>
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
