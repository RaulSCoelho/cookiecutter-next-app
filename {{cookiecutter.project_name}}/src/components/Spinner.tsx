import { CSSProperties } from 'react'

import classnames from 'classnames'

interface SpinnerProps {
  size?: number
  color?: CSSProperties['color']
  className?: string
}

export function Spinner({ size = 2.5, color = 'inherit', className }: SpinnerProps) {
  const style: CSSProperties = {
    width: `${size}rem`,
    height: `${size}rem`,
    animationDuration: '1.4s',
    color
  }

  const svgClasses = classnames('animate-spin', className)

  return (
    <svg className={svgClasses} style={style} viewBox="22 22 44 44">
      <circle
        className="animate-strokedrift fill-none stroke-current stroke-[3.6]"
        strokeDasharray="80px, 200px"
        cx="44"
        cy="44"
        r="20.2"
      ></circle>
    </svg>
  )
}
