import { type RouteObject } from 'react-router-dom'
import { lazyLoad, Authenticate, loading } from '@/router/tools'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Authenticate needAuth={true}>{lazyLoad('index/Index')}</Authenticate>,
    children: [
      {
        index: true,
        element: lazyLoad('index/Home')
      },
      {
        path: '/personalCenter',
        element: lazyLoad('personal-center/Index')
      }
    ]
  },
  {
    path: '/login',
    element: <Authenticate needAuth={false}>{lazyLoad('authenticate/Login')}</Authenticate>
  },
  {
    path: '/register',
    element: <Authenticate needAuth={false}>{lazyLoad('authenticate/Register')}</Authenticate>
  },
  {
    path: '/findPassword',
    element: <Authenticate needAuth={false}>{lazyLoad('authenticate/FindPassword')}</Authenticate>
  },
  {
    path: '/privacyPolicy',
    element: lazyLoad('sundry/PrivacyPolicy')
  },
  {
    path: '*',
    element: loading
  }
]

export default routes
