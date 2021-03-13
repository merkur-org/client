import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import { Container } from './styles'

const SearchProducts: React.FC = () => {
  const [search, setSearch] = useState('')

  const handleSubmit = () => {
    console.log(search)
  }
  return (
    <Container>
      <input
        type="text"
        placeholder="Procure por produtos de sua preferência..."
        onChange={e => setSearch(e.target.value)}
      />
      <FaSearch onClick={handleSubmit} />
    </Container>
  )
}

export default SearchProducts
