import axios from "axios"
import { userTypes } from "../constants"

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.USER_LOGIN_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(
      `/api/user/login`,
      { email, password },
      config
    )
    if (data) {
      dispatch({
        type: userTypes.USER_LOGIN_SUCCESS,
        payload: data,
      })
      localStorage.setItem("userInfo", JSON.stringify(data))
    }
  } catch (error) {
    const msg_err =
      error.response && error.response.data?.message
        ? error.response.data.message
        : error.message

    dispatch({ type: userTypes.USER_LOGIN_FAIL, payload: msg_err })
  }
}
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.USER_REGISTER_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(
      `/api/user/register`,
      { email, password, name },
      config
    )
    console.log("data--", data)
    if (data) {
      dispatch({
        type: userTypes.USER_REGISTER_SUCCESS,
        payload: data,
      })
      dispatch({
        type: userTypes.USER_LOGIN_SUCCESS,
        payload: data,
      })
      localStorage.setItem("userInfo", JSON.stringify(data))
    }
  } catch (error) {
    const msg_err =
      error.response && error.response.data?.message
        ? error.response.data.message
        : error.message

    dispatch({ type: userTypes.USER_REGISTER_FAIL, payload: msg_err })
  }
}
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    console.log("zo----")
    const {
      userLogin: { userInfo },
    } = getState()
    dispatch({ type: userTypes.USER_DETAIL_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/user/${id}`, config)
    if (data) {
      dispatch({
        type: userTypes.USER_DETAIL_SUCCESS,
        payload: data,
      })
    }
  } catch (error) {
    const msg_err =
      error.response && error.response.data?.message
        ? error.response.data.message
        : error.message

    dispatch({ type: userTypes.USER_DETAIL_FAIL, payload: msg_err })
  }
}

export const getListUsers = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()
    dispatch({ type: userTypes.USER_LIST_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/user/listusers`, config)
    console.log("data--", data)
    if (data && data.users) {
      dispatch({
        type: userTypes.USER_LIST_SUCCESS,
        payload: data.users,
      })
    }
  } catch (error) {
    const msg_err =
      error.response && error.response.data?.message
        ? error.response.data.message
        : error.message

    dispatch({ type: userTypes.USER_LIST_FAIL, payload: msg_err })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    console.log("deleted")

    const {
      userLogin: { userInfo },
    } = getState()
    dispatch({ type: userTypes.USER_DELETE_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/user/${id}`, config)

    dispatch({
      type: userTypes.USER_DELETE_SUCCESS,
    })
  } catch (error) {
    const msg_err =
      error.response && error.response.data?.message
        ? error.response.data.message
        : error.message

    dispatch({ type: userTypes.USER_DELETE_FAIL, payload: msg_err })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userTypes.USER_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/user/${user._id}`, user, config)
    dispatch({
      type: userTypes.USER_UPDATE_SUCCESS,
    })
    dispatch({
      type: userTypes.USER_DETAILS_SUCCESS,
      payload: data,
    })
    dispatch({
      type: userTypes.USER_UPDATE_RESET,
    })
  } catch (error) {
    const msg_err =
      error.response && error.response.data?.message
        ? error.response.data.message
        : error.message

    dispatch({ type: userTypes.USER_REGISTER_FAIL, payload: msg_err })
  }
}
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo")
  localStorage.removeItem("cartItems")
  dispatch({ type: userTypes.USER_LOG_OUT })
  document.location.href = "/login"
}
