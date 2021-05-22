import { FiBookOpen } from 'react-icons/fi'
import { GetServerSideProps, NextPage } from 'next'
import { useCallback, useState } from 'react'

import Title from '@/components/Title'
import WithAuth from '@/components/WithAuth'

import { Container } from '@/styles/pages/cesta'
import { Table } from '@/styles/components/table'
import ModalOrderDetails from '@/components/ModalOrderDetails'

import { useOrders } from '@/hooks/orders'
import api from '@/services/api'
import { useAuth } from '@/hooks/auth'
import { IOrderDTO } from '@/dtos/IOrderDTO'
import IDeliveryPointsDTO from '@/dtos/IDeliveryPointsDTO'

import formatDate from '@/utils/formatDate'
import serializeDeliveryPoint from '@/utils/serializeDeliveryPoint'

interface OrderProps extends IOrderDTO {
  delivery_point: string
  total_items: number
}
interface OrderPageProps {
  limit: number
  total_count: number
  orders: OrderProps[]
}
interface DetailModalProps {
  order: OrderProps
  isOpen: boolean
}

const Orders: NextPage<OrderPageProps> = ({ limit, total_count, orders }) => {
  const [
    isOpenModalDetails,
    setIsOpenModalDetails
  ] = useState<DetailModalProps>({ order: null, isOpen: false })

  const handleOpenModalDetails = useCallback((order: OrderProps) => {
    setIsOpenModalDetails(oldState => ({
      ...oldState,
      order: order,
      isOpen: true
    }))
  }, [])

  return (
    <>
      <ModalOrderDetails
        isOpen={isOpenModalDetails.isOpen}
        order={isOpenModalDetails.order}
        setIsOpen={setIsOpenModalDetails}
      />
      <Container>
        <Title title="Meus Pedidos" />
        {orders && (
          <Table>
            <tr>
              <th>Data</th>
              <th>Itens</th>
              <th>Total</th>
              <th>Local de Entrega</th>
              <th>Ações</th>
            </tr>
            {orders.map(order => (
              <tr key={order.delivery_point_id}>
                <td>
                  <h4 className="date">{formatDate(order.date)}</h4>
                </td>
                <td>
                  <h4 className="price">{order.total_items}</h4>
                </td>
                <td>
                  <h4 className="total">{order.final_value}</h4>
                </td>
                <td>
                  <h4 className="text">{order.delivery_point}</h4>
                </td>
                <td>
                  <button
                    type="button"
                    className="actions details"
                    onClick={() => handleOpenModalDetails(order)}
                  >
                    <FiBookOpen />
                    <span>detalhes da compra</span>
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Container>
    </>
  )
}

interface OrderResponse {
  total_count: number
  page: number
  limit: number
  data: IOrderDTO[]
}

export const getServerSideProps: GetServerSideProps = async context => {
  const token = context.req.cookies?.token
  if (token) {
    const { data } = await api.get<OrderResponse>('/orders/me', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    if (data) {
      const { data: orderProducts, limit, total_count } = data

      const orders = orderProducts.map(async order => {
        const { data: deliverPoint } = await api.get<IDeliveryPointsDTO>(
          `/delivery-points/${order.delivery_point_id}`
        )

        const serializedDeliveryPoints = serializeDeliveryPoint(deliverPoint)

        const totalItems = order.details.reduce((accumulator: number, item) => {
          accumulator += item.quantity

          return accumulator
        }, 0)
      })

      return {
        props: {
          limit,
          total_count,
          orders
        }
      }
    }
  }

  return {
    props: {}
  }
}

export default WithAuth(Orders)
