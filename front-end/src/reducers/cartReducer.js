import { cartTypes } from "../constants"

const INITIAL_STATE = {
  cartItems: [],
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.CART_ADD_ITEM:
      const itemAdded = action.payload
      const existItem = state.cartItems.find(
        (item) => item.product === itemAdded.product
      )

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === existItem.product ? itemAdded : item
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
