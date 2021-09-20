import axios from 'axios'
import React, { useContext, useReducer } from 'react'

import {
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
} from '../constants/constants'
import { reducer } from '../reducer/myOrderReducer'
import { useUserContext } from './user_context'
const MyOrderContext = React.createContext()

const initialState = {
  orders: [],
  successMyOrders: false,
  errorMyOrders: '',
  loadingMyOrders: false,
}

export const MyOrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { userInfo } = useUserContext()

  const listMyOrders = async () => {
    try {
      dispatch({ type: ORDER_LIST_MY_REQUEST })
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/orders/myorders`,

        config
      )
      dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  return (
    <MyOrderContext.Provider value={{ ...state, listMyOrders }}>
      {children}
    </MyOrderContext.Provider>
  )
}

export const useMyOrderContext = () => {
  return useContext(MyOrderContext)
}
