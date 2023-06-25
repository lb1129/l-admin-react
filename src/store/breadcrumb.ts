import { createAction, createReducer } from '@reduxjs/toolkit'

export const setBreadcrumb = createAction<Breadcrumb[]>('setBreadcrumb')

export interface Breadcrumb {
  routeName: string
  menuName: string
}

const initialState: Breadcrumb[] = []

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setBreadcrumb, (state, action) => {
    return action.payload
  })
})

export default reducer
