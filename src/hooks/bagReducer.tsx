import Cookie from 'js-cookie'

import { StateProps, BagProducts } from '@/hooks/bag'

const Storage = (bagItems: BagProducts[]) => {
  Cookie.set('bag', JSON.stringify(bagItems.length > 0 ? bagItems : []))
}

export const sumItems = (
  bagItems: BagProducts[]
): { itemCount: number; total: string } => {
  Storage(bagItems)

  const itemCount = bagItems.reduce(
    (total, product) => total + product.quantity,
    0
  )

  const total = bagItems
    .reduce(
      (total, product) =>
        total + (product.sale_price as number) * product.quantity,
      0
    )
    .toFixed(2)

  return { itemCount, total }
}

export const BagReducer = (
  state: StateProps,
  action: { type: string; product: BagProducts }
): any => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const foundItem = state.bagItems.findIndex(
        product => product.id === action.product.id
      )

      if (foundItem < 0) {
        state.bagItems.push({
          ...action.product,
          quantity: action.product.quantity
        })
      } else {
        state.bagItems[foundItem].quantity += action.product.quantity
      }

      return {
        ...state,
        ...sumItems(state.bagItems || []),
        bagItems: [...state.bagItems]
      }
    }

    case 'REMOVE_PRODUCT': {
      return {
        ...state,
        ...sumItems(
          state.bagItems.filter(product => product.id !== action.product.id)
        ),
        bagItems: [
          ...state.bagItems.filter(product => product.id !== action.product.id)
        ]
      }
    }

    case 'INCREASE': {
      state.bagItems[
        state.bagItems.findIndex(product => product.id === action.product.id)
      ].quantity++
      return {
        ...state,
        ...sumItems(state.bagItems),
        bagItems: [...state.bagItems]
      }
    }

    case 'DECREASE': {
      const foundItem = state.bagItems.findIndex(
        product => product.id === action.product.id
      )
      state.bagItems[foundItem].quantity > 0
        ? state.bagItems[foundItem].quantity--
        : (state.bagItems[foundItem].quantity = 0)

      return {
        ...state,
        ...sumItems(state.bagItems),
        bagItems: [...state.bagItems]
      }
    }

    case 'CHECKOUT': {
      return {
        bagItems: [],
        checkout: true,
        ...sumItems([])
      }
    }

    case 'CLEAR': {
      return {
        bagItems: [],
        ...sumItems([])
      }
    }

    default:
      return state
  }
}
