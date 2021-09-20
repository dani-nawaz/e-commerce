import axios from 'axios'
import React, { useContext, useReducer } from 'react'

import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_DELETE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
} from '../constants/constants'
import { userListReducer } from '../reducer/UserListReducer'
import { useUserContext } from './user_context'
const UserListContext = React.createContext()

export const initialState = {
  users: [],
  errorUsers: '',
  loadingUsers: false,
  success: false,
}

export const UserListProvider = ({ children, history }) => {
  const [state, dispatch] = useReducer(userListReducer, initialState)
  const { userInfo } = useUserContext()
  const listUsers = async () => {
    try {
      dispatch({ type: USER_LIST_REQUEST })
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(`/api/users`, config)
      dispatch({ type: USER_LIST_SUCCESS, payload: data })
      console.log(data)
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  const deleteUsers = async (id) => {
    try {
      dispatch({ type: USER_DELETE_REQUEST })
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.delete(`/api/users/${id}`, config)
      dispatch({ type: USER_DELETE_SUCCESS })
    } catch (error) {
      dispatch({
        type: USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  // const userlistreset = () => {
  //   const dispatch = useDispatch()({ type: USER_LIST_RESET })
  // }

  return (
    <UserListContext.Provider value={{ ...state, listUsers, deleteUsers }}>
      {children}
    </UserListContext.Provider>
  )
}

export const useUserListContext = () => {
  return useContext(UserListContext)
}
