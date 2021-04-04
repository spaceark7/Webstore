import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
// import products from '../../products.js';
import ProductCard from '../Pages/ProductCard'

import { listProducts } from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Messages from './Messages'
import Loader from './Loader'
import Paginate from '../Paginate'
import ProductCarousel from '../ProductCarousel'
import Meta from '../Meta'

const HomePage = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, products, error, pages, page } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  return (
    <>
      <Meta />
      {!keyword && <ProductCarousel />}
      <h1>Latest Products!</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages variant='danger'>{error}</Messages>
      ) : (
        <>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={product} />
                </Col>
              )
            })}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomePage
