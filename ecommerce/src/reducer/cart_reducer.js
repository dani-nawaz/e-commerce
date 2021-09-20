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

const cart_reducer = (state, action) => {
  if (action.type === CART_ADD_ITEM) {
    const { _id, qty, single_product } = action.payload
    const tempItem = state.cart.find((i) => i._id === _id)
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem._id === _id) {
          // let newQty = cartItem.qty + Number(qty)

          let newQty =
            cartItem.qty >= cartItem.countInStock
              ? qty
              : cartItem.qty + Number(qty)

          if (newQty >= cartItem.countInStock) {
            newQty = cartItem.countInStock
          }
          return { ...cartItem, qty: newQty }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    } else {
      const newItem = {
        _id: single_product._id,
        name: single_product.name,
        qty: qty,
        image: single_product.image,
        price: single_product.price,
        countInStock: single_product.countInStock,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  if (action.type === CART_REMOVE_ITEM) {
    const tempCart = state.cart.filter((item) => item._id !== action.payload)
    return { ...state, cart: tempCart }
  }
  if (action.type === CART_SAVE_SHIPPING_ADDRESS) {
    return { ...state, shippingAddress: action.payload }
  }
  if (action.type === CART_SAVE_PAYMENT_METHOD) {
    return { ...state, paymentMethod: action.payload }
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { qty, price } = cartItem
        total.total_items += qty
        total.total_amount += price * qty
        return total
      },
      { total_items: 0, total_amount: 0 }
    )
    return { ...state, total_items, total_amount }
  }
  if (action.type === COUNT_SHIPPING_PRICE) {
    let price = 0
    if (state.total_amount < 100) {
      price = 0
    } else {
      price = 10
    }

    return { ...state, shippingPrice: price }
  }
  if (action.type === COUNT_TAX_PRICE) {
    let price = Number((0.15 * state.total_amount).toFixed(2))
    return { ...state, taxPrice: price }
  }
  if (action.type === COUNT_TOTAL_PRICE) {
    let price = Number(
      (state.total_amount + state.taxPrice + state.shippingPrice).toFixed(2)
    )
    return { ...state, totalPrice: price }
  }

  throw new Error('NO matching Error Type')
}

export default cart_reducer
