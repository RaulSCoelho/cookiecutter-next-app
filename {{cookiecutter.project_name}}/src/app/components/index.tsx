'use client'

import { ReactNode, useState } from 'react'

import { Button } from '@/components/Buttons'
import { ConfirmationModal } from '@/components/Feedback/ConfirmationModal'
import { SnackbarProps } from '@/components/Feedback/Snackbar'
import { Select } from '@/components/Input/Select'
import { Modal } from '@/components/Modal'
import { useSnackbar } from '@/hooks/useSnackbar'

export function Components() {
  return (
    <div className="p-5">
      <h1 data-test="h1Title" className="pb-4 text-center text-2xl font-medium">
        Some components of this template
      </h1>
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
      <Button onClick={handleClick} loading={loading} variant="text">
        Click
      </Button>
      <Button onClick={handleClick} loading={loading}>
        Click
      </Button>
      <Button onClick={handleClick} loading={loading} variant="outlined">
        Click
      </Button>
    </Component>
  )
}

function Modals() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const tvShows = ['Lucifer', 'Stranger Things', 'The Witcher', 'Daredevil', 'Peaky Blinders']

  function closeModal() {
    setIsModalOpen(false)
  }

  function closeConfirmModal() {
    setIsConfirmModalOpen(false)
  }

  return (
    <Component title="Modal">
      <Button onClick={() => setIsModalOpen(prev => !prev)}>Open Modal</Button>
      <Modal.Root open={isModalOpen} title="TV Shows" onClose={closeModal} size="fixed-sm">
        <Modal.Content>
          <ul>
            {tvShows.map(ts => (
              <li key={ts}>{ts}</li>
            ))}
          </ul>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={() => setIsConfirmModalOpen(true)}>Confirm</Button>
        </Modal.Actions>
      </Modal.Root>
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
  const { open: openSnackbar } = useSnackbar()
  const [type, setType] = useState<SnackbarProps['type']>('success')
  const [position, setPosition] = useState<SnackbarProps['position']>('left-bottom')
  const positions = ['left-bottom', 'right-bottom', 'mid-bottom', 'left-top', 'right-top', 'mid-top']
  const types = ['success', 'error', 'alert', 'info']

  function handleOpenSnackbar() {
    openSnackbar({ message: 'Snackbar message!', type, position })
  }

  return (
    <Component title="Snackbars">
      <div className="flex flex-col gap-2">
        <Button onClick={handleOpenSnackbar}>Open Snackbars</Button>
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
    </Component>
  )
}

function Component({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-center text-lg font-medium">{title}</p>
      <div className="flex h-full w-full items-center justify-center gap-1">{children}</div>
    </div>
  )
}
