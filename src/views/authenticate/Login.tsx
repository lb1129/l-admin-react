import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, App } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLinkStyle } from '@/hooks/common-style'

const Login: React.FC = () => {
  const { notification } = App.useApp()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const linkStyle = useLinkStyle()
  const onFinish = async (values: { username: string; password: string }) => {
    navigate('/', { replace: true })
    notification.success({
      message: t('welcome'),
      description: values.username
    })
  }

  return (
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
        <Link to="/authenticate/Register" className={linkStyle}>
          {t<string>('signUp')}
        </Link>
        <Link
          className={linkStyle}
          style={{
            float: 'right'
          }}
          to="/authenticate/FindPassword"
        >
          {t<string>('forgotPassword')}
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" block htmlType="submit">
          {t<string>('login')}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
