import { useEmotionCss } from '@ant-design/use-emotion-css'

// link css-in-js 通用
export const useLinkStyle = () =>
  useEmotionCss(({ token }) => {
    return {
      color: token.colorPrimaryText,
      '&:active': {
        color: token.colorPrimaryTextActive
      },
      '&:hover': {
        color: token.colorPrimaryTextHover
      }
    }
  })

// ...
