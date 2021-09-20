import {
  ORDER_DETAIL_RESET,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_Register_FAIL,
  USER_Register_REQUEST,
  USER_Register_SUCCESS,
  USER_UPDATE_BY_ADMIN_FAIL,
  USER_UPDATE_BY_ADMIN_REQUEST,
  USER_UPDATE_BY_ADMIN_RESET,
  USER_UPDATE_BY_ADMIN_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/constants'

export const userReducer = (state, action) => {
  if (action.type === USER_LOGIN_REQUEST) {
    return { ...state, loading: true }
  }
  if (action.type === USER_LOGIN_SUCCESS) {
    return { ...state, loading: false, userInfo: action.payload }
  }

  if (action.type === USER_LOGIN_FAIL) {
    return { ...state, loading: false, error: action.payload }
  }
  if (action.type === USER_Register_REQUEST) {
    return { ...state, loading: true }
  }
  if (action.type === USER_Register_SUCCESS) {
    return { ...state, loading: false, userInfo: action.payload }
  }

  if (action.type === USER_Register_FAIL) {
    return { ...state, loading: false, error: action.payload }
  }
  if (action.type === USER_DETAIL_REQUEST) {
    return { ...state, loading: true }
  }
  if (action.type === USER_DETAIL_SUCCESS) {
    return { ...state, loading: false, user: action.payload }
  }

  if (action.type === USER_DETAIL_FAIL) {
    return { ...state, loading: false, error: action.payload }
  }
  if (action.type === ORDER_DETAIL_RESET) {
    return { ...state, loading: false, user: {} }
  }
  if (action.type === USER_UPDATE_REQUEST) {
    return { ...state, loading: true }
  }
  if (action.type === USER_UPDATE_SUCCESS) {
    return { ...state, loading: false, success: true, userInfo: action.payload }
  }

  if (action.type === USER_UPDATE_FAIL) {
    return { ...state, loading: false, error: action.payload }
  }
  if (action.type === USER_UPDATE_BY_ADMIN_REQUEST) {
    return { ...state, loadingUpdate: true }
  }
  if (action.type === USER_UPDATE_BY_ADMIN_SUCCESS) {
    return { ...state, loadingUpdate: false, successUpdate: true }
  }

  if (action.type === USER_UPDATE_BY_ADMIN_FAIL) {
    return { ...state, loadingUpdate: false, errorUpdate: action.payload }
  }
  if (action.type === USER_UPDATE_BY_ADMIN_RESET) {
    return { ...state, loadingUpdate: false, successUpdate: false, user: {} }
  }
  if (action.type === USER_LOGOUT) {
    return {}
  }
  throw new Error(`no matching error type ${action.type}`)
}
