import { ReactNode } from 'react'

import { tv } from 'tailwind-variants'

interface SidebarFooterProps {
  children: ReactNode
  className?: string
}

const footer = tv({
  base: 'flex min-h-[3rem] items-stretch bg-black bg-opacity-5'
})

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  return <div className={footer({ className })}>{children}</div>
}
