import React, { useEffect } from 'react'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import Messages from './Messages'
import { LinkContainer } from 'react-router-bootstrap'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { Table, Button, Row, Col } from 'react-bootstrap'
import {
  createProduct,
  deleteProductById,
  listProducts,
} from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../Constant/productConstant'
import Paginate from '../Paginate'

const ProductListPage = ({ history, match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNUmber || 1
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList
  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete
  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({
      type: PRODUCT_CREATE_RESET,
    })

    if (!userInfo.isAdmin) {
      history.push('/login')
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure? ')) {
      dispatch(deleteProductById(id))
    }
  }

  const createProductHandler = () => {
    //Create Product
    dispatch(createProduct())
  }
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Product</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Messages variant='danger'>{errorDelete}</Messages>}
      {loadingCreate && <Loader />}
      {errorCreate && <Messages variant='danger'>{errorCreate}</Messages>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages variant='danger'>{error}</Messages>
      ) : (
        <>
          <Table striped hover responsive bordered className='table-sm'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='primary' className='btn-sm my-1 mx-1'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm my-1 mx-1'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListPage
