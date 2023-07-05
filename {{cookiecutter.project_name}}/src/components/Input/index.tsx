import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form/dist/types'

import classnames from 'classnames'

type InputBaseProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name?: never
  label?: string
  wrapperClassName?: string
  register?: UseFormRegisterReturn<any>
  error?: string
}
type InputLabledProps = Omit<InputBaseProps, 'name' | 'register'> & {
  name: string
  register?: never
}
type InputProps = InputLabledProps | InputBaseProps

export function Input({ label, name, register, error, className, wrapperClassName, type, ...props }: InputProps) {
  const inputClasses = classnames(
    'w-full rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none',
    className
  )

  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide" htmlFor={register?.name || name}>
          {label}
        </label>
      )}
      <input type={type || 'text'} className={inputClasses} {...(register || { name })} {...props} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
