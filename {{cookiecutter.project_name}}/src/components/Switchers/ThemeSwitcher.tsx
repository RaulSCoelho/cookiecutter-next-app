'use client'

import { useTheme } from '@/hooks/useTheme'

import { DayNightSwitch } from './DayNightSwitch'

export function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme()

  return (
    <DayNightSwitch day={theme === 'light'} onDay={() => changeTheme('light')} onNight={() => changeTheme('dark')} />
  )
}
