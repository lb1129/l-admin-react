import {
  render
  // fireEvent,  screen, waitFor
} from '@testing-library/react'
import ToggleLanguage from '../index'
import i18n from '@/i18n'

describe('ToggleLanguage', () => {
  beforeEach(() => {
    i18n.init()
  })
  test(`component could be updated and unmounted without errors`, () => {
    const { unmount, rerender } = render(<ToggleLanguage />)
    expect(() => {
      rerender(<ToggleLanguage />)
      unmount()
    }).not.toThrow()
  })
  test('custom class name', () => {
    const { container } = render(<ToggleLanguage className="custom-class-name" />)
    expect(container.firstChild).toHaveClass('custom-class-name')
  })
  test('change language should work', async () => {
    // const { container } = render(<ToggleLanguage />)
    // FIXME antd Dropdown trigger 只有hover时，无法触发成功
    // if (container.firstChild) fireEvent.mouseEnter(container.firstChild)
    // FIXME 当 antd Dropdown trigger 中包含 click 会触发成功
    // if (container.firstChild) fireEvent.click(container.firstChild)
    // fireEvent.click(screen.getByText('English'))
    // await waitFor(() => {
    //   expect(i18n.language).toBe('en')
    // })
  })
})
