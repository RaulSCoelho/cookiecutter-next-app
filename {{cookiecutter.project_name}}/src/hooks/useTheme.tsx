'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react'

import { parseCookies, setCookie, destroyCookie } from 'nookies'

type SystemTheme = 'light' | 'dark'
export type Theme = SystemTheme | 'system'

type ThemesContextProps = {
  theme: Theme
  systemTheme: SystemTheme
  setTheme(theme: Theme): void
}

const ThemesContext = createContext({} as ThemesContextProps)

function isSystemDark() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function isDarkMode(theme: Theme) {
  return theme === 'dark' || (theme === 'system' && isSystemDark())
}

export function ThemesProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState<Theme>(() => {
    const { theme } = parseCookies()
    return theme !== 'dark' && theme !== 'light' ? 'system' : theme
  })
  const systemTheme = isSystemDark() ? 'dark' : 'light'

  useEffect(() => {
    if (isDarkMode(theme)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (theme === 'system') {
      destroyCookie(undefined, 'theme')
    } else {
      setCookie(undefined, 'theme', theme, {
        path: '/',
        maxAge: 2147483647
      })
    }
    setLoading(false)
  }, [theme])

  const value: ThemesContextProps = { theme, systemTheme, setTheme }
  return <ThemesContext.Provider value={value}>{loading ? null : children}</ThemesContext.Provider>
}

export function useTheme(): ThemesContextProps {
  return useContext(ThemesContext)
}
