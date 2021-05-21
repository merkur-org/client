import { useRef, useCallback, useEffect, Dispatch, SetStateAction } from 'react'
import { BodyButton, DropdownContent } from './styles'
interface DropdownProps {
  buttonContent?: React.ReactNode
  label?: React.ReactNode
  isOpenModalFilter: boolean
  setIsOpenModalFilter: Dispatch<SetStateAction<boolean>>
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
const Filter: React.FC<DropdownProps> = ({
  buttonContent,
  isOpenModalFilter,
  setIsOpenModalFilter,
  children,
  label = ''
}) => {
  const filterRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(() => {
    setIsOpenModalFilter(!isOpenModalFilter)
  }, [isOpenModalFilter])

  useEffect(() => {
    document.addEventListener('mousedown', (event: MouseEvent) => {
      if (
        event.target &&
        !filterRef.current?.contains(event.target as Node) &&
        isOpenModalFilter
      ) {
        setIsOpenModalFilter(false)
      }
    })
  }, [isOpenModalFilter])

  return (
    <BodyButton ref={filterRef}>
      <button onClick={handleClick}>
        {buttonContent}
        <span>{label}</span>
      </button>
      <DropdownContent asideOpen={isOpenModalFilter}>
        {children}
      </DropdownContent>
    </BodyButton>
  )
}

export default Filter
