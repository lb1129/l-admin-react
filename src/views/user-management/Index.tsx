import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/userManagement') {
      navigate('/userManagement/personalCenter', { replace: true })
    }
  }, [pathname, navigate])
  return <Outlet />
}

export default Index
