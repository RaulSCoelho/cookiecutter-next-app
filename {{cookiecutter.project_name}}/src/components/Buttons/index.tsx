import { ButtonBase, ButtonBaseProps } from './ButtonBase'

interface Props extends ButtonBaseProps {
  loading?: boolean
  readOnly?: boolean
  variant?: 'text' | 'contained' | 'outlined'
}

export function Button({ children, ...props }: Props) {
  props.className += ' rounded px-4 py-2 font-bold text-white focus:outline-none'
  if (!props.readOnly) {
    props.className += ' bg-skin-button hover:bg-skin-button-hover'
  }

  return <ButtonBase {...props}>{children}</ButtonBase>
}
