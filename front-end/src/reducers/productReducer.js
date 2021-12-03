import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
} from "../constants/productConstant"
const initialState = {}

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return { isLoading: true, products: [] }
    case GET_PRODUCT_LIST_SUCCESS:
      return { isLoading: false, products: action.payload }
    case GET_PRODUCT_LIST_FAIL:
      return { isLoading: false, error: action.payload }
    default:
      return state
  }
}

export default productListReducer
