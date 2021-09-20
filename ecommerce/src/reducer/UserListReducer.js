import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
} from '../constants/constants'

export const userListReducer = (state, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { ...state, loadingUsers: true }
    case USER_LIST_SUCCESS:
      return {
        ...state,
        loadingUsers: false,
        users: action.payload,
      }
    case USER_LIST_FAIL:
      return {
        ...state,
        loadingUsers: false,
        errorUsers: action.payload,
      }
    case USER_LIST_RESET:
      return {
        loadingUsers: false,
        users: [],
      }

    case USER_DELETE_REQUEST:
      return { ...state, loadingUsers: true }
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        loadingUsers: false,
        success: true,
      }
    case USER_DELETE_FAIL:
      return {
        ...state,
        loadingUsers: false,
        errorUsers: action.payload,
      }

    default:
  }
}
