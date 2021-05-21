import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import { Container } from './styles'

const SearchProducts: React.FC = () => {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const handleSubmit = () => {
    if (search.length === 0) {
      router.push('/')
    }

    router.push(`/?search=${search}`)
  }
  return (
    <Container>
      <input
        type="text"
        placeholder="Procure por produtos de sua preferência..."
        onChange={e => setSearch(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent) =>
          e.key === 'Enter' && handleSubmit()
        }
      />
      <FaSearch onClick={handleSubmit} />
    </Container>
  )
}

export default SearchProducts
