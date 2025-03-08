import React, { useState } from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
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
        <BootstrapNavbar.Brand className="d-flex align-items-center">
          <span
            onClick={() => navigate("/")}
            className="d-flex align-items-center cursor-pointer"
          >
            <i className="bi bi-exclude me-2" />
            <span className="fw-bold">Our Store</span>
          </span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          {/* Search Form */}
          <form className="group ms-3" onSubmit={handleSearch}>
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              type="search"
              placeholder="Search products..."
              className="input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

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
