'use client'

import { useEffect, useRef, useState } from 'react'
import { BiSun } from 'react-icons/bi'
import { LuMoonStar } from 'react-icons/lu'
import { TbDeviceDesktop } from 'react-icons/tb'

import { Theme, useTheme } from '@/hooks/useTheme'
import { tv } from 'tailwind-variants'

const themes = [
  {
    theme: 'light',
    text: 'Light',
    Icon: BiSun
  },
  {
    theme: 'dark',
    text: 'Dark',
    Icon: LuMoonStar
  },
  {
    theme: 'system',
    text: 'System',
    Icon: TbDeviceDesktop
  }
]

const themeSelect = tv({
  base: 'flex cursor-pointer items-center px-2 py-1 hover:bg-slate-600/5 dark:hover:bg-slate-600/30',
  variants: {
    selected: {
      true: 'text-sky-500'
    }
  }
})

export function ThemeSwitcher() {
  const { theme: selectedTheme, systemTheme, setTheme } = useTheme()
  const [selectOpen, setSelectOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const theme = selectedTheme === 'system' ? systemTheme : selectedTheme

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!selectRef.current || !selectRef.current.contains(e.target as HTMLDivElement)) {
        setSelectOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  function openSelect() {
    setSelectOpen(true)
  }

  function selectTheme(theme: Theme) {
    setTheme(theme)
    setSelectOpen(false)
  }

  return (
    <div className="relative">
      {theme === 'light' ? (
        <BiSun size={24} className="cursor-pointer text-slate-400" onClick={openSelect} />
      ) : (
        <LuMoonStar size={24} className="cursor-pointer text-slate-400" onClick={openSelect} />
      )}
      {selectOpen && (
        <div
          ref={selectRef}
          className="absolute right-0 top-full z-10 mt-8 w-36 select-none overflow-hidden rounded-lg bg-white py-1 text-sm font-semibold text-slate-700 shadow-lg dark:bg-slate-800 dark:text-slate-300"
        >
          {themes.map(({ theme, text, Icon }) => (
            <div
              className={themeSelect({ selected: selectedTheme === theme })}
              onClick={() => selectTheme(theme as Theme)}
              key={text}
            >
              <Icon size={24} className="mr-2" />
              {text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
