import { ReactNode } from 'react'

import { tv } from 'tailwind-variants'

interface BadgeProps {
  children: ReactNode
  content?: string | number
  className?: string
}

const badge = tv({
  base: 'absolute right-0 top-0 z-[2] flex h-[20px] min-w-[20px] -translate-y-1/2 translate-x-1/2 items-center rounded-[10px] bg-red-500 px-[6px] text-xs'
})

export function Badge({ children, content, className }: BadgeProps) {
  return (
    <div className="relative">
      {children}
      {content && <span className={badge({ className })}>{content}</span>}
    </div>
  )
}
