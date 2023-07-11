import { Modal } from '@/components/Modal'
import { ModalAction } from '@/components/Modal/ModalAction'
import { render, fireEvent } from '@testing-library/react'

import { resizeScreenSize } from '../../jest.setup'

describe('Modal Component', () => {
  it('should render the modal', () => {
    resizeScreenSize(640)
    const onCloseMock = jest.fn()
    const { container, getByTestId, getByText } = render(
      <Modal.Root open={true} onFormSubmit={onCloseMock} onClickOutside={onCloseMock} fullScreen>
        <Modal.Header onClose={onCloseMock} />
        <Modal.Content>Modal</Modal.Content>
        <Modal.Actions>
          <ModalAction text="Close" onClick={onCloseMock} />
          <ModalAction text="Submit" onClick={onCloseMock} />
        </Modal.Actions>
      </Modal.Root>
    )
    expect(container).toMatchSnapshot()

    fireEvent.click(getByTestId('modal'))
    expect(onCloseMock).toBeCalledTimes(1)

    fireEvent.click(getByText('Close'))
    expect(onCloseMock).toBeCalledTimes(2)

    fireEvent.click(getByText('Submit'))
    expect(onCloseMock).toBeCalledTimes(3)
  })
})
