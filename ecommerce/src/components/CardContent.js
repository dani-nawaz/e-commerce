import React from 'react'
import { useCartContext } from '../context/cart_context'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const CardContent = () => {
  const { cart, addToCart, removeItem } = useCartContext()

  return (
    <ListGroup variant='flush'>
      {cart.map((item) => {
        return (
          <ListGroup.Item key={item._id}>
            <Row>
              <Col md={2}>
                <Image src={item.image} fluid rounded />
              </Col>
              <Col md={3}>
                <Link to={`/product/${item._id}`}> {item.name}</Link>
              </Col>
              <Col md={2}>${item.price}</Col>
              <Col md={2}>
                <Form.Control
                  as='select'
                  value={item.qty}
                  onChange={(e) =>
                    addToCart(item._id, Number(e.target.value), item)
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => {
                    return (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    )
                  })}
                </Form.Control>
              </Col>
              <Col md={2}>
                <Button
                  type='button'
                  variant='light'
                  onClick={() => removeItem(item._id)}
                >
                  <i className='fas fa-trash'></i>
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

export default CardContent
