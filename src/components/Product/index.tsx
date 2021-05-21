import { Card, Data, BuyContainer, Info } from './styles'
import { FaShoppingBasket } from 'react-icons/fa'
import { Dispatch, SetStateAction, useState } from 'react'

import { useBag } from '@/hooks/bag'
import { useAuth, User } from '@/hooks/auth'

import ModalProductDetails from '@/components/ModalProductDetails'
import BuyQuantityInput from '@/components/BuyQuantityInput'
import ModalMessages from '@/components/ModalMessages'

import { IProductsDTO } from '@/dtos/IProductsDTO'

interface ProductCardProps {
  product: IProductsDTO
}

interface MessagesProps {
  message: string
  open: boolean
  timer: number
}

export function handleValidateAddProduct(
  quantity: number,
  user: User
): { message: string; status: string } {
  if (user) {
    if (quantity === 0) {
      return {
        message: 'Adicione pelo menos um produto',
        status: 'error'
      }
    } else {
      return {
        message: 'Produto adicinado a cesta',
        status: 'success'
      }
    }
  } else {
    return {
      message: 'Você precisa efetuar login para adicionar a cesta',
      status: 'error'
    }
  }
}

export function handleFireMessages(
  status: string,
  message: string,
  timer: number,
  setSuccessMessage: Dispatch<SetStateAction<Omit<MessagesProps, 'timer'>>>,
  setErrorMessage: Dispatch<SetStateAction<Omit<MessagesProps, 'timer'>>>
): void {
  if (status === 'success') {
    setSuccessMessage(oldState => ({
      ...oldState,
      message,
      open: true
    }))

    setErrorMessage(oldState => ({
      ...oldState,
      message: '',
      open: false
    }))

    setTimeout(() => {
      setSuccessMessage(oldState => ({
        ...oldState,
        open: false
      }))
    }, timer)
  } else {
    setErrorMessage(oldState => ({
      ...oldState,
      message,
      open: true
    }))

    setSuccessMessage(oldState => ({
      ...oldState,
      message: '',
      open: false
    }))

    setTimeout(() => {
      setErrorMessage(oldState => ({
        ...oldState,
        open: false
      }))
    }, timer)
  }
}

const ProductCardData: React.FC<ProductCardProps> = ({ product }) => {
  const [isOpenModalDetails, setIsOpenModalDetails] = useState(false)
  const [errorMessage, setErrorMessage] = useState({ message: '', open: false })
  const [successMessage, setSuccessMessage] = useState({
    message: '',
    open: false
  })
  const [cardQuantity, setCardQuantity] = useState(0)

  const { addProduct } = useBag()
  const { user } = useAuth()

  const timer = 2000

  return (
    <>
      <ModalProductDetails
        isOpen={isOpenModalDetails}
        setIsOpen={setIsOpenModalDetails}
        product={product}
        quantity={cardQuantity}
        setQuantity={setCardQuantity}
      />
      <Card>
        <img
          onClick={() => {
            setIsOpenModalDetails(true)
          }}
          src={product.image_url || '/not-found.png'}
        />

        <Info>
          <Data>
            <aside>
              <h3>
                {product.category}
                <span>{product.organic && 'orgânico'}</span>
              </h3>
              <h1>{product.name}</h1>
            </aside>
            <h2>
              R$ {product.sale_price.toFixed(2)}/{product.unit_sale}
            </h2>
          </Data>

          <BuyContainer>
            <BuyQuantityInput
              quantity={cardQuantity}
              setQuantity={setCardQuantity}
              product={product}
            />
            <aside
              onClick={() => {
                const res = handleValidateAddProduct(cardQuantity, user)
                if (res) {
                  handleFireMessages(
                    res.status,
                    res.message,
                    timer,
                    setSuccessMessage,
                    setErrorMessage
                  )

                  if (res.status === 'success') {
                    addProduct({
                      ...product,
                      quantity: cardQuantity
                    })
                  }
                }
              }}
            >
              <FaShoppingBasket />
            </aside>
          </BuyContainer>
        </Info>
      </Card>
      <ModalMessages
        message={successMessage.message || errorMessage.message}
        open={errorMessage.open || successMessage.open}
        timer={timer}
        type={
          (successMessage.open && 'success') || (errorMessage.open && 'error')
        }
      />
    </>
  )
}

export default ProductCardData
