import { useEffect } from 'react'
import { IconType } from 'react-icons/lib'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

import { useSidebar } from './SidebarRoot'

interface SidebarRouteProps {
  icon: IconType
  text: string
  path: string
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

export function SidebarRoute({ icon: Icon, text, path }: SidebarRouteProps) {
  const { state, setPage, close } = useSidebar()
  const pathname = usePathname()

  useEffect(() => {
    if (path === '/' && pathname !== '/') return
    if (pathname.startsWith(path)) {
      setPage(path)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  function handleClick() {
    close()
    setPage(path)
  }

  return (
    <Link href={path} className={sidebarRoute({ selected: state.page === path })} onClick={handleClick}>
      <Icon size={24} />
      {text}
    </Link>
  )
}
