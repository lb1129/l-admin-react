import http, { type IResponse } from '@/http/index'
import { login_api, logout_api, isLogin_api } from '@/http/api'

export const login = (ops: { userName: string; password: string }) =>
  http.post<IResponse<string>>(login_api, ops)

export const logout = () => http.post<IResponse<null>>(logout_api)

export const isLogin = () => http.get<IResponse<boolean>>(isLogin_api)

export const register = () => {}

export const findPassword = () => {}

export const getCode = () => {}
