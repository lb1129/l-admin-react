import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEmotionCss } from '@/utils/useEmotionCss'
import { List, Form, Button, Modal, Input, Row, Col } from 'antd'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setUserInfo } from '@/store/userInfoSlice'
import { setPhoneServe } from '@/serves/user'
import { sendCodeServe } from '@/serves/other'
import { useCountDown } from '@/utils/useCountDown'
import { isPhone } from '@/utils/validate'
import { message } from '@/utils/antdAppPlaceholder'

function SecuritySetting() {
  const [visible, setVisible] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [codeLoading, setCodeLoading] = useState(false)
  const [phoneCode, setPhoneCode] = useState('')
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const userInfo = useAppSelector((state) => state.userInfo)
  const dispatch = useAppDispatch()
  const [codeTime, codeTimeRun, codeTimeReset] = useCountDown(60)
  const titleClassName = useEmotionCss(({ token }) => ({
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '12px'
  }))
  const listDataSource = useMemo(
    () => [
      {
        title: t('mobileNumber'),
        description: userInfo.phone
      }
    ],
    [t, userInfo.phone]
  )

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

  const modalOkHandler = useCallback(async () => {
    setSubmitLoading(true)
    try {
      const values = await form.validateFields()
      const phone = Number(values.phone)
      await setPhoneServe({
        phone,
        code: values.code
      })
      message.success(t('whatSuccess', { what: t('editPhone') }))
      // 更新store
      dispatch(
        setUserInfo({
          phone
        })
      )
      setSubmitLoading(false)
      form.resetFields()
      codeTimeReset()
      setPhoneCode('')
      setVisible(false)
    } catch (error) {
      setSubmitLoading(false)
    }
  }, [codeTimeReset, dispatch, form, t])

  const modalCancelHandler = useCallback(() => {
    form.resetFields()
    codeTimeReset()
    setPhoneCode('')
    setVisible(false)
  }, [codeTimeReset, form])

  return (
    <>
      <h1 className={titleClassName}>{t('securitySetting')}</h1>
      <List
        itemLayout="horizontal"
        dataSource={listDataSource}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="link"
                onClick={() => {
                  setVisible(true)
                }}
              >
                {t('edit')}
              </Button>
            ]}
          >
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <Modal
        title={t('editPhone')}
        maskClosable={false}
        okButtonProps={{
          loading: submitLoading
        }}
        open={visible}
        onOk={modalOkHandler}
        onCancel={modalCancelHandler}
      >
        <Form form={form}>
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
        </Form>
      </Modal>
    </>
  )
}

export default SecuritySetting
