import { useMatches } from 'react-router-dom'
import type { OperateAuthType, MenuDataItemType } from '@/views/personal-center/types'
import { useAppSelector } from '@/store/hooks'

export const operateAuthValueToDisabled = (operateAuthValue?: number) => {
  // 值为0 无权限 返回true
  // 值为空 或 1 有权限 则返回false
  if (operateAuthValue === 0) return true
  return false
}

export const useAuth = () => {
  const matches = useMatches()
  const id = matches[matches.length - 1].id
  const menuData = useAppSelector((state) => state.menuData.data)
  // 操作权限
  let operateAuth: OperateAuthType = {}
  let iterativeMenuData = [...menuData]
  while (iterativeMenuData.length) {
    const record = iterativeMenuData.shift() as MenuDataItemType
    if (record.pageUrl && record.pageUrl.split('/')[1] === id) {
      if (record.operateAuth) operateAuth = record.operateAuth
      break
    } else if (record.children && record.children.length) {
      iterativeMenuData = [...record.children, ...record.children]
    }
  }
  // TODO 其他权限...
  return {
    operateAuth
  }
}
