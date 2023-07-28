import http, { type IResponse } from '@/http'
import {
  product_get_by_id_api,
  product_delete_api,
  product_save_api,
  products_api
} from '@/http/api'
import type { ProductType, ProductsQueryParamsType } from '@/types/product'

export const getProductByIdServe = (id: string) =>
  http.get<IResponse<ProductType>>(product_get_by_id_api, {
    params: {
      id
    }
  })

export const saveProductServe = (product: ProductType) =>
  http.post<IResponse<string>>(product_save_api, product)

export const deleteProductByIdsServe = (ids: string[]) =>
  http.delete<IResponse<null>>(product_delete_api, {
    data: {
      ids
    }
  })

export const getProductsServe = (params: ProductsQueryParamsType) =>
  http.post<
    IResponse<{
      pageNo: number
      pageSize: number
      total: number
      data: ProductType[]
    }>
  >(products_api, params)
