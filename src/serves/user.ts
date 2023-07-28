import http, { type IResponse } from '@/http'
import { userInfo_get_api, userInfo_edit_api, userInfo_set_phone_api } from '@/http/api'
import type { UserType } from '@/types/user'

export const getUserInfoServe = () => http.get<IResponse<UserType>>(userInfo_get_api)

export const editUserInfoServe = (userInfo: {
  nickname?: string
  profile?: string
  avatar?: string
}) => http.post<IResponse<boolean>>(userInfo_edit_api, userInfo)

export const setPhoneServe = (ops: { phone: number; code: string }) =>
  http.post<IResponse<boolean>>(userInfo_set_phone_api, {
    phone: ops.phone,
    code: ops.code
  })
