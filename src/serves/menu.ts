import http, { type IResponse } from '@/http'
import { menu_get_api } from '@/http/api'
import type { MenuDataItemType } from '@/types/menu'

export const getMenuServe = () =>
  http.get<IResponse<MenuDataItemType[]>>(menu_get_api, {
    params: {
      type: 'PC'
    }
  })
