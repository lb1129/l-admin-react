import { useEmotionCss } from '@/utils/useEmotionCss'

export default function useStyles() {
  return {
    wrap: useEmotionCss(() => ({
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      color: '#000000d9',
      fontSize: '14px',
      position: 'relative',
      padding: '16px 24px',
      backgroundColor: '#fff'
    })),
    head: useEmotionCss(() => ({
      display: 'flex',
      justifyContent: 'space-between'
    })),
    headLeft: useEmotionCss(() => ({
      display: 'flex',
      alignItems: 'center',
      margin: '4px 0',
      overflow: 'hidden'
    })),
    headBack: useEmotionCss(() => ({
      marginRight: '16px',
      fontSize: '16px',
      lineHeight: 1
    })),
    headBackButton: useEmotionCss(({ token }) => ({
      display: 'inline-block',
      transition: 'color .3s',
      color: token.colorPrimary,
      cursor: 'pointer'
    })),
    headTitle: useEmotionCss(() => ({
      marginRight: '12px',
      color: '#000000d9',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '32px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    })),
    headSubTitle: useEmotionCss(() => ({
      marginRight: '12px',
      color: '#00000073',
      fontSize: '14px',
      lineHeight: '1.5715',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    })),
    headExtra: useEmotionCss(() => ({
      margin: '4px 0',
      whiteSpace: 'nowrap',
      '&>*': {
        marginLeft: '12px',
        whiteSpace: 'unset'
      },
      '&>*:first-child': {
        marginLeft: 0
      }
    })),
    content: useEmotionCss(() => ({
      flex: 1,
      paddingTop: '12px',
      overflowX: 'hidden',
      overflowY: 'auto'
    }))
  }
}
