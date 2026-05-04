"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import { useRouter } from "next/navigation";

function Addfooditem() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [items, setItems] = useState<
    Array<{
      _id: string;
      name: string;
      price: string;
      description: string;
      quantity: string;
      image: string;
      category: string;
    }>
  >([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/additems");
      const data = await response.json();
      console.log("Fetched products:", data);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setItems([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      let response;

      if (editingId) {
        // Update existing product
        response = await fetch(`/api/additems/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            category,
            description,
            price,
            quantity,
            image,
          }),
        });

        if (response.status === 200) {
          setName("");
          setCategory("");
          setPrice("");
          setDescription("");
          setQuantity("");
          setImage("");
          setEditingId(null);
          fetchProducts();
          alert("Product updated successfully!");
        } else {
          const err = await response.json();
          alert(err.message || "Failed to update");
        }
      } else {
        // Add new product
        response = await fetch("/api/additems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            category,
            description,
            price,
            quantity,
            image,
          }),
        });

        if (response.status === 201) {
          setName("");
          setCategory("");
          setPrice("");
          setDescription("");
          setQuantity("");
          setImage("");
          fetchProducts();
          alert("Product added successfully!");
        } else {
          const err = await response.json();
          alert(err.message || "Failed");
        }
      }
    } catch (e) {
      alert("Error submitting form");
    }
  }

  const deleteProduct = async (id: string) => {
    debugger;
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`/api/additems/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        alert("Product deleted successfully!");
        fetchProducts();
      } else {
        const err = await response.json();
        alert(err.message || "Failed to delete product");
      }
    } catch (e) {
      alert("Error deleting product");
    }
  };

  const editProduct = (item: any) => {
    setName(item?.name || "");
    setCategory(item?.category || "");
    setPrice(item?.price || "");
    setDescription(item?.description || "");
    setQuantity(item?.quantity || "");
    setImage(item?.image || "");
    setEditingId(item?._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setQuantity("");
    setImage("");
    setEditingId(null);
  };

  return (
    <Container fluid className="min-vh-100 bg-light p-5">
      <Row className="mb-5">
        <Col md={5} className="mx-auto">
          <Card className="p-4 shadow-lg border-0 rounded-4">
            <h3 className="text-center mb-4">
              {editingId ? "✏️ Edit Food Product" : "🍔 Add Food Product"}
            </h3>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  value={quantity || ""}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  value={image || ""}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={category || ""}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Drinks">Drinks</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price || ""}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="success" className="w-100">
                {editingId ? "Update Product" : "Add Product"}
              </Button>

              {editingId && (
                <Button
                  type="button"
                  variant="secondary"
                  className="w-100 mt-2"
                  onClick={cancelEdit}
                >
                  Cancel
                </Button>
              )}
            </Form>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow border-0 p-4">
            <h4 className="mb-4">📋 Product List</h4>

            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => {
                  debugger;
                  return (
                    <tr key={item?._id || index}>
                      <td>{index + 1}</td>

                      <td>
                        {item?.image ? (
                          <img
                            src={item.image}
                            width="60"
                            height="60"
                            style={{ objectFit: "cover" }}
                          />
                        ) : null}
                      </td>

                      <td>{item?.name}</td>
                      <td>{item?.category}</td>
                      <td>₹{item?.price}</td>
                      <td>{item?.quantity}</td>
                      <td>{item?.description}</td>

                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => editProduct(item)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteProduct(item._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>

            {items.length === 0 && (
              <p className="text-center mt-3">No products found</p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Addfooditem;