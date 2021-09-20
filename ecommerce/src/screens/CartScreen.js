import React from 'react'
import { Card, Col, ListGroup, Row, Button } from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import CardContent from '../components/CardContent'
import Message from '../components/Message'
import { useCartContext } from '../context/cart_context'

const CartScreen = () => {
  const { cart } = useCartContext()
  // useEffect(() => {
  //   if (id) {
  //     addToCart(id, qty)
  //   }
  // }, [id, qty])
  // console.log(
  //   cart.reduce((acc, item) => (acc + item.qty * item.price, 0)).toFixed(2)
  // )

  // console.log(cart.reduce((acc, item) => acc + item.qty, 0))

  // cart.map((i) => {
  //   console.log(i.price)
  // })
  const history = useHistory()
  const checkOutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cart.length === 0 ? (
          <Message>
            Your Cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <CardContent />
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                SubTotal ({cart.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              $
              {cart
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                disabled={cart.length === 0}
                type='button'
                className='btn-block'
                onClick={() => {
                  checkOutHandler()
                }}
              >
                Proceed To checkOut
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  )
}

export default CartScreen
