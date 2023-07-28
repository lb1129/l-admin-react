import { useCallback, useEffect, useRef, useState } from 'react'

export const useCountDown: (firingValue: number) => [number, () => void, () => void] = (
  firingValue: number
) => {
  const [count, setCount] = useState(0)
  const timer = useRef<number>()

  useEffect(() => {
    return () => {
      clearInterval(timer.current)
    }
  }, [])

  useEffect(() => {
    if (count <= 0) clearInterval(timer.current)
  }, [count])

  const run = useCallback(() => {
    setCount(firingValue)
    timer.current = window.setInterval(() => {
      setCount((value) => value - 1)
    }, 1000)
  }, [firingValue])

  const reset = useCallback(() => {
    setCount(0)
    clearInterval(timer.current)
  }, [])

  return [count, run, reset]
}
