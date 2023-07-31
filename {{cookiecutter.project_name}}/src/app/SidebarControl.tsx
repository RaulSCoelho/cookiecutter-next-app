'use client'

import { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { IoHomeOutline } from 'react-icons/io5'
import { MdLogin, MdMenu } from 'react-icons/md'
import { RiFilePaper2Line } from 'react-icons/ri'

import { IconButton } from '@/components/Buttons/IconButton'
import { Sidebar } from '@/components/Sidebar'
import { SidebarBody } from '@/components/Sidebar/SidebarBody'
import { SidebarFooter } from '@/components/Sidebar/SidebarFooter'
import { SidebarRoute } from '@/components/Sidebar/SidebarRoute'
import { useUser } from '@/hooks/useUser'

export function SidebarControl() {
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
      <Sidebar open={sidebarOpen} onClose={closeSidebar} title="Cookiecutter Next.js Template" logo="/favicon.ico">
        <SidebarBody>
          <SidebarRoute text="Home" path="/" icon={IoHomeOutline} exact />
          <SidebarRoute text="Components" path="/components" icon={RiFilePaper2Line} />
          <SidebarRoute text="Users" path="/users" icon={AiOutlineUser} />
        </SidebarBody>
        <SidebarFooter>
          <div
            onClick={isAuthenticated ? logout : redirectToLoginPage}
            className="flex w-full cursor-pointer items-center justify-center gap-2 p-2 text-lg"
          >
            {isAuthenticated ? 'Sign Out' : 'Sign In'}
            <MdLogin size={24} />
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
