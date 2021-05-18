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

import api from '@/services/api'

import { IProductsDTO } from '@/dtos/IProductsDTO'

import Title from '@/components/Title'
import Filter from '@/components/Filter'
import Pagination from '@/components/Pagination'

import { GetServerSideProps, NextPage } from 'next'
interface HomeProps {
  limit: number
  page: number
  total_count: number
  listProducts: IProductsDTO[]
}

const Home: NextPage<HomeProps> = ({
  page,
  limit,
  total_count,
  listProducts
}) => {
  return (
    <Container>
      <SEO title="HOME" image="/banner.png" />
      {page <= 1 && (
        <BannerContainer>
          <img src="banner.png" alt="" />
        </BannerContainer>
      )}

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
          {listProducts &&
            listProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </GridContainer>
      </OffersContainer>
      <Pagination
        page={page}
        itemsPerPage={page >= 1 ? 10 : 15}
        total_count={total_count}
      />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page || 1

  const { data } = await api.get(`/products/in-list?type=offer&page=${page}`)
  const { data: listProducts, limit, total_count } = data

  return {
    props: {
      page,
      limit,
      total_count,
      listProducts
    }
  }
}

export default Home
