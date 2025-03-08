import React, { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import ProductCard from "../../Products/components/ProductCard";
import fetchProducts from "../api/productApi";
import "../styles/ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(0, 15);
        setProducts(data.content || data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  if (loading)
    return (
      <Container className="mt-4">
        <p>Loading...</p>
      </Container>
    );
  if (error)
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="mt-4">
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ProductList;
