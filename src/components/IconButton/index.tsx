import { IconBaseProps } from 'react-icons'
import { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<IconBaseProps>
}

const Button: React.FC<ButtonProps> = ({ icon: Icon }) => {
  return <Container>{Icon && <Icon />}</Container>
}

export default Button
