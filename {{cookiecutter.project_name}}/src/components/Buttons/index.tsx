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
      text: 'text-[#2065D1] hover:bg-[#2065D120] dark:text-[#bd93f9] dark:hover:bg-[#bd93f920]',
      contained: 'bg-[#2065D1] hover:bg-[#1d56b1] dark:bg-[#bd93f9] dark:hover:bg-[#8b5cf6]',
      outlined:
        'border border-[#2065D1] text-[#2065D1] hover:bg-[#2065D120] dark:border-[#bd93f9] dark:text-[#bd93f9] dark:hover:bg-[#bd93f920]'
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

export function Button({ children, variant = 'contained', className, ...rest }: ButtonProps) {
  return (
    <ButtonBase className={button({ variant, loading: rest.loading, readOnly: rest.readOnly, className })} {...rest}>
      {children}
    </ButtonBase>
  )
}
