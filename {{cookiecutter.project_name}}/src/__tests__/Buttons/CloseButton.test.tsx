import { CloseButton } from '@/components/Buttons/CloseButton'
import { render } from '@testing-library/react'

describe('ButtonBase Component', () => {
  it('should render the button', () => {
    const { container } = render(<CloseButton />)
    expect(container).toMatchSnapshot()
  })
})
