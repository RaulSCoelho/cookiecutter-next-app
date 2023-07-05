'use client'

import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps, MouseEvent, ReactNode, useState } from 'react'

import { Ripple } from '../Ripple'
import { Spinner } from '../Spinner'

export interface ButtonBaseProps
  extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'ref'> {
  children: ReactNode
  loading?: boolean
  readOnly?: boolean
  rippleColor?: CSSProperties['color']
  disableRipple?: boolean
}

export function ButtonBase({
  children,
  loading,
  readOnly,
  rippleColor,
  disableRipple,
  type = 'button',
  className,
  onClick,
  ...props
}: ButtonBaseProps) {
  const [ripples, setRipples] = useState<JSX.Element[]>([])
  const [rippleIndex, setRippleIndex] = useState(0)

  function addRipple(e: MouseEvent<HTMLButtonElement>) {
    const button = e.currentTarget as HTMLButtonElement
    const buttonRect = button.getBoundingClientRect()
    const top = Math.abs(e.clientY - buttonRect.top)
    const left = Math.abs(e.clientX - buttonRect.left)
    const right = Math.abs(e.clientX - buttonRect.right)

    setRipples(prev => [
      ...prev,
      <Ripple key={rippleIndex} top={top} left={left} size={Math.max(left, right) * 2} color={rippleColor} />
    ])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.key != rippleIndex))
    }, 550)

    setRippleIndex(prev => prev + 1)
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (!disableRipple) addRipple(e)
    onClick && onClick(e)
  }

  if (readOnly) {
    className += ' bg-gray-400'
  }

  return (
    <button
      onClick={handleClick}
      className={`relative select-none overflow-hidden shadow active:shadow-lg ${className}`}
      disabled={readOnly || loading}
      type={type}
      {...props}
    >
      {children}
      {loading && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center rounded bg-gray-400 text-gray-500">
          <Spinner className="p-1" />
        </div>
      )}
      {ripples.map(r => r)}
    </button>
  )
}
