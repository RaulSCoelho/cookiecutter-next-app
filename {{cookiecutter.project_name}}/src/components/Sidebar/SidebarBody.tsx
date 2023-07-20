import { ReactNode } from 'react'

interface SidebarBodyProps {
  children: ReactNode
}

export function SidebarBody({ children }: SidebarBodyProps) {
  return <div className="flex grow flex-col gap-3 p-4">{children}</div>
}
