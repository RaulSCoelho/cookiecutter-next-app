import { ReactNode } from 'react'

import classnames from 'classnames'

import { ButtonBase, ButtonBaseProps } from './ButtonBase'

export interface IconButtonProps extends Omit<ButtonBaseProps, 'children'> {}

export function IconButton({ icon, className, ...rest }: IconButtonProps & { icon: ReactNode }) {
  const classes = classnames(
    'flex aspect-square p-1.5 items-center justify-center rounded-[50%] bg-gray-500 bg-opacity-10',
    className
  )

  return (
    <ButtonBase className={classes} {...rest}>
      {icon}
    </ButtonBase>
  )
}
