import React from "react";
import { Container } from "react-bootstrap";
import ProductList from "../../Products/pages/ProductList";

function Home() {
  return (
    <Container className="mt-4">
      <h1>Welcome to Our Store</h1>
      <ProductList />
    </Container>
  );
}

export default Home;
