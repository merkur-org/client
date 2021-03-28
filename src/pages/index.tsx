import {
  Container,
  GridContainer,
  OffersContainer,
  OffersTopTitle,
  Filter
} from '@/styles/pages/Home'
import SEO from '@/components/SEO'
import ProductCard from '@/components/Product'
import { FaDotCircle, FaArrowRight } from 'react-icons/fa'

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const Home: React.FC = () => {
  return (
    <Container>
      <SEO title="HOME" image="/banner.png" />

      <OffersContainer>
        <OffersTopTitle>
          <section>
            <FaDotCircle />
            <span>Ofertas</span>
          </section>
          <Filter>
            <span>Filtrar por</span>
            <FaArrowRight />
          </Filter>
        </OffersTopTitle>
        <GridContainer>
          {a.map(b => (
            <ProductCard
              key={b}
              photo="photo"
              productName="Batata"
              category="Legumes"
              price="10"
              unity="kg"
              quantity={1}
            />
          ))}
        </GridContainer>
      </OffersContainer>
    </Container>
  )
}

export default Home
