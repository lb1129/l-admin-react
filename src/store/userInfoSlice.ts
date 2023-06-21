import { createAction, createReducer } from '@reduxjs/toolkit'
import type { UserInfoType } from '@/views/personal-center/types'

export const setUserInfo = createAction<UserInfoType>('setUserInfo')

const initialState: UserInfoType = {
  userName: ''
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserInfo, (state, action) => {
    return action.payload
  })
})

export default reducer
