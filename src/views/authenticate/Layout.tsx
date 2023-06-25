import React, { type ReactElement } from 'react'
import { Divider } from 'antd'
import { useTranslation } from 'react-i18next'
import ToggleLanguage from '@/components/ToggleLanguage'
import LinkPlus from '@/components/LinkPlus'
import useStyles from './Layout.style'

type Props = { children: ReactElement }

const Index: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const styles = useStyles()
  const systemName = process.env.REACT_APP_SYSTEM_NAME
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <ToggleLanguage />
      </div>
      <div className={styles.title}>{systemName}</div>
      <div className={styles.desc}>{t('systemDesc', { name: systemName })}</div>
      <div className={styles.main}>{props.children}</div>
      <div className={styles.footer}>
        Copyright © 2023 {systemName}
        <Divider type="vertical" />
        <LinkPlus
          to={{
            id: 'PrivacyPolicy'
          }}
          target="_blank"
        >
          {t('privacyPolicy')}
        </LinkPlus>
      </div>
    </div>
  )
}

export default Index
