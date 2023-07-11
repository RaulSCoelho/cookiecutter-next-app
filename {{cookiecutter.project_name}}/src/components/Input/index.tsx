import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form/dist/types'

import { tv } from 'tailwind-variants'

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: never
  label?: string
  wrapperClassName?: string
  register?: UseFormRegisterReturn<any>
  error?: string
}

interface InputLabledProps extends Omit<InputBaseProps, 'name' | 'register'> {
  name: string
  register?: never
}

export type InputProps = InputLabledProps | InputBaseProps

const input = tv({
  base: 'w-full rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none'
})

export function Input({ label, name, register, error, className, wrapperClassName, type, ...rest }: InputProps) {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide" htmlFor={register?.name || name}>
          {label}
        </label>
      )}
      <input type={type || 'text'} className={input({ className })} {...(register || { name })} {...rest} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
