import http, { type IResponse } from '@/http'
import { login_api, logout_api, isLogin_api, register_api, findPassword_api } from '@/http/api'
import isAuthenticated from '@/router/isAuthenticated'
import { rsaEncryptServe } from './other'

export const loginServe = async (ops: { username: string; password: string }) => {
  const p = http.post<IResponse<string>>(login_api, {
    username: ops.username,
    password: await rsaEncryptServe(ops.password)
  })
  isAuthenticated.value = p
  return p
}

export const logoutServe = () => {
  const p = http.post<IResponse<null>>(logout_api)
  isAuthenticated.value = new Promise((resolve, reject) => {
    p.then(() => {
      reject()
    }).catch(resolve)
  })
  return p
}

export const isLoginServe = () => {
  const p = http.get<IResponse<boolean>>(isLogin_api)
  isAuthenticated.value = p
  return p
}

export const registerServe = async (ops: {
  username: string
  password: string
  phone: number
  code: string
}) => {
  const { username, password, phone, code } = ops
  return http.post<IResponse<string>>(register_api, {
    username,
    phone,
    code,
    password: await rsaEncryptServe(password)
  })
}

export const findPasswordServe = async (ops: { password: string; phone: number; code: string }) => {
  const { password, phone, code } = ops
  return http.post<IResponse<boolean>>(findPassword_api, {
    phone,
    code,
    password: await rsaEncryptServe(password)
  })
}
