import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { Skeleton, Form, Row, Col, Button, Input, InputNumber, Checkbox, App } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import { useTranslation } from 'react-i18next'
import { getProductById, saveProduct } from './servers'
import type { ProductType } from './types'

const ProductAddOrEdit = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { message } = App.useApp()
  const [form] = Form.useForm<ProductType>()

  const [dataLoading, setDataLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const title = useMemo(() => (params.id ? t('edit') : t('add')), [params.id, t])

  const saveHandler = async () => {
    try {
      const values = await form.validateFields()
      setSubmitLoading(true)
      await saveProduct(values)
      setSubmitLoading(false)
      message.success(t('whatSuccess', { what: t('save') }))
      navigate(-1)
    } catch (error) {
      setSubmitLoading(false)
    }
  }

  const loadData = useCallback(async () => {
    if (params.id) {
      setDataLoading(true)
      try {
        const res = await getProductById(params.id)
        form.setFieldsValue(res.data)
        setDataLoading(false)
      } catch (error) {
        setDataLoading(false)
      }
    }
  }, [params.id, form])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <PageHeader
      title={title}
      onBack={() => navigate(-1)}
      extra={
        <Button type="primary" onClick={saveHandler} loading={submitLoading}>
          {t('save')}
        </Button>
      }
    >
      <Skeleton loading={dataLoading} active>
        <Form form={form}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="name" label="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="brand" label="brand" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="category" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="price" label="price" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} min={0} precision={2} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="color" label="color" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="inventory" label="inventory" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} min={0} precision={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="style" label="style" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="enable" label="enable" valuePropName="checked">
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="describe" label="describe">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Skeleton>
    </PageHeader>
  )
}

export default ProductAddOrEdit
