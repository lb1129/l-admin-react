import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { Table, Button, Divider, Input, Popconfirm, App, type TableProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useResize } from '@/utils/useResize'
import { useAuth, operateAuthValueToDisabled } from '@/utils/useAuth'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LinkPlus from '@/components/LinkPlus'
import type { ProductType, ProductsQueryParamsType } from './types'
import { getProducts, deleteProductByIds } from './servers'
import pubsub from '@/pubsub'
import { productEditDone } from '@/pubsub/events'

const ProductList = () => {
  const [total, setTotal] = useState(0)
  const [dataLoading, setDataLoading] = useState(false)
  const [dataSource, setDataSource] = useState<ProductType[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [queryParams, setQueryParams] = useState<ProductsQueryParamsType>({
    pagination: {
      pageNo: 1,
      pageSize: 10
    },
    keyword: ''
  })
  const refContainer = useRef<HTMLDivElement>(null)
  const { height } = useResize(refContainer, {
    minusHeight: 64.8 + 64 + 54.8
  })
  const { operateAuth } = useAuth()
  const { t } = useTranslation()
  const { message } = App.useApp()
  const navigate = useNavigate()

  const columns: ColumnsType<ProductType> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      fixed: 'left',
      render: (value, record) => (
        <LinkPlus
          disabled={operateAuthValueToDisabled(operateAuth.detail)}
          to={{
            id: 'ProductDetail',
            params: {
              id: record.id
            }
          }}
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
      width: 180,
      fixed: 'right',
      align: 'center',
      render: (value, record) => (
        <>
          <Button
            type="link"
            disabled={operateAuthValueToDisabled(operateAuth.edit)}
            onClick={() => {
              navigate({
                id: 'ProductAddOrEdit',
                params: {
                  id: record.id
                }
              })
            }}
          >
            {t('edit')}
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            disabled={operateAuthValueToDisabled(operateAuth.delete)}
            title={t('areYouSureDelete')}
            onConfirm={() => deleteHandle(record.id)}
          >
            <Button type="link" disabled={operateAuthValueToDisabled(operateAuth.delete)}>
              {t('delete')}
            </Button>
          </Popconfirm>
        </>
      )
    }
  ]

  const tablePaginationConfig = useMemo(
    () => ({
      total,
      current: queryParams.pagination.pageNo,
      pageSize: queryParams.pagination.pageSize,
      showTotal: (total: number) => t('whatTotal', { total }),
      showSizeChanger: true,
      showLessItems: true,
      showQuickJumper: true
    }),
    [total, queryParams, t]
  )

  const deleteHandle = async (id?: string) => {
    const ids = id ? [id] : selectedRowKeys
    setDataLoading(true)
    try {
      await deleteProductByIds(ids)
      message.success(t('whatSuccess', { what: t('delete') }))
      loadData()
    } catch (error) {
      setDataLoading(false)
    }
  }

  const changeHandle: TableProps<ProductType>['onChange'] = (pagination, filters, sorter) => {
    setQueryParams({
      pagination: {
        pageNo: pagination.current as number,
        pageSize: pagination.pageSize as number
      },
      keyword: queryParams.keyword
    })
  }

  const loadData = useCallback(async () => {
    setDataLoading(true)
    try {
      const res = await getProducts(queryParams)
      setDataSource(res.data.data)
      setTotal(res.data.total)
      setDataLoading(false)
    } catch (error) {
      setDataLoading(false)
    }
  }, [queryParams])

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
    <div style={{ height: '100%' }} ref={refContainer}>
      <Table
        loading={dataLoading}
        columns={columns}
        dataSource={dataSource}
        bordered
        rowKey="id"
        scroll={{ x: 1200, y: height }}
        pagination={tablePaginationConfig}
        onChange={changeHandle}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => {
            setSelectedRowKeys(keys as string[])
          }
        }}
        title={() => (
          <>
            <Button.Group>
              <Button type="primary" disabled={operateAuthValueToDisabled(operateAuth.add)}>
                {t('add')}
              </Button>
              <Popconfirm
                disabled={!selectedRowKeys.length || operateAuthValueToDisabled(operateAuth.delete)}
                title={t('areYouSureDelete')}
                onConfirm={() => deleteHandle()}
              >
                <Button
                  type="primary"
                  disabled={
                    !selectedRowKeys.length || operateAuthValueToDisabled(operateAuth.delete)
                  }
                >
                  {t('delete')}
                </Button>
              </Popconfirm>
            </Button.Group>
            <div style={{ float: 'right' }}>
              <Input.Search
                onSearch={(value) => {
                  if (queryParams.keyword !== value) {
                    setQueryParams({
                      pagination: {
                        pageNo: 1,
                        pageSize: queryParams.pagination.pageSize
                      },
                      keyword: value
                    })
                  }
                }}
                placeholder={t<string>('queryByName')}
                enterButton
              />
            </div>
          </>
        )}
      />
    </div>
  )
}

export default ProductList
