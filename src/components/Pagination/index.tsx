import { PaginationComponent, PageButton } from './styles'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
interface IPaginationProps {
  page: number
  itemsPerPage: number
  total_count: number
}

const Pagination: React.FC<IPaginationProps> = ({
  page,
  itemsPerPage,
  total_count
}) => {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(page)

  const [pageNumberLimit] = useState(9)
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(9)
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0)

  const pages = []
  for (let i = 1; i <= Math.ceil(total_count / 15); i++) {
    pages.push(i)
  }

  useEffect(() => {
    handlePushQuery(currentPage)
  }, [currentPage])

  const handleSelectPage = (page: number) => {
    setCurrentPage(page)
  }

  const handleNext = () => {
    setCurrentPage(currentPage =>
      currentPage < pages.length - 1 ? currentPage + 1 : pages.length
    )

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  const handlePrevious = () => {
    setCurrentPage(currentPage => (currentPage > 1 ? currentPage - 1 : 1))

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }

  const handlePushQuery = (page: number) => {
    const path = router.pathname
    const query = router.query

    query.page = `${page}`
    query.limit = `${itemsPerPage}`

    router.push({ pathname: path, query: query })
  }

  return (
    <>
      {pages.length > 0 && (
        <PaginationComponent>
          <button onClick={handlePrevious}>&lt;</button>
          {minPageNumberLimit >= 1 && (
            <button onClick={handlePrevious}>...</button>
          )}
          <section className="pageNumbers">
            {pages.map(number => {
              if (
                number < maxPageNumberLimit + 1 &&
                number > minPageNumberLimit
              ) {
                return (
                  <PageButton
                    key={number}
                    isSelected={currentPage === number}
                    onClick={() => handleSelectPage(number)}
                  >
                    {number}
                  </PageButton>
                )
              }
            })}
          </section>
          {pages.length > maxPageNumberLimit && (
            <button onClick={handleNext}>...</button>
          )}
          <button onClick={handleNext}>&gt;</button>
        </PaginationComponent>
      )}
    </>
  )
}

export default Pagination
