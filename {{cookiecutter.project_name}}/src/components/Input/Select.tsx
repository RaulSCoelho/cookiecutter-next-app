import { SelectHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form/dist/types'

import { tv } from 'tailwind-variants'

interface SelectBaseProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name?: never
  label?: string
  wrapperClassName?: string
  register?: UseFormRegisterReturn<any>
  error?: string
}

interface SelectLabeledProps extends Omit<SelectBaseProps, 'name' | 'register'> {
  name: string
  register?: never
}

type SelectProps = SelectLabeledProps | SelectBaseProps

const select = tv({
  base: 'w-full cursor-pointer rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none'
})

export function Select({ label, name, register, error, className, wrapperClassName, children, ...rest }: SelectProps) {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide" htmlFor={register?.name || name}>
          {label}
        </label>
      )}
      <select className={select({ className })} {...(register || { name })} {...rest}>
        {children}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
