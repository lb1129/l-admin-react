import { useEmotionCss } from '@/utils/useEmotionCss'

export const useCommonStyle = () =>
  useEmotionCss(({ token }) => {
    return {}
  })

// ...
