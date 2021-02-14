import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap'

import Message from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'

const ProfilePage = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfileStatus = useSelector(
    (state) => state.userUpdateProfile
  )
  const { success } = userUpdateProfileStatus

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords Do Not Match')
    } else {
      // Dispatch Function here
      dispatch(updateUserProfile({ id: user._id, name, password, email }))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h1>My Profile</h1>
        {message && <Message variant='warning'>{message}</Message>}
        {success && <Message variant='success'>Profile Updated!</Message>}
        {loading && (
          <div className='row d-flex w-100 h-100vh flex-column align-items-center justify-content-center'>
            <Spinner role='status' animation='border'></Spinner>{' '}
            <p>Fetching Your Stuff :)</p>
          </div>
        )}
        {error && <Message variant='danger'>{error}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Your password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfilePage
