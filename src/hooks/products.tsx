import { useContext, createContext, useCallback, useState } from 'react'
import { ProductData } from '@/pages'

interface ProductContextData {
  products: ProductData[]
  initializeProducts(listProducts: ProductData[]): void
}

const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData
)

export const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<ProductData[]>([])

  const initializeProducts = useCallback((listProducts: ProductData[]) => {
    setProducts(listProducts)
  }, [])

  return (
    <ProductContext.Provider value={{ products, initializeProducts }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts(): ProductContextData {
  const context = useContext(ProductContext)

  if (!context) {
    throw new Error('useBag must be used within an BagProvider')
  }
  return context
}
