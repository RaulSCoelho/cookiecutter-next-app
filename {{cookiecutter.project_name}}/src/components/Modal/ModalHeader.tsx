import { CloseButton } from '../Buttons/CloseButton'

interface ModalHeaderProps {
  title: string
  onClose: () => void
}

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex justify-between gap-4 p-4 pl-6 text-xl">
      <div className="grow">{title}</div>
      <div>
        <CloseButton onClick={onClose} />
      </div>
    </div>
  )
}
