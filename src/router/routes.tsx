import React from 'react'
import {
  type RouteObject
  // redirect
} from 'react-router-dom'
import Error from '@/views/Error'

const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <Error />,
    async lazy() {
      let view = await import('../views/Index')
      return { Component: view.default }
    },
    children: [
      {
        index: true,
        async lazy() {
          let view = await import('../views/Home')
          return { Component: view.default }
        }
      },
      {
        path: 'productManagement',
        async lazy() {
          let view = await import('../views/product-management/Index')
          return { Component: view.default }
        },
        children: [
          {
            path: 'productList',
            async lazy() {
              let view = await import('../views/product-management/ProductList')
              return { Component: view.default }
            }
          }
        ]
      },
      {
        path: 'userManagement',
        async lazy() {
          let view = await import('../views/user-management/Index')
          return { Component: view.default }
        },
        children: [
          {
            path: 'personalCenter',
            async lazy() {
              let view = await import('../views/user-management/PersonalCenter')
              return { Component: view.default }
            }
          }
        ]
      }
    ]
  },
  {
    path: '/authenticate',
    async lazy() {
      let view = await import('../views/authenticate/Index')
      return { Component: view.default }
    },
    errorElement: <Error />,
    children: [
      {
        path: 'login',
        // async loader() {
        //   // TODO 可提取出是否已登录的验证函数
        //   // const login = Math.random() < 0.5
        //   // if (!login) return redirect('/')
        //   // return null
        // },
        async lazy() {
          let view = await import('../views/authenticate/Login')
          return { Component: view.default }
        }
      },
      {
        path: 'register',
        async lazy() {
          let view = await import('../views/authenticate/Register')
          return { Component: view.default }
        }
      },
      {
        path: 'findPassword',
        async lazy() {
          let view = await import('../views/authenticate/FindPassword')
          return { Component: view.default }
        }
      }
    ]
  },
  {
    path: '/privacyPolicy',
    async lazy() {
      let view = await import('../views/PrivacyPolicy')
      return { Component: view.default }
    }
  }
]

export default routes
