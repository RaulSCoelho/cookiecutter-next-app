import { tv } from 'tailwind-variants'

import { ButtonBase, ButtonBaseProps } from './ButtonBase'

export interface ButtonProps extends ButtonBaseProps {
  loading?: boolean
  readOnly?: boolean
  variant?: 'text' | 'contained' | 'outlined'
}

const button = tv({
  base: 'rounded px-4 py-2 font-bold focus:outline-none',
  variants: {
    variant: {
      text: 'hover:bg-skin-button hover:bg-opacity-5 text-skin-fill-primary',
      contained: 'bg-skin-button hover:bg-skin-button-hover',
      outlined: 'border-skin-fill-primary text-skin-fill-primary border hover:bg-skin-button hover:bg-opacity-5'
    },
    readOnly: {
      true: 'text-gray-500 bg-gray-400 hover:bg-gray-400'
    },
    loading: {
      true: 'text-transparent'
    }
  },
  compoundVariants: [
    { readOnly: true, variant: ['outlined', 'text'], class: 'border-gray-400 bg-opacity-5' },
    { readOnly: false, loading: false, class: 'active:shadow-lg' }
  ],
  defaultVariants: {
    readOnly: false,
    loading: false
  }
})

export function Button({ children, variant = 'contained', className, ...rest }: ButtonProps) {
  return (
    <ButtonBase className={button({ variant, loading: rest.loading, readOnly: rest.readOnly, className })} {...rest}>
      {children}
    </ButtonBase>
  )
}
