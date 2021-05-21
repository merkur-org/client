import { Container } from './styles'

interface MessagesProps {
  message: string
  open: boolean
  timer: number
  type: string
}

const ModalMessage: React.FC<MessagesProps> = ({
  message,
  open,
  timer,
  type
}) => {
  return (
    <Container isOpen={open} type={type}>
      <p>{message}</p>
    </Container>
  )
}

export default ModalMessage
