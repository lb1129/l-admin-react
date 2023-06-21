export interface ProductType {
  id?: string
  name: string
  brand: string
  category: string
  price: number
  color: string
  style: string
  enable: boolean
  inventory: number
  describe: string
}

export interface ProductPaginationType {
  pageNo: number
  pageSize: number
  total: number
  data: ProductType[]
}

export interface ProductsQueryParamsType {
  pagination: {
    pageNo: number
    pageSize: number
  }
  keyword?: string
}
