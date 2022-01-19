import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import { useDispatch, useSelector } from "react-redux"
import { getListProductDetails } from "../actions/productActions"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { addToCart } from "../actions/cartActions"
// import axios from "axios"

const ProductPage = ({ match, history }) => {
  const productId = match.params.id
  const [qty, setQty] = useState(1)
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${productId}`)
  //     setProduct(data)
  //   }
  //   fetchProduct()
  // }, [productId])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListProductDetails(productId))
  }, [dispatch, productId])

  const addToCartHandler = () => {
    console.log("qty-add", qty)
    dispatch(addToCart(productId, qty))
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  const productDetails = useSelector((state) => state.productDetails)
  const { error, isLoading, product } = productDetails
  return (
    <div>
      <Link className="btn btn-dark my-3" to="/">
        Go back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6} sm={12}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
          <Col md={3} sm={12}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={product.numReviews} />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price: ${product.price}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} sm={12}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      <strong>
                        {product.countInstock ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInstock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity :</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInstock).keys()].map(
                            (item, idx) => (
                              <option key={idx} value={item + 1}>
                                {item + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn btn-primary"
                    type="button"
                    disabled={product.countInstock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default ProductPage
