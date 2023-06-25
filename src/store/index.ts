import { configureStore } from '@reduxjs/toolkit'
import theme from './themeSlice'
import menuData from './menuDataSlice'
import userInfo from './userInfoSlice'
import routeOperateState from './routeOperateState'
import breadcrumb from './breadcrumb'

const store = configureStore({
  reducer: {
    theme,
    menuData,
    userInfo,
    routeOperateState,
    breadcrumb
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
