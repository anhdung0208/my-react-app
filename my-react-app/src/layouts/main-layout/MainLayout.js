import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../features/core/components/navbar/Navbar";

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Navbar />
      <Container className="main-content">{children}</Container>
    </div>
  );
}

export default MainLayout;
