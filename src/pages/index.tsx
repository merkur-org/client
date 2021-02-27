import { Container } from '@/styles/pages/Home'
import SEO from '@/components/SEO'

const Home: React.FC = () => {
  return (
    <Container>
      <SEO title="HOME" image="/banner.png" />

      <h1>Hello</h1>
    </Container>
  )
}

export default Home
