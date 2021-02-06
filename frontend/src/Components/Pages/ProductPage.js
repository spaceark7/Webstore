import React, { useState, useEffect } from "react";
import { Col, Row, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Rating from "./Rating.js";
import axios from "axios";

const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const FetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);

      setProduct(data);
    };

    FetchProduct();
  }, [match.params.id]);
  return (
    <>
      <Link className="btn btn-link my-2" to="/">
        <AiOutlineArrowLeft /> Back
      </Link>

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
                  <Col>Qty</Col>
                  <Col className={product.countStock > 0 ? "" : "bg-warning"}>
                    {product.countStock > 0
                      ? product.countStock
                      : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Button
                  type="button"
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
    </>
  );
};

export default ProductPage;
