import { Card } from "react-bootstrap";
import React from 'react';
const ProductCard = ({product}) => {
    return ( 
            <Card className="my-3 p-3 rounded">
                <a href={`/product/${product.id}`}>
                    <Card.Img src={product.image} variant="top" />
                </a>

                <Card.Body>
                    <a href={`/product/${product.id}`}>
                        <Card.Title as="div">
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </a>

                    <Card.Text as="div">
                            <div className="my-3">
                                {product.rating} from {product.numReviews} reviews
                            </div>
                    </Card.Text>

                    <Card.Text className="text-info" as='h4'>
                        Price: {product.price}
                    </Card.Text>
                </Card.Body>
                
            </Card> );
}
 
export default ProductCard;