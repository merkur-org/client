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
import { useRouter } from 'next/router'
import { useState } from 'react'
interface HomeProps {
  limit: number
  page: number
  total_count: number
  listProducts: IProductsDTO[]
  search: string | string[]
}
const objectFilter = [
  {
    field: 'created_at',
    order: 'asc',
    laber: 'Adicionados Recentemente'
  },
  {
    field: 'sale_price',
    order: 'asc',
    laber: 'Menor Preço'
  },
  {
    field: 'sale_price',
    order: 'desc',
    laber: 'Maior Preço'
  },
  {
    field: 'name',
    order: 'asc',
    laber: 'Ordem Alfabética'
  }
]

const Home: NextPage<HomeProps> = ({
  page,
  limit,
  total_count,
  listProducts,
  search
}) => {
  const router = useRouter()
  const [filterLabel, setFilterLabel] = useState('')
  const [isOpenModalFilter, setIsOpenModalFilter] = useState(false)

  const handleFilter = (positionFilter: number) => {
    const { field, laber, order } = objectFilter[positionFilter]

    setFilterLabel(laber)
    setIsOpenModalFilter(false)

    router.push(`/?sort_by=${field}&order=${order}`)
  }

  return (
    <Container>
      <SEO title="HOME" image="/banner.png" />
      {search === '' && page <= 1 && (
        <BannerContainer>
          <img src="banner.png" alt="" />
        </BannerContainer>
      )}

      <OffersTopTitle>
        <Title title="Ofertas" />
        <Filter
          label={filterLabel}
          isOpenModalFilter={isOpenModalFilter}
          setIsOpenModalFilter={setIsOpenModalFilter}
          buttonContent={
            <>
              <p>Filtrar por</p>
              <FaLongArrowAltRight />
            </>
          }
        >
          <li onClick={() => handleFilter(0)}>Adicionados Recentemente</li>
          {/* <li onClick={() => handleFilter('')}>Categorias</li> */}
          <li onClick={() => handleFilter(1)}>Menor Preço</li>
          <li onClick={() => handleFilter(2)}>Maior Preço</li>
          <li onClick={() => handleFilter(3)}>Ordem Alfabética</li>
          {/* <li onClick={() => handleFilter('')}>Promoções</li> */}
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
      <Pagination page={page} itemsPerPage={limit} total_count={total_count} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { page = 1, search, sort_by, order } = query

  let url = `/products/in-list?type=offer&page=${page}&limit=${
    page > 1 ? 15 : 10
  }`

  search && search.length > 0 && (url = url + `&name=${search}`)
  sort_by && sort_by.length > 0 && (url = url + `&sort_by=${sort_by}`)
  order && order.length > 0 && (url = url + `&order=${order}`)

  const { data } = await api.get(url)
  const { data: listProducts, limit, total_count, list } = data

  return {
    props: {
      page,
      limit,
      total_count,
      listProducts,
      list,
      search: search || ''
    }
  }
}

export default Home
