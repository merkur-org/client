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
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const token = context.req.cookies?.token

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

export default WithAuth(Orders)
