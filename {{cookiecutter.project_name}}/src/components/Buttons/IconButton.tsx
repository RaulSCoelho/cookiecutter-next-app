import { ReactNode } from 'react'

import { tv } from 'tailwind-variants'

import { ButtonBase, ButtonBaseProps } from './ButtonBase'

export interface IconButtonProps extends Omit<ButtonBaseProps, 'children'> {}

const iconButton = tv({
  base: 'flex aspect-square p-1.5 items-center justify-center rounded-[50%] bg-gray-500 bg-opacity-10'
})

export function IconButton({ icon, className, ...rest }: IconButtonProps & { icon: ReactNode }) {
  return (
    <ButtonBase className={iconButton({ className })} {...rest}>
      {icon}
    </ButtonBase>
  )
}
