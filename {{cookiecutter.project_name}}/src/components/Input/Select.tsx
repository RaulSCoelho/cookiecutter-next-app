import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form/dist/types'

import classnames from 'classnames'

type SelectBaseProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  name?: never
  label?: string
  wrapperClassName?: string
  register?: UseFormRegisterReturn<any>
  error?: string
}

type SelectLabeledProps = Omit<SelectBaseProps, 'name' | 'register'> & {
  name: string
  register?: never
}

type SelectProps = SelectLabeledProps | SelectBaseProps

export function Select({ label, name, register, error, className, wrapperClassName, children, ...props }: SelectProps) {
  const selectClasses = classnames(
    'w-full cursor-pointer rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none',
    className
  )

  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide" htmlFor={register?.name || name}>
          {label}
        </label>
      )}
      <select className={selectClasses} {...(register || { name })} {...props}>
        {children}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
