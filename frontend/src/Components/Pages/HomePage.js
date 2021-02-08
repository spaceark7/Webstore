import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
// import products from '../../products.js';
import ProductCard from "../Pages/ProductCard";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const FetchProducts = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };

    FetchProducts();
  }, []);
  return (
    <>
      <h1>Latest Products!</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomePage;
