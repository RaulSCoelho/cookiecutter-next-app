import { Modal } from '../Modal'
import { ModalAction } from '../Modal/ModalAction'

interface ConfirmationModalProps {
  open: boolean
  title: string
  question: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmationModal({ open, title, question, onConfirm, onCancel }: ConfirmationModalProps) {
  return (
    <Modal.Root open={open} onClickOutside={onCancel} fullScreen={false}>
      <Modal.Header title={title} onClose={onCancel} />
      <Modal.Content>
        <p>{question}</p>
      </Modal.Content>
      <Modal.Actions>
        <ModalAction text="Cancel" onClick={onCancel} />
        <ModalAction text="Confirm" onClick={onConfirm} />
      </Modal.Actions>
    </Modal.Root>
  )
}
