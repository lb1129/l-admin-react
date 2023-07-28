import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEmotionCss } from '@/utils/useEmotionCss'
import { Row, Col, Form, Input, Button, Spin, Image, Upload } from 'antd'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setUserInfo } from '@/store/userInfoSlice'
import { EditOutlined } from '@ant-design/icons'
import type { UploadRequestOption } from 'rc-upload/lib/interface'
import { uploadServe } from '@/serves/file'
import { editUserInfoServe } from '@/serves/user'
import { message } from '@/utils/antdAppPlaceholder'

const BasicInfo = () => {
  const [loading, setLoading] = useState(false)
  const [fileLoading, setFileLoading] = useState(false)
  const { t } = useTranslation()
  const userInfo = useAppSelector((state) => state.userInfo)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const titleClassName = useEmotionCss(({ token }) => ({
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px'
  }))
  const imageClassName = useEmotionCss(({ token }) => ({
    display: 'inline-block',
    position: 'relative'
  }))
  const imageContentClassName = useEmotionCss(({ token }) => ({
    display: 'inline-block',
    borderRadius: '50%',
    overflow: 'hidden',
    border: `1px solid ${token.colorBorder}`
  }))
  const imageEditClassName = useEmotionCss(({ token }) => ({
    position: 'absolute',
    bottom: 0,
    left: '18px'
  }))

  useEffect(() => {
    form.setFieldsValue({
      nickname: userInfo.nickname,
      profile: userInfo.profile
    })
  }, [form, userInfo.nickname, userInfo.profile])

  const customRequestHandler = useCallback(
    async (ops: UploadRequestOption) => {
      setFileLoading(true)
      try {
        const url = await uploadServe(ops.file as File)
        await editUserInfoServe({
          avatar: url
        })
        message.success(t('whatSuccess', { what: t('editAvatar') }))
        // 更新store
        dispatch(
          setUserInfo({
            avatar: url
          })
        )
        setFileLoading(false)
      } catch (error) {
        setFileLoading(false)
      }
    },
    [dispatch, t]
  )

  const onFinish = useCallback(
    async (values: { nickname: string; profile: string }) => {
      setLoading(true)
      try {
        await editUserInfoServe({
          nickname: values.nickname,
          profile: values.profile
        })
        message.success(t('whatSuccess', { what: t('updateBasicInfo') }))
        // 更新store
        dispatch(
          setUserInfo({
            nickname: values.nickname,
            profile: values.profile
          })
        )
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    },
    [dispatch, t]
  )

  return (
    <>
      <h1 className={titleClassName}>{t('basicInfo')}</h1>
      <Row>
        <Col span={14}>
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item
              label={t('nickname')}
              name="nickname"
              rules={[
                () => ({
                  validator(rule, value) {
                    if (!value || !/^[\u4e00-\u9fa5A-Za-z0-9_-]{4,10}$/.test(value))
                      return Promise.reject(t('nicknameRule'))
                    return Promise.resolve()
                  }
                })
              ]}
            >
              <Input placeholder={t<string>('pleaseEnterNickname')} />
            </Form.Item>
            <Form.Item label={t('profile')} name="profile">
              <Input.TextArea rows={4} placeholder={t<string>('profile')} />
            </Form.Item>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit">
                {t('updateBasicInfo')}
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={10} style={{ textAlign: 'center' }}>
          <div className={imageClassName}>
            <Spin spinning={fileLoading}>
              <div className={imageContentClassName}>
                <Image width={200} height={200} src={userInfo.avatar} />
              </div>
            </Spin>
            {fileLoading ? null : (
              <Upload
                className={imageEditClassName}
                maxCount={1}
                accept="image/*"
                showUploadList={false}
                customRequest={customRequestHandler}
              >
                <Button shape="circle" size="large" icon={<EditOutlined />}></Button>
              </Upload>
            )}
          </div>
        </Col>
      </Row>
    </>
  )
}

export default BasicInfo
