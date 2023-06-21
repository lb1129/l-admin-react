import { useState, useLayoutEffect, type RefObject } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export const useResize = (
  ref: RefObject<HTMLElement>,
  options?: {
    minusWidth?: number
    minusHeight?: number
  }
) => {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const node = ref.current
    let ro: ResizeObserver
    if (node) {
      ro = new ResizeObserver((entries) => {
        setWidth(entries[0].contentRect.width - (options ? options.minusWidth ?? 0 : 0))
        setHeight(entries[0].contentRect.height - (options ? options.minusHeight ?? 0 : 0))
      })
      ro.observe(node)
    }
    return () => {
      if (node) ro.unobserve(node)
    }
  }, [ref, options])

  return { width, height }
}
