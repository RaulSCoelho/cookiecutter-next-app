'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react'

import { parseCookies, setCookie } from 'nookies'

type Theme = 'light' | 'dark'

type ThemesContextProps = {
  theme: Theme
  changeTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemesContext = createContext({} as ThemesContextProps)

function restoreTheme() {
  const { theme } = parseCookies()
  return theme as Theme
}

function storeTheme(theme: string) {
  setCookie(undefined, 'theme', theme, {
    path: '/',
    maxAge: 2147483647
  })
}

export function ThemesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = restoreTheme()
    if (storedTheme) return storedTheme
    return 'dark'
  })

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  function changeTheme(theme: Theme) {
    setTheme(theme)
  }

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement
    body.classList.toggle('theme-dark', theme === 'dark')
    storeTheme(theme)
  }, [theme])

  const value: ThemesContextProps = { theme, changeTheme, toggleTheme }
  return <ThemesContext.Provider value={value}>{children}</ThemesContext.Provider>
}

export function useTheme(): ThemesContextProps {
  return useContext(ThemesContext)
}
