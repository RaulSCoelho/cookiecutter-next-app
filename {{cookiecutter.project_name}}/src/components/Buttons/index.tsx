import { tv } from 'tailwind-variants'

import { ButtonBase, ButtonBaseProps } from './ButtonBase'

export interface ButtonProps extends ButtonBaseProps {
  loading?: boolean
  readOnly?: boolean
  variant?: 'text' | 'contained' | 'outlined'
}

const button = tv({
  base: 'rounded px-4 py-2 font-bold text-white focus:outline-none',
  variants: {
    variant: {
      text: 'hover:bg-skin-button hover:bg-opacity-5',
      contained: 'bg-skin-button hover:bg-skin-button-hover',
      outlined: 'border-skin-fill-primary text-skin-fill-primary border hover:bg-skin-button hover:bg-opacity-5'
    }
  }
})

export function Button({ children, variant = 'contained', loading, readOnly, className, ...rest }: ButtonProps) {
  variant = variant === 'contained' || !(readOnly || loading) ? variant : 'contained'

  return (
    <ButtonBase className={button({ variant, className })} loading={loading} readOnly={readOnly} {...rest}>
      {children}
    </ButtonBase>
  )
}
