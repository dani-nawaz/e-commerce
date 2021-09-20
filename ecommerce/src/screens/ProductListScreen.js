import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useProductsContext } from '../context/product_context'

import { useUserContext } from '../context/user_context'

const ProductListScreen = () => {
  const {
    loading,
    loadingDelete,
    loadingCreate,
    error,
    errorDelete,
    errorCreate,
    products,
    successDelete,
    successCreate,
    fetchProducts,
    deleteProduct,
    product,
    resetProduct,
    createProduct,
  } = useProductsContext()
  const history = useHistory()
  const { userInfo } = useUserContext()
  console.log('newproduct', product)
  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login')
      // fetchProducts()
    }

    if (successCreate) {
      history.push(`/admin/product/${product._id}/edit`)
    } else {
      fetchProducts()
    }
  }, [history, userInfo, successDelete, successCreate, product])
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      deleteProduct(id)
    }
  }
  const createProductHandler = () => {
    console.log('object')
    createProduct()
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped hover bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>Price</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>$ {product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => {
                      deleteHandler(product._id)
                    }}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen
