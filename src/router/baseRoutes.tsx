import { type RouteObject } from 'react-router-dom'
import { lazyLoad, Authenticate, loading } from '@/utils/router'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Authenticate>{lazyLoad('Index')}</Authenticate>,
    children: [
      {
        index: true,
        element: lazyLoad('Home')
      },
      {
        path: '/personalCenter',
        element: lazyLoad('personal-center/Index')
      }
    ]
  },
  {
    path: '/login',
    element: <Authenticate noAuth>{lazyLoad('authenticate/Login')}</Authenticate>
  },
  {
    path: '/register',
    element: <Authenticate noAuth>{lazyLoad('authenticate/Register')}</Authenticate>
  },
  {
    path: '/findPassword',
    element: <Authenticate noAuth>{lazyLoad('authenticate/FindPassword')}</Authenticate>
  },
  {
    path: '/privacyPolicy',
    element: lazyLoad('PrivacyPolicy')
  },
  {
    path: '*',
    element: loading
  }
]

export default routes
