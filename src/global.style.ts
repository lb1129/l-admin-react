import { injectGlobal } from '@emotion/css'

injectGlobal({
  'html,body,#root': {
    height: '100%'
  },
  'ul,li': {
    listStyle: 'none',
    padding: 0
  },
  '.fade': {
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
  },
  '.slide-left': {
    '&-enter': {
      transform: 'translate3d(100%, 0, 0)',
      '&-active': {
        transform: 'translate3d(0, 0, 0)',
        transition: 'transform 300ms'
      }
    },
    '&-exit': {
      transform: 'translate3d(0, 0, 0)',
      '&-active': {
        transform: 'translate3d(-100%, 0, 0)',
        transition: 'transform 300ms'
      }
    }
  },
  '.slide-right': {
    '&-enter': {
      transform: 'translate3d(-100%, 0, 0)',
      '&-active': {
        transform: 'translate3d(0, 0, 0)',
        transition: 'transform 300ms'
      }
    },
    '&-exit': {
      transform: 'translate3d(0, 0, 0)',
      '&-active': {
        transform: 'translate3d(100%, 0, 0)',
        transition: 'transform 300ms'
      }
    }
  }
})
