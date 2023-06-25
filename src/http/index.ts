import axios from 'axios'
import config from '@/config'
import { message } from 'antd'
import { tokenLocalforage } from '@/storage/localforage'
import i18n from '@/i18n'
import queryString from 'query-string'
import router from '@/router'
import isAuthenticated from '@/router/isAuthenticated'

export interface IResponse<T> {
  data: T
  message: string
}

const axiosInstance = axios.create({
  baseURL: config.http.baseURL,
  timeout: config.http.timeout
})

axiosInstance.interceptors.request.use(
  async (config) => {
    // server是mock的
    if (process.env.REACT_APP_SERVER_IS_MOCK === 'true') {
      config.url = queryString.stringifyUrl({
        url: config.url as string,
        query: {
          authorization: await tokenLocalforage.get()
        }
      })
    }
    config.headers.Authorization = await tokenLocalforage.get()
    config.headers['Accept-Language'] = i18n.language
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  async (response) => {
    // server是mock的
    if (process.env.REACT_APP_SERVER_IS_MOCK === 'true') {
      if (response.data.status >= 200 && response.data.status < 300) {
        return response.data.data
      } else {
        // 401 未登录
        if (response.data.status === 401) {
          if (router.state.matches.slice(-1)[0].route.handle.needAuth === true) {
            isAuthenticated.value = Promise.reject(response.data.data.message)
            await tokenLocalforage.clear()
            router.navigate({
              id: 'Login',
              replace: true
            })
          }
        } else {
          message.error(response.data.data.message)
        }
        return Promise.reject(response.data.data.message)
      }
    }
    return response.data
  },
  async (error) => {
    // 401 未登录
    if (error.response.status === 401) {
      if (router.state.matches.slice(-1)[0].route.handle.needAuth === true) {
        isAuthenticated.value = Promise.reject(error)
        await tokenLocalforage.clear()
        router.navigate({
          id: 'Login',
          replace: true
        })
      }
    } else {
      message.error(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
