import axios from "axios"
import { cartTypes } from "../constants"

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)
  console.log("data-", data)
  dispatch({
    type: cartTypes.CART_ADD_ITEM,
    payload: {
      product_id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInstock: data.countInstock,
      qty,
    },
  })
  console.log("add data--", data)
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}
