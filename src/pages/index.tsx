import { Container } from '@/styles/pages/Home'
import SEO from '@/components/SEO'

import { FaCheck } from 'react-icons/fa'

import Button from '@/components/Button'

const Home: React.FC = () => {
  return (
    <Container>
      <SEO title="HOME" image="/banner.png" />

      <Button text="Confirmar" icon={FaCheck} />
    </Container>
  )
}

export default Home
