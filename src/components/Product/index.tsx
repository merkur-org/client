import { Card, Data, BuyContainer, Info } from './styles'
import { FaShoppingBasket } from 'react-icons/fa'
import { useCallback, useState } from 'react'
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
  return (
    <Card>
      <img
        onClick={() => setIsOpenModalDetails(state => !state)}
        src="https://images.unsplash.com/photo-1508313880080-c4bef0730395?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
      ></img>
      <ModalProductDetails
        isOpen={isOpenModalDetails}
        setIsOpen={setIsOpenModalDetails}
      ></ModalProductDetails>

      <Info>
        <Data>
          <aside>
            <h3>Legumes</h3>
            <h1>Batata Inglesa</h1>
          </aside>
          <h2>R$10/Kg</h2>
        </Data>

        <BuyContainer>
          <BuyQuantityInput />
          <aside
            onClick={() => {
              console.log('oi')
            }}
          >
            <FaShoppingBasket />
          </aside>
        </BuyContainer>
      </Info>
    </Card>
  )
}

export default ProductCardData
