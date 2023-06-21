import localforage from 'localforage'
import { token, themeColor } from './keys'

localforage.config({
  name: process.env.REACT_APP_SYSTEM_NAME,
  storeName: 'store'
})

export const tokenLocalforage = {
  async get() {
    const value = await localforage.getItem<string>(token)
    return value ?? ''
  },
  async set(value: string) {
    return localforage.setItem(token, value)
  },
  async clear() {
    return localforage.removeItem(token)
  }
}

export const themeLocalforage = {
  async get() {
    const value = await localforage.getItem<string>(themeColor)
    return value ?? ''
  },
  async set(value: string) {
    return localforage.setItem(themeColor, value)
  },
  async clear() {
    return localforage.removeItem(themeColor)
  }
}
