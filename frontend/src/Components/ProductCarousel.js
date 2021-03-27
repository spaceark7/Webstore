import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listTopProducts } from '../actions/productActions'
import Loader from './Pages/Loader'
import Messages from './Pages/Messages'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const productTopRated = useSelector((state) => state.productTopRated)
  const {
    loading: loadingTop,
    error: errorTop,
    products: productsTop,
  } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loadingTop ? (
    <Loader />
  ) : errorTop ? (
    <Messages variant='danger'>{errorTop}</Messages>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {productsTop.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>{product.name}</h2>
              <h4>Only ${product.price}</h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
