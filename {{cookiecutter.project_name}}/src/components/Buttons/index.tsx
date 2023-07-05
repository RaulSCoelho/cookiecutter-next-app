import classnames from 'classnames'

import { ButtonBase, ButtonBaseProps } from './ButtonBase'

interface Props extends ButtonBaseProps {
  loading?: boolean
  readOnly?: boolean
  variant?: 'text' | 'contained' | 'outlined'
}

export function Button({ children, className, ...props }: Props) {
  const classes = classnames(
    'rounded px-4 py-2 font-bold text-white focus:outline-none',
    { 'bg-skin-button hover:bg-skin-button-hover': !props.readOnly },
    className
  )

  return (
    <ButtonBase className={classes} {...props}>
      {children}
    </ButtonBase>
  )
}
