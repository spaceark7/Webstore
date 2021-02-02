import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return ( 
        <div className="footer h-20vh bg-primary navbar-dark">
            <Container >
                <Row>
                    <Col></Col>
                    <Col className="text-center text-light">Copyright &copy; Web store</Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
     );
}
 
export default Footer;