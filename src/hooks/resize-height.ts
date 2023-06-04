import { useState, useLayoutEffect, useRef, type RefObject } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

function useResizeHeight(ref: RefObject<HTMLElement>, minusHeight?: number) {
  const [height, setHeight] = useState(0)
  const ro = useRef<ResizeObserver>()

  useLayoutEffect(() => {
    const node = ref.current
    if (node) {
      // 先解除已有监听
      if (ro.current) ro.current.unobserve(node)
      ro.current = new ResizeObserver((entries) => {
        setHeight(entries[0].contentRect.height - (minusHeight ?? 0))
      })
      ro.current.observe(node)
    }
    return () => {
      // 卸载解除已有监听
      if (node) ro.current?.unobserve(node)
    }
  }, [ref, minusHeight])

  return { height }
}

export { useResizeHeight }
