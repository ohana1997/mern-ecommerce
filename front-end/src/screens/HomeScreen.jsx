import React, { useState, useEffect, useCallback } from "react"
import { Row, Col } from "react-bootstrap"
// import products from "../products"
import Product from "../components/Product"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getListProduct } from "../actions/productActions"

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListProduct())
  }, [dispatch])

  const products = []

  return (
    <div>
      <h2>Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen
