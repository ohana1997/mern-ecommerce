import { cartTypes } from "../constants"

const INITIAL_STATE = {
  cartItems: [],
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.CART_ADD_ITEM:
      const itemAdded = action.payload
      const existItem = state.cartItems.find(
        (item) => item.product_id === itemAdded.product_id
      )

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product_id === existItem.product_id ? itemAdded : item
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, itemAdded],
        }
      }
    default:
      return state
  }
}

export default cartReducer
