import { render } from '@testing-library/react'
import PageHeader from '../index'

describe('PageHeader', () => {
  test(`component could be updated and unmounted without errors`, () => {
    const { unmount, rerender } = render(<PageHeader />)
    expect(() => {
      rerender(<PageHeader />)
      unmount()
    }).not.toThrow()
  })
})
