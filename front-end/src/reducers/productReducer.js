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
      return { isLoading: true, product: [] }
    case productTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return { isLoading: false, product: action.payload }
    case productTypes.GET_PRODUCT_DETAILS_FAIL:
      return { isLoading: false, error: action.payload }
    default:
      return state
  }
}
