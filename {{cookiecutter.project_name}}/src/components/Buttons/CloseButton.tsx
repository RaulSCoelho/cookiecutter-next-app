import { IoClose as CloseIcon } from 'react-icons/io5'

import { IconButton, IconButtonProps } from './IconButton'

export function CloseButton({ ...props }: IconButtonProps) {
  return <IconButton icon={<CloseIcon color="inherit" />} {...props} />
}
