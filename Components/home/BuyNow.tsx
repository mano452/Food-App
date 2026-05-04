import React from "react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  quantity: string;
  image: string;
};

type BuyNowProps = {
  product?: Product;
};

const BuyNow = ({ product }: BuyNowProps) => {
  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <h1 className="text-center">Buy Now Page - Coming Soon! ??</h1>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <Link href="/" className="btn btn-link mb-4">
        ? Back to shop
      </Link>

      <div className="row gy-4">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h1 className="mb-3">{product.name}</h1>
          <p className="text-muted">Category: {product.category}</p>
          <h3 className="text-success mb-3">${product.price}</h3>
          <p>{product.description}</p>
          <p className="mb-1">
            <strong>Quantity:</strong> {product.quantity}
          </p>
          <button className="btn btn-primary mt-3">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
