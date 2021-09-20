import {
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from '../constants/constants'

export const reducer = (state, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loadingPay: true }
    case ORDER_PAY_SUCCESS:
      return {
        loadingPay: false,
        successPay: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loadingPay: false,
        errorPay: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}

    default:
  }
}
