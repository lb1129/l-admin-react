import http, { type IResponse } from '@/http'
import { product_api, products_api } from '@/http/api'
import type { ProductType, ProductsQueryParamsType } from './types'

export const getProductById = (id: string) =>
  http.get<IResponse<ProductType>>(product_api, {
    params: {
      id
    }
  })

export const saveProduct = (product: ProductType) =>
  http.post<IResponse<string>>(product_api, product)

export const deleteProductByIds = (ids: string[]) =>
  http.delete<IResponse<null>>(product_api, {
    data: ids
  })

export const getProducts = (params: ProductsQueryParamsType) =>
  http.post<
    IResponse<{
      pageNo: number
      pageSize: number
      total: number
      data: ProductType[]
    }>
  >(products_api, params)
