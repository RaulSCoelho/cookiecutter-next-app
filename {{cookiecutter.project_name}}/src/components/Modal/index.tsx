'use client'

import { CSSProperties, MouseEvent, useEffect, useState } from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import { ModalContent, ModalContentProps } from './ModalContent'

interface Props extends ModalContentProps {
  open: boolean
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
  fixedSize?: boolean
  onFormSubmit?: () => void
}

const sizes = {
  sm: '600px',
  md: '1000px',
  lg: 'calc(100%-64px)'
}

export function Modal({
  open,
  size = 'sm',
  onFormSubmit,
  onClose,
  fullScreen = true,
  fixedSize = false,
  ...props
}: Props) {
  const isScreenSmall = useMediaQuery('sm')
  const [isVisible, setIsVisible] = useState(false)
  const [opacity, setOpacity] = useState<0 | 1>(0)
  fullScreen = fullScreen && isScreenSmall
  const bgStyle: CSSProperties = { opacity }
  const modalCardStyle: CSSProperties = {
    width: fixedSize ? (fullScreen ? '100%' : sizes[size]) : '',
    maxWidth: fullScreen ? '' : sizes[size],
    height: fullScreen ? '100%' : '',
    maxHeight: fullScreen ? '' : 'calc(100% - 64px)',
    borderRadius: fullScreen ? '' : '0.25rem'
  }

  useEffect(() => {
    setOpacity(open ? 1 : 0)

    if (open) {
      setIsVisible(true)
    } else {
      setTimeout(() => setIsVisible(false), 225)
    }
  }, [open])

  function handleClickOutsideModal(e: MouseEvent<HTMLDivElement>) {
    const modalBg = e.currentTarget as HTMLDivElement
    const modal = modalBg.firstChild as HTMLElement
    const target = e.target as HTMLDivElement

    if (!modal.contains(target) && modalBg.style.display !== 'none') {
      onClose()
    }
  }

  if (!isVisible) return null
  return (
    <div
      className="fixed inset-0 z-20 flex animate-fade items-center justify-center bg-black bg-opacity-50 transition-[opacity] duration-[225ms] ease-in-out"
      style={bgStyle}
      onClick={handleClickOutsideModal}
    >
      {onFormSubmit ? (
        <form className="flex flex-col bg-skin-fill text-skin-base" style={modalCardStyle} onSubmit={onFormSubmit}>
          <ModalContent onClose={onClose} {...props} />
        </form>
      ) : (
        <div className="flex flex-col bg-skin-fill text-skin-base" style={modalCardStyle}>
          <ModalContent onClose={onClose} {...props} />
        </div>
      )}
    </div>
  )
}
