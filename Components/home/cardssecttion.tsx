'use client'
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

function Cardsection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=15")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Error fetching products:", err));
  }, [products]);

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center fw-bold">Shop Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.thumbnail}
                alt={product.title}
                style={{maxHeight:"200px",objectFit:"contain"}}
               className="img-fluid"
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text style={{ fontSize: "14px" }}>
                  {product.description.substring(0, 100)}...
                </Card.Text>
                <h5 className="fw-bold text-success">${product.price}</h5>
                <Button variant="primary" className="me-2">
                  Add to Cart
                </Button>
                <Button variant="outline-secondary">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Cardsection;
