import { ReactNode } from 'react'

import { CloseButton } from '../Buttons/CloseButton'

export interface ModalContentProps {
  children: ReactNode
  onClose: () => void
  title?: string | ReactNode | any
  actions?: ReactNode | ((onClose: () => void) => ReactNode)
  className?: string
}

export function ModalContent({ children, onClose, title, actions, className }: ModalContentProps) {
  return (
    <>
      <div className="flex justify-between gap-4 p-4 pl-6 text-xl">
        {title}
        <CloseButton onClick={onClose} />
      </div>
      <div
        className={`grow overflow-auto px-6 pb-5 pt-0 scrollbar scrollbar-track-transparent scrollbar-thumb-[#6b6b6b4b] ${className}`}
      >
        {children}
      </div>
      {actions && (
        <div className="flex justify-end gap-2 p-2">{typeof actions === 'function' ? actions(onClose) : actions}</div>
      )}
    </>
  )
}
