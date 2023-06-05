import { useEmotionCss } from '@ant-design/use-emotion-css'

export default function usePositionMapStyles() {
  return {
    wrap: useEmotionCss(() => ({
      position: 'relative',
      width: '100%',
      height: '100%'
    })),
    content: useEmotionCss(() => ({
      width: '100%',
      height: '100%'
    })),
    searchInput: useEmotionCss(({ token }) => ({
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 5,
      width: '30%',
      padding: '4px 11px',
      border: '1px solid #d9d9d9',
      borderRadius: '2px',
      outline: 'none',
      transition: 'all 0.3s',
      '&:hover': {
        borderColor: token.colorPrimary,
        borderRightWidth: '1px !important'
      }
    })),
    searchResult: useEmotionCss(() => ({
      position: 'absolute',
      top: '52px',
      left: '20px',
      zIndex: 5,
      width: '30%',
      overflow: 'hidden auto'
    }))
  }
}
