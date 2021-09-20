import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'

import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
} from '../constants/constants'
import reducer from '../reducer/products_reducer'
import { useUserContext } from './user_context'
const ProductContext = React.createContext()

const initialState = {
  products: [],
  loading: false,
  product: [],
  error: '',
  loadingDelete: false,
  loadingUpdate: false,
  errorDelete: '',
  errorUpdate: '',
  successDelete: false,
  successUpdate: false,
  loadingCreate: false,
  errorCreate: '',
  successCreate: false,
  Single_loading: false,
  Single_error: '',
  single_product: {},
}

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { userInfo } = useUserContext()

  const fetchProducts = async () => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })
      const response = await axios.get('/api/products')
      const products = response.data
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  const fetchSingleProduct = async (id) => {
    try {
      dispatch({ type: PRODUCT_DETAIL_REQUEST })
      const { data } = await axios.get(`/api/products/${id}`)

      dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  const deleteProduct = async (id) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST })
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.delete(
        `/api/products/${id}`,

        config
      )
      dispatch({ type: PRODUCT_DELETE_SUCCESS })
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  const createProduct = async () => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST })
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(`/api/products`, {}, config)
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  const updateProduct = async (product) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST })
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      console.log('token', product._id)
      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      )
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
      console.log('context', state.successUpdate)
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  // useEffect(() => {
  //   dispatch({ type: PRODUCT_CREATE_RESET })
  //   console.log('reset')
  // }, [state.successCreate, state.product])

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <ProductContext.Provider
      value={{
        ...state,
        fetchSingleProduct,
        fetchProducts,
        createProduct,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductContext)
}
