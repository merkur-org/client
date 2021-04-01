import { BuyQuantity } from './styles'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useState } from 'react'

interface IDataProps {
  quantity?: number
}

const BuyQuantityInput: React.FC<IDataProps> = ({ quantity = 0 }) => {
  const [count, setCount] = useState(quantity)

  const handleIncrease = () => setCount(count => count + 1)

  const handleDecrease = () => setCount(count => (count > 0 ? count - 1 : 0))

  return (
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
      <span>kg</span>
    </BuyQuantity>
  )
}

export default BuyQuantityInput
