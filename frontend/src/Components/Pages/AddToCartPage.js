import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import Messages from './Messages'

import { FaTrash } from 'react-icons/fa'

const AddToCart = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  console.log(cartItems)
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkOutHandler = () => {
    console.log('checkout')
    history.push(`/login?redirect=shipping`)
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Messages>
            Oops! You're not picking any item yet <Link to='/'>Find Items</Link>
          </Messages>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item.product}`}> {item.name} </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }}
                    >
                      {[...Array(item.countStock).keys()].map((count) => {
                        return (
                          <option
                            className='text-center'
                            key={count + 1}
                            value={count + 1}
                          >
                            {count + 1}
                          </option>
                        )
                      })}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      type='buttom'
                      variant='secondary'
                      onClick={() => removeItemHandler(item.product)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='py-2'>
                Subtotal {cartItems.reduce((acc, item) => acc + item.qty, 0)}{' '}
                items in the Cart
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Button
                type='buttom'
                className='btn-block my-3'
                variant='primary'
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed To CheckOut
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default AddToCart
