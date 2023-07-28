import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useMatches, Outlet } from 'react-router-dom'
import { Menu } from 'antd'
import { useTranslation } from 'react-i18next'
import { useEmotionCss } from '@/utils/useEmotionCss'

const PersonalCenter = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const navigate = useNavigate()
  const matches = useMatches()
  const { t } = useTranslation()
  const wrapClassName = useEmotionCss(({ token }) => ({
    height: '100%',
    display: 'flex'
  }))
  const leftClassName = useEmotionCss(({ token }) => ({
    borderRight: `1px solid ${token.colorBorder}`,
    width: '224px'
  }))
  const rightClassName = useEmotionCss(({ token }) => ({
    flex: 1,
    padding: '10px 40px'
  }))

  useEffect(() => {
    // 左侧菜单选中项与路由联动
    setSelectedKeys([matches[matches.length - 1].id])
  }, [matches])

  const menuItems = useMemo(
    () => [
      {
        key: 'BasicInfo',
        label: t('basicInfo')
      },
      {
        key: 'SecuritySetting',
        label: t('securitySetting')
      }
    ],
    [t]
  )

  return (
    <ul className={wrapClassName}>
      <li className={leftClassName}>
        <Menu
          mode="inline"
          onClick={(menuInfo) => {
            navigate({
              id: menuInfo.key
            })
          }}
          selectedKeys={selectedKeys}
          items={menuItems}
        />
      </li>
      <li className={rightClassName}>
        <Outlet />
      </li>
    </ul>
  )
}

export default PersonalCenter
