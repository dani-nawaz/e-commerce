import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useUserContext } from '../context/user_context'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const { loading, error, userInfo, register } = useUserContext()
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      register(name, email, password)
    }
  }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name </Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>password </Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter confirmed Password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Button className='my-4' type='submit' variant='primary'>
            Register
          </Button>
        </Form>
      )}
      <Row className='py-3'>
        <Col>
          Already Registerd?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Log In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
