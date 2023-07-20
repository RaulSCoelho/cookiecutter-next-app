'use client'

import { MouseEvent, ReactNode, createContext, useContext, useReducer } from 'react'
import { MdMenu } from 'react-icons/md'

import { tv } from 'tailwind-variants'

import { IconButton } from '../Buttons/IconButton'

type SidebarContextProps = {
  state: State
  close(): void
  open(): void
  setPage(page: string): void
}

const SidebarContext = createContext({} as SidebarContextProps)

interface Action {
  type: 'open' | 'close' | 'change_page'
  page?: string
}

interface State {
  open: boolean
  page: string
}

interface SidebarRootProps {
  children: ReactNode
}

const sidebar = tv({
  slots: {
    bg: 'fixed z-10 bg-black bg-opacity-50 select-none',
    menu: 'fixed flex flex-col bottom-0 top-0 w-[90%] bg-skin-fill-primary sm:w-96 transition-[left]'
  },
  variants: {
    open: {
      true: { bg: 'inset-0', menu: 'left-0' },
      false: { bg: '-left-full', menu: '-left-full' }
    }
  },
  defaultVariants: {
    open: false
  }
})

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'open':
      return { ...state, open: true }
    case 'close':
      return { ...state, open: false }
    case 'change_page':
      return { ...state, page: action.page || '' }
  }
}

export function SidebarRoot({ children }: SidebarRootProps) {
  const [state, dispatch] = useReducer(reducer, { open: false, page: '' })
  const { bg, menu } = sidebar({ open: state.open })

  function handleClose() {
    dispatch({ type: 'close' })
  }

  function handleOpen() {
    dispatch({ type: 'open' })
  }

  function setPage(page: string) {
    dispatch({ type: 'change_page', page })
  }

  function handleClickOutside(e: MouseEvent<HTMLDivElement>) {
    const sidebarBg = e.currentTarget as HTMLDivElement
    const sidebar = sidebarBg.firstChild as HTMLElement
    const target = e.target as HTMLDivElement

    if (!sidebar.contains(target) && sidebarBg.style.display !== 'none') {
      handleClose()
    }
  }

  const value: SidebarContextProps = { state, close: handleClose, open: handleOpen, setPage }
  return (
    <SidebarContext.Provider value={value}>
      <IconButton icon={MdMenu} onClick={handleOpen} />
      <div className={bg()} onClick={handleClickOutside}>
        <div className={menu()}>{children}</div>
      </div>
    </SidebarContext.Provider>
  )
}

export function useSidebar(): SidebarContextProps {
  return useContext(SidebarContext)
}
