import React, {
  type ReactNode,
  type HTMLAttributeAnchorTarget,
  type CSSProperties,
  useMemo,
  forwardRef,
  useCallback
} from 'react'
import { useNavigate, type To, type Path } from 'react-router-dom'
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
      if (!to) return undefined
      if (typeof to === 'string') return to
      if ((to as NavigateByIdOptions).id) return getFullPath(to as NavigateByIdOptions)
      const pathObject = to as Partial<Path>
      return `${pathObject.pathname}${pathObject.search}${pathObject.hash}`
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
        if (target !== '_blank') {
          e.preventDefault()
          if (typeof to === 'number') navigate(to)
          else if (to && (to as NavigateByIdOptions).id) {
            navigate({ ...(to as NavigateByIdOptions), replace })
          } else {
            navigate(to as To, { replace })
          }
        }
      },
      [navigate, onClick, to, target, disabled, replace]
    )

    return (
      <a
        href={href}
        target={target}
        ref={ref}
        style={style}
        onClick={clickHandler}
        className={className}
      >
        {children}
      </a>
    )
  }
)

export default LinkPlus
