import { BuyQuantity } from './styles'
import { FaPlus, FaMinus } from 'react-icons/fa'
import {
  Dispatch,
  useState,
  SetStateAction,
  useContext,
  useEffect
} from 'react'

import { IProductsDTO } from '@/dtos/IProductsDTO'

import { BagContext } from '@/hooks/bag'
interface IDataProps {
  quantity?: number
  setQuantity?: Dispatch<SetStateAction<number>>
  product?: IProductsDTO
  type?: string
  factor?: number
}

const BuyQuantityInput: React.FC<IDataProps> = ({
  product,
  quantity = 0,
  setQuantity,
  type = 'CARD',
  factor = 1
}) => {
  const { increseProductQuantity, decreaseProductQuantity } = useContext(
    BagContext
  )
  let handleIncrease, handleDecrease

  switch (type) {
    case 'CARD':
      handleIncrease = () => setQuantity(count => count + factor)
      handleDecrease = () =>
        setQuantity(count => (count > 0 ? count - factor : 0))

      break

    case 'BAG':
      handleIncrease = () =>
        increseProductQuantity({ ...product, quantity: quantity + factor })
      handleDecrease = () =>
        decreaseProductQuantity({ ...product, quantity: quantity - factor })

      break
  }

  return (
    <BuyQuantity>
      <div className="quantity-selector">
        <button type="button" onClick={handleDecrease}>
          <FaMinus />
        </button>

        <span className="quantity-label">
          {Math.round(quantity * 100) / 100}
        </span>

        <button type="button" onClick={handleIncrease}>
          <FaPlus />
        </button>
      </div>
      <span className="unit">{product && product.unit_sale}</span>
    </BuyQuantity>
  )
}

export default BuyQuantityInput
