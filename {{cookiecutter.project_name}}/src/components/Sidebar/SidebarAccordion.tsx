import { IconType } from 'react-icons/lib'

import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

import { Accordion } from '../Accordion'
import { SidebarRoute } from './SidebarRoute'

interface SidebarAccordionProps {
  icon: IconType
  text: string
  path: string
  paths: {
    icon: IconType
    text: string
    subPath: string
  }[]
}

const sidebarAccordion = tv({
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

export function SidebarAccordion({ icon, text, path, paths }: SidebarAccordionProps) {
  const pathname = usePathname()
  const selected = pathname?.startsWith(path)

  return (
    <Accordion text={text} icon={icon} className={sidebarAccordion({ selected })} open={selected}>
      <div className="flex flex-col gap-2 px-2 pt-2">
        {paths.map(p => (
          <SidebarRoute text={p.text} icon={p.icon} path={path + p.subPath} key={p.text} />
        ))}
      </div>
    </Accordion>
  )
}
