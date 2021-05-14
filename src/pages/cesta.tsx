import { useCallback, useState, useRef, useContext } from 'react'
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

import { useBag, IProduct, BagContext } from '@/hooks/bag'

import {
  Container,
  TopTitle,
  ClearBasket,
  SummaryOrder,
  SummaryTitle,
  SummaryContent,
  SummaryDelivery,
  SummaryButtons
} from '@/styles/pages/cesta'
import { Table } from '@/styles/components/table'

const Bag: React.FC = () => {
  const { bagItems, removeProduct, clearBag } = useContext(BagContext)

  function handleRemoveProduct(product: IProduct) {
    removeProduct(product)
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
      <TopTitle>
        <Title title="Minha cesta" />
        <ClearBasket>
          <h2 onClick={() => clearBag()}>
            <h2>Limpar Cesta</h2>
          </h2>
        </ClearBasket>
      </TopTitle>

      <Table>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Total</th>
          <th>Ações</th>
        </tr>
        {bagItems.map(product => (
          <tr key={product.id}>
            <td>
              <div className="product-image">
                <img src={product.photo} />
                <p className="product-name">{product.name}</p>
              </div>
            </td>
            <td>
              <h4 className="price">{`R$ ${product.sale_price}`}</h4>
            </td>
            <td>
              <div className="actions">
                <BuyQuantityInput
                  quantity={product.quantity}
                  product={product}
                  type="BAG"
                />
              </div>
            </td>
            <td>
              <h4 className="total">{`R$ ${
                (product.sale_price as number) * product.quantity
              }`}</h4>
            </td>
            <td>
              <button
                type="button"
                className="actions error"
                onClick={() => handleRemoveProduct(product)}
              >
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
