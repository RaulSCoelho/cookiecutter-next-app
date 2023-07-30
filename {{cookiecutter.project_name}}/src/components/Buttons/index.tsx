import { tv } from 'tailwind-variants'

import { ButtonBase, ButtonBaseProps } from './ButtonBase'

export interface ButtonProps extends ButtonBaseProps {
  loading?: boolean
  readOnly?: boolean
  variant?: 'text' | 'contained' | 'outlined'
}

const button = tv({
  base: 'rounded px-4 py-2 font-bold focus:outline-none text-white',
  variants: {
    variant: {
      text: 'text-[#2065D1] hover:bg-[#2065D120] dark:text-[#103996] dark:hover:bg-[#10399620]',
      contained: 'bg-[#2065D1] hover:bg-[#1d56b1] dark:bg-[#103996] dark:hover:bg-[#061B64]',
      outlined:
        'border border-[#2065D1] text-[#2065D1] hover:bg-[#2065D120] dark:border-[#103996] dark:text-[#103996] dark:hover:bg-[#10399620]'
    },
    readOnly: {
      true: 'text-gray-500 bg-gray-400 hover:bg-gray-400 dark:text-gray-500 dark:bg-gray-400 dark:hover:bg-gray-400'
    },
    loading: {
      true: 'text-transparent dark:text-transparent'
    }
  },
  compoundVariants: [
    {
      readOnly: true,
      variant: ['outlined', 'text'],
      class: 'border-gray-400 bg-gray-400/5 dark:border-gray-400 dark:bg-gray-400/5'
    },
    { readOnly: false, loading: false, class: 'active:shadow-lg' }
  ],
  defaultVariants: {
    readOnly: false,
    loading: false
  }
})

export function Button({ children, className, variant = 'contained', rippleColor = '#7dafff', ...rest }: ButtonProps) {
  return (
    <ButtonBase
      rippleColor={rippleColor}
      className={button({ variant, loading: rest.loading, readOnly: rest.readOnly, className })}
      {...rest}
    >
      {children}
    </ButtonBase>
  )
}
