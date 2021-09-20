import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import CheckOutSteps from '../components/CheckOutSteps'
import FormContainer from '../components/FormContainer'
import { useCartContext } from '../context/cart_context'

const ShippingScreen = ({ history }) => {
  const { shippingAddress, saveShippingAddress } = useCartContext()
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submit = (e) => {
    e.preventDefault()
    saveShippingAddress({ address, city, postalCode, country })
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submit}>
        <Form.Group controlId='address'>
          <Form.Label>Address </Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter your address'
            value={address}
            required
            onChange={(e) => {
              setAddress(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City </Form.Label>
          <Form.Control
            type='city'
            placeholder='Enter your city'
            value={city}
            required
            onChange={(e) => {
              setCity(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code </Form.Label>
          <Form.Control
            type='postalCode'
            placeholder='Enter your Postal Code'
            value={postalCode}
            required
            onChange={(e) => {
              setPostalCode(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country </Form.Label>
          <Form.Control
            type='country'
            placeholder='Enter your Country'
            value={country}
            required
            onChange={(e) => {
              setCountry(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Button className='my-4' type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
