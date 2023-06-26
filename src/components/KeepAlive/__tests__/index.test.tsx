import { render } from '@testing-library/react'
import KeepAlive from '../index'

describe('KeepAlive', () => {
  test(`component could be updated and unmounted without errors`, () => {
    const { unmount, rerender } = render(
      <KeepAlive id="1">
        <div>children</div>
      </KeepAlive>
    )
    expect(() => {
      rerender(
        <KeepAlive id="1">
          <div>children</div>
        </KeepAlive>
      )
      unmount()
    }).not.toThrow()
  })
})
