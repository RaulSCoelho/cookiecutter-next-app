'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import { useClickOutside } from '@/hooks/useClickOutside'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { tv } from 'tailwind-variants'

interface ModalRootProps {
  children: ReactNode
  open: boolean
  size?: 'sm' | 'md' | 'lg' | 'fixed-sm' | 'fixed-md' | 'fixed-lg'
  fullScreen?: boolean
  onClickOutside?(): void
  onFormSubmit?(): void
}

const modal = tv({
  slots: {
    wrapper:
      'fixed inset-0 z-20 flex animate-fade-in items-center justify-center bg-black bg-opacity-50 transition-[opacity] duration-[225ms] ease-in-out',
    content: 'flex flex-col bg-[#f2f0f5] text-[#3c3c43] dark:bg-[#2d3748] dark:text-[#f7fafc]'
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

export function ModalRoot({
  children,
  open,
  onClickOutside,
  onFormSubmit,
  size = 'sm',
  fullScreen = true
}: ModalRootProps) {
  const isSmallScreen = useMediaQuery('sm')
  const [isVisible, setIsVisible] = useState(false)
  const [opacity, setOpacity] = useState<0 | 1>(0)
  const { wrapper, content } = modal({ size, opacity, fullScreen: fullScreen && isSmallScreen })
  const modalRef = useRef(null)
  useClickOutside(modalRef, onClickOutside)

  useEffect(() => {
    setOpacity(open ? 1 : 0)

    if (open) {
      setIsVisible(true)
    } else {
      setTimeout(() => setIsVisible(false), 225)
    }
  }, [open])

  if (!isVisible) return null
  return (
    <div data-test="modal" className={wrapper()}>
      {onFormSubmit ? (
        <form ref={modalRef} className={content()} onSubmit={onFormSubmit}>
          {children}
        </form>
      ) : (
        <div ref={modalRef} className={content()}>
          {children}
        </div>
      )}
    </div>
  )
}
