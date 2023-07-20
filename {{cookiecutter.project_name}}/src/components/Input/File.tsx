'use client'

import { ChangeEvent, InputHTMLAttributes, SyntheticEvent, forwardRef, useState } from 'react'
import { MdAttachFile as AttachFileIcon } from 'react-icons/md'

import { tv } from 'tailwind-variants'

import { Snackbar } from '../Feedback/Snackbar'

interface FileProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  text?: string
  error?: string
  wrapperClassName?: string
}

const file = tv({
  base: 'flex max-w-max cursor-pointer gap-1 rounded-lg bg-skin-button p-2 text-sm uppercase tracking-wide text-gray-100 shadow-lg hover:bg-skin-button-hover active:bg-skin-button'
})

export const File = forwardRef<HTMLInputElement, FileProps>(function File(
  { text, error, wrapperClassName, className, onChange, ...rest },
  ref
) {
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

  return (
    <>
      <div className={wrapperClassName}>
        <label className={file({ className })}>
          <AttachFileIcon size={20} />
          <span>{text || 'File'}</span>
          <input ref={ref} type="file" className="hidden" onChange={handleChange} {...rest} />
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
})
