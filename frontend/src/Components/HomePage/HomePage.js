import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../products.js'
import products from '../../products.js';
import ProductCard from './ProductCard'
const HomePage = () => {
    return ( 
    <> 
        <h1>Latest Products!</h1>
        <Row >
           
            {  
            
            products.map(product => {
                    return <Col sm={12} md={6} lg={4} xl={3}> 
                        <ProductCard key={product.id} product={product} /> 
                    </Col>})
            }
            
        </Row>
    
    </>);
}
 
export default HomePage;