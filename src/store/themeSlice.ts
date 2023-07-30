import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import { type ThemeConfig } from 'antd'
import { themeLocalforage } from '@/storage/localforage'
import { generate } from '@ant-design/colors'
import config from '@/config'

export const setColorPrimary = createAction<string>('setColorPrimary')
export const initColorPrimary = createAsyncThunk(
  'initColorPrimary',
  async (extraInfo, { dispatch }) => {
    const themeColor = await themeLocalforage.get()
    dispatch(setColorPrimary(themeColor || config.themeColor))
  }
)

const initialState: ThemeConfig = {
  token: {
    colorPrimary: config.themeColor,
    borderRadius: 2
  }
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setColorPrimary, (state, action) => {
    state.token!.colorPrimary = action.payload
    // 由一个基本色算出一个梯度色板
    const colors = generate(action.payload)
    state.token!.colorLink = action.payload
    state.token!.colorLinkActive = colors[4]
    state.token!.colorLinkHover = colors[4]
    themeLocalforage.set(action.payload)
  })
})

export default reducer
