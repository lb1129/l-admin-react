import { useEmotionCss } from '@/utils/useEmotionCss'

export default function useStyles() {
  return {
    wrap: useEmotionCss(({ token }) => ({
      color: token.colorLink,
      cursor: 'pointer',
      '&:hover': {
        color: token.colorLinkHover
      }
    })),
    disabled: useEmotionCss(() => ({
      cursor: 'not-allowed',
      color: 'rgba(0, 0, 0, 0.25) !important'
    }))
  }
}
