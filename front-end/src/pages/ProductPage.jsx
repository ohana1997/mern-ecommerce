import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import axios from "axios"
const ProductPage = ({ match, history }) => {
  const [product, setProduct] = useState({})
  const [qty, setQty] = useState(1)
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }
    fetchProducts()
  }, [match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <div>
      <Link className="btn btn-dark my-3" to="/">
        Go back
      </Link>
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
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
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
    </div>
  )
}

export default ProductPage
