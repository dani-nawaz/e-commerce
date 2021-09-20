import {
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_SUCCESS,
} from '../constants/constants'

export const reducer = (state, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return { loadingMyOrders: true }
    case ORDER_LIST_MY_SUCCESS:
      return {
        loadingMyOrders: false,
        orders: action.payload,
      }
    case ORDER_LIST_MY_FAIL:
      return {
        loadingMyOrders: false,
        errorMyOrders: action.payload,
      }
    case ORDER_LIST_MY_RESET:
      return { loadingMyOrders: false, orders: [] }

    default:
  }
}
