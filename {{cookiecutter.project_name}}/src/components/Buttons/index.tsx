import classnames from 'classnames'

import { ButtonBase, ButtonBaseProps } from './ButtonBase'

export interface ButtonProps extends ButtonBaseProps {
  loading?: boolean
  readOnly?: boolean
  variant?: 'text' | 'contained' | 'outlined'
}

export function Button({ children, className, ...rest }: ButtonProps) {
  const classes = classnames(
    'rounded px-4 py-2 font-bold text-white focus:outline-none',
    { 'bg-skin-button hover:bg-skin-button-hover': !rest.readOnly },
    className
  )

  return (
    <ButtonBase className={classes} {...rest}>
      {children}
    </ButtonBase>
  )
}
