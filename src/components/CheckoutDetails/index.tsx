import { Container } from './styles'

interface CheckoutDetailsProps {
  image: string
  name: string
  unitPrice: string
  quantity: number
  totalPrice: string
}

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({
  image,
  name,
  unitPrice,
  quantity,
  totalPrice
}) => {
  return <Container></Container>
}

export default CheckoutDetails
