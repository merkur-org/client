import {
  useRef,
  useEffect,
  useState,
  useCallback,
  SetStateAction,
  Dispatch
} from 'react'
import { FaShoppingBasket, FaPlus } from 'react-icons/fa'

import Button from '@/components/Button'
import {
  handleValidateAddProduct,
  handleFireMessages
} from '@/components/Product'
import ModalMessages from '@/components/ModalMessages'

import {
  CloseButton,
  BodyButton,
  ContentUp,
  Data,
  InfoContent,
  Info,
  ModalContent,
  ButtonsContainer
} from './styles'

import { BuyQuantityInput } from '@/components'

import { useBag } from '@/hooks/bag'
import { useAuth } from '@/hooks/auth'
import { IOrderDTO } from '@/dtos/IOrderDTO'
import formatDate from '@/utils/formatDate'

interface ModalOrderDetailsProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<{ isOpen: boolean }>>
  order: IOrderDTO
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
                    {order.details.reduce((accumulator: number, item) => {
                      accumulator += item.quantity

                      return accumulator
                    }, 0)}
                  </li>
                  <li>
                    <b>Total:</b>
                    {order.final_value}
                  </li>
                  <li>
                    <b>Local de entrega</b>
                    {order.delivery_point_id}
                  </li>
                </ul>
              </Info>
              <hr />
              <Info></Info>
            </InfoContent>
          </ModalContent>
        </BodyButton>
      )}
    </>
  )
}

export default ModalOrderDetails
