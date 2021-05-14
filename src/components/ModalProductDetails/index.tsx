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

import { ProductData } from '@/pages'
import { useBag } from '@/hooks/bag'
import { useAuth } from '@/hooks/auth'

interface ModalProductDetailsProps {
  isOpen: boolean
  setIsOpen(isOpen: boolean): void
  product: ProductData
  quantity: number
  setQuantity: Dispatch<SetStateAction<number>>
}

const ModalProductDetails: React.FC<ModalProductDetailsProps> = ({
  isOpen,
  setIsOpen,
  product,
  quantity,
  setQuantity
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
        setIsOpen(false)
      }
    })
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <>
      <BodyButton ref={ModalProductDetailsRef} asideOpen={isOpen}>
        <ModalContent isOpen={isOpen}>
          <CloseButton onClick={handleClose}>
            <FaPlus />
          </CloseButton>
          <ContentUp>
            <img src={product.image_url} />

            <aside>
              <Data>
                <aside>
                  <h3>{product.category || 'legumes'}</h3>
                  <h1>{product.name}</h1>
                </aside>
                <h2>
                  R${product.sale_price}/{product.unit_sale}
                </h2>
              </Data>

              <BuyQuantityInput quantity={quantity} setQuantity={setQuantity} />
            </aside>
          </ContentUp>

          <InfoContent>
            <hr />
            <Info>
              <h2>Detalhes do produto</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Venenatis euismod in sed felis amet, pharetra cursus
                pellentesque etiam. Et lacus magna enim, id in etiam.
              </p>
            </Info>
            <hr />
            <Info>
              <h2>Informações nutricionais</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Venenatis euismod in sed felis amet, pharetra cursus
                pellentesque etiam. Et lacus magna enim, id in etiam.
              </p>
            </Info>
          </InfoContent>
          <ButtonsContainer>
            <Button
              text="Adicionar a cesta"
              icon={FaShoppingBasket}
              onClick={() => {
                const res = handleValidateAddProduct(quantity, user)
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
                      id: product.id,
                      name: product.name,
                      photo: product.image_url,
                      quantity,
                      sale_price: product.sale_price,
                      unit: product.unit_sale
                    })
                  }
                }
              }}
            />
          </ButtonsContainer>
        </ModalContent>
      </BodyButton>
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

export default ModalProductDetails
