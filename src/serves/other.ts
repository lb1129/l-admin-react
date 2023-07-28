import JSEncrypt from 'jsencrypt'
import http, { type IResponse } from '@/http'
import { rsa_public_key_api, sendCode_api } from '@/http/api'

// rsa加密
export const rsaEncryptServe = async (value: string) => {
  const res = await http.get<IResponse<string>>(rsa_public_key_api)
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(res.data)
  return encrypt.encrypt(value)
}

// NOTE 短信服务暂未接入运营商 先把code返回到前端
export const sendCodeServe = (phone: number) => {
  return http.post<IResponse<string>>(sendCode_api, {
    phone
  })
}
