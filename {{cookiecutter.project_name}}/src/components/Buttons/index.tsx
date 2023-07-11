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
    readOnly: {
      false: 'bg-skin-button hover:bg-skin-button-hover'
    }
  },
  defaultVariants: {
    readOnly: false
  }
})

export function Button({ children, readOnly, className, ...rest }: ButtonProps) {
  return (
    <ButtonBase className={button({ readOnly, className })} {...rest}>
      {children}
    </ButtonBase>
  )
}
