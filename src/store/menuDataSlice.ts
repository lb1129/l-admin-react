import { createAction, createReducer } from '@reduxjs/toolkit'
import type { MenuDataItemType } from '@/views/personal-center/types'

export const setMenuData = createAction<MenuDataItemType[]>('setMenuData')
export const setMenuDataDone = createAction<boolean>('setMenuDataDone')

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
