import React, { useEffect, useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../actions/cartActions'
import CheckOutProcess from '../CheckOutProcess'

import FormContainer from './FormContainer'

const PaymentMethodPage = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('')
  //   useEffect(() => {
  //     if (paymentMethod !== '') {
  //       setPaymentMethod(paymentMethod)
  //     }
  //   }, [paymentMethod])

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  return (
    <FormContainer>
      <CheckOutProcess stepOne stepTwo stepThree />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Payment Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type='radio'
              label='Bank BCA'
              id='BCA'
              name='paymentMethod'
              value='Bank BCA'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type='radio'
              label='Bank Mandiri'
              id='Mandiri'
              name='paymentMethod'
              value='Bank Mandiri'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button
          type='submit'
          variant='primary'
          disabled={paymentMethod === '' ? true : false}
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentMethodPage
