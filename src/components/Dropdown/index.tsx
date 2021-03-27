import { useState, useRef, useCallback, useEffect } from 'react'
import { BodyButton, DropdownContent } from './styles'

interface DropdownProps {
  IconButton: React.ReactNode
  text: string
}
/**
 *
 * @param IconButton: React.ReactNode is a <span>
 * @example
 * return (
 * <Dropdown IconButton={<IconBell />}>
 *   <li>Voce tem novo convite</li>
 *   <li>Que tal aproveitar</li>
 * </Dropdown>
 * )
 */
const Dropdown: React.FC<DropdownProps> = ({ IconButton, text, children }) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('mousedown', (event: MouseEvent) => {
      if (
        event.target &&
        !dropdownRef.current?.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false)
      }
    })
  }, [isOpen])
  return (
    <BodyButton ref={dropdownRef} asideOpen={isOpen}>
      <span onClick={handleClick} id="btn-drop">
        {text}
        {IconButton}
      </span>

      <DropdownContent>{children}</DropdownContent>
    </BodyButton>
  )
}

export default Dropdown
