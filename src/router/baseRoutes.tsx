import { type RouteObject } from 'react-router-dom'
import { lazyLoad, loading } from '@/router/tools'
import { Authenticate } from '@/router/tools'

const routes: RouteObject[] = [
  {
    path: '/',
    id: 'Index',
    handle: { needAuth: true, menuName: 'index' },
    element: <Authenticate needAuth>{lazyLoad('index/Index')}</Authenticate>,
    children: [
      {
        index: true,
        id: 'Home',
        handle: { needAuth: true, menuName: 'homePage' },
        element: lazyLoad('index/Home')
      },
      {
        id: 'PersonalCenter',
        path: 'personalCenter',
        handle: { needAuth: true, menuName: 'personalCenter' },
        element: lazyLoad('personal-center/Index')
      }
    ]
  },
  {
    path: '/login',
    id: 'Login',
    handle: { needAuth: false },
    element: <Authenticate needAuth={false}>{lazyLoad('authenticate/Login')}</Authenticate>
  },
  {
    path: '/register',
    id: 'Register',
    handle: { needAuth: false },
    element: <Authenticate needAuth={false}>{lazyLoad('authenticate/Register')}</Authenticate>
  },
  {
    path: '/findPassword',
    id: 'FindPassword',
    handle: { needAuth: false },
    element: <Authenticate needAuth={false}>{lazyLoad('authenticate/FindPassword')}</Authenticate>
  },
  {
    path: '/privacyPolicy',
    id: 'PrivacyPolicy',
    element: lazyLoad('sundry/PrivacyPolicy')
  },
  {
    path: '*',
    id: 'NotFound',
    element: loading
  }
]

export default routes
