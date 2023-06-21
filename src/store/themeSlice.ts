import { createAction, createReducer } from '@reduxjs/toolkit'
import { type ThemeConfig } from 'antd'
import { themeLocalforage } from '@/storage/localforage'
import { generate } from '@ant-design/colors'

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
    // // 由一个基本色算出一个梯度色板
    const colors = generate(action.payload)
    state.token!.colorLink = action.payload
    state.token!.colorLinkActive = colors[4]
    state.token!.colorLinkHover = colors[4]
    themeLocalforage.set(action.payload)
  })
})

export default reducer
