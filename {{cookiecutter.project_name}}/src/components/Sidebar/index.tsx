import { MouseEvent, ReactNode, useEffect } from 'react'

import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

import { SidebarHeader } from './SidebarHeader'

interface SidebarRootProps {
  children: ReactNode
  open: boolean
  onClose(): void
  position?: 'left' | 'right'
  title?: string
  logo?: string
}

const sidebar = tv({
  slots: {
    bg: 'fixed z-10 bg-black bg-opacity-50 select-none',
    menu: 'fixed bottom-0 top-0 flex w-[90%] flex-col bg-[#fbfbfb] transition-[inset] dark:bg-[#0F172A] sm:w-96'
  },
  variants: {
    open: {
      true: { bg: 'inset-0' },
      false: {}
    },
    position: {
      left: {},
      right: {}
    }
  },
  compoundVariants: [
    { open: true, position: 'left', className: { menu: 'left-0' } },
    { open: false, position: 'left', className: { bg: '-left-full', menu: '-left-full' } },
    { open: true, position: 'right', className: { menu: 'right-0' } },
    { open: false, position: 'right', className: { bg: '-right-full', menu: '-right-full' } }
  ],
  defaultVariants: {
    open: false
  }
})

export function Sidebar({ children, open, onClose, position = 'left', title, logo }: SidebarRootProps) {
  const pathname = usePathname()
  const { bg, menu } = sidebar({ open, position })

  useEffect(() => {
    if (open) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  function handleClickOutside(e: MouseEvent<HTMLDivElement>) {
    const sidebarBg = e.currentTarget as HTMLDivElement
    const sidebar = sidebarBg.firstChild as HTMLElement
    const target = e.target as HTMLDivElement

    if (!sidebar.contains(target) && sidebarBg.style.display !== 'none') {
      onClose()
    }
  }

  return (
    <div className={bg()} onClick={handleClickOutside}>
      <div className={menu()}>
        {title && <SidebarHeader text={title} logo={logo} reverse={position === 'right'} onClose={onClose} />}
        {children}
      </div>
    </div>
  )
}
