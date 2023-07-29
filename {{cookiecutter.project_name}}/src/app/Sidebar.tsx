'use client'

import { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { IoHomeOutline } from 'react-icons/io5'
import { MdLogin, MdMenu } from 'react-icons/md'
import { RiFilePaper2Line } from 'react-icons/ri'

import { IconButton } from '@/components/Buttons/IconButton'
import { Sidebar as SidebarComponent } from '@/components/Sidebar'
import { useUser } from '@/hooks/useUser'

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isAuthenticated, redirectToLoginPage, logout } = useUser()

  function openSidebar() {
    setSidebarOpen(true)
  }

  function closeSidebar() {
    setSidebarOpen(false)
  }

  return (
    <>
      <IconButton icon={MdMenu} size={24} onClick={openSidebar} className="rounded bg-transparent" />
      <SidebarComponent.Root open={sidebarOpen} onClose={closeSidebar}>
        <SidebarComponent.Header text="Cookiecutter Next.js Template" logo="/favicon.ico" onClose={closeSidebar} />
        <SidebarComponent.Body>
          <SidebarComponent.Route text="Home" path="/" icon={IoHomeOutline} exact />
          <SidebarComponent.Route text="Components" path="/components" icon={RiFilePaper2Line} />
          <SidebarComponent.Route text="Users" path="/users" icon={AiOutlineUser} />
        </SidebarComponent.Body>
        <SidebarComponent.Footer>
          <div
            onClick={isAuthenticated ? logout : redirectToLoginPage}
            className="flex w-full cursor-pointer items-center justify-center gap-2 p-2 text-lg"
          >
            {isAuthenticated ? 'Sign Out' : 'Sign In'}
            <MdLogin size={24} />
          </div>
        </SidebarComponent.Footer>
      </SidebarComponent.Root>
    </>
  )
}
