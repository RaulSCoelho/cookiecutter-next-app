'use client'

import { useCallback, useEffect, useState } from 'react'
import { FaCheckCircle, FaInfoCircle, FaTimes, FaBan, FaExclamation } from 'react-icons/fa'

import classnames from 'classnames'

export interface SnackbarProps {
  open: boolean
  message: string
  type: 'success' | 'error' | 'alert' | 'info'
  onClose: () => void
  position?: 'left-bottom' | 'right-bottom' | 'mid-bottom' | 'left-top' | 'right-top' | 'mid-top'
  duration?: number
}

const positionClasses = {
  'left-bottom': [{ left: '-100%' }, { left: '1rem' }, { bottom: '1rem' }],
  'right-bottom': [{ right: '-100%' }, { right: '1rem' }, { bottom: '1rem' }],
  'mid-bottom': [{ bottom: '-100%' }, { bottom: '1rem' }, { left: '50%', transform: 'translateX(-50%)' }],
  'left-top': [{ left: '-100%' }, { left: '1rem' }, { top: '1rem' }],
  'right-top': [{ right: '-100%' }, { right: '1rem' }, { top: '1rem' }],
  'mid-top': [{ top: '-100%' }, { top: '1rem' }, { left: '50%', transform: 'translateX(-50%)' }]
}

const typeMap = {
  success: { color: 'bg-green-100 text-green-800', icon: <FaCheckCircle className="text-green-500" /> },
  error: { color: 'bg-red-100 text-red-800', icon: <FaBan className="text-red-500" /> },
  alert: { color: 'bg-yellow-100 text-yellow-800', icon: <FaExclamation className="text-yellow-500" /> },
  info: { color: 'bg-blue-100 text-blue-800', icon: <FaInfoCircle className="text-blue-500" /> }
}

export function Snackbar({ open, message, type, onClose, position = 'left-bottom', duration = 6 }: SnackbarProps) {
  const [isVisible, setIsVisible] = useState(open)
  const [positionClass, setPositionClass] = useState({})
  const { color, icon } = typeMap[type]
  const style = { ...positionClass, opacity: open ? 1 : 0 }

  duration *= 1000

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(onClose, 500)
  }, [onClose])

  useEffect(() => {
    const [whenNotVisible, whenVisible, always] = positionClasses[position]
    setPositionClass({ ...(isVisible ? whenVisible : whenNotVisible), ...always })
  }, [isVisible, position])

  useEffect(() => {
    if (open) {
      setIsVisible(true)
      const timeout = setTimeout(handleClose, duration)
      return () => clearTimeout(timeout)
    }
  }, [open, handleClose, duration])

  const classes = classnames('fixed z-30 rounded-md p-4 shadow-md transition-[inset] duration-500 ease-in-out', color)

  return (
    <div data-test="snackbar" style={style} className={classes}>
      <div className="flex items-center gap-3">
        {icon}
        <p className="max-w-[250px] text-sm">{message}</p>
        <FaTimes className="cursor-pointer text-gray-500" onClick={handleClose} />
      </div>
    </div>
  )
}
