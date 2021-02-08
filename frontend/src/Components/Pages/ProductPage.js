import React, {  useEffect, useState } from "react";
import { Col, Row, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Rating from "./Rating.js";
import Messages from './Messages'
import {Spinner} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productActions.js";


const ProductPage = ({ history, match }) => {
  const [qty, setQty] = useState(0)
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)

  const {loading, product, error} = productDetails
  useEffect(() => {
   
    dispatch(listProductDetails(match.params.id))

   
  }, [match.params.id, dispatch]);

const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
}

  return (
    <>
      <Link className="btn btn-link my-2" to="/">
        <AiOutlineArrowLeft /> Back
      </Link>
      {loading ? (
        <div className="row d-flex w-100 h-100vh flex-column align-items-center justify-content-center">
          <Spinner role="status" animation="border"></Spinner>{" "}
          <p>Fetching Your Stuff :)</p>
        </div>
      ) : error ? (<Messages variant="danger">{error}</Messages>) : (

        <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>{product.desc}</p>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={` ${product.numReviews} Reviews`}
              />
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>{product.price}</h4>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row className="text-center">
                  <Col>Available Stock</Col>
                  <Col className={product.countStock > 0 ? "" : "bg-warning"}>
                    {product.countStock > 0
                      ? product.countStock
                      : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            {product.countStock > 0 && 
              <ListGroup>
                <ListGroup.Item>
                  <Row className="text-center">
                    <Col>
                      Qty
                    </Col>
                    <Col>
                      <Form.Control as="select" value={qty} onChange={(e) => {setQty(e.target.value)}}>
                        { [...Array(product.countStock).keys()].map(count => {
                          return <option  className="text-center" key={count + 1} value={count+1}> 
                            {count+1}
                          </option>
                        }) 
                        }
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>}

            <ListGroup variant="flush">
              <ListGroup.Item>
                <Button
                  type="button"
                  onClick={addToCartHandler}
                  disabled={product.countStock === 0}
                  className={
                    product.countStock === 0
                      ? "btn-block btn-danger"
                      : "btn-block btn-success"
                  }
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>


      ) }
     
    </>
  );
};

export default ProductPage;
