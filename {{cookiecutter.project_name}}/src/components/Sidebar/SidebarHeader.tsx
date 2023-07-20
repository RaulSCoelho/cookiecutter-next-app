import { CSSProperties } from 'react'
import { MdClose } from 'react-icons/md'

import Image from 'next/image'
import Link from 'next/link'

import { IconButton } from '../Buttons/IconButton'
import { useSidebar } from './SidebarRoot'

interface SidebarHeaderProps {
  text: string
  logo?: string
}

export function SidebarHeader({ text, logo }: SidebarHeaderProps) {
  const { close } = useSidebar()
  const style: CSSProperties = { borderRadius: '0.25rem' }

  return (
    <div className="flex items-center justify-between gap-4 p-4 pb-0">
      <Link href="/" className="flex items-center gap-2 text-xl font-semibold" onClick={close}>
        {logo && <Image src={logo} alt="logo" width={35} height={35} style={style} />}
        {text}
      </Link>
      <div className="h-full">
        <IconButton icon={MdClose} onClick={close} />
      </div>
    </div>
  )
}
