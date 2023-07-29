'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react'

import { parseCookies, setCookie } from 'nookies'

type Theme = 'light' | 'dark'

type ThemesContextProps = {
  theme: Theme
  setTheme(theme: Theme): void
  toggleTheme(): void
}

const ThemesContext = createContext({} as ThemesContextProps)

function isDarkMode() {
  const { theme } = parseCookies()
  if (typeof window === 'undefined') return false
  return theme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(isDarkMode() ? 'dark' : 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setCookie(undefined, 'theme', theme, {
      path: '/',
      maxAge: 2147483647
    })
  }, [theme])

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const value: ThemesContextProps = { theme, setTheme, toggleTheme }
  return <ThemesContext.Provider value={value}>{children}</ThemesContext.Provider>
}

export function useTheme(): ThemesContextProps {
  return useContext(ThemesContext)
}
