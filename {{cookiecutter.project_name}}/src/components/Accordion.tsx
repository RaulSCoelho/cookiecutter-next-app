import { CSSProperties, ReactNode, useRef, useState } from 'react'
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
  base: 'flex items-center justify-between rounded-lg p-4 text-lg cursor-pointer',
  slots: {
    arrow: 'transition-[transform] duration-normal'
  },
  variants: {
    open: {
      true: {},
      false: { arrow: 'rotate-180' }
    }
  }
})

export function Accordion({ children, text, icon: Icon, open: openProp = false, className }: AccordionProps) {
  const [open, setOpen] = useState(openProp)
  const childrenRef = useRef<HTMLDivElement>(null)
  const childHeight = childrenRef.current?.offsetHeight
  const { base, arrow } = accordion({ open })
  const style: CSSProperties = { height: open ? childHeight : '0' }

  function toggleOpen() {
    setOpen(prev => !prev)
  }

  return (
    <div>
      <div className={base({ className })} onClick={toggleOpen}>
        <div className="mr-4 flex gap-4">
          {Icon && <Icon size={24} />}
          {text}
        </div>
        <MdOutlineKeyboardArrowDown size={24} className={arrow()} />
      </div>
      <div className="duration-normal overflow-hidden transition-[height] ease-in-out" style={style}>
        <div ref={childrenRef}>{children}</div>
      </div>
    </div>
  )
}
