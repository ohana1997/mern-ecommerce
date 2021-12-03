import axios from "axios"

import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
} from "../constants/productConstant"

export const getListProduct = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_LIST })

    const { data } = await axios.get("api/products")
    if (data) {
      dispatch({ type: GET_PRODUCT_LIST_SUCCESS, payload: data })
    }
  } catch (error) {
    dispatch({ type: GET_PRODUCT_LIST_FAIL, payload: error })
  }
}
