import Link from "next/link";
import { dbConnect } from "@/lib/mongo";
import { Additem } from "@/model/additem";

type Props = {
  params: { id: string };
};

export default async function BuyNowPage({ params }: Props) {
  await dbConnect();
  const product = await Additem.findById(params.id).lean();

  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <h1 className="mb-3">Product not found</h1>
          <Link href="/" className="btn btn-primary">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <Link href="/" className="btn btn-link mb-4">
        ← Back to shop
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
}
