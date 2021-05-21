import { useContext, createContext, useCallback, useReducer } from 'react'
import Cookie from 'js-cookie'

import { BagReducer, sumItems } from './bagReducer'

import { IProductsDTO } from '@/dtos/IProductsDTO'

export interface BagProducts extends IProductsDTO {
  quantity: number
}

export interface StateProps {
  bagItems: BagProducts[]
  sumItems(bagItems: BagProducts[]): { itemCount: number; total: string }
  checkout: boolean
}
interface BagContextData {
  addProduct(product: BagProducts): void
  removeProduct(product: IProductsDTO): void
  increseProductQuantity(product: BagProducts): void
  decreaseProductQuantity(product: BagProducts): void
  clearBag(): void
  bagItems: BagProducts[]
  sumItems(bagItems: BagProducts[]): { itemCount: number; total: string }
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

  const addProduct = useCallback((product: BagProducts) => {
    dispatch({ type: 'ADD_PRODUCT', product })
  }, [])

  const removeProduct = useCallback((product: BagProducts) => {
    dispatch({ type: 'REMOVE_PRODUCT', product })
  }, [])

  const increseProductQuantity = useCallback((product: BagProducts) => {
    dispatch({ type: 'INCREASE', product })
  }, [])

  const decreaseProductQuantity = useCallback((product: BagProducts) => {
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
        sumItems,
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
