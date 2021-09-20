import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from '../constants/constants'

export const reducer = (state, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true }
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case ORDER_DETAIL_REQUEST:
      return { ...state, loading: true }
    case ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

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
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}

    default:
  }
}
