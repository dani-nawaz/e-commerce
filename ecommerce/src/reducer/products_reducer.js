import {
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
} from '../constants/constants'

const prdoducts_reducer = (state, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }

    case PRODUCT_DETAIL_REQUEST:
      return { ...state, Single_loading: true }
    case PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        Single_loading: false,

        single_product: action.payload,
      }
    case PRODUCT_DETAIL_FAIL:
      return { ...state, Single_loading: false, Single_error: action.payload }
    //

    case PRODUCT_DELETE_REQUEST:
      return { ...state, loadingDelete: true }
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loadingDelete: false,

        successDelete: true,
      }
    case PRODUCT_DELETE_FAIL:
      return { ...state, loadingDelete: false, errorDelete: action.payload }

    case PRODUCT_CREATE_REQUEST:
      return { ...state, loadingCreate: true }
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loadingCreate: false,

        successCreate: true,
        product: action.payload,
      }
    case PRODUCT_CREATE_FAIL:
      return { ...state, loadingCreate: false, errorCreate: action.payload }
    case PRODUCT_CREATE_RESET:
      return { ...state, product: [] }

    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loadingUpdate: true }
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loadingUpdate: false,

        successUpdate: true,
        product: action.payload,
      }
    case PRODUCT_UPDATE_FAIL:
      return { ...state, loadingUpdaten: false, errorUpdate: action.payload }

    case PRODUCT_UPDATE_RESET:
      return { ...state, product: [] }

    default:
      throw new Error('NO MATCHING ACTION TYPE')
  }
}
export default prdoducts_reducer
