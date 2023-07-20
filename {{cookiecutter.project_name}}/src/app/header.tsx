'use client'

import { AiOutlineUser } from 'react-icons/ai'
import { IoHomeOutline } from 'react-icons/io5'
import { RiFilePaper2Line } from 'react-icons/ri'

import { Sidebar } from '@/components/Sidebar'
import { ThemeSwitcher } from '@/components/Switchers/ThemeSwitcher'
import Link from 'next/link'

import { LoginLogout } from './LoginLogout'

export function Header() {
  return (
    <div className="fixed top-0 z-10 flex h-14 w-full items-center justify-between bg-skin-fill-primary px-4 shadow-md">
      <div className="flex items-center gap-4">
        <Sidebar.Root>
          <Sidebar.Header text="Cookiecutter Next.js Template" logo="/favicon.ico" />
          <Sidebar.Body>
            <Sidebar.Route text="Home" path="/" icon={IoHomeOutline} />
            <Sidebar.Route text="Components" path="/components" icon={RiFilePaper2Line} />
            <Sidebar.Route text="Users" path="/users" icon={AiOutlineUser} />
          </Sidebar.Body>
          <Sidebar.Footer close>
            <LoginLogout />
          </Sidebar.Footer>
        </Sidebar.Root>
        <Link href="/" className="text-lg font-semibold">
          Cookiecutter Next.js Template
        </Link>
      </div>
      <ThemeSwitcher />
    </div>
  )
}
