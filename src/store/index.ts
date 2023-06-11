import { configureStore } from '@reduxjs/toolkit'
import theme from './themeSlice'
import menuData from './menuDataSlice'
import userInfo from './userInfoSlice'

const store = configureStore({
  reducer: {
    theme,
    menuData,
    userInfo
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
