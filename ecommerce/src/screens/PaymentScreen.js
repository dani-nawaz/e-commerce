import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import CheckOutSteps from '../components/CheckOutSteps'
import FormContainer from '../components/FormContainer'
import { useCartContext } from '../context/cart_context'

const PaymentScreen = ({ history }) => {
  const { shippingAddress, savePaymentMethod } = useCartContext()
  if (!shippingAddress) {
    history.push('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const submit = (e) => {
    e.preventDefault()
    savePaymentMethod(paymentMethod)

    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label as='legend'>Select Method </Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              value='PayPal'
              checked
              onChange={(e) => {
                setPaymentMethod(e.target.value)
              }}
              id='paypal'
              name='paymentMethod'
            ></Form.Check>
            {/* <Form.Check
              type='radio'
              label='stripe'
              value='stripe'
              onChange={(e) => {
                setPaymentMethod(e.target.value)
              }}
              id='stripe'
              name='paymentMethod'
            ></Form.Check> */}
          </Col>
        </Form.Group>
        <Button className='my-4' type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
