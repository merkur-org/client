import { IconBaseProps } from 'react-icons'
import { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon?: React.ComponentType<IconBaseProps>
  buttonType?: string
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon: Icon,
  buttonType,
  ...rest
}) => {
  return (
    <Container buttonType={buttonType || 'greenPrimary'} {...rest}>
      <span>{text}</span>
      {Icon && <Icon />}
    </Container>
  )
}

export default Button
