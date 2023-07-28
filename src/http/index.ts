import axios from 'axios'
import config from '@/config'
import { tokenLocalforage } from '@/storage/localforage'
import i18n from '@/i18n'
import router from '@/router'
import isAuthenticated from '@/router/isAuthenticated'
import { isLogin_api } from './api'
import { message } from '@/utils/antdAppPlaceholder'

export interface IResponse<T> {
  data: T
  errCode: number
  errMsg: string
}

const axiosInstance = axios.create({
  baseURL: config.http.baseURL,
  timeout: config.http.timeout
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await tokenLocalforage.get()
    if (token) config.headers.Authorization = `Bearer ${token}`
    config.headers['Accept-Language'] = i18n.language
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  async (response) => {
    return response.data
  },
  async (error) => {
    // 401 未登录
    if (error.response.status === 401) {
      if (
        router.state.matches.slice(-1)[0].route.handle.needAuth === true &&
        error.response.config.url.split('?')[0] !== isLogin_api
      ) {
        isAuthenticated.value = Promise.reject()
        await tokenLocalforage.clear()
        router.navigate({
          id: 'Login',
          replace: true
        })
      }
    } else {
      const data = error.response.data
      if (data.errMsg) message.error(data.errMsg)
      else if (data.error) message.error(data.error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
