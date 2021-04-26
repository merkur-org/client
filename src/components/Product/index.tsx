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

import ModalProductDetails from '@/components/ModalProductDetails'
import BuyQuantityInput from '@/components/BuyQuantityInput'

interface IDataProps {
  photo?: string
  productName: string
  category: string
  price: string
  unity: string
  quantity?: number
}

const ProductCardData: React.FC<IDataProps> = ({
  photo,
  productName,
  category,
  price,
  unity,
  quantity = 0
}) => {
  const [isOpenModalDetails, setIsOpenModalDetails] = useState(false)
  const [openSucessAddProduct, setOpenSucessAddProduct] = useState(false)
  const [openErrorAddProduct, setOpenErrorAddProduct] = useState(false)

  const { addProduct } = useBag()
  const { user } = useAuth()

  const time = 2000

  function handleAddProduct() {
    if (user) {
      setOpenSucessAddProduct(true)
      addProduct({
        id: '1',
        name: 'Bata Inglesa Orgânica',
        photo:
          'https://images.unsplash.com/photo-1508313880080-c4bef0730395?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
        quantity: 3,
        sale_price: 4,
        unit: 'kg'
      })

      setTimeout(() => {
        setOpenSucessAddProduct(false)
      }, time)
    } else {
      setOpenErrorAddProduct(true)

      setTimeout(() => {
        setOpenErrorAddProduct(false)
      }, time)
    }
  }

  return (
    <>
      <Card>
        <ModalProductDetails
          isOpen={isOpenModalDetails}
          setIsOpen={setIsOpenModalDetails}
        />
        <img
          onClick={() => {
            setIsOpenModalDetails(true)
          }}
          src="https://images.unsplash.com/photo-1508313880080-c4bef0730395?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
        />

        <Info>
          <Data>
            <aside>
              <h3>Legumes</h3>
              <h1>Batata Inglesa</h1>
            </aside>
            <h2>R$ 10/Kg</h2>
          </Data>

          <BuyContainer>
            <BuyQuantityInput />
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
        Você precisar efetuar login para adicionar produtos a cesta
      </ErrorAddProduct>
    </>
  )
}

export default ProductCardData
