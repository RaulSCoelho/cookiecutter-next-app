'use client'

import { ReactNode, useState } from 'react'

import { Button } from '@/components/Buttons'
import { ConfirmationModal } from '@/components/Feedback/ConfirmationModal'
import { Snackbar, SnackbarProps } from '@/components/Feedback/Snackbar'
import { Select } from '@/components/Input/Select'
import { Modal } from '@/components/Modal'

export function Components() {
  return (
    <div className="p-5">
      <h1 className="pb-4 text-center text-2xl font-medium">Some components of this template</h1>
      <div className="flex flex-wrap justify-center gap-10">
        <Spinner />
        <Modals />
        <Snackbars />
      </div>
    </div>
  )
}

function Spinner() {
  const [loading, setLoading] = useState(false)

  function handleClick() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <Component title="Spinner">
      <Button onClick={handleClick} loading={loading}>
        Click
      </Button>
    </Component>
  )
}

function Modals() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const tvShows = ['Lucifer', 'Stranger Things', 'The Witcher', 'Daredevil', 'Peaky Blinders']

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function openConfirmModal() {
    setIsConfirmModalOpen(true)
  }

  function closeConfirmModal() {
    setIsConfirmModalOpen(false)
  }

  function modalActions(onClose: () => void) {
    return (
      <>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={openConfirmModal}>Confirm</Button>
      </>
    )
  }

  return (
    <Component title="Modal">
      <Button onClick={openModal}>Open Modal</Button>
      <Modal open={isModalOpen} title="TV Shows" actions={modalActions} onClose={closeModal} fixedSize>
        <ul>
          {tvShows.map(ts => (
            <li key={ts}>{ts}</li>
          ))}
        </ul>
      </Modal>
      <ConfirmationModal
        open={isConfirmModalOpen}
        title="Confirm Modal"
        question="Do you want to proceed with this action?"
        onConfirm={closeConfirmModal}
        onCancel={closeConfirmModal}
      />
    </Component>
  )
}

function Snackbars() {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<SnackbarProps['type']>('success')
  const [position, setPosition] = useState<SnackbarProps['position']>('left-bottom')
  const positions = ['left-bottom', 'right-bottom', 'mid-bottom', 'left-top', 'right-top', 'mid-top']
  const types = ['success', 'error', 'alert', 'info']

  return (
    <Component title="Snackbars">
      <div className="flex flex-col gap-2">
        <Button onClick={() => setOpen(true)}>Open Snackbars</Button>
        <div className="flex gap-2">
          <Select label="type" onChange={e => setType(e.target.value as any)}>
            {types.map(t => (
              <option key={t}>{t}</option>
            ))}
          </Select>
          <Select label="position" onChange={e => setPosition(e.target.value as any)}>
            {positions.map(p => (
              <option key={p}>{p}</option>
            ))}
          </Select>
        </div>
      </div>
      <Snackbar
        open={open}
        message="Snackbar message!"
        onClose={() => setOpen(false)}
        type={type}
        position={position}
      />
    </Component>
  )
}

function Component({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-center text-lg font-medium">{title}</p>
      <div className="flex h-full w-full items-center justify-center">{children}</div>
    </div>
  )
}
