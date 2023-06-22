import React, { useState, useCallback, useEffect } from 'react'
import { Skeleton, Descriptions, Button } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import { useTranslation } from 'react-i18next'
import { useAuth, operateAuthValueToDisabled } from '@/utils/useAuth'
import type { ProductType } from './types'
import { getProductById } from './servers'

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
    describe: ''
  })

  const loadData = useCallback(async () => {
    if (params.id) {
      setDataLoading(true)
      try {
        const res = await getProductById(params.id)
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

  return (
    <PageHeader
      title={t('detail')}
      onBack={() => navigate(-1)}
      extra={
        <Button
          type="primary"
          disabled={operateAuthValueToDisabled(operateAuth.edit)}
          onClick={() => {
            navigate(`/productManagement/ProductAddOrEdit/${details.id}`, {
              state: { a: 1 }
            })
          }}
        >
          {t('edit')}
        </Button>
      }
    >
      <Skeleton loading={dataLoading}>
        <Descriptions bordered column={3}>
          <Descriptions.Item label="name">{details.name}</Descriptions.Item>
          <Descriptions.Item label="brand">{details.brand}</Descriptions.Item>
          <Descriptions.Item label="category">{details.category}</Descriptions.Item>
          <Descriptions.Item label="price">{details.price}</Descriptions.Item>
          <Descriptions.Item label="color">{details.color}</Descriptions.Item>
          <Descriptions.Item label="inventory">{details.inventory}</Descriptions.Item>
          <Descriptions.Item label="style" span={3}>
            {details.style}
          </Descriptions.Item>
          <Descriptions.Item label="describe">{details.describe}</Descriptions.Item>
        </Descriptions>
      </Skeleton>
    </PageHeader>
  )
}

export default ProductDetail
