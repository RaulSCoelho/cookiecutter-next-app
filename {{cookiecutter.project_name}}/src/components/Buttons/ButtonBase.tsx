'use client'

import { ButtonHTMLAttributes, CSSProperties, MouseEvent, ReactNode, useState } from 'react'

import classnames from 'classnames'
import { v4 as uuid } from 'uuid'

import { Ripple, RippleProps } from '../Ripple'
import { Spinner } from '../Spinner'

export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading?: boolean
  loadingColored?: boolean
  readOnly?: boolean
  rippleColor?: CSSProperties['color']
  disableRipple?: boolean
}

export function ButtonBase({
  children,
  loading,
  loadingColored,
  readOnly,
  rippleColor,
  disableRipple,
  type = 'button',
  className,
  onClick,
  ...rest
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

  const spinnerClasses = classnames(
    'absolute inset-0 z-[1] flex items-center justify-center rounded',
    { 'bg-gray-400': !loadingColored },
    { 'bg-inherit': loadingColored }
  )

  return (
    <button onClick={handleClick} className={classes} disabled={readOnly || loading} type={type} {...rest}>
      {children}
      {loading && (
        <div className={spinnerClasses}>
          <Spinner className="p-1 opacity-20" color="black" />
        </div>
      )}
      {ripples.map(({ id, ...rest }) => (
        <Ripple key={id} {...rest} />
      ))}
    </button>
  )
}
