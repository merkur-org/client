import { PaginationComponent } from './styles'
import { useState } from 'react'

interface IPaginationProps {
  page: number
  itemsPerPage: number
}

const Pagination: React.FC<IPaginationProps> = ({
  page = 1,
  itemsPerPage = 10
}) => {
  const [currentPage, setCurrentPage] = useState(page)
  const [numItemsPerPage, setNumItemsPerPage] = useState(itemsPerPage)

  const handleNext = () => setCurrentPage(currentPage => currentPage + 1)

  const handlePrevious = () =>
    setCurrentPage(currentPage => (currentPage > 0 ? currentPage - 1 : 0))

  return (
    <PaginationComponent>
      <ul className="pageNumbers">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </PaginationComponent>
  )
}

export default Pagination
