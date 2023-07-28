import { createAction, createReducer } from '@reduxjs/toolkit'
import type { UserType } from '@/types/user'

export const setUserInfo = createAction<Partial<UserType>>('setUserInfo')

const initialState: UserType = {
  _id: '',
  username: '',
  nickname: '',
  phone: null,
  avatar: '',
  profile: ''
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserInfo, (state, action) => {
    return Object.assign({}, state, action.payload)
  })
})

export default reducer
