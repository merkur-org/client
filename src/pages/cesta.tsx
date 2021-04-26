import { useCallback, useState, useRef } from 'react'
import { FaShoppingBasket, FaCheck } from 'react-icons/fa'
import { FiTrash2 } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import BuyQuantityInput from '@/components/BuyQuantityInput'
import Button from '@/components/Button'
import Select from '@/components/Select'
import Title from '@/components/Title'
import WithAuth from '@/components/WithAuth'

import getValidationErrors from '@/utils/getValidationErrors'
import formMessages from '@/styles/constants/formMessages'

import { useBag } from '@/hooks/bag'

import {
  Container,
  SummaryOrder,
  SummaryTitle,
  SummaryContent,
  SummaryDelivery,
  SummaryButtons
} from '@/styles/pages/cesta'
import { Table } from '@/styles/components/table'

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
  const { products, removeProduct, clearBag } = useBag()

  function handleRemoveProduct(id: string) {
    const foundProduct = products.find(product => product.id === id)

    removeProduct(foundProduct)
  }

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
      <Title title="Minha cesta" />
      <Table>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Total</th>
          <th>Ações</th>
        </tr>
        {products.map(product => (
          <tr key={product.id}>
            <td>
              <div className="product-image">
                <img src={product.photo} />
                <p className="product-name">{product.name}</p>
              </div>
            </td>
            <td>
              <h4 className="price">{product.sale_price}</h4>
            </td>
            <td>
              <div className="actions">
                <BuyQuantityInput quantity={product.quantity} />
              </div>
            </td>
            <td>
              <h4 className="total">{`${
                (product.sale_price as number) * product.quantity
              }`}</h4>
            </td>
            <td>
              <button
                type="button"
                className="actions error"
                onClick={() => handleRemoveProduct(product.id)}
              >
                <FiTrash2 />
                <span>remover</span>
              </button>
            </td>
          </tr>
        ))}
      </Table>
      <button type="button" className="actions error" onClick={clearBag}>
        <FiTrash2 />
        <h2>Limpar Cesta</h2>
      </button>

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
                options={[]}
              />
            </section>
          </SummaryDelivery>
          <SummaryButtons>
            <Button
              text="Adicionar mais produtos"
              icon={FaShoppingBasket}
              buttonType="orangePrimary"
            />
            <Button text="Fechar Pedido" icon={FaCheck} type="submit" />
          </SummaryButtons>
        </SummaryContent>
      </SummaryOrder>
    </Container>
  )
}

export default WithAuth(Bag)
