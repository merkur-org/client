import { IconBaseProps } from 'react-icons'
import { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon?: React.ComponentType<IconBaseProps>
}

const Button: React.FC<ButtonProps> = ({ text, icon: Icon }) => {
  return (
    <Container>
      <span>{text}</span>
      {Icon && <Icon />}
    </Container>
  )
}

export default Button
