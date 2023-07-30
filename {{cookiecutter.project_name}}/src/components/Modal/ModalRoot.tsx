'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'

import { useClickOutside } from '@/hooks/useClickOutside'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { tv } from 'tailwind-variants'

import { IconButton } from '../Buttons/IconButton'

interface ModalRootProps {
  children: ReactNode
  open: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'fixed-sm' | 'fixed-md' | 'fixed-lg'
  fullScreen?: boolean
  onClose?(): void
}

const modal = tv({
  slots: {
    wrapper:
      'fixed inset-0 z-20 flex items-center justify-center bg-black/50 transition-[opacity] duration-[225ms] ease-in-out',
    content: 'flex flex-col bg-white text-[#3c3c43] dark:bg-[#16223b] dark:text-[#f7fafc]'
  },
  variants: {
    opacity: {
      0: { wrapper: 'opacity-0' },
      1: { wrapper: 'opacity-100' }
    },
    size: {
      sm: { content: 'max-w-[600px]' },
      md: { content: 'max-w-[1000px]' },
      lg: { content: 'max-w-[calc(100%-64px)]' },
      'fixed-sm': { content: 'w-[600px] max-w-[calc(100%-64px)]' },
      'fixed-md': { content: 'w-[1000px] max-w-[calc(100%-64px)]' },
      'fixed-lg': { content: 'w-[calc(100%-64px)]' }
    },
    fullScreen: {
      true: { content: 'h-full max-w-none w-full' },
      false: { content: 'max-h-[calc(100%-64px)] rounded' }
    }
  }
})

export function ModalRoot({ children, open, title, onClose, size = 'sm', fullScreen = true }: ModalRootProps) {
  const [visible, setVisible] = useState(false)
  const [opacity, setOpacity] = useState<0 | 1>(0)
  const isSmallScreen = useMediaQuery('sm')
  const modalRef = useRef<HTMLDivElement>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const { wrapper, content } = modal({ size, opacity, fullScreen: fullScreen && isSmallScreen })

  useClickOutside({ ref: modalContentRef, parent: modalRef, onClickOutside: onClose })

  useEffect(() => {
    if (open) setVisible(true)
    setOpacity(open ? 1 : 0)
  }, [open])

  function handleTransitionEnd() {
    if (!open) setVisible(false)
  }

  if (!visible) return null
  return (
    <div ref={modalRef} data-test="modal" className={wrapper()} onTransitionEnd={handleTransitionEnd}>
      <div ref={modalContentRef} className={content()}>
        <div className="flex justify-between gap-4 p-4 pl-6 text-xl">
          <div className="grow">{title}</div>
          <div>
            <IconButton icon={IoClose} onClick={onClose} />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
