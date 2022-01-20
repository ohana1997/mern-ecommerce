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

    const { data } = await axios.get("/api/products")
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

export const getListProductDetails = (id) => async (dispatch) => {
  try {
    console.log("zo")
    dispatch({ type: productTypes.GET_PRODUCT_DETAILS })
    const { data } = await axios.get(`/api/products/${id}`)

    if (data) {
      dispatch({
        type: productTypes.GET_PRODUCT_DETAILS_SUCCESS,
        payload: data,
      })
    }
  } catch (error) {
    const msg_err =
      error.response && error.response.data?.message
        ? error.response.data.message
        : error.message

    console.log("error.response---", error.response, msg_err)
    dispatch({ type: productTypes.GET_PRODUCT_DETAILS_FAIL, payload: msg_err })
  }
}

// export const listProducts,
// deleteProduct,
// createProduct,

export const createProduct = () => async (dispatch, getState) => {
  console.log("zooo")
  try {
    dispatch({
      type: productTypes.PRODUCT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/products`, {}, config)

    dispatch({
      type: productTypes.PRODUCT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: productTypes.PRODUCT_CREATE_FAIL,
      payload: message,
    })
  }
}
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaer ${userInfo.token}`,
      },
    }
    dispatch({ type: productTypes.PRODUCT_DELETE_REQUEST })
    const { data } = await axios.delete(`/api/products/${id}`, config)

    dispatch({
      type: productTypes.PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    const msg_err =
      error.response && error.response.data?.message
        ? error.response.data.message
        : error.message

    console.log("error.response---", error.response, msg_err)
    dispatch({ type: productTypes.PRODUCT_DELETE_FAIL, payload: msg_err })
  }
}
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: productTypes.PRODUCT_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )

    dispatch({
      type: productTypes.PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: productTypes.PRODUCT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    console.log("error : ", error)
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: productTypes.PRODUCT_UPDATE_FAIL,
      payload: message,
    })
  }
}
