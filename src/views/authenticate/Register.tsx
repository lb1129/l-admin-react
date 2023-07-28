import React, { useState, useMemo, useCallback } from 'react'
import { Button, Form, Input, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from './Layout'
import LinkPlus from '@/components/LinkPlus'
import { isPassword, isPhone } from '@/utils/validate'
import { sendCodeServe } from '@/serves/other'
import { registerServe } from '@/serves/auth'
import { useCountDown } from '@/utils/useCountDown'
import { notification } from '@/utils/antdAppPlaceholder'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [codeLoading, setCodeLoading] = useState(false)
  const [phoneCode, setPhoneCode] = useState('')
  const [codeTime, codeTimeRun] = useCountDown(60)

  const codeText = useMemo(
    () => (codeTime > 0 ? `${t('retrieve')}${codeTime}s` : t('getVerificationCode')),
    [codeTime, t]
  )

  const getCodeHandler = useCallback(async () => {
    setCodeLoading(true)
    try {
      const values = await form.validateFields(['phone'])
      const res = await sendCodeServe(Number(values?.phone))
      // NOTE 短信服务暂未接入运营商 先直接显示在前端
      setPhoneCode(res.data)
      codeTimeRun()
      setCodeLoading(false)
    } catch (e) {
      setCodeLoading(false)
    }
  }, [codeTimeRun, form])

  const onFinish = useCallback(
    async (values: {
      username: string
      password: string
      confirmPassword: string
      phone: string
      code: string
    }) => {
      setSubmitLoading(true)
      try {
        await registerServe({
          username: values.username,
          password: values.password,
          phone: Number(values.phone),
          code: values.code
        })
        notification.success({
          message: t('tip'),
          description: t('registerSuccess'),
          duration: 2
        })
        setTimeout(() => {
          navigate({
            id: 'Login'
          })
        }, 2000)
        setSubmitLoading(false)
      } catch (error) {
        setSubmitLoading(false)
      }
    },
    [navigate, t]
  )

  return (
    <Layout>
      <Form size="large" onFinish={onFinish} form={form}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: t<string>('pleaseEnterAccount') }]}
        >
          <Input placeholder={t<string>('account')} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: t<string>('pleaseEnterPassword') },
            () => ({
              validator(rule, value) {
                if (value && !isPassword(value)) return Promise.reject(t('passwordRule'))
                return Promise.resolve()
              }
            })
          ]}
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
          rules={[
            { required: true, message: t<string>('pleaseEnterMobileNumber') },
            () => ({
              validator(rule, value) {
                if (value && !isPhone(value)) return Promise.reject(t('phoneRule'))
                return Promise.resolve()
              }
            })
          ]}
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
            <Button block loading={codeLoading} disabled={codeTime > 0} onClick={getCodeHandler}>
              {codeText}
            </Button>
          </Col>
        </Row>

        {phoneCode ? <div>{phoneCode}</div> : null}

        <Form.Item>
          <LinkPlus to={{ id: 'Login' }}>{t('haveAnAccount')}</LinkPlus>
        </Form.Item>

        <Form.Item>
          <Button type="primary" loading={submitLoading} block htmlType="submit">
            {t('register')}
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default Register
