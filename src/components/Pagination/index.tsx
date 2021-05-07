import { PaginationComponent, PageButton } from './styles'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface IPaginationProps {
  page: number
  itemsPerPage: number
}

const Pagination: React.FC<IPaginationProps> = ({
  page = 1,
  itemsPerPage = 10
}) => {
  const [pages, setPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [currentPage, setCurrentPage] = useState(page)
  const [numItemsPerPage, setNumItemsPerPage] = useState(itemsPerPage)

  const router = useRouter()

  const handleSelectPage = (page: number) => {
    setCurrentPage(page)
    handlePushQuery(page)
  }

  const handleNext = () => {
    setCurrentPage(currentPage =>
      currentPage < pages.length - 1 ? currentPage + 1 : pages.length
    )
    handlePushQuery(currentPage)
  }

  const handlePrevious = () => {
    setCurrentPage(currentPage => (currentPage > 1 ? currentPage - 1 : 1))
    handlePushQuery(currentPage)
  }

  const handlePushQuery = (page: number) => {
    router.push(`/?page=${page}`)
  }

  return (
    <PaginationComponent>
      <button onClick={handlePrevious}>&lt;</button>
      <section className="pageNumbers">
        {pages.map(page => (
          <PageButton
            key={page}
            isSelected={currentPage === page}
            onClick={() => handleSelectPage(page)}
          >
            {page}
          </PageButton>
        ))}
      </section>
      <button onClick={handleNext}>&gt;</button>
    </PaginationComponent>
  )
}

export default Pagination
