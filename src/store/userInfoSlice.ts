import { createAction, createReducer } from '@reduxjs/toolkit'

export const setUserInfo = createAction<UserInfoType>('setUserInfo')

export interface UserInfoType {
  userName: string
}

const initialState: UserInfoType = {
  userName: ''
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserInfo, (state, action) => {
    return action.payload
  })
})

export default reducer
