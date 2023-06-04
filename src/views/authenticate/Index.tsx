import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { Divider } from 'antd'
import { useTranslation } from 'react-i18next'
import ToggleLanguage from '@/components/ToggleLanguage'
import useStyles from './Index.style'

const Index = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const styles = useStyles()
  const systemName = process.env.REACT_APP_SYSTEM_NAME
  useEffect(() => {
    if (pathname === '/authenticate') {
      navigate('/authenticate/login', { replace: true })
    }
  }, [pathname, navigate])
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <ToggleLanguage />
      </div>
      <div className={styles.title}>{systemName}</div>
      <div className={styles.desc}>{t('systemDesc', { name: systemName })}</div>
      <div className={styles.main}>
        <Outlet />
      </div>
      <div className={styles.footer}>
        Copyright © 2023 {process.env.REACT_APP_SYSTEM_NAME}
        <Divider type="vertical" />
        <Link to="/privacyPolicy" target="_blank">
          {t('privacyPolicy')}
        </Link>
      </div>
    </div>
  )
}

export default Index
