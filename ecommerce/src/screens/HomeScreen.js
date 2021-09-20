import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useProductsContext } from '../context/product_context'
import Loader from '../components/Loader'
import Message from '../components/Message'
const HomeScreen = () => {
  const { products, error, loading } = useProductsContext()
  console.log(products)
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            )
          })}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
