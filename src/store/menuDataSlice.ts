import { createAction, createReducer } from '@reduxjs/toolkit'

export const setMenuData = createAction<MenuDataItemType[]>('setMenuData')
export const setMenuDataDone = createAction<boolean>('setMenuDataDone')

export interface OperateAuthType {
  add?: number
  delete?: number
  edit?: number
  detail?: number
}

export interface MenuDataItemType {
  // 菜单名称
  name: string
  // 菜单路径
  path: string
  // 菜单图标
  icon?: string
  // 菜单挂载的视图组件url（views目录内的视图组件）
  viewUrl?: string
  // 菜单是否隐藏
  hidden?: boolean
  // 菜单视图内的操作权限
  operateAuth?: OperateAuthType
  // 子级菜单
  children?: MenuDataItemType[]
}

interface menuDataType {
  data: MenuDataItemType[]
  done: boolean
}

const initialState: menuDataType = {
  data: [],
  done: false
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setMenuData, (state, action) => {
    state.data = action.payload
  })
  builder.addCase(setMenuDataDone, (state, action) => {
    state.done = action.payload
  })
})

export default reducer
