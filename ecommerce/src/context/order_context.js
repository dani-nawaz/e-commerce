import axios from 'axios'
import React, { useContext, useReducer, useState } from 'react'

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
} from '../constants/constants'
import { reducer } from '../reducer/orderReducer'
import { useUserContext } from './user_context'
const OrderContext = React.createContext()

const initialState = {
  order: [],
  loading: true,
  success: false,
  successPay: false,
  error: '',
  loadingPay: false,
}

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { userInfo } = useUserContext()
  const createOrder = async (order) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST })
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post(
        '/api/orders',
        order,

        config
      )
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  const getOrderDetail = async (id) => {
    try {
      dispatch({ type: ORDER_DETAIL_REQUEST })
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/orders/${id}`,

        config
      )
      dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ORDER_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  // useEffect(() => {
  //   if (state.successPay) {
  //     dispatch({ type: ORDER_PAY_RESET })
  //     getOrderDetail(state.order._id)
  //   }
  // }, [state.successPay])
  return (
    <OrderContext.Provider value={{ ...state, createOrder, getOrderDetail }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrderContext = () => {
  return useContext(OrderContext)
}
