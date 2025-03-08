import React, { useState } from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <BootstrapNavbar
      expand="lg"
      className="navbar-custom navbar-fixed shadow-lg"
    >
      <Container>
        <BootstrapNavbar.Brand
          onClick={() => navigate("/")}
          className="d-flex align-items-center cursor-pointer"
        >
          <i className="bi bi-exclude me-2" />
          <span className="fw-bold">Our Store</span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          {/* Search Form */}
          <Form className="d-flex ms-3 search-form" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="light" type="submit" className="search-button">
              <i className="bi bi-search" />
            </Button>
          </Form>

          {/* Navigation Links */}
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link
              onClick={() => navigate("/order")}
              className="nav-link-custom"
            >
              Order
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/store-near-you")}
              className="nav-link-custom"
            >
              Store Near You
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/about")}
              className="nav-link-custom"
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/contact")}
              className="nav-link-custom"
            >
              Contact
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/cart")}
              className="nav-link-custom"
            >
              <i className="bi bi-cart" /> Cart
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/login")}
              className="nav-link-custom"
            >
              <i className="bi bi-box-arrow-in-right" /> Login
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
