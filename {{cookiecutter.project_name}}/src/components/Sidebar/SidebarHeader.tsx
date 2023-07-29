import { CSSProperties } from 'react'
import { MdClose } from 'react-icons/md'

import Image from 'next/image'
import Link from 'next/link'
import { tv } from 'tailwind-variants'

import { IconButton } from '../Buttons/IconButton'

interface SidebarHeaderProps {
  onClose(): void
  text?: string
  logo?: string
  reverse?: boolean
}

const header = tv({
  base: 'flex items-center justify-between gap-4 p-4 pb-0',
  variants: {
    reverse: {
      true: 'flex-row-reverse',
      false: ''
    }
  }
})

export function SidebarHeader({ onClose, text, logo, reverse = false }: SidebarHeaderProps) {
  const style: CSSProperties = { borderRadius: '0.25rem' }

  return (
    <div className={header({ reverse })}>
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        {logo && <Image src={logo} alt="logo" width={35} height={35} style={style} />}
        {text}
      </Link>
      <div className="h-full">
        <IconButton icon={MdClose} onClick={onClose} />
      </div>
    </div>
  )
}
