import { useCallback, useState, useRef, useEffect } from 'react'
import { GetStaticProps, NextPage } from 'next'
import { FaShoppingBasket, FaCheck } from 'react-icons/fa'
import { FiTrash2 } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import api from '@/services/api'
import axios from 'axios'

import BuyQuantityInput from '@/components/BuyQuantityInput'
import Button from '@/components/Button'
import Select from '@/components/Select'
import Title from '@/components/Title'
import WithAuth from '@/components/WithAuth'

import getValidationErrors from '@/utils/getValidationErrors'
import formMessages from '@/styles/constants/formMessages'

import { useBag } from '@/hooks/bag'
import { useOrders } from '@/hooks/orders'

import { IProductsDTO } from '@/dtos/IProductsDTO'
import IDeliveryPointsDTO from '@/dtos/IDeliveryPointsDTO'

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
import ModalMessage from '@/components/ModalMessages'
import { SEO } from '@/components'
interface UFProps {
  id: number
  sigla: string
  nome: string
  regiao: {
    id: number
    sigla: string
    nome: string
  }
}

interface BagPageProps {
  limit: number
  total_count: number
  pointsList: IDeliveryPointsDTO[]
  states: string[]
}
const Bag: NextPage<BagPageProps> = ({ states }) => {
  const { addOrder } = useOrders()
  const { bagItems, removeProduct, clearBag, sumItems, activeList } = useBag()

  const [errors, setErrors] = useState<Yup.ValidationError>()
  const [success, setSuccess] = useState(false)

  const [selectedUf, setSelectedUf] = useState('')
  const [pointsList, setPointsList] = useState<any>([])

  const [totalItems, setTotalItems] = useState({ itemCount: 0, total: '' })

  useEffect(() => {
    setTotalItems(sumItems(bagItems))
  }, [bagItems])

  useEffect(() => {
    async function handleSetPoints(selectedUf: string) {
      if (selectedUf) {
        const { data } = await api.get(`/delivery-points?state=${selectedUf}`)
        const { data: points } = data

        setPointsList(points)
      }
    }

    handleSetPoints(selectedUf)
  }, [selectedUf])

  function handleRemoveProduct(product: IProductsDTO) {
    removeProduct(product)
  }

  const formRef = useRef<FormHandles>(null)
  const handleFinishOrder = useCallback(async formData => {
    formRef.current?.setErrors({})

    try {
      const schema = Yup.object().shape({
        delivery_point: Yup.string().required(formMessages.required),
        payment_type: Yup.string().required(formMessages.required)
      })

      await schema.validate(formData, {
        abortEarly: false
      })

      if (bagItems.length > 0) {
        const total = bagItems.reduce((accumulator: number, item) => {
          accumulator += item.sale_price * item.quantity

          return accumulator
        }, 0)

        addOrder({
          delivery_point_id: formData.delivery_point,
          payment_status: 'processing',
          payment_type: formData.payment_type,
          final_value: total,
          list_id: activeList.id,
          sales_type: 'retail',
          value: total,
          details:
            bagItems &&
            bagItems.map(item => {
              return {
                product_id: item.id,
                quantity: item.quantity,
                discount: 0
              }
            })
        })

        setSuccess(true)
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)

        setErrors(error)
        setSuccess(false)
      }
    }
  }, [])

  return (
    <>
      <Container>
        <SEO title="Cesta - " image="/banner.png" />
        <TopTitle>
          <Title title="Minha cesta" />
          <ClearBasket>
            <button onClick={clearBag}>
              <h2>Limpar Cesta</h2>
            </button>
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
          {bagItems &&
            bagItems.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="product-image">
                    <img src={product.image_url || '/not-found.png'} />
                    <p className="product-name">{product.name}</p>
                  </div>
                </td>
                <td>
                  <h4 className="price">{`R$ ${product.sale_price.toFixed(
                    2
                  )}`}</h4>
                </td>
                <td>
                  <div className="actions">
                    <BuyQuantityInput
                      quantity={product.quantity}
                      product={product}
                      type="BAG"
                      factor={0.65}
                    />
                  </div>
                </td>
                <td>
                  <h4 className="total">{`R$ ${(
                    (product.sale_price as number) * product.quantity
                  ).toFixed(2)}`}</h4>
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
                <strong>
                  Total <span>R$ {totalItems.total}</span>
                </strong>
                <Select
                  name="payment_type"
                  label="Forma de pagamento"
                  defaultOption="Forma de pagamento"
                  options={[
                    {
                      label: 'Cartão de crédito',
                      value: 'credit_card'
                    },
                    {
                      label: 'Dinheiro',
                      value: 'money'
                    },
                    {
                      label: 'Pix',
                      value: 'pix'
                    },
                    {
                      label: 'Boleto',
                      value: 'bank_slip'
                    },
                    {
                      label: 'Transferência bancária',
                      value: 'bank_transfer'
                    }
                  ]}
                />
              </section>
              <aside>
                <Select
                  name="uf"
                  label="UF"
                  defaultOption="UF"
                  options={
                    states &&
                    states.map(uf => {
                      return {
                        value: uf,
                        label: uf
                      }
                    })
                  }
                  onChange={(option: any) => setSelectedUf(option.value)}
                />
                <Select
                  name="delivery_point"
                  label="Ponto de entrega"
                  defaultOption="Ponto de entrega"
                  options={
                    pointsList &&
                    pointsList.map(point => {
                      return {
                        value: point.id,
                        label:
                          point.city +
                          ', ' +
                          point.state +
                          ', ' +
                          point.street +
                          ', ' +
                          point.suburb +
                          ', ' +
                          point.cep
                      }
                    })
                  }
                />
              </aside>
            </SummaryDelivery>
            <SummaryButtons>
              <Button
                text="Adicionar mais produtos"
                icon={FaShoppingBasket}
                buttonType="orangePrimary"
                link="/"
              />
              <Button text="Fechar Pedido" icon={FaCheck} type="submit" />
            </SummaryButtons>
          </SummaryContent>
        </SummaryOrder>
      </Container>
      {errors ? (
        <ModalMessage
          message="Ocorreu um erro, tente novamente"
          open={!!errors}
          timer={2000}
          type="error"
        />
      ) : (
        <ModalMessage
          message="Pedido finalizado com sucesso"
          open={success}
          timer={2000}
          type="success"
        />
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { data } = await axios.get<UFProps[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
  )

  const states = data.map(uf => uf.sigla)

  return {
    props: {
      states
    }
  }
}

export default WithAuth(Bag)
