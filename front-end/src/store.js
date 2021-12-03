import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import productListReducer from "./reducers/productReducer"
const middlewares = [thunk]
const initialState = {}
const reducer = combineReducers({
  products: productListReducer,
})
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store
