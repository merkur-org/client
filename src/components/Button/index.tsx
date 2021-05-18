import { IconBaseProps } from 'react-icons'
import { ButtonHTMLAttributes } from 'react'
import Router from 'next/router'

import { Container } from './styles'
import Link from 'next/link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon?: React.ComponentType<IconBaseProps>
  buttonType?: string
  link?: string
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon: Icon,
  buttonType,
  link,
  ...rest
}) => {
  function handleNavigate(link: string) {
    Router.push(link)
  }

  return (
    <Container
      buttonType={buttonType || 'greenPrimary'}
      onClick={() => {
        link && handleNavigate(link)
      }}
      {...rest}
    >
      <span>{text}</span>
      {Icon && <Icon />}
    </Container>
  )
}

export default Button
