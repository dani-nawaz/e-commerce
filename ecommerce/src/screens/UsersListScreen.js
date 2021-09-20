import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useUserListContext } from '../context/userListContext'
import { useUserContext } from '../context/user_context'

const UsersListScreen = () => {
  const { loadingUsers, users, errorUsers, listUsers, deleteUsers, success } =
    useUserListContext()
  const history = useHistory()
  const { userInfo } = useUserContext()

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      listUsers()
    } else {
      history.push('/login')
    }
  }, [history, success])
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      deleteUsers(id)
    }
  }
  return (
    <>
      <h1>users</h1>

      {loadingUsers ? (
        <Loader />
      ) : errorUsers ? (
        <Message variant='danger'>{errorUsers}</Message>
      ) : (
        <Table striped hover bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => {
                      deleteHandler(user._id)
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

export default UsersListScreen
