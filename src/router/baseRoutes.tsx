import { type RouteObject } from 'react-router-dom'
import { lazyLoad } from '@/router/tools'
import { Authenticate } from '@/router/tools'
import PageLoading from '@/components/PageLoading'
import NavigatePlus from '@/components/NavigatePlus'

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
        element: lazyLoad('personal-center/Index'),
        children: [
          {
            index: true,
            element: <NavigatePlus to={{ id: 'BasicInfo' }} />
          },
          {
            id: 'BasicInfo',
            path: 'basicInfo',
            handle: { needAuth: true, menuName: 'basicInfo' },
            element: lazyLoad('personal-center/BasicInfo')
          },
          {
            id: 'SecuritySetting',
            path: 'securitySetting',
            handle: { needAuth: true, menuName: 'securitySetting' },
            element: lazyLoad('personal-center/SecuritySetting')
          }
        ]
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
    element: <PageLoading />
  }
]

export default routes
