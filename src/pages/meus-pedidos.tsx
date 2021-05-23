import { FiBookOpen } from 'react-icons/fi'
import { GetServerSideProps, NextPage } from 'next'
import { useCallback, useState } from 'react'

import Title from '@/components/Title'
import WithAuth from '@/components/WithAuth'

import { Container } from '@/styles/pages/cesta'
import { Table } from '@/styles/components/table'
import ModalOrderDetails from '@/components/ModalOrderDetails'

import api from '@/services/api'
import { IOrderDTO } from '@/dtos/IOrderDTO'
import IDeliveryPointsDTO from '@/dtos/IDeliveryPointsDTO'

import formatDate from '@/utils/formatDate'
import serializeDeliveryPoint from '@/utils/serializeDeliveryPoint'
import { IProductsDTO } from '@/dtos/IProductsDTO'
import Pagination from '@/components/Pagination'
import { SEO } from '@/components'

export interface OrderProps extends IOrderDTO {
  delivery_point: string
  total_items: number
  products: IProductsDTO[]
}
interface OrderPageProps {
  limit: number
  total_count: number
  page: number
  orders: OrderProps[]
}
interface DetailModalProps {
  order: OrderProps
  isOpen: boolean
}

const Orders: NextPage<OrderPageProps> = ({
  limit,
  total_count,
  orders,
  page
}) => {
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
        <SEO title="Meus Pedidos - " image="/banner.png" />
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
                  <h4 className="total">R$ {order.final_value}</h4>
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
        <Pagination
          itemsPerPage={limit}
          page={page}
          total_count={total_count}
        />
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

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req
}) => {
  const token = req.cookies?.token
  const { page = 1 } = query

  if (token) {
    const { data } = await api.get<OrderResponse>(
      `/orders/me?page=${page}&limit=15`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )

    if (data) {
      const { data: orderProducts, limit, total_count } = data

      const orders = await Promise.all(
        orderProducts.map(async order => {
          const { data: deliverPoint } = await api.get<IDeliveryPointsDTO>(
            `/delivery-points/${order.delivery_point_id}`
          )

          const products = await Promise.all(
            order.order_details.map(async detail => {
              const { data: product } = await api.get<IProductsDTO>(
                `products/${detail.product_id}`
              )

              product.quantity = detail.quantity

              return product
            })
          )

          const serializedDeliveryPoints = serializeDeliveryPoint(deliverPoint)

          const totalItems = order.order_details.reduce(
            (accumulator: number, item) => {
              accumulator += item.quantity

              return accumulator
            },
            0
          )

          return {
            ...order,
            delivery_point: serializedDeliveryPoints,
            total_items: totalItems,
            products
          }
        })
      )

      return {
        props: {
          limit,
          page,
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
