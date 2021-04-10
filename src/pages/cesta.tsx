import { useCallback, useState, useRef } from 'react'
import { FaShoppingBasket, FaCheck } from 'react-icons/fa'
import { FiTrash2 } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import BuyQuantityInput from '@/components/BuyQuantityInput'
import Select from '@/components/Select'
import WithAuth from '@/components/WithAuth'
import getValidationErrors from '@/utils/getValidationErrors'

import {
  Container,
  SummaryOrder,
  SummaryTitle,
  SummaryContent,
  SummaryDelivery,
  SummaryButtons,
  Title
} from '@/styles/pages/cesta'
import { Table } from '@/styles/components/table'
import { formMessages } from '@/styles/constants'

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

  const formRef = useRef<FormHandles>(null)
  const handleFinishOrder = useCallback(async formData => {
    formRef.current?.setErrors({})

    try {
      const schema = Yup.object().shape({
        location: Yup.string().required(formMessages.required)
      })

      await schema.validate(formData, {
        abortEarly: false
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)
      }
    }
  }, [])

  return (
    <Container>
      <Title>
        <div></div>
        <h1>Minha cesta</h1>
      </Title>
      <Table>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Total</th>
          <th>Ações</th>
        </tr>
        {products.map(product => (
          <tr key={product.name}>
            <td>
              <div className="product-image">
                <img src={product.image} />
                <p className="product-name">{product.name}</p>
              </div>
            </td>
            <td>
              <h4 className="price">{product.unitPrice}</h4>
            </td>
            <td>
              <div className="actions">
                <BuyQuantityInput quantity={product.quantity} />
              </div>
            </td>
            <td>
              <h4 className="total">{product.totalPrice}</h4>
            </td>
            <td>
              <button type="button" className="actions error">
                <FiTrash2 />
                <span>remover</span>
              </button>
            </td>
          </tr>
        ))}
      </Table>

      <SummaryOrder onSubmit={handleFinishOrder} ref={formRef}>
        <SummaryTitle>
          <h2>Resumo do pedido</h2>
        </SummaryTitle>
        <SummaryContent>
          <SummaryDelivery>
            <section>
              <strong>Total</strong>
              <span>R$ 40,00</span>
            </section>
            <section>
              <Select
                name="location"
                label="Ponto de entrega"
                defaultOption="Ponto de entrega"
                options={[
                  { value: 1, label: 'Janeiro' },
                  { value: 2, label: 'Fevereiro' }
                ]}
              />
            </section>
          </SummaryDelivery>
          <SummaryButtons>
            <button>
              <span>Adicionar mais produtos</span> <FaShoppingBasket />
            </button>
            <button type="submit">
              <span>Fechar Pedido</span> <FaCheck />
            </button>
          </SummaryButtons>
        </SummaryContent>
      </SummaryOrder>
    </Container>
  )
}

export default Bag
