import { IconType } from 'react-icons/lib'

import { tv } from 'tailwind-variants'

import { ButtonBase, ButtonBaseProps } from './ButtonBase'

interface IconButtonProps extends Omit<ButtonBaseProps, 'children'> {
  icon: IconType
  size?: number
  color?: string
}

const iconButton = tv({
  base: 'flex aspect-square p-1.5 items-center justify-center rounded-[50%] bg-gray-500 bg-opacity-10'
})

export function IconButton({ icon: Icon, size, color, className, ...rest }: IconButtonProps) {
  return (
    <ButtonBase className={iconButton({ className })} {...rest}>
      <Icon size={size || 20} color={color || 'inherit'} />
    </ButtonBase>
  )
}
