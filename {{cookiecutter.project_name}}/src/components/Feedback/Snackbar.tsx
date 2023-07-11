'use client'

import { useCallback, useEffect, useState } from 'react'
import { FaCheckCircle, FaInfoCircle, FaTimes, FaBan, FaExclamation } from 'react-icons/fa'

import { tv } from 'tailwind-variants'

export interface SnackbarProps {
  open: boolean
  message: string
  type: 'success' | 'error' | 'alert' | 'info'
  onClose: () => void
  position?: 'left-bottom' | 'right-bottom' | 'mid-bottom' | 'left-top' | 'right-top' | 'mid-top'
  duration?: number
}

const snackbar = tv({
  base: 'fixed z-30 rounded-md p-4 shadow-md transition-[inset] duration-500 ease-in-out',
  variants: {
    opacity: {
      0: 'opacity-0',
      1: 'opacity-100'
    },
    color: {
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
      alert: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800'
    },
    position: {
      'left-bottom': '-left-full bottom-4',
      'left-top': '-left-full top-4',
      'right-bottom': '-right-full bottom-4',
      'right-top': '-right-full top-4',
      'mid-bottom': '-bottom-full left-1/2 -translate-x-1/2',
      'mid-top': '-top-full left-1/2 -translate-x-1/2'
    },
    visible: { true: null, false: null }
  },
  defaultVariants: {
    visible: false
  },
  compoundVariants: [
    { visible: true, position: ['left-bottom', 'left-top'], class: 'left-4' },
    { visible: true, position: ['right-bottom', 'right-top'], class: 'right-4' },
    { visible: true, position: 'mid-bottom', class: 'bottom-4' },
    { visible: true, position: 'mid-top', class: 'top-4' }
  ]
})

const iconMap = {
  success: <FaCheckCircle className="text-green-500" />,
  error: <FaBan className="text-red-500" />,
  alert: <FaExclamation className="text-yellow-500" />,
  info: <FaInfoCircle className="text-blue-500" />
}

export function Snackbar({ open, message, type, onClose, position = 'left-bottom', duration = 6 }: SnackbarProps) {
  const [isVisible, setIsVisible] = useState(open)
  duration *= 1000

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(onClose, 500)
  }, [onClose])

  useEffect(() => {
    if (open) {
      setIsVisible(true)
      const timeout = setTimeout(handleClose, duration)
      return () => clearTimeout(timeout)
    }
  }, [open, handleClose, duration])

  return (
    <div
      data-test="snackbar"
      className={snackbar({ position, color: type, visible: isVisible, opacity: open ? 1 : 0 })}
    >
      <div className="flex items-center gap-3">
        {iconMap[type]}
        <p className="max-w-[250px] text-sm">{message}</p>
        <FaTimes className="cursor-pointer text-gray-500" onClick={handleClose} />
      </div>
    </div>
  )
}
