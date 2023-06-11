import localforage from 'localforage'
import { token, colorPrimary } from './keys'

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

export const colorPrimaryLocalforage = {
  async get() {
    const value = await localforage.getItem<string>(colorPrimary)
    return value ?? ''
  },
  async set(value: string) {
    return localforage.setItem(colorPrimary, value)
  },
  async clear() {
    return localforage.removeItem(colorPrimary)
  }
}
