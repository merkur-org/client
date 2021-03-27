import { useState, useRef, useCallback, useEffect } from 'react'
import { BodyButton, ModalContent } from './styles'

interface ModalProductDetailsProps {
  IconButton: React.ReactNode
  text: string
}

const ModalProductDetails: React.FC<ModalProductDetailsProps> = ({
  IconButton,
  text,
  children
}) => {
  const ModalProductDetailsRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('mousedown', (event: MouseEvent) => {
      if (
        event.target &&
        !ModalProductDetailsRef.current?.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false)
      }
    })
  }, [isOpen])
  return (
    <BodyButton ref={ModalProductDetailsRef} asideOpen={true}>
      <span onClick={handleClick} id="btn-drop">
        {text}
        {IconButton}
      </span>

      <ModalContent>{children}</ModalContent>
    </BodyButton>
  )
}

export default ModalProductDetails
