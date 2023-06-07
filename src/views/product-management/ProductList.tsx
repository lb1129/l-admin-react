import React, { useRef } from 'react'
import { Table, Button, Divider } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useResizeHeight } from '@/hooks/resize-height'
import { useAuth, operateAuthValueToDisabled } from '@/hooks/auth'
import { useTranslation } from 'react-i18next'
import LinkPlus from '@/components/LinkPlus'

interface ProductRecord {
  id: string
  name: string
  brand: string
  category: string
  price: number
  color: string
  style: string
  enable: number
  inventory: number
  describe: string
}

const ProductList = () => {
  const refContainer = useRef<HTMLDivElement>(null)
  const { height } = useResizeHeight(refContainer, 64.8 + 64 + 54.8)
  const { operateAuth } = useAuth()
  const { t } = useTranslation()

  const columns: ColumnsType<ProductRecord> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      fixed: 'left',
      render: (value, record) => (
        <LinkPlus
          disabled={operateAuthValueToDisabled(operateAuth.detail)}
          to={`/productManagement/productDetail/${record.id}`}
        >
          {value}
        </LinkPlus>
      )
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      width: 150
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      width: 150
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 150
    },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
      width: 150
    },
    {
      title: '款式',
      dataIndex: 'style',
      key: 'style',
      width: 150,
      ellipsis: true
    },
    {
      title: '是否启用',
      dataIndex: 'enable',
      key: 'enable',
      width: 150
    },
    {
      title: '库存',
      dataIndex: 'inventory',
      key: 'inventory',
      width: 150
    },
    {
      title: '描述',
      dataIndex: 'describe',
      key: 'describe',
      width: 150
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 120,
      fixed: 'right',
      align: 'center',
      render: () => (
        <>
          <LinkPlus disabled={operateAuthValueToDisabled(operateAuth.edit)}>{t('edit')}</LinkPlus>
          <Divider type="vertical" />
          <LinkPlus disabled={operateAuthValueToDisabled(operateAuth.delete)}>
            {t('delete')}
          </LinkPlus>
        </>
      )
    }
  ]

  const dataSource: ProductRecord[] = [
    {
      id: '1',
      name: 'AppleMacBook Air',
      brand: 'Apple',
      category: '电脑整机/笔记本',
      price: 7199.0,
      color: '深空灰色',
      style: '13.3英寸 M1芯片 8+7核 8G+256G',
      enable: 1,
      inventory: 33,
      describe: ''
    },
    {
      id: '2',
      name: 'AppleMacBook Air',
      brand: 'Apple',
      category: '电脑整机/笔记本',
      price: 9499.0,
      color: '深空灰色',
      style: '13.3英寸 M1芯片 8+7核 8G+512G',
      enable: 1,
      inventory: 0,
      describe: ''
    },
    {
      id: '3',
      name: 'AppleMacBook Air',
      brand: 'Apple',
      category: '电脑整机/笔记本',
      price: 9499.0,
      color: '深空灰色',
      style: '13.3英寸 M1芯片 8+7核 16G+256G',
      enable: 1,
      inventory: 0,
      describe: ''
    },
    {
      id: '4',
      name: 'AppleMacBook Air',
      brand: 'Apple',
      category: '电脑整机/笔记本',
      price: 10999.0,
      color: '深空灰色',
      style: '13.3英寸 M1芯片 8+7核 16G+512G',
      enable: 1,
      inventory: 0,
      describe: ''
    },
    {
      id: '5',
      name: 'AppleMacBook Air',
      brand: 'Apple',
      category: '电脑整机/笔记本',
      price: 7199.0,
      color: '银色',
      style: '13.3英寸 M1芯片 8+7核 8G+256G',
      enable: 1,
      inventory: 33,
      describe: ''
    },
    {
      id: '6',
      name: 'AppleMacBook Air',
      brand: 'Apple',
      category: '电脑整机/笔记本',
      price: 9499.0,
      color: '银色',
      style: '13.3英寸 M1芯片 8+7核 8G+512G',
      enable: 1,
      inventory: 0,
      describe: ''
    },
    {
      id: '7',
      name: 'AppleMacBook Air',
      brand: 'Apple',
      category: '电脑整机/笔记本',
      price: 9499.0,
      color: '银色',
      style: '13.3英寸 M1芯片 8+7核 16G+256G',
      enable: 1,
      inventory: 0,
      describe: ''
    },
    {
      id: '8',
      name: 'AppleMacBook Air',
      brand: 'Apple',
      category: '电脑整机/笔记本',
      price: 10999.0,
      color: '银色',
      style: '13.3英寸 M1芯片 8+7核 16G+512G',
      enable: 1,
      inventory: 0,
      describe: ''
    },
    {
      id: '9',
      name: 'AppleMacBook Air',
      brand: 'Apple',
      category: '电脑整机/笔记本',
      price: 7199.0,
      color: '金色',
      style: '13.3英寸 M1芯片 8+7核 8G+256G',
      enable: 1,
      inventory: 33,
      describe: ''
    },
    {
      id: '10',
      name: 'AppleMacBook Air',
      brand: 'Apple',
      category: '电脑整机/笔记本',
      price: 9499.0,
      color: '金色',
      style: '13.3英寸 M1芯片 8+7核 8G+512G',
      enable: 1,
      inventory: 0,
      describe: ''
    },
    {
      id: '11',
      name: 'AppleMacBook Air',
      brand: 'Apple',
      category: '电脑整机/笔记本',
      price: 9499.0,
      color: '金色',
      style: '13.3英寸 M1芯片 8+7核 16G+256G',
      enable: 1,
      inventory: 0,
      describe: ''
    },
    {
      id: '12',
      name: 'AppleMacBook Air',
      brand: 'Apple',
      category: '电脑整机/笔记本',
      price: 10999.0,
      color: '金色',
      style: '13.3英寸 M1芯片 8+7核 16G+512G',
      enable: 1,
      inventory: 0,
      describe: ''
    }
  ]

  return (
    <div style={{ height: '100%' }} ref={refContainer}>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        rowKey="id"
        scroll={{ x: 1140, y: height }}
        title={() => (
          <Button.Group>
            <Button type="primary" disabled={operateAuthValueToDisabled(operateAuth.add)}>
              {t('add')}
            </Button>
            <Button type="primary" disabled={operateAuthValueToDisabled(operateAuth.delete)}>
              {t('delete')}
            </Button>
          </Button.Group>
        )}
      />
    </div>
  )
}

export default ProductList
