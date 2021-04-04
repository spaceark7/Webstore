import React, { useEffect, useState } from 'react'
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  FormGroup,
  Option,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Rating from './Rating.js'
import Messages from './Messages'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProductReview,
  listProductDetails,
} from '../../actions/productActions.js'
import { addToCart } from '../../actions/cartActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../Constant/productConstant.js'
import Meta from '../Meta.js'

const ProductPage = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetails

  const producCreateReview = useSelector((state) => state.producCreateReview)
  const {
    error: errorCreateReview,
    success: successCreateReview,
  } = producCreateReview

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successCreateReview) {
      alert('Review Submitted!')
      setComment('')
      setRating(0)
      dispatch({
        type: PRODUCT_CREATE_REVIEW_RESET,
      })
    }
    dispatch(listProductDetails(match.params.id))
    dispatch({
      type: PRODUCT_CREATE_REVIEW_RESET,
    })
  }, [dispatch, match, successCreateReview])

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty))
    history.push(`/cart`)
  }

  const submitReviewHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-link my-2' to='/'>
        <AiOutlineArrowLeft /> Back
      </Link>
      {loading ? (
        <div className='row d-flex w-100 h-100vh flex-column align-items-center justify-content-center'>
          <Spinner role='status' animation='border'></Spinner>{' '}
          <p>Fetching Your Stuff :)</p>
        </div>
      ) : error ? (
        <Messages variant='danger'>{error}</Messages>
      ) : (
        <>
          <Meta
            title={`${product.name} | Webstore Product`}
            description={product.desc}
            keywords={product.brand}
          />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>{product.desc}</p>{' '}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={` ${product.numReviews} Reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>${product.price}</h4>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row className='text-center'>
                      <Col>Available Stock</Col>
                      <Col
                        className={product.countStock > 0 ? '' : 'bg-warning'}
                      >
                        {product.countStock > 0
                          ? product.countStock
                          : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>

                {product.countStock > 0 && (
                  <ListGroup>
                    <ListGroup.Item>
                      <Row className='text-center'>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value)
                            }}
                          >
                            {[...Array(product.countStock).keys()].map(
                              (count) => {
                                return (
                                  <option
                                    className='text-center'
                                    key={count + 1}
                                    value={count + 1}
                                  >
                                    {count + 1}
                                  </option>
                                )
                              }
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                )}

                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Button
                      type='button'
                      onClick={addToCartHandler}
                      disabled={product.countStock === 0}
                      className={
                        product.countStock === 0
                          ? 'btn-block btn-danger'
                          : 'btn-block btn-success'
                      }
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Messages>No Reviews</Messages>}
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Write A Review</h2>
                  {errorCreateReview && (
                    <Messages variant='danger'>{errorCreateReview}</Messages>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select ...</option>
                          <option value='1'>Bad</option>
                          <option value='2'>Fair</option>
                          <option value='3'>Good</option>
                          <option value='4'>Very Good</option>
                          <option value='5'>Awesome!</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='commment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit Review
                      </Button>
                    </Form>
                  ) : (
                    <Messages>
                      Please <Link to='/login'>Sign In</Link> to write a review
                    </Messages>
                  )}
                </ListGroup.Item>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductPage
