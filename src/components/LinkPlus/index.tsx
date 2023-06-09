import React, { type ReactNode, type MouseEventHandler, useMemo } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import useStyles from './style'
import { useLinkStyle } from '@/utils/useCommonStyle'

type Props = {
  disabled?: boolean
  // onClick 优先级 高于 to
  onClick?: MouseEventHandler<HTMLAnchorElement>
  to?: LinkProps['to']
  children?: ReactNode | ReactNode[]
}

const LinkPlus = (props: Props) => {
  const styles = useStyles()
  const linkStyles = useLinkStyle()

  const className = useMemo(() => {
    let result = linkStyles
    if (props.disabled) result += ` ${styles.disabled}`
    return result
  }, [linkStyles, props.disabled, styles.disabled])

  const to = useMemo(() => {
    if (props.disabled) return ''
    if (props.onClick) return ''
    return props.to ?? ''
  }, [props.disabled, props.to, props.onClick])

  return (
    <Link to={to} onClick={props.onClick} className={className}>
      {props.children}
    </Link>
  )
}

export default LinkPlus
