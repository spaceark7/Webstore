import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
// import products from '../../products.js';
import ProductCard from "../Pages/ProductCard";

import { listProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages";

const HomePage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Products!</h1>
      {loading ? (
        <div className="row d-flex w-100 h-100vh flex-column align-items-center justify-content-center">
          <Spinner role="status" animation="border"></Spinner>{" "}
          <p>Calling for the Virtual Employee to come :)</p>
        </div>
      ) : error ? (
        <Messages variant="danger">{error}</Messages>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomePage;
