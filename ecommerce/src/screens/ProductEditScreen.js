import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useParams, useHistory } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useProductsContext } from '../context/product_context'
import { useUserContext } from '../context/user_context'

const UserEditScreen = () => {
  const { id } = useParams()
  const history = useHistory()
  const {
    fetchSingleProduct,
    Single_loading,
    Single_error,
    single_product,
    loadingUpdate,
    successUpdate,
    errorUpdate,
    updateProduct,
  } = useProductsContext()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setcountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if (successUpdate) {
      history.push('/admin/productlist')
    } else {
      if (!single_product.name || single_product._id !== id) {
        fetchSingleProduct(id)
      } else {
        setName(single_product.name)

        setPrice(single_product.price)
        setImage(single_product.image)
        setBrand(single_product.brand)
        setCategory(single_product.category)
        setcountInStock(single_product.countInStock)
        setDescription(single_product.description)
      }
    }
  }, [single_product, id, history, successUpdate])
  const submitHandler = (e) => {
    e.preventDefault()

    updateProduct({
      _id: id,
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    })
  }
  console.log(successUpdate)

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Eidt Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {Single_loading ? (
          <Loader />
        ) : Single_error ? (
          <Message variant='danger'>{Single_error}</Message>
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
            <Form.Group controlId='price'>
              <Form.Label>Price </Form.Label>
              <Form.Control
                type='price'
                placeholder='Enter your price'
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URL'
                value={image}
                onChange={(e) => {
                  setImage(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>brand </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>category </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category '
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description '
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>count In Stock </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock '
                value={countInStock}
                onChange={(e) => {
                  setcountInStock(e.target.value)
                }}
              ></Form.Control>
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
