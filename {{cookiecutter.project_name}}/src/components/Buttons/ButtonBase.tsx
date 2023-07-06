'use client'

import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps, MouseEvent, ReactNode, useState } from 'react'

import classnames from 'classnames'
import { v4 as uuid } from 'uuid'

import { Ripple, RippleProps } from '../Ripple'
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
  const [ripples, setRipples] = useState<(RippleProps & { id: string })[]>([])

  function addRipple(e: MouseEvent<HTMLButtonElement>) {
    const button = e.currentTarget as HTMLButtonElement
    const buttonRect = button.getBoundingClientRect()
    const top = Math.abs(e.clientY - buttonRect.top)
    const right = Math.abs(e.clientX - buttonRect.right)
    const bottom = Math.abs(e.clientY - buttonRect.bottom)
    const left = Math.abs(e.clientX - buttonRect.left)
    const hypotenuse = Math.sqrt(Math.max(top, bottom) ** 2 + Math.max(right, left) ** 2)
    const size = Math.max(top, right, bottom, left, hypotenuse) * 2
    const ripple = { id: uuid(), top, left, size, color: rippleColor }

    setRipples(prev => [...prev, ripple])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id))
    }, 550)
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (!disableRipple) addRipple(e)
    onClick?.(e)
  }

  const classes = classnames(
    'relative select-none overflow-hidden shadow',
    { 'active:shadow-lg': !(readOnly || loading) },
    { 'bg-gray-400': readOnly },
    className
  )

  return (
    <button onClick={handleClick} className={classes} disabled={readOnly || loading} type={type} {...props}>
      {children}
      {loading && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center rounded bg-gray-400 text-gray-500">
          <Spinner className="p-1" />
        </div>
      )}
      {ripples.map(({ id, ...props }) => (
        <Ripple key={id} {...props} />
      ))}
    </button>
  )
}
