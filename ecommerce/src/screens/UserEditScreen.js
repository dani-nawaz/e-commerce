import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useParams, useHistory } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useUserContext } from '../context/user_context'

const UserEditScreen = ({ location }) => {
  const { id } = useParams()
  const history = useHistory()
  const {
    loading,
    loadingUpdate,
    error,
    errorUpdate,
    user,
    getUserDetails,
    success,
    successUpdate,
    userReset,
    updateUser,
  } = useUserContext()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    if (successUpdate) {
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== id) {
        getUserDetails(id)
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, id, successUpdate, history])
  const submitHandler = (e) => {
    e.preventDefault()
    updateUser({ _id: id, name, email, isAdmin })
  }
  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Eidt User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
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
            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked)
                }}
              ></Form.Check>
            </Form.Group>

            <Button className='my-4' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
