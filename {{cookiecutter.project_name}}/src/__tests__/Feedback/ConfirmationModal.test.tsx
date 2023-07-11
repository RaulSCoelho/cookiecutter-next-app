import { ConfirmationModal } from '@/components/Feedback/ConfirmationModal'
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'

describe('Confirmation Modal Component', () => {
  it('should cancel the action', async () => {
    const onCancelMock = jest.fn()
    const { container, getByText, getByTestId, rerender } = render(
      <ConfirmationModal
        open={true}
        title="ConfirmationModal cancel test"
        question="Are you sure?"
        onCancel={onCancelMock}
        onConfirm={() => {}}
      />
    )
    expect(container).toMatchSnapshot()

    fireEvent.click(getByText('Cancel'))
    expect(onCancelMock).toBeCalledTimes(1)

    rerender(
      <ConfirmationModal
        open={false}
        title="ConfirmationModal cancel test"
        question="Are you sure?"
        onCancel={onCancelMock}
        onConfirm={() => {}}
      />
    )

    await waitForElementToBeRemoved(getByTestId('modal'))
  })

  it('should confirm the action', async () => {
    const onConfirmMock = jest.fn()
    const { container, getByText, getByTestId, rerender } = render(
      <ConfirmationModal
        open={true}
        title="ConfirmationModal confirm test"
        question="Are you sure?"
        onCancel={() => {}}
        onConfirm={onConfirmMock}
      />
    )
    expect(container).toMatchSnapshot()

    fireEvent.click(getByText('Confirm'))
    expect(onConfirmMock).toBeCalledTimes(1)

    rerender(
      <ConfirmationModal
        open={false}
        title="ConfirmationModal confirm test"
        question="Are you sure?"
        onCancel={() => {}}
        onConfirm={onConfirmMock}
      />
    )

    await waitForElementToBeRemoved(getByTestId('modal'))
  })
})
