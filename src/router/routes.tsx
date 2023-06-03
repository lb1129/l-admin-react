import React from 'react'
import { type RouteObject } from 'react-router-dom'
import Error from '../views/Error'

const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <Error />,
    async lazy() {
      let view = await import('../views/Index')
      return { Component: view.default }
    }
  }
]

export default routes
