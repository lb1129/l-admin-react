import React, { type ReactNode } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import useStyles from './style'

interface Props {
  title?: ReactNode
  subTitle?: ReactNode
  extra?: ReactNode
  children?: ReactNode | ReactNode[]
  onBack?: () => void
}

const PageHeader = ({ title, subTitle, extra, children, onBack }: Props) => {
  const styles = useStyles()
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <div className={styles.headBack}>
            <div className={styles.headBackButton} onClick={onBack}>
              <ArrowLeftOutlined />
            </div>
          </div>
          <span className={styles.headTitle}>{title}</span>
          <span className={styles.headSubTitle}>{subTitle}</span>
        </div>
        <div className={styles.headExtra}>{extra}</div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default PageHeader
