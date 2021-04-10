import { useContext, createContext, useCallback, useState } from 'react'
import Cookie from 'js-cookie'

interface IProduct {
  id: string
  name: string
  quantity: number
  photo: string
  unit: string
  sale_price: string | number
}

interface BagContextData {
  products: IProduct[]
  addProduct(product: IProduct): void
  updateQuantityProduct(product: IProduct, isIncreasing: boolean): void
  removeProduct(product: IProduct): void
  clearBag(): void
}

const BagContext = createContext<BagContextData>({} as BagContextData)

export const BagProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>(() => {
    const bag = Cookie.get('bag')

    if (bag) {
      return JSON.parse(bag) as IProduct[]
    }

    return [] as IProduct[]
  })

  const addProduct = useCallback((product: IProduct) => {
    const productExists = products.findIndex(p => p.id === product.id)
    if (productExists < 0) {
      setProducts(products.concat(product))
    } else {
      updateQuantityProduct(product, true)
    }
  }, [])

  const updateQuantityProduct = useCallback(
    (product: IProduct, isIncreasing: boolean) => {
      const productExists = products.findIndex(p => p.id === product.id)

      if (productExists > 0) {
        const data = products
        let { quantity: q } = data[productExists]
        data[productExists].quantity = isIncreasing ? q++ : q >= 0 ? q-- : 0

        setProducts(data)
      }
    },
    []
  )

  const removeProduct = useCallback((product: IProduct) => {
    setProducts(products.filter(p => p.id !== product.id))
  }, [])

  const clearBag = useCallback(() => {
    setProducts([] as IProduct[])
  }, [])

  return (
    <BagContext.Provider
      value={{
        products,
        addProduct,
        clearBag,
        removeProduct,
        updateQuantityProduct
      }}
    >
      {children}
    </BagContext.Provider>
  )
}

export function useBag(): BagContextData {
  const context = useContext(BagContext)

  if (!context) {
    throw new Error('useBag must be used within an BagProvider')
  }
  return context
}
