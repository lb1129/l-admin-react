import React, { type ReactNode, type MouseEventHandler, useMemo, forwardRef } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import useStyles from './style'

type Props = {
  disabled?: boolean
  // onClick 优先级 高于 to
  onClick?: MouseEventHandler<HTMLAnchorElement>
  to?: LinkProps['to']
  children?: ReactNode | ReactNode[]
}

const LinkPlus = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const styles = useStyles()

  const className = useMemo(() => {
    if (props.disabled) return styles.disabled
  }, [props.disabled, styles.disabled])

  const to = useMemo(() => {
    if (props.disabled) return ''
    if (props.onClick) return ''
    return props.to ?? ''
  }, [props.disabled, props.to, props.onClick])

  return (
    <Link ref={ref} to={to} onClick={props.onClick} className={className}>
      {props.children}
    </Link>
  )
})

export default LinkPlus
