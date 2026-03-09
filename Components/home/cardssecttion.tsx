'use client'
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};

function Cardsection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/additems")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-5 text-center fw-bold">Shop Products</h2>

      <Row>
        {products?.map((product) => (
          <Col key={product.id} lg={4} md={6} xs={12} className="mb-4">
            
            <Card className="food-card border-0 shadow-sm h-100">

              {/* Image Section */}
              <div className="position-relative">
                
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  className="food-img"
                />

                {/* Quantity Badge */}
                <Badge
                  bg="warning"
                  text="dark"
                  className="position-absolute top-0 end-0 m-2 px-3 py-2 fs-6"
                >
                  Qty: {product.quantity}
                </Badge>

              </div>

              {/* Card Body */}
              <Card.Body className="d-flex flex-column">

                <Card.Title className="fw-bold">
                  {product.name}
                </Card.Title>

                <Card.Text className="text-muted small flex-grow-1">
                  {product.description.substring(0, 80)}...
                </Card.Text>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  
                  <h5 className="fw-bold text-success mb-0">
                    ${product.price}
                  </h5>

                </div>

                <div className="mt-3 d-flex gap-2">
                  <Button variant="dark" className="w-100">
                    Add to Cart
                  </Button>
                  <Button variant="outline-dark" className="w-100">
                    Buy Now
                  </Button>
                </div>

              </Card.Body>

            </Card>

          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Cardsection;