import Link from 'next/link'
import { FaLongArrowAltLeft } from 'react-icons/fa'

import { Container } from './styles'

interface ButtonProps {
  link?: string
}

const BackButton: React.FC<ButtonProps> = ({ link }) => {
  return (
    <Container>
      <Link href={`/${link || ''}`}>
        <a>
          <FaLongArrowAltLeft />
          voltar para home
        </a>
      </Link>
    </Container>
  )
}

export default BackButton
