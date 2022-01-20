import { productTypes } from "../constants"
const initialState = { products: [] }
const initialStateDetails = { product: { review: [] } }

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.GET_PRODUCT_LIST:
      return { isLoading: true, products: [] }
    case productTypes.GET_PRODUCT_LIST_SUCCESS:
      return { isLoading: false, products: action.payload }
    case productTypes.GET_PRODUCT_LIST_FAIL:
      return { isLoading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (state = initialStateDetails, action) => {
  switch (action.type) {
    case productTypes.GET_PRODUCT_DETAILS:
      return { ...state, loading: true }
    case productTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return { isLoading: false, product: action.payload }
    case productTypes.GET_PRODUCT_DETAILS_FAIL:
      return { isLoading: false, error: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case productTypes.PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case productTypes.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case productTypes.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case productTypes.PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case productTypes.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case productTypes.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case productTypes.PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case productTypes.PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case productTypes.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case productTypes.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case productTypes.PRODUCT_UPDATE_RESET:
      return { product: {} }
    default:
      return state
  }
}
