import {
  Card,
  Data,
  BuyContainer,
  Info,
  SucessAddProduct,
  ErrorAddProduct
} from './styles'
import { FaShoppingBasket } from 'react-icons/fa'
import { useState } from 'react'

import { useBag } from '@/hooks/bag'
import { useAuth } from '@/hooks/auth'

import { ProductData } from '@/pages'

import ModalProductDetails from '@/components/ModalProductDetails'
import BuyQuantityInput from '@/components/BuyQuantityInput'

interface ProductCardProps {
  product: ProductData
}

const ProductCardData: React.FC<ProductCardProps> = ({ product }) => {
  const [isOpenModalDetails, setIsOpenModalDetails] = useState(false)
  const [openSucessAddProduct, setOpenSucessAddProduct] = useState(false)
  const [openErrorAddProduct, setOpenErrorAddProduct] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [cardQuantity, setCardQuantity] = useState(0)

  const { addProduct } = useBag()
  const { user } = useAuth()

  const time = 2000

  function fireErrorMessage(message: string) {
    setErrorMessage(message)
    setOpenErrorAddProduct(true)

    setTimeout(() => {
      setOpenErrorAddProduct(false)
    }, time)
  }

  function fireSucessMessage() {
    setOpenSucessAddProduct(true)

    setTimeout(() => {
      setOpenSucessAddProduct(false)
    }, time)
  }

  function handleAddProduct() {
    if (user) {
      if (cardQuantity === 0) {
        fireErrorMessage('Adicione pelo menos um produto')
      } else {
        addProduct({
          id: product.id,
          name: product.name,
          photo: product.image_url,
          quantity: cardQuantity,
          sale_price: product.sale_price,
          unit: product.unit_sale
        })

        fireSucessMessage()
      }
    } else {
      fireErrorMessage('Você precisa efetuar login para adicionar a cesta')
    }
  }

  return (
    <>
      <Card>
        <ModalProductDetails
          isOpen={isOpenModalDetails}
          setIsOpen={setIsOpenModalDetails}
          product={product}
          quantity={cardQuantity}
          setQuantity={setCardQuantity}
        />
        <img
          onClick={() => {
            setIsOpenModalDetails(true)
          }}
          src={product.image_url}
        />

        <Info>
          <Data>
            <aside>
              <h3>{product.category || 'legumes'}</h3>
              <h1>{product.name}</h1>
            </aside>
            <h2>
              R$ {product.sale_price}/{product.unit_sale}
            </h2>
          </Data>

          <BuyContainer>
            <BuyQuantityInput
              quantity={cardQuantity}
              setQuantity={setCardQuantity}
            />
            <aside onClick={handleAddProduct}>
              <FaShoppingBasket />
            </aside>
          </BuyContainer>
        </Info>
      </Card>
      <SucessAddProduct isOpen={openSucessAddProduct} time={time}>
        Producto adicionado a cesta
      </SucessAddProduct>
      <ErrorAddProduct isOpen={openErrorAddProduct} time={time}>
        {errorMessage}
      </ErrorAddProduct>
    </>
  )
}

export default ProductCardData
