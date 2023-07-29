'use client'

import { useTheme } from '@/hooks/useTheme'

import { DayNightSwitch } from './DayNightSwitch'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  return <DayNightSwitch day={theme === 'light'} onDay={() => setTheme('light')} onNight={() => setTheme('dark')} />
}
