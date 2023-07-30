import { RefObject, useEffect } from 'react'

interface UseClickOutsideProps {
  ref: RefObject<any>
  parent?: RefObject<any>
  onClickOutside?(): void
}

export function useClickOutside({ ref, parent, onClickOutside }: UseClickOutsideProps) {
  useEffect(() => {
    const parentElement = parent?.current || document

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside?.()
      }
    }

    parentElement.addEventListener('click', handleClickOutside, true)
    return () => {
      parentElement.removeEventListener('click', handleClickOutside, true)
    }
  }, [ref, parent, onClickOutside])
}
