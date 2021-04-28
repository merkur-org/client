import {
  Container,
  BannerContainer,
  GridContainer,
  OffersContainer,
  OffersTopTitle
} from '@/styles/pages/Home'
import SEO from '@/components/SEO'
import ProductCard from '@/components/Product'
import { FaLongArrowAltRight } from 'react-icons/fa'

import Title from '@/components/Title'
import Filter from '@/components/Filter'

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const Home: React.FC = () => {
  return (
    <Container>
      <SEO title="HOME" image="/banner.png" />
      <BannerContainer>
        <img src="banner.png" alt="" />
      </BannerContainer>

      <OffersTopTitle>
        <Title title="Ofertas" />
        <Filter
          buttonContent={
            <>
              <p>Filtrar por</p>
              <FaLongArrowAltRight />
            </>
          }
        >
          <li>Adicionados Recentemente</li>
          <li>Categorias</li>
          <li>Menor Preço</li>
          <li>Maior Preço</li>
          <li>Ordem Alfabética</li>
          <li>Promoções</li>
        </Filter>
      </OffersTopTitle>
      <OffersContainer>
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
