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
      true: 'bg-black bg-opacity-5 hover:bg-opacity-10 active:bg-opacity-[0.15]',
      false: 'hover:bg-black hover:bg-opacity-5 active:bg-opacity-10'
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