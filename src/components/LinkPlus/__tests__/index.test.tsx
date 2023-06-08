import { render, screen, fireEvent } from '@testing-library/react'
import LinkPlus from '../index'
import { BrowserRouter } from 'react-router-dom'

describe('LinkPlus', () => {
  test(`component could be updated and unmounted without errors`, () => {
    const { unmount, rerender } = render(
      <BrowserRouter>
        <LinkPlus />
      </BrowserRouter>
    )
    expect(() => {
      rerender(
        <BrowserRouter>
          <LinkPlus />
        </BrowserRouter>
      )
      unmount()
    }).not.toThrow()
  })
  test('children should render', () => {
    render(
      <BrowserRouter>
        <LinkPlus>link plus</LinkPlus>
      </BrowserRouter>
    )
    expect(screen.getByText('link plus')).toBeInTheDocument()
  })
  test('onClick should work', () => {
    const onClick = jest.fn()
    render(
      <BrowserRouter>
        <LinkPlus onClick={onClick}>click me</LinkPlus>
      </BrowserRouter>
    )
    fireEvent.click(screen.getByText('click me'))
    expect(onClick).toBeCalledTimes(1)
  })
})
