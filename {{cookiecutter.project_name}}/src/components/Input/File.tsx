'use client'

import {
  ChangeEvent,
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
  SyntheticEvent,
  useState
} from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { IoAttach as AttachFileIcon } from 'react-icons/io5'

import classnames from 'classnames'

import { Snackbar } from '../Feedback/Snackbar'

type FileBaseProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  text?: string
  name?: never
  wrapperClassName?: string
  register?: UseFormRegisterReturn<any>
  error?: string
  onChange?: never
}
type FileLabledProps = Omit<FileBaseProps, 'name' | 'register' | 'onChange'> & {
  name: string
  register?: never
  onChange?: ChangeEventHandler<HTMLInputElement>
}
type FileProps = Omit<FileLabledProps | FileBaseProps, 'type'>

export function File({ text, register, error, className, wrapperClassName, name, onChange, ...props }: FileProps) {
  const [errorOpen, setErrorOpen] = useState(false)

  function handleCloseError(event?: SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return
    }
    setErrorOpen(false)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target
    if (input.files && input.files.length > 0) {
      if (input.files[0].size > 1048576) {
        setErrorOpen(true)
        e.target.value = ''
        return
      }

      onChange?.(e)
    }
  }

  if (register) {
    const originalOnChange = register.onChange

    register.onChange = e => {
      handleChange(e as any)
      return originalOnChange(e)
    }
  }

  const inputClasses = classnames(
    'flex max-w-max cursor-pointer gap-1 rounded-lg bg-skin-button p-2 text-sm uppercase tracking-wide text-gray-100 shadow-lg hover:bg-skin-button-hover active:bg-skin-button',
    className
  )

  return (
    <>
      <div className={wrapperClassName}>
        <label className={inputClasses}>
          <AttachFileIcon fontSize="small" />
          <span>{text || 'File'}</span>
          <input
            type="file"
            className="hidden"
            {...(!register && { onChange: handleChange })}
            {...(register || { name })}
            {...props}
          />
        </label>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      {/* ERROR MODAL */}
      <Snackbar
        open={errorOpen}
        message="The selected file is too large. Please select a file that is smaller than 1MB"
        onClose={handleCloseError}
        type="error"
      />
    </>
  )
}
