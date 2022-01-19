import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducer"
import cartReducer from "./reducers/cartReducer"

const middlewares = [thunk]

const cartItemsLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []
const initialState = {
  cart: {
    cartItems: cartItemsLocalStorage,
  },
}
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store
