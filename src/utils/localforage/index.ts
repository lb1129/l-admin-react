import localforage from 'localforage'
import { token } from './keys'

localforage.config({
  name: process.env.REACT_APP_SYSTEM_NAME,
  storeName: 'store'
})

export const tokenLocalforage = {
  async get() {
    const value = await localforage.getItem(token)
    return value as string
  },
  async set(value: string) {
    return localforage.setItem(token, value)
  },
  async clear() {
    return localforage.removeItem(token)
  }
}
