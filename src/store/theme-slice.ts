import { createAction, createReducer } from '@reduxjs/toolkit'
import { type ThemeConfig } from 'antd'
import { colorPrimaryLocalforage } from '@/storage/localforage'

export const setColorPrimary = createAction<string>('setColorPrimary')

const initialState: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 2
  }
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setColorPrimary, (state, action) => {
    state.token!.colorPrimary = action.payload
    colorPrimaryLocalforage.set(action.payload)
  })
})

export default reducer
