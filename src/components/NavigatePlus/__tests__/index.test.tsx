import { render } from '@testing-library/react'
import NavigatePlus from '../index'
import { BrowserRouter } from 'react-router-dom'

describe('NavigatePlus', () => {
  test(`component could be updated and unmounted without errors`, () => {
    const { unmount, rerender } = render(
      <BrowserRouter>
        <NavigatePlus to={{ id: 'Login' }} />
      </BrowserRouter>
    )
    expect(() => {
      rerender(
        <BrowserRouter>
          <NavigatePlus to={{ id: 'Login' }} />
        </BrowserRouter>
      )
      unmount()
    }).not.toThrow()
  })
})
