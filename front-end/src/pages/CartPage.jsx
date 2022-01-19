import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Message from "../components/Message"
import { Link } from "react-router-dom"
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Card,
  Image,
  ListGroupItem,
} from "react-bootstrap"
import { addToCart } from "../actions/cartActions"

const CartPage = ({ history, location, match }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const removeCartHandler = () => {}
  // console.log("cartItems-------- ", cartItems)
  console.log("cartItems------------")
  useEffect(() => {}, [cartItems])
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty.
            <Link to="/"> Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product_id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>$ {item.price}</Col>
                  <Col md={2}></Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product_id, e.target.value))
                      }
                    >
                      {[...Array(item.countInstock).keys()].map((item, idx) => (
                        <option key={idx} value={item + 1}>
                          {item + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      className="btn btn-primary"
                      type="button"
                      onClick={removeCartHandler}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={2}></Col>
      <Col md={2}></Col>
    </Row>
  )
}

export default CartPage
