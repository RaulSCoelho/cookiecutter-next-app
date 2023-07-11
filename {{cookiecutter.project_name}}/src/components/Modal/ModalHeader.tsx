import { IoClose } from 'react-icons/io5'

import { IconButton } from '../Buttons/IconButton'

interface ModalHeaderProps {
  title?: string
  onClose: () => void
}

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex justify-between gap-4 p-4 pl-6 text-xl">
      <div className="grow">{title}</div>
      <div>
        <IconButton icon={IoClose} onClick={onClose} />
      </div>
    </div>
  )
}
