import { useRef, useEffect } from 'react'
import { FaShoppingBasket } from 'react-icons/fa'
import { IoMdBriefcase, IoMdClose } from 'react-icons/io'
import {
  CloseButton,
  BodyButton,
  ContentUp,
  Data,
  InfoContent,
  Info,
  ModalContent,
  ButtonsContainer
} from './styles'

import { BuyQuantityInput } from '@/components'

interface ModalProductDetailsProps {
  isOpen: boolean
  setIsOpen: any
}

const ModalProductDetails: React.FC<ModalProductDetailsProps> = ({
  isOpen,
  setIsOpen
}) => {
  const ModalProductDetailsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    document.addEventListener('mousedown', (event: MouseEvent) => {
      if (
        event.target &&
        !ModalProductDetailsRef.current?.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(!isOpen)
      }
    })
  }, [isOpen])
  return (
    <BodyButton ref={ModalProductDetailsRef} asideOpen={isOpen}>
      <ModalContent onClick={() => setIsOpen(!isOpen)}>
        <CloseButton onClick={() => setIsOpen(false)}>
          <IoMdClose />
        </CloseButton>
        <ContentUp>
          <img
            src="https://images.unsplash.com/photo-1508313880080-c4bef0730395?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
            alt="BATATA INGLESA"
          />

          <aside>
            <Data>
              <aside>
                <h3>Legumes</h3>
                <h1>Batata Inglesa</h1>
              </aside>
              <h2>R$10/Kg</h2>
            </Data>

            <BuyQuantityInput />
          </aside>
        </ContentUp>

        <InfoContent>
          <hr />
          <Info>
            <h2>Detalhes do produto</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis
              euismod in sed felis amet, pharetra cursus pellentesque etiam. Et
              lacus magna enim, id in etiam.
            </p>
          </Info>
          <hr />

          <ButtonsContainer>
            <button>
              <span>Comprar agora</span>
              <IoMdBriefcase />
            </button>
            <button>
              <span>Adicionar a cesta</span>
              <FaShoppingBasket />
            </button>
          </ButtonsContainer>

          <Info>
            <h2>Informações nutricionais</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis
              euismod in sed felis amet, pharetra cursus pellentesque etiam. Et
              lacus magna enim, id in etiam.
            </p>
          </Info>
        </InfoContent>
      </ModalContent>
    </BodyButton>
  )
}

export default ModalProductDetails
