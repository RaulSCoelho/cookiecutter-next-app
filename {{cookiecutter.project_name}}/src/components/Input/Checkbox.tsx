import { InputHTMLAttributes, forwardRef } from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  size?: number
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ size = 24, ...rest }, ref) {
  return (
    <div className="relative w-fit">
      {rest.checked ? (
        <MdCheckBox size={size} className="text-skin-fill-primary" />
      ) : (
        <MdCheckBoxOutlineBlank size={size} />
      )}
      <input ref={ref} type="checkbox" className="absolute inset-0 cursor-pointer opacity-0" {...rest} />
    </div>
  )
})
