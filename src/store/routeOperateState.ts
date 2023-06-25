import { createAction, createReducer } from '@reduxjs/toolkit'

export const setRouteOperateState = createAction<RouteOperateState>('setRouteOperateState')

export enum RouteOperateState {
  forward,
  replace,
  back
}

const initialState = RouteOperateState.replace

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setRouteOperateState, (state, action) => {
    return action.payload
  })
})

export default reducer
