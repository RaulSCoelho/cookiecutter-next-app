import { Button, ButtonProps } from '../Buttons'

interface ModalActionProps extends Omit<ButtonProps, 'children'> {
  text: string
}

export function ModalAction({ text, ...rest }: ModalActionProps) {
  return <Button {...rest}>{text}</Button>
}
