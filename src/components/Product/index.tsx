import { Card, Data } from './styles'
import Button from '@/components/IconButton'
import { FaShoppingBasket } from 'react-icons/fa'

interface IDataProps {
  photo?: string
  productName: string
  category: string
  price: string
  unity: string
  quantity: string
}

const ProductCardData: React.FC<IDataProps> = ({
  photo,
  productName,
  category,
  price,
  unity,
  quantity
}) => {
  return (
    <Card>
      <img src="https://images.unsplash.com/photo-1508313880080-c4bef0730395?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"></img>
      <Data>
        <h3>Legumes</h3>
        <h1>Batata Inglesa</h1>
        <h2>R$10/Kg</h2>
      </Data>
      <Button icon={FaShoppingBasket} />
    </Card>
  )
}

export default ProductCardData
