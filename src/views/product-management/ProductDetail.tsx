import React, { useState, useCallback, useEffect } from 'react'
import { Skeleton, Descriptions, Button, Image } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import { useTranslation } from 'react-i18next'
import { useAuth, operateAuthValueToDisabled } from '@/utils/useAuth'
import type { ProductType } from '@/types/product'
import { getProductByIdServe } from '@/serves/product'
import pubsub from '@/pubsub'
import { productEditDone } from '@/pubsub/events'

const ProductDetail = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { operateAuth } = useAuth()

  const [dataLoading, setDataLoading] = useState(false)
  const [details, setDetails] = useState<ProductType>({
    name: '',
    brand: '',
    category: '',
    price: 0,
    color: '',
    style: '',
    enable: true,
    inventory: 0,
    describe: '',
    images: []
  })

  const loadData = useCallback(async () => {
    if (params.id) {
      setDataLoading(true)
      try {
        const res = await getProductByIdServe(params.id)
        setDetails(res.data)
        setDataLoading(false)
      } catch (error) {
        setDataLoading(false)
      }
    }
  }, [params.id])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    pubsub.on(productEditDone, loadData)
    return () => {
      pubsub.off(productEditDone, loadData)
    }
  }, [loadData])

  return (
    <PageHeader
      title={t('detail')}
      onBack={() => navigate(-1)}
      extra={
        <Button
          type="primary"
          disabled={operateAuthValueToDisabled(operateAuth.edit)}
          onClick={() => {
            navigate({
              id: 'ProductAddOrEdit',
              params: { id: details._id }
            })
          }}
        >
          {t('edit')}
        </Button>
      }
    >
      <Skeleton loading={dataLoading}>
        <Descriptions bordered column={3}>
          <Descriptions.Item label="名称">{details.name}</Descriptions.Item>
          <Descriptions.Item label="品牌">{details.brand}</Descriptions.Item>
          <Descriptions.Item label="分类">{details.category}</Descriptions.Item>
          <Descriptions.Item label="价格">{details.price}</Descriptions.Item>
          <Descriptions.Item label="颜色">{details.color}</Descriptions.Item>
          <Descriptions.Item label="库存">{details.inventory}</Descriptions.Item>
          <Descriptions.Item label="样式" span={3}>
            {details.style}
          </Descriptions.Item>
          <Descriptions.Item label="描述" span={3}>
            {details.describe}
          </Descriptions.Item>
          <Descriptions.Item label="图片" span={3}>
            <Image.PreviewGroup>
              {details.images.map((url) => (
                <Image width={104} height={104} key={url} src={url} />
              ))}
            </Image.PreviewGroup>
          </Descriptions.Item>
        </Descriptions>
      </Skeleton>
    </PageHeader>
  )
}

export default ProductDetail
