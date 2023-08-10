import React, {
  type ReactNode,
  type HTMLAttributeAnchorTarget,
  type CSSProperties,
  useMemo,
  forwardRef,
  useCallback
} from 'react'
import { useNavigate, Link, type To } from 'react-router-dom'
import classNames from 'classnames'
import { type NavigateByIdOptions, getFullPath } from '@/router'
import useStyles from './style'

interface LinkPlusProps {
  disabled?: boolean
  // onClick 优先级 高于 to
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  to?: To | number | NavigateByIdOptions
  children?: ReactNode | ReactNode[]
  target?: HTMLAttributeAnchorTarget
  style?: CSSProperties
  replace?: boolean
}

const LinkPlus = forwardRef<HTMLAnchorElement, LinkPlusProps>(
  ({ disabled, onClick, to, children, target, style, replace }, ref) => {
    const styles = useStyles()
    const navigate = useNavigate()

    const className = useMemo(() => {
      return classNames(styles.wrap, {
        [styles.disabled]: disabled
      })
    }, [disabled, styles])

    const href = useMemo(() => {
      if ((to as NavigateByIdOptions).id) {
        return getFullPath(to as NavigateByIdOptions)
      }
      if (typeof to === 'number') return ''
      return to as To
    }, [to])

    const clickHandler = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (disabled) {
          e.preventDefault()
          return
        }
        if (onClick) {
          e.preventDefault()
          onClick(e)
          return
        }
        if (typeof to === 'number') {
          e.preventDefault()
          navigate(to)
        }
      },
      [navigate, onClick, to, disabled]
    )

    return (
      <Link
        to={href}
        target={target}
        ref={ref}
        style={style}
        onClick={clickHandler}
        className={className}
        replace={replace}
      >
        {children}
      </Link>
    )
  }
)

export default LinkPlus
