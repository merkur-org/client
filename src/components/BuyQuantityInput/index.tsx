import { BuyQuantity } from './styles'
import { FaPlus, FaMinus } from 'react-icons/fa'
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
          <FaMinus />
        </button>

        <span className="quantity-label">{count}</span>

        <button type="button" onClick={handleIncrease}>
          <FaPlus />
        </button>
      </div>
      <span>kg</span>
    </BuyQuantity>
  )
}

export default BuyQuantityInput
