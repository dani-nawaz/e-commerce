import React, { useContext, useEffect, useReducer } from 'react'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  COUNT_CART_TOTALS,
  COUNT_SHIPPING_PRICE,
  COUNT_TAX_PRICE,
  COUNT_TOTAL_PRICE,
} from '../constants/constants'
import reducer from '../reducer/cart_reducer'

const CartContext = React.createContext()
const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    return []
  }
}
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}
const PaymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}
const initialState = {
  cart: getLocalStorage(),
  total_amount: 0,
  total_items: 0,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: PaymentMethodFromStorage,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const addToCart = async (_id, qty, single_product) => {
    dispatch({ type: CART_ADD_ITEM, payload: { _id, qty, single_product } })
  }
  const removeItem = (id) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id })
  }
  const saveShippingAddress = (data) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  }
  const savePaymentMethod = (data) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
  }
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
    dispatch({ type: COUNT_CART_TOTALS })
    dispatch({ type: COUNT_SHIPPING_PRICE })
    dispatch({ type: COUNT_TAX_PRICE })
    dispatch({ type: COUNT_TOTAL_PRICE })
  }, [state.cart])
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        saveShippingAddress,
        savePaymentMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}
