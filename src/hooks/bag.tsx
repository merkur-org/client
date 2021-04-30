import { useContext, createContext, useCallback, useReducer } from 'react'
import Cookie from 'js-cookie'

import { BagReducer, sumItems } from './bagReducer'
import { boolean } from 'yup/lib/locale'

export interface IProduct {
  id: string
  name: string
  quantity: number
  photo: string
  unit: string
  sale_price: string | number
}

export interface StateProps {
  bagItems: IProduct[]
  sumItems(bagItems: IProduct[]): { itemCount: number; total: string }
  checkout: boolean
}
interface BagContextData {
  addProduct(product: IProduct): void
  removeProduct(product: IProduct): void
  increseProductQuantity(product: IProduct): void
  decreaseProductQuantity(product: IProduct): void
  clearBag(): void
  bagItems: IProduct[]
}

const storage = Cookie.get('bag') ? JSON.parse(Cookie.get('bag')) : []
const initialState = {
  bagItems: storage,
  ...sumItems(storage),
  checkout: false
}

export const BagContext = createContext<BagContextData>({} as BagContextData)

export const BagProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(BagReducer, initialState)

  const addProduct = useCallback((product: IProduct) => {
    dispatch({ type: 'ADD_PRODUCT', product })
  }, [])

  const removeProduct = useCallback((product: IProduct) => {
    dispatch({ type: 'REMOVE_PRODUCT', product })
  }, [])

  const increseProductQuantity = useCallback((product: IProduct) => {
    dispatch({ type: 'INCREASE', product })
  }, [])

  const decreaseProductQuantity = useCallback((product: IProduct) => {
    dispatch({ type: 'DECREASE', product })
  }, [])

  const clearBag = useCallback(() => {
    dispatch({ type: 'CLEAR', product: undefined })
  }, [])

  return (
    <BagContext.Provider
      value={{
        addProduct,
        removeProduct,
        decreaseProductQuantity,
        increseProductQuantity,
        clearBag,
        ...state
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
