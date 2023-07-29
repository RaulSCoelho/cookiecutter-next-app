import { ReactNode, useState } from 'react'
import { IconType } from 'react-icons/lib'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

import { tv } from 'tailwind-variants'

interface AccordionProps {
  children: ReactNode
  text: string
  icon?: IconType
  open?: boolean
  className?: string
}

const accordion = tv({
  slots: {
    parent: 'flex items-center justify-between gap-4 rounded-lg p-4 text-lg cursor-pointer mb-2',
    arrow: 'transition-[transform] duration-normal',
    child: 'flex flex-col gap-2 px-2 transition-[height] duration-normal ease-in-out'
  },
  variants: {
    open: {
      true: {
        arrow: '',
        child: 'overflow-y-auto h-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#6b6b6b4b]'
      },
      false: { arrow: 'rotate-180', child: 'overflow-hidden h-0' }
    }
  }
})

export function Accordion({ children, text, icon: Icon, open: openProp = false, className }: AccordionProps) {
  const [open, setOpen] = useState(openProp)
  const { parent, arrow, child } = accordion({ open })

  function toggleOpen() {
    setOpen(prev => !prev)
  }

  return (
    <div className="flex flex-col">
      <div className={parent({ className })} onClick={toggleOpen}>
        <div className="flex gap-4">
          {Icon && <Icon size={24} />}
          {text}
        </div>
        <MdOutlineKeyboardArrowDown size={24} className={arrow()} />
      </div>
      <div className={child()}>{children}</div>
    </div>
  )
}
