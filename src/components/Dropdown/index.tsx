import { useState, useRef, useCallback, useEffect } from 'react'
import { BodyButton, DropdownContent } from './styles'

interface DropdownProps {
  IconButton?: React.ReactNode
  text?: string
  isOpen?: boolean
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
const Dropdown: React.FC<DropdownProps> = ({
  IconButton,
  text,
  children,
  isOpen
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [openDropdown, setOpenDropdown] = useState(false || isOpen)
  const handleClick = useCallback(() => {
    setOpenDropdown(!isOpen)
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('mousedown', (event: MouseEvent) => {
      if (
        event.target &&
        !dropdownRef.current?.contains(event.target as Node) &&
        isOpen
      ) {
        setOpenDropdown(false)
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
