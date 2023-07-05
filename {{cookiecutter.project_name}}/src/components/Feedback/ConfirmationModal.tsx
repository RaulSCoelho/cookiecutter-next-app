import { Button } from '../Buttons'
import { Modal } from '../Modal'

interface Props {
  open: boolean
  title: string
  question: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmationModal({ open, title, question, onConfirm, onCancel }: Props) {
  function ModalActions(onClose: () => void) {
    function handleConfirm() {
      onClose()
      onConfirm()
    }

    return (
      <>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </>
    )
  }

  return (
    <Modal open={open} title={title} actions={ModalActions} onClose={onCancel} fullScreen={false}>
      <p>{question}</p>
    </Modal>
  )
}
