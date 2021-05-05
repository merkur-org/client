import { BuyQuantity } from './styles'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { Dispatch, useState, SetStateAction, useContext } from 'react'

import { BagContext, IProduct } from '@/hooks/bag'

interface IDataProps {
  quantity?: number
  setQuantity?: Dispatch<SetStateAction<number>>
  product?: IProduct
  type?: string
}

const BuyQuantityInput: React.FC<IDataProps> = ({
  quantity = 0,
  setQuantity,
  product,
  type = 'CARD'
}) => {
  const { increseProductQuantity, decreaseProductQuantity } = useContext(
    BagContext
  )

  let handleIncrease, handleDecrease

  switch (type) {
    case 'CARD':
      handleIncrease = () => setQuantity(count => count + 1)
      handleDecrease = () => setQuantity(count => (count > 0 ? count - 1 : 0))

      break

    case 'BAG':
      handleIncrease = () => increseProductQuantity(product)
      handleDecrease = () => decreaseProductQuantity(product)

      break
  }

  return (
    <BuyQuantity>
      <div className="quantity-selector">
        <button type="button" onClick={handleDecrease}>
          <FaMinus />
        </button>

        <span className="quantity-label">{quantity}</span>

        <button type="button" onClick={handleIncrease}>
          <FaPlus />
        </button>
      </div>
      <span>kg</span>
    </BuyQuantity>
  )
}

export default BuyQuantityInput
