'use client'

import { useEffect, useState } from 'react'

const sizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

export function useMediaQuery(size: keyof typeof sizes | number) {
  const ssr = typeof window === 'undefined'
  const [matches, setMatches] = useState(() => {
    if (ssr) return false

    const screenSize = typeof size === 'number' ? size : sizes[size]
    const mql = window.matchMedia(`(max-width: ${screenSize}px)`)
    return mql.matches
  })

  useEffect(() => {
    if (ssr) return

    const screenSize = typeof size === 'number' ? size : sizes[size]
    const mql = window.matchMedia(`(max-width: ${screenSize}px)`)

    mql.addEventListener('change', resize)

    function resize(e: MediaQueryListEvent) {
      setMatches(e.matches)
    }

    return () => {
      mql.removeEventListener('change', resize)
    }
  }, [ssr, size])

  return matches
}
