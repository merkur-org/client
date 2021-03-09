import { Card, Data, BuyContainer, BuyQuantity, Info } from './styles'
import Button from '@/components/IconButton'
import { FaShoppingBasket } from 'react-icons/fa'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useState } from 'react'

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
  const [count, setCount] = useState(quantity)

  const handleIncrease = () => setCount(count => count + 1)
  // const handleIncrease = () => console.log('oi')

  const handleDecrease = () => setCount(count => (count > 0 ? count - 1 : 0))
  // const handleDecrease = () => console.log('tchau')

  return (
    <Card>
      <img src="https://images.unsplash.com/photo-1508313880080-c4bef0730395?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"></img>
      <Info>
        <Data>
          <h3>Legumes</h3>
          <h1>Batata Inglesa</h1>
          <h2>R$10/Kg</h2>
        </Data>

        <BuyContainer>
          <BuyQuantity>
            <div className="quantity-selector">
              <button type="button" onClick={handleDecrease}>
                <AiOutlineMinus />
              </button>

              <span className="quantity-label">{count}</span>

              <button type="button" onClick={handleIncrease}>
                <AiOutlinePlus />
              </button>
            </div>
            <div className="unit-label">
              <span>kg</span>
            </div>
          </BuyQuantity>

          <Button icon={FaShoppingBasket} />
        </BuyContainer>
      </Info>
    </Card>
  )
}

export default ProductCardData
