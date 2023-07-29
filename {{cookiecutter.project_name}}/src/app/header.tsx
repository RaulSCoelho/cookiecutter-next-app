'use client'

import { ThemeSwitcher } from '@/components/Switchers/ThemeSwitcher'
import Link from 'next/link'

import { Sidebar } from './Sidebar'

export function Header() {
  return (
    <div className="fixed top-0 z-10 flex h-14 w-full items-center justify-between bg-[#fbfbfb] px-4 shadow-md dark:bg-[#0F172A]">
      <div className="flex items-center gap-4">
        <Sidebar />
        <Link href="/" className="text-lg font-semibold">
          Cookiecutter Next.js Template
        </Link>
      </div>
      <ThemeSwitcher />
    </div>
  )
}
