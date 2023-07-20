import { ReactNode } from 'react'

import { useSidebar } from './SidebarRoot'

interface SidebarFooterProps {
  children: ReactNode
  close?: boolean
}

export function SidebarFooter({ children, close }: SidebarFooterProps) {
  const { close: onClose } = useSidebar()

  return (
    <div onClick={close ? onClose : undefined} className="flex h-12 items-stretch bg-black bg-opacity-5">
      {children}
    </div>
  )
}
