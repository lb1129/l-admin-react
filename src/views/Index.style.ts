import { useEmotionCss } from '@ant-design/use-emotion-css'

export default function useIndexStyles() {
  return {
    wrap: useEmotionCss(() => ({
      height: '100%'
    })),
    header: useEmotionCss(({ token }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      color: token.colorWhite
    })),
    headerLogo: useEmotionCss(({ token }) => ({
      fontWeight: 600,
      fontSize: '18px',
      '&>a': {
        display: 'flex',
        alignItems: 'center',
        color: token.colorWhite,
        '&>img': {
          width: '38px',
          height: '38px'
        }
      }
    })),
    headerCenter: useEmotionCss(() => ({
      flex: 1
    })),
    headerRight: useEmotionCss(() => ({
      display: 'flex'
    })),
    headerRightItem: useEmotionCss(() => ({
      padding: '0 12px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      '&:hover': {
        backgroundColor: '#252a3d'
      }
    })),
    headerRightItemUser: useEmotionCss(() => ({
      display: 'flex',
      alignItems: 'center'
    })),
    sliderContent: useEmotionCss(({ token }) => ({
      height: '100%',
      overflow: 'auto',
      borderBottomWidth: token.lineWidthBold,
      borderBottomStyle: 'solid',
      borderBottomColor: token.colorBorderSecondary
    })),
    content: useEmotionCss(({ token }) => ({
      backgroundColor: token.colorBgContainer,
      overflow: 'hidden'
    }))
  }
}
