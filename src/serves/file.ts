import http, { type IResponse } from '@/http'
import { upload_get_params_api } from '@/http/api'
import config from '@/config'

interface Params {
  'Cache-Control': string
  'Content-Disposition': string
  OSSAccessKeyId: string
  Signature: string
  host: string
  id: string
  key: string
  policy: string
  success_action_status: number
  'x-oss-security-token': string
  callback: string
}

export const uploadServe = async (file: File, onProgress?: (percent: number) => void) => {
  const paramsRes = await http.get<IResponse<Params>>(upload_get_params_api, {
    params: {
      ext: file.name.slice(file.name.lastIndexOf('.'))
    }
  })
  const params = paramsRes.data
  const formData = new FormData()
  Object.keys(params).forEach((key) => {
    const val = params[key as keyof Params]
    formData.append(key, val as string)
  })
  formData.append('file', file)
  await http.post<IResponse<string>>(config.http.uploadURL, formData, {
    onUploadProgress: (e) => {
      if (e.total) {
        const percent = Math.round((e.loaded * 100) / e.total)
        onProgress && onProgress(percent)
      }
    }
  })
  return `${config.http.downloadURL}/${params.key}`
}
