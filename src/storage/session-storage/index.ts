import { testData } from './keys'

export const testSeesion = {
  get() {
    let result: {}
    const value = sessionStorage.getItem(testData)
    if (value) {
      try {
        result = JSON.parse(value)
      } catch (error) {
        result = {}
      }
    } else {
      result = {}
    }
    return result
  },
  set(value: {}) {
    sessionStorage.setItem(testData, JSON.stringify(value))
  },
  clear() {
    sessionStorage.removeItem(testData)
  }
}
