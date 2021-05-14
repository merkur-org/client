import { useState, useRef, useCallback, useEffect } from 'react'
import { BodyButton, DropdownContent } from './styles'

import ReactSelect from 'react-select'

interface DropdownProps {
  buttonContent?: React.ReactNode
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
const Filter: React.FC<DropdownProps> = ({ buttonContent, children }) => {
  const filterRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState(children[0])

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('mousedown', (event: MouseEvent) => {
      if (
        event.target &&
        !filterRef.current?.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false)
      }
    })
  }, [isOpen])

  return (
    <BodyButton ref={filterRef}>
      <button onClick={handleClick}>
        {buttonContent}
        <span>{selectedFilter}</span>
      </button>
      <DropdownContent asideOpen={isOpen}>{children}</DropdownContent>
    </BodyButton>
  )
}

export default Filter
