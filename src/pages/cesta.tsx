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
        <CheckoutDetails>
          <aside>
            <img
              src="https://images.unsplash.com/photo-1508313880080-c4bef0730395?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
              alt=""
            />
            <h4>Banana Caturra Orgânica</h4>
          </aside>
          <h3>R$4,00</h3>
          <BuyQuantityInput quantity={3} />
          <h3>R$12,00</h3>
          <a>remover</a>
        </CheckoutDetails>
      </CheckoutTable>
    </Container>
  )
}

export default Bag
