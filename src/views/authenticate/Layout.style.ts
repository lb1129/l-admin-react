import { useEmotionCss } from '@/utils/useEmotionCss'

export default function useIndexStyles() {
  return {
    wrap: useEmotionCss(({ token }) => ({
      minHeight: '100%',
      backgroundColor: token.colorBgLayout,
      paddingBottom: '24px'
    })),
    header: useEmotionCss(() => ({
      height: '40px',
      lineHeight: '40px',
      textAlign: 'right',
      paddingRight: '24px',
      marginBottom: '32px'
    })),
    title: useEmotionCss(() => ({
      fontSize: '33px',
      fontWeight: 600,
      textAlign: 'center'
    })),
    desc: useEmotionCss(({ token }) => ({
      color: token.colorTextDescription,
      marginTop: '12px',
      marginBottom: '40px',
      textAlign: 'center'
    })),
    main: useEmotionCss(() => ({
      width: '368px',
      margin: '0 auto'
    })),
    footer: useEmotionCss(({ token }) => ({
      textAlign: 'center',
      margin: '48px 0 24px',
      '&, & > a': {
        color: token.colorTextDescription
      }
    }))
  }
}
