import { IoClose as CloseIcon } from 'react-icons/io5'

import { IconButton, IconButtonProps } from './IconButton'

export function CloseButton({ ...props }: IconButtonProps) {
  return <IconButton icon={<CloseIcon size={20} color="inherit" />} {...props} />
}
