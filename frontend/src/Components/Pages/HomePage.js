import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
// import products from '../../products.js';
import ProductCard from "../Pages/ProductCard";

import { listProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages";
import Loader from "./Loader";

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
        <Loader />
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
