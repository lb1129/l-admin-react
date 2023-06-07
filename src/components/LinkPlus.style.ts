import { useEmotionCss } from '@ant-design/use-emotion-css'

export default function usePositionMapStyles() {
  return {
    disabled: useEmotionCss(() => ({
      cursor: 'not-allowed',
      color: 'rgba(0, 0, 0, 0.25) !important'
    }))
  }
}
