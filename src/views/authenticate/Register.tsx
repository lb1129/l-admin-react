import React from 'react'
import { Button, Form, Input, App, Row, Col } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLinkStyle } from '@/hooks/common-style'
import Layout from './Layout'

const Register: React.FC = () => {
  const { notification } = App.useApp()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const linkStyle = useLinkStyle()
  const onFinish = async (values: {
    userName: string
    password: string
    confirmPassword: string
    phone: number
    code: number
  }) => {
    notification.success({
      message: t('signUpSuccessful'),
      description: t('jumpToTheLoginPageSoon'),
      duration: 1.5,
      closeIcon: null
    })
    setTimeout(() => {
      navigate('/login')
    }, 1500)
  }

  return (
    <Layout>
      <Form size="large" onFinish={onFinish}>
        <Form.Item
          name="userName"
          rules={[{ required: true, message: t<string>('pleaseEnterAccount') }]}
        >
          <Input placeholder={t<string>('account')} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t<string>('pleaseEnterPassword') }]}
        >
          <Input type="password" placeholder={t<string>('password')} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: t<string>('pleaseEnterPassword')
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(t('twoPasswordsDoNotMatch'))
              }
            })
          ]}
        >
          <Input type="password" placeholder={t<string>('confirmPassword')} />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: t<string>('pleaseEnterMobileNumber') }]}
        >
          <Input placeholder={t<string>('mobileNumber')} />
        </Form.Item>

        <Row gutter={16}>
          <Col span="16">
            <Form.Item
              name="code"
              rules={[{ required: true, message: t<string>('pleaseEnterVerificationCode') }]}
            >
              <Input placeholder={t<string>('verificationCode')}></Input>
            </Form.Item>
          </Col>
          <Col span="8">
            <Button block>{t('getVerificationCode')}</Button>
          </Col>
        </Row>

        <Form.Item>
          <Link className={linkStyle} to="/login">
            {t('haveAnAccount')}
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            {t('register')}
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default Register
