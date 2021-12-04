import axios from "axios"

// import {
//   GET_PRODUCT_LIST,
//   GET_PRODUCT_LIST_SUCCESS,
//   GET_PRODUCT_LIST_FAIL,
// } from "../constants/productConstant"
import { productTypes } from "../constants"

export const getListProduct = () => async (dispatch) => {
  try {
    dispatch({ type: productTypes.GET_PRODUCT_LIST })

    const { data } = await axios.get("api/products")
    if (data) {
      dispatch({ type: productTypes.GET_PRODUCT_LIST_SUCCESS, payload: data })
    }
  } catch (error) {
    const msg_err =
      error.response && error.response.data?.message
        ? error.response.data.message
        : error.message

    console.log("error.response---", error.response, msg_err)
    dispatch({ type: productTypes.GET_PRODUCT_LIST_FAIL, payload: msg_err })
  }
}
