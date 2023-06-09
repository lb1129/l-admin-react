/// <reference types="react-scripts" />

declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_SYSTEM_NAME: string
    readonly REACT_APP_NOT_SUPPORT_HISTORY: boolean
  }
}
