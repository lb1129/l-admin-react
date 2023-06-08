import { useEmotionCss } from '@/utils/useEmotionCss'

export default function useStyles() {
  return {
    disabled: useEmotionCss(() => ({
      cursor: 'not-allowed',
      color: 'rgba(0, 0, 0, 0.25) !important'
    }))
  }
}
