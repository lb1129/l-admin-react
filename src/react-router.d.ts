import '@remix-run/router'
import 'react-router'
import type { NavigateByIdOptions } from '@/router/tools'

declare module '@remix-run/router' {
  interface Router {
    navigate(ops: NavigateByIdOptions): Promise<void>
  }
}

declare module 'react-router' {
  interface NavigateFunction {
    (ops: NavigateByIdOptions): void
  }
}
