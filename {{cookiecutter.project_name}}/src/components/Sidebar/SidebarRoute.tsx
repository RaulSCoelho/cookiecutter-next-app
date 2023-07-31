import { IconType } from 'react-icons/lib'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

interface SidebarRouteProps {
  icon: IconType
  text: string
  path: string
  exact?: boolean
}

const sidebarRoute = tv({
  base: 'flex items-center gap-4 rounded-lg p-4 text-lg',
  variants: {
    selected: {
      true: 'bg-black/10 hover:bg-black/20 active:bg-black/25',
      false: 'hover:bg-black/10 active:bg-black/20'
    }
  },
  defaultVariants: {
    selected: false
  }
})

export function SidebarRoute({ icon: Icon, text, path, exact }: SidebarRouteProps) {
  const pathname = usePathname()
  const selected = exact ? pathname === path : pathname?.startsWith(path)

  return (
    <Link href={path} className={sidebarRoute({ selected })}>
      <Icon size={24} />
      {text}
    </Link>
  )
}
