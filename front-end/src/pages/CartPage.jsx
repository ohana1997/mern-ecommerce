import React from "react"
// import { use } from "react-redux"
const CartPage = ({ history, location, match }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split("=")[1]) : 1

  // const dispatch = useDispatch()

  console.log("props- ", productId, qty)
  return <h1>Cart Page</h1>
}

export default CartPage
