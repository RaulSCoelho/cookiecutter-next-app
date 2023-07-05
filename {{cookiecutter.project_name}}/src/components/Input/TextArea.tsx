import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form/dist/types'

type TextAreaBaseProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  name?: never
  label?: string
  wrapperClassName?: string
  register?: UseFormRegisterReturn<any>
  error?: string
}
type TextAreaLabledProps = Omit<TextAreaBaseProps, 'name' | 'register'> & {
  name: string
  register?: never
}
type TextAreaProps = TextAreaLabledProps | TextAreaBaseProps

export function TextArea({ label, name, register, error, className, wrapperClassName, ...props }: TextAreaProps) {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide" htmlFor={register?.name || name}>
          {label}
        </label>
      )}
      <textarea
        className={`w-full rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none ${className}`}
        {...(register || { name })}
        {...props}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
