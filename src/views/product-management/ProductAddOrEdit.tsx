import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { Skeleton, Form, Row, Col, Button, Input, InputNumber, Checkbox, Upload } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import { useTranslation } from 'react-i18next'
import { getProductByIdServe, saveProductServe } from '@/serves/product'
import type { ProductType } from '@/types/product'
import pubsub from '@/pubsub'
import { productEditDone } from '@/pubsub/events'
import { message } from '@/utils/antdAppPlaceholder'
import { PlusOutlined } from '@ant-design/icons'
import type { UploadProps, UploadFile } from 'antd/lib/upload/interface'
import type { UploadRequestOption, RcFile } from 'rc-upload/lib/interface'
import { uploadServe } from '@/serves/file'

const ProductAddOrEdit = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [form] = Form.useForm<ProductType>()
  const [dataLoading, setDataLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const title = useMemo(() => (params.id ? t('edit') : t('add')), [params.id, t])

  const beforeUploadHandler: UploadProps['beforeUpload'] = (file, files) => {
    const len = fileList.length
    const canUploadFiles = files.slice(0, 5 - len)
    return canUploadFiles.some((item) => item.uid === file.uid)
  }

  const customRequestHandler = async (ops: UploadRequestOption) => {
    let record: UploadFile = {
      uid: (ops.file as RcFile).uid,
      name: '',
      status: 'uploading',
      url: ''
    }
    setFileList((value) => {
      return [...value, record]
    })
    try {
      const url = await uploadServe(ops.file as File, (percent) => {
        ops.onProgress && ops.onProgress({ percent: percent })
      })
      ops.onSuccess && ops.onSuccess(url)
      setFileList((value) => {
        const idx = value.findIndex((item) => item.uid === record.uid)
        if (idx > -1) value.splice(idx, 1, { ...record, status: 'success', url })
        return [...value]
      })
    } catch (error) {
      setFileList((value) => {
        const idx = value.findIndex((item) => item.uid === record.uid)
        if (idx > -1) value.splice(idx, 1, { ...record, status: 'error' })
        return [...value]
      })
    }
  }

  const uploadRemoveHandler = (file: UploadFile) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid))
  }

  const saveHandler = async () => {
    try {
      const values = await form.validateFields()
      setSubmitLoading(true)
      const images: string[] = []
      // 取出状态为success的url
      fileList.forEach((file) => {
        if (file.status === 'success') images.push(file.url as string)
      })
      await saveProductServe(
        params.id ? { ...values, _id: params.id, images } : { ...values, images }
      )
      pubsub.emit(productEditDone)
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
        const res = await getProductByIdServe(params.id)
        setFileList(
          res.data.images.map((url, idx) => ({
            uid: `${idx}`,
            name: '',
            url,
            status: 'success'
          }))
        )
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
              <Form.Item name="name" label="名称" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="brand" label="品牌" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="分类" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="price" label="价格" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} min={0} precision={2} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="color" label="颜色" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="inventory" label="库存" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} min={0} precision={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="style" label="样式" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="enable" label="是否启用" valuePropName="checked">
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="describe" label="描述">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="images" label="图片">
                <Upload
                  accept="image/*"
                  listType="picture-card"
                  multiple
                  fileList={fileList}
                  customRequest={customRequestHandler}
                  maxCount={5}
                  beforeUpload={beforeUploadHandler}
                  onRemove={uploadRemoveHandler}
                >
                  {fileList.length < 5 ? <PlusOutlined /> : null}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Skeleton>
    </PageHeader>
  )
}

export default ProductAddOrEdit
