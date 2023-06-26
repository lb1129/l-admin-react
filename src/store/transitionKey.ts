import { createAction, createReducer } from '@reduxjs/toolkit'

export const setTransitionKey = createAction<string>('setTransitionKey')

const initialState = ''

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setTransitionKey, (state, action) => {
    return action.payload
  })
})

export default reducer
