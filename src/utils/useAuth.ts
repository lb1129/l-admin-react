import { useLocation } from 'react-router-dom'
import type { OperateAuthType, MenuDataItemType } from '@/views/personal-center/types'
import { useAppSelector } from '@/store/hooks'

export const operateAuthValueToDisabled = (operateAuthValue: number | undefined) => {
  // 值为0 无权限 返回true
  // 值为空 或 1 有权限 则返回false
  if (operateAuthValue === 0) return true
  return false
}

export const useAuth = () => {
  const { pathname } = useLocation()
  const menuData = useAppSelector((state) => state.menuData.data)
  // 操作权限
  let operateAuth: OperateAuthType = {}
  const findOperateAuth = (list: MenuDataItemType[], parentPath?: string) => {
    for (let i = 0; i < list.length; i++) {
      const record = list[i]
      if (`${parentPath ?? ''}${record.path}` === pathname) {
        if (record.operateAuth) operateAuth = record.operateAuth
        break
      } else if (record.children && record.children.length)
        findOperateAuth(record.children, `${parentPath ?? ''}${record.path}`)
    }
  }
  findOperateAuth(menuData)
  // TODO 其他权限...
  return {
    operateAuth
  }
}
