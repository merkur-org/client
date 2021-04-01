import { useState } from 'react'

import WithAuth from '@/components/WithAuth'
import BuyQuantityInput from '@/components/BuyQuantityInput'

import {
  Container,
  Title,
  CheckoutTable,
  CheckoutDetails,
  CheckoutColumns
} from '@/styles/pages/cesta'

interface CheckoutDetailsProps {
  image: string
  name: string
  unitPrice: string
  quantity: number
  totalPrice: string
}

const Bag: React.FC<CheckoutDetailsProps> = ({
  image,
  name,
  unitPrice,
  quantity
}) => {
  const [products, setProducts] = useState([
    {
      image:
        'https://images.unsplash.com/photo-1508313880080-c4bef0730395?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
      name: 'Banana Caturra Orgânica',
      unitPrice: 'R$4,00',
      quantity: 3,
      totalPrice: 'R$12,00'
    },
    {
      image:
        'https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      name: 'Uva Orgânica',
      unitPrice: 'R$4,00',
      quantity: 3,
      totalPrice: 'R$12,00'
    }
  ])

  return (
    <Container>
      <Title>
        <div></div>
        <h1>Minha cesta</h1>
      </Title>
      <CheckoutTable>
        <CheckoutColumns>
          <strong>Produto</strong>
          <strong>Preço</strong>
          <strong>Quantidade</strong>
          <strong>Total</strong>
          <strong>Ações</strong>
        </CheckoutColumns>
        {products.map(({ image, name, unitPrice, quantity, totalPrice }) => (
          <CheckoutDetails key="name">
            <aside>
              <img src={image} />
              <h4>{name}</h4>
            </aside>
            <h3>{unitPrice}</h3>
            <BuyQuantityInput quantity={quantity} />
            <h3>{totalPrice}</h3>
            <a>remover</a>
          </CheckoutDetails>
        ))}
      </CheckoutTable>
    </Container>
  )
}

export default Bag
