import React from 'react'
import { Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

type Props = {
  className?: string
}

const ToggleLanguage = (props: Props) => {
  const { i18n } = useTranslation()
  return (
    <Dropdown
      menu={{
        onClick(info) {
          i18n.changeLanguage(info.key)
        },
        selectedKeys: [i18n.language],
        items: [
          {
            label: 'English',
            key: 'en'
          },
          {
            label: '中文',
            key: 'zh-CN'
          }
        ]
      }}
    >
      <span
        data-testid="span"
        className={props.className}
        style={{
          fontSize: '16px'
        }}
      >
        <GlobalOutlined />
      </span>
    </Dropdown>
  )
}

export default ToggleLanguage
