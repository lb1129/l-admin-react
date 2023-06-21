import http, { type IResponse } from '@/http'
import { menu_api, userInfo_api } from '@/http/api'
import type { MenuDataItemType, UserInfoType } from './types'

export const getMenu = () => http.get<IResponse<MenuDataItemType[]>>(menu_api)

export const getUserInfo = () => http.get<IResponse<UserInfoType>>(userInfo_api)
