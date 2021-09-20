import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import {
  ORDER_DETAIL_RESET,
  ORDER_LIST_MY_RESET,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_LIST_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_Register_FAIL,
  USER_Register_REQUEST,
  USER_Register_SUCCESS,
  USER_UPDATE_BY_ADMIN_FAIL,
  USER_UPDATE_BY_ADMIN_RESET,
  USER_UPDATE_BY_ADMIN_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/constants'
import { userReducer } from '../reducer/userReducers'
const UserContext = React.createContext()

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const initialState = {
  user: {},
  loading: false,
  loadingUpdate: false,
  userInfo: userInfoFromStorage,
  error: '',
  errorUpdate: '',
  successUpdate: false,
  success: false,
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  const login = async (email, password) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST })

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users/login',

        {
          email,

          password,
        },

        config
      )

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,

        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  const logOut = () => {
    localStorage.removeItem('userInfo')

    dispatch({ type: USER_LOGOUT })

    dispatch({ type: ORDER_DETAIL_RESET })

    // dispatch2({ type: USER_LIST_RESET })

    window.location.reload()
  }

  const register = async (name, email, password) => {
    try {
      dispatch({ type: USER_Register_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users',

        { name, email, password },

        config
      )

      dispatch({ type: USER_Register_SUCCESS, payload: data })

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_Register_FAIL,

        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  const getUserDetails = async (id) => {
    try {
      dispatch({ type: USER_DETAIL_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/users/${id}`,

        config
      )
      console.log('data', data)
      dispatch({ type: USER_DETAIL_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: USER_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  const getUserUpdate = async (user) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST })
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/users/profile`,
        user,

        config
      )
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  const updateUser = async (user) => {
    try {
      dispatch({ type: USER_UPDATE_BY_ADMIN_FAIL })
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/users/${user._id}`,
        user,

        config
      )
      dispatch({ type: USER_UPDATE_BY_ADMIN_SUCCESS })
      dispatch({ type: USER_DETAIL_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: USER_UPDATE_BY_ADMIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  useEffect(() => {
    dispatch({ type: USER_UPDATE_BY_ADMIN_RESET })
  }, [state.successUpdate])

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logOut,
        register,
        getUserDetails,
        getUserUpdate,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
