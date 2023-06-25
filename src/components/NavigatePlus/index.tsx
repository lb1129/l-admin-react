import { useEffect } from 'react'
import { useNavigate, type To } from 'react-router-dom'
import type { NavigateByIdOptions } from '@/router'

type NavigatePlusProps = {
  to: To | number | NavigateByIdOptions
  replace?: boolean
}

const NavigatePlus = ({ to, replace }: NavigatePlusProps) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (typeof to === 'number') navigate(to)
    else if ((to as NavigateByIdOptions).id) {
      navigate({ ...(to as NavigateByIdOptions), replace })
    } else {
      navigate(to as To, { replace })
    }
  }, [navigate, to, replace])
  return null
}

export default NavigatePlus
