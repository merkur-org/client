import { Container } from './styles'

interface TitleProps {
  title: string
  subtitle?: string
}

const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <Container>
      <div></div>
      <h1>{title}</h1>
      <span>{subtitle}</span>
    </Container>
  )
}

export default Title
