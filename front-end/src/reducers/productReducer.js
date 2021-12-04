// import {
//   GET_PRODUCT_LIST,
//   GET_PRODUCT_LIST_SUCCESS,
//   GET_PRODUCT_LIST_FAIL,
// } from "../constants/productConstant"

import { productTypes } from "../constants"
const initialState = { products: [] }

const productListReducer = (state = initialState, action) => {
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

export default productListReducer
