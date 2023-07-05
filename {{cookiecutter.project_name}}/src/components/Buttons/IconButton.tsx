import { ReactNode } from 'react'

import { ButtonBase, ButtonBaseProps } from './ButtonBase'

export interface IconButtonProps extends Omit<ButtonBaseProps, 'children'> {}

export function IconButton({ icon, className, ...props }: IconButtonProps & { icon: ReactNode }) {
  return (
    <ButtonBase
      className={`flex h-8 w-8 items-center justify-center rounded-[50%] bg-gray-500 bg-opacity-10 ${className}`}
      {...props}
    >
      {icon}
    </ButtonBase>
  )
}
