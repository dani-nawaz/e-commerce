import React, { useEffect, useState } from 'react'
import { Row, Col, Image, ListGroup, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { Link, useParams } from 'react-router-dom'
import { useProductsContext } from '../context/product_context'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useCartContext } from '../context/cart_context'
const ProductScreen = () => {
  // const product = products.find((p) => p._id === match.params.id)
  const { fetchSingleProduct, single_product, Single_loading, Single_error } =
    useProductsContext()
  const { addToCart } = useCartContext()
  const { id } = useParams()
  const [qty, setQty] = useState(1)
  useEffect(() => {
    fetchSingleProduct(id)
  }, [id])
  // const addToCart = () => {
  //   history.push(`/cart/${id}?qty=${qty}`)
  // }
  const { _id } = single_product
  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {/* <Message variant='danger'>{Single_error}</Message> */}
      {Single_loading ? (
        <Loader />
      ) : Single_error ? (
        <Message variant='danger'>{Single_error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={single_product.image} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{single_product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={single_product.rating}
                  text={`${single_product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                description : ${single_product.price}
              </ListGroup.Item>

              <ListGroup.Item>
                Description: {single_product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${single_product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {single_product.countInStock > 0
                        ? 'In Stock'
                        : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(single_product.countInStock).keys()].map(
                          (x) => {
                            return (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          }
                        )}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Link
                      to='/cart'
                      disabled={single_product.countInStock === 0}
                      className='btn'
                      type='button'
                      onClick={() => addToCart(_id, qty, single_product)}
                    >
                      Add to Cart
                    </Link>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
