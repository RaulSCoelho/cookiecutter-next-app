import { RefObject, useEffect } from 'react'

export function useClickOutside(ref: RefObject<any>, onClickOutside: () => void) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside()
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [ref, onClickOutside])
}
