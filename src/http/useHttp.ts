import { useState, useEffect, useCallback } from 'react'
import type { AxiosRequestConfig } from 'axios'
import http from './index'

export function useHttp<T, D = unknown>(
  config: AxiosRequestConfig<D>,
  beforeLoad?: () => void,
  afterLoad?: () => void
) {
  const [result, setResult] = useState<T>()
  const [error, setError] = useState()
  const forceLoad = useCallback(() => {
    if (beforeLoad) beforeLoad()
    http<T>(config)
      .then((res) => {
        setResult(res)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        if (afterLoad) afterLoad()
      })
  }, [beforeLoad, config, afterLoad])
  useEffect(() => {
    forceLoad()
  }, [forceLoad])
  return { result, error, forceLoad }
}
