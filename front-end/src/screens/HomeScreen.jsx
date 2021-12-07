import React, { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
// import products from "../products"
import Product from "../components/Product"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getListProduct } from "../actions/productActions"
import Message from "../components/Message"
import Loader from "../components/Loader"

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListProduct())
  }, [dispatch])

  const productList = useSelector((state) => state.products)
  const { error, isLoading, products } = productList

  return (
    <div>
      <h2>Products</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default HomeScreen
