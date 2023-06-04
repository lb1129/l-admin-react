import { render, screen } from '@testing-library/react'
import ToggleLanguage from '@/components/ToggleLanguage'
import i18n from '@/i18n'

describe('ToggleLanguage Test', () => {
  beforeEach(() => {
    i18n.init()
  })
  test('custom class name', () => {
    render(<ToggleLanguage className="custom-class-name" />)
    const span = screen.getByTestId('span')
    expect(span).toHaveClass('custom-class-name')
  })
  test('is anticon-global icon', () => {
    render(<ToggleLanguage />)
    const span = screen.getByRole('img')
    expect(span).toHaveClass('anticon-global')
  })
})
