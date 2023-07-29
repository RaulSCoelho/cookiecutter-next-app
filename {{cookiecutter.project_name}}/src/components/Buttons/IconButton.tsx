import { IconType } from 'react-icons/lib'

import { tv } from 'tailwind-variants'

import { Badge } from '../Badge'
import { ButtonBase, ButtonBaseProps } from './ButtonBase'

export interface IconButtonProps extends Omit<ButtonBaseProps, 'children'> {
  icon: IconType
  size?: number
  color?: string
  badgeContent?: string | number
}

const iconButton = tv({
  base: 'relative flex aspect-square p-1.5 items-center justify-center rounded-[50%] bg-gray-500 bg-opacity-10'
})

export function IconButton({ icon: Icon, size, color, badgeContent, className, ...rest }: IconButtonProps) {
  return (
    <ButtonBase className={iconButton({ className })} {...rest}>
      <Badge content={badgeContent}>
        <Icon size={size || 20} color={color || 'inherit'} />
      </Badge>
    </ButtonBase>
  )
}
