<<<<<<< HEAD
import { FiBookOpen } from 'react-icons/fi'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { verify } from 'jsonwebtoken'

import Title from '@/components/Title'
import WithAuth from '@/components/WithAuth'

import { Container } from '@/styles/pages/cesta'
import { Table } from '@/styles/components/table'

import { useOrders } from '@/hooks/orders'
import api from '@/services/api'
import { useAuth } from '@/hooks/auth'
import { IOrderDTO } from '@/dtos/IOrderDTO'

import formatDate from '@/utils/formatDate'

interface OrderPageProps {
  limit: number
  total_count: number
  orderProducts: IOrderDTO[]
}

const Orders: NextPage<OrderPageProps> = ({
  limit,
  total_count,
  orderProducts
}) => {
  const { orders } = useOrders()
  const { user } = useAuth()

  return (
    <Container>
      <Title title="Meus Pedidos" />
      {orderProducts && (
        <Table>
          <tr>
            <th>Data</th>
            <th>Itens</th>
            <th>Total</th>
            <th>Local de Entrega</th>
            <th>Ações</th>
          </tr>
          {orderProducts.map(order => (
            <tr key={order.delivery_point_id}>
              <td>
                <h4 className="date">{formatDate(order.date)}</h4>
              </td>
              <td>
                <h4 className="price">{order.final_value}</h4>
              </td>
              <td>
                <h4 className="total">R$10</h4>
              </td>
              <td>
                <h4 className="text">{order.delivery_point_id}</h4>
              </td>
              <td>
                <button type="button" className="actions details">
                  <FiBookOpen />
                  <span>detalhes da compra</span>
                </button>
              </td>
            </tr>
          ))}
        </Table>
      )}
=======
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

import Title from '@/components/Title'
import Filter from '@/components/Filter'
import Pagination from '@/components/Pagination'

import { GetServerSideProps, NextPage } from 'next'
export interface ProductData {
  id: string
  name: string
  category: string
  image: string
  nutritional_information: string
  observation: string
  unit_sale: string
  unit_buy: string
  fraction_buy: number
  fraction_sale: number
  cost_price: number
  sale_price: number
  wholesale_price: number
  organic: boolean
  highlights: boolean
  created_at: string
  updated_at: string
  image_url: string
}
interface HomeProps {
  limit: number
  page: number
  total_count: number
  listProducts: ProductData[]
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
>>>>>>> 7b671669d916c79ea2c90fb16e06b2e3132a5b54
    </Container>
  )
}

<<<<<<< HEAD
export const getServerSideProps: GetServerSideProps = async context => {
  const token = context.req.cookies?.token
  if (token) {
    const { data } = await api.get('/orders/me', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    const { data: orderProducts, limit, total_count } = data

    return {
      props: {
        limit,
        total_count,
        orderProducts
      }
    }
  }

  return {
    props: {}
  }
}

export default WithAuth(Orders)
=======
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
>>>>>>> 7b671669d916c79ea2c90fb16e06b2e3132a5b54
