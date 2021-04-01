import { FaShoppingBasket, FaCheck } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
import WithAuth from '@/components/WithAuth'
import {
  Container,
  SummaryOrder,
  SummaryTitle,
  SummaryContent,
  SummaryDelivery,
  SummaryInfo,
  SummaryButtons
} from '@/styles/pages/cesta'

const Bag: React.FC = () => {
  return (
    <Container>
      <SummaryOrder>
        <SummaryTitle>
          <h2>Resumo do pedido</h2>
        </SummaryTitle>
        <SummaryContent>
          <SummaryDelivery>
            <section>
              <strong>Entrega</strong>
              <span>R$ 40,00</span>
            </section>

            <section>
              <strong>
                <FiMapPin /> <p> Pato Branco - PR</p>
              </strong>
              <span>
                <p>89.802-300</p> <button>alterar CEP</button>
              </span>
            </section>
          </SummaryDelivery>
          <SummaryInfo>
            <section>
              <strong>Subtotal</strong>
              <span>R$ 40,00</span>
            </section>
            <section>
              <strong>Total</strong>
              <span>R$ 40,00</span>
            </section>
          </SummaryInfo>
          <SummaryButtons>
            <button>
              <span>Adicionar mais produtos</span> <FaShoppingBasket />
            </button>
            <button>
              <span>Fechar Pedido</span> <FaCheck />
            </button>
          </SummaryButtons>
        </SummaryContent>
      </SummaryOrder>
    </Container>
  )
}

export default Bag
