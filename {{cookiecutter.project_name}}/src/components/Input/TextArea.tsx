import { TextareaHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form/dist/types'

import { tv } from 'tailwind-variants'

interface TextAreaBaseProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: never
  label?: string
  wrapperClassName?: string
  register?: UseFormRegisterReturn<any>
  error?: string
}

interface TextAreaLabledProps extends Omit<TextAreaBaseProps, 'name' | 'register'> {
  name: string
  register?: never
}

type TextAreaProps = TextAreaLabledProps | TextAreaBaseProps

const textarea = tv({
  base: 'w-full rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none'
})

export function TextArea({ label, name, register, error, className, wrapperClassName, ...rest }: TextAreaProps) {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide" htmlFor={register?.name || name}>
          {label}
        </label>
      )}
      <textarea className={textarea({ className })} {...(register || { name })} {...rest} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
