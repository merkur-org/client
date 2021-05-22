import {
  useRef,
  useEffect,
  useState,
  useCallback,
  SetStateAction,
  Dispatch
} from 'react'
import { FaPlus } from 'react-icons/fa'

import {
  CloseButton,
  BodyButton,
  ContentUp,
  Data,
  InfoContent,
  Info,
  ModalContent
} from './styles'
import { Table } from '@/styles/components/table'

import { useBag } from '@/hooks/bag'
import { useAuth } from '@/hooks/auth'
import { OrderProps } from '@/pages/meus-pedidos'

import formatDate from '@/utils/formatDate'

interface ModalOrderDetailsProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<{ isOpen: boolean }>>
  order: OrderProps
}

const ModalOrderDetails: React.FC<ModalOrderDetailsProps> = ({
  isOpen,
  setIsOpen,
  order
}) => {
  const ModalProductDetailsRef = useRef<HTMLDivElement>(null)

  const [errorMessage, setErrorMessage] = useState({ message: '', open: false })
  const [successMessage, setSuccessMessage] = useState({
    message: '',
    open: false
  })

  const { addProduct } = useBag()
  const { user } = useAuth()

  const timer = 2000

  useEffect(() => {
    document.addEventListener('mousedown', (event: MouseEvent) => {
      if (
        event.target &&
        !ModalProductDetailsRef.current?.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(oldState => ({ ...oldState, isOpen: false }))
      }
    })
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsOpen(oldState => ({ ...oldState, isOpen: !isOpen }))
  }, [isOpen])

  return (
    <>
      {order && (
        <BodyButton ref={ModalProductDetailsRef} asideOpen={isOpen}>
          <ModalContent isOpen={isOpen}>
            <CloseButton onClick={handleClose}>
              <FaPlus />
            </CloseButton>
            <ContentUp>
              <h1>Compra realizada no dia {formatDate(order.date)}</h1>
            </ContentUp>

            <InfoContent>
              <hr />
              <Info>
                <h2>Detalhes da compra</h2>
                <ul>
                  <li>
                    <b>Status:</b> {order.payment_status}
                  </li>
                  <li>
                    <b>Quantidade de itens comprados:</b>
                    {order.total_items}
                  </li>
                  <li>
                    <b>Total:</b>
                    R$ {order.final_value.toFixed(2)}
                  </li>
                  <li>
                    <b>Local de entrega:</b>
                    {order.delivery_point}
                  </li>
                </ul>
              </Info>
              <hr />
              <Info>
                <h2>Produtos Comprados</h2>
                <Table>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Total</th>
                  </tr>
                  {order.products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className="product-image">
                          <img src={product.image_url || '/not-found.png'} />
                          <p className="product-name">
                            {product.name} x {product.quantity}
                          </p>
                        </div>
                      </td>
                      <td>
                        <h4 className="price">{`R$ ${product.sale_price.toFixed(
                          2
                        )}`}</h4>
                      </td>
                      <td>
                        <h4 className="price">{`R$ ${(
                          product.sale_price * product.quantity
                        ).toFixed(2)}`}</h4>
                      </td>
                    </tr>
                  ))}
                </Table>
              </Info>
            </InfoContent>
          </ModalContent>
        </BodyButton>
      )}
    </>
  )
}

export default ModalOrderDetails
