import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'

import {
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from '../constants/constants'
import { reducer } from '../reducer/orderPayReducer'
import { useOrderContext } from './order_context'
import { useUserContext } from './user_context'
const OrderPayContext = React.createContext()

const initialState = {
  successPay: false,
  errorPay: '',
  loadingPay: false,
}

export const OrderPayProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { userInfo } = useUserContext()
  const payOrder = async (id, paymentResult) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST })
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/orders/${id}/pay`,
        paymentResult,

        config
      )
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  useEffect(() => {
    if (state.successPay) {
      dispatch({ type: ORDER_PAY_RESET })
    }
  }, [state.successPay])
  return (
    <OrderPayContext.Provider value={{ ...state, payOrder }}>
      {children}
    </OrderPayContext.Provider>
  )
}

export const useOrderPayContext = () => {
  return useContext(OrderPayContext)
}

// const addPayPalScript = async () => {
//   const { data: clientId } = await axios.get('/api/config/paypal')
//   const script = document.createElement('script')
//   script.type = 'text/javascript'
//   script.src = ` https://www.paypal.com/sdk/js?client-id=${clientId}`
//   script.async = true
//   script.onload = () => {
//     setSdkReady(true)
//   }
//   document.body.appendChild(script)
// }
// if (!order || paySuccess) {
//   getOrderDetail(id)
// } else if (!order.isPaid) {
//   if (!window.paypal) {
//     addPayPalScript()
//   } else {
//     setSdkReady(true)
//   }
// }
// const addPayPalScript = async () => {
//   const { data: clientId } = await axios.get('/api/config/paypal')
//   const script = document.createElement('script')
//   script.type = 'text/javascript'
//   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
//   script.async = true
//   script.onload = () => {
//     setSdkReady(true)
//   }
//   document.body.appendChild(script)
// }
// addPayPalScript()
// getOrderDetail(id)
