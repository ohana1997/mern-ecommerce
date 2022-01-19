import { userTypes } from "../constants"
const initialState = {}
export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.USER_LOGIN_REQUEST:
      return { isLoading: true }
    case userTypes.USER_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload }
    case userTypes.USER_LOGIN_FAIL:
      return { isLoading: false, error: action.payload }
    case userTypes.USER_LOG_OUT:
      return { isLoading: false }
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userTypes.USER_REGISTER_REQUEST:
      return { loading: true }
    case userTypes.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case userTypes.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case userTypes.USER_LOG_OUT:
      return { isLoading: false }
    default:
      return state
  }
}

export const userDetailReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userTypes.USER_DETAIL_REQUEST:
      return { loading: true }
    case userTypes.USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload }
    case userTypes.USER_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    case userTypes.USER_LOG_OUT:
      return { isLoading: false }
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userTypes.USER_LIST_REQUEST:
      return { loading: true }
    case userTypes.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case userTypes.USER_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case userTypes.USER_DELETE_REQUEST:
      return { loading: true }
    case userTypes.USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case userTypes.USER_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userTypes.USER_UPDATE_REQUEST:
      return { loading: true }
    case userTypes.USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case userTypes.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case userTypes.USER_UPDATE_RESET:
      return { user: {} }
    default:
      return state
  }
}
