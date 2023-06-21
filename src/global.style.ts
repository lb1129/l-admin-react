import { injectGlobal } from '@emotion/css'

injectGlobal({
  'html,body,#root': {
    height: '100%'
  },
  '.transition-fade': {
    '&-enter': {
      opacity: 0,
      '&-active': {
        opacity: 1,
        transition: 'opacity 300ms'
      }
    },
    '&-exit': {
      opacity: 1,
      '&-active': {
        opacity: 0,
        transition: 'opacity 300ms'
      }
    }
  }
})
