import { useCallback, useState, useRef, useContext } from 'react'
import { FaShoppingBasket, FaCheck } from 'react-icons/fa'
import { FiBookOpen } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import BuyQuantityInput from '@/components/BuyQuantityInput'
import Button from '@/components/Button'
import Select from '@/components/Select'
import Title from '@/components/Title'
import WithAuth from '@/components/WithAuth'

import { Container } from '@/styles/pages/cesta'
import { Table } from '@/styles/components/table'

const Bag: React.FC = () => {
  const orders = [
    {
      id: 1,
      date: '01/01/01',
      items: 10,
      total: 'R$50,00',
      delivery_point: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    }
  ]

  return (
    <Container>
      <Title title="Meus Pedidos" />
      <Table>
        <tr>
          <th>Data</th>
          <th>Itens</th>
          <th>Total</th>
          <th>Local de Entrega</th>
          <th>Ações</th>
        </tr>
        {orders.map(order => (
          <tr key={order.id}>
            <td>
              <h4 className="date">{order.date}</h4>
            </td>
            <td>
              <h4 className="price">{order.items}</h4>
            </td>
            <td>
              <h4 className="total">{order.total}</h4>
            </td>
            <td>
              <h4 className="text">{order.delivery_point}</h4>
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
    </Container>
  )
}

export default WithAuth(Bag)
