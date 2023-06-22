import http, { type IResponse } from '@/http/index'
import { login_api, logout_api, isLogin_api } from '@/http/api'
import isAuthenticated from '@/router/isAuthenticated'

export const login = (ops: { userName: string; password: string }) => {
  const p = http.post<IResponse<string>>(login_api, ops)
  isAuthenticated.value = p
  return p
}

export const logout = () => {
  const p = http.post<IResponse<null>>(logout_api)
  isAuthenticated.value = new Promise((resolve, reject) => {
    p.then(reject).catch(resolve)
  })
  return p
}

export const isLogin = () => {
  const p = http.get<IResponse<boolean>>(isLogin_api)
  isAuthenticated.value = p
  return p
}

export const register = () => {}

export const findPassword = () => {}

export const getCode = () => {}
