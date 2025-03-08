import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";

const DetailProduct = () => {
  const { productId } = useParams();
  const product = {
    id: "iphone-13-128gb",
    name: "iPhone 13 128GB Likenew",
    price: "10,990,000 VNĐ",
    originalPrice: "13,990,000 VNĐ",
    condition: "Likenew (99% like new)",
    image: "https://via.placeholder.com/705x470.png?text=iPhone+13",
    colors: ["Midnight", "Starlight", "Blue", "Pink", "Green", "(PRODUCT)RED"],
    specs: {
      display: "6.1-inch Super Retina XDR OLED, 2532 x 1170 pixels, 460 ppi",
      chip: "A15 Bionic chip, 6-core CPU, 4-core GPU, 16-core Neural Engine",
      camera: "Dual 12MP (Wide, Ultra Wide), Night mode, Cinematic mode",
      battery: "Up to 19 hours video playback, Fast charging (50% in 30 mins)",
      os: "iOS 15 (upgradable to iOS 18)",
      dimensions: "146.7 x 71.5 x 7.65 mm, 174g",
      durability: "IP68 water and dust resistance",
    },
    warranty: "6 months warranty",
    promotions: ["Trả góp 0% lãi suất", "Thu cũ đổi mới"],
    stock: "Còn 15 sản phẩm",
  };

  return (
    <Container className="detail-product mt-5">
      <Row>
        <Col md={6}>
          <div className="product-image-container">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
          </div>
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <p className="text-success fw-bold fs-4">{product.price}</p>
          <p className="text-muted text-decoration-line-through">
            {product.originalPrice}
          </p>
          <p>
            <strong>Condition:</strong> {product.condition}
          </p>
          <p>
            <strong>Available Colors:</strong> {product.colors.join(", ")}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <div className="mb-3">
            <Button variant="primary" className="me-2">
              Mua ngay
            </Button>
            <Button variant="outline-primary">Thêm vào giỏ hàng</Button>
          </div>
          <p>
            <strong>Promotions:</strong> {product.promotions.join(", ")}
          </p>
          <p>
            <strong>Warranty:</strong> {product.warranty}
          </p>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Thông số kỹ thuật</h2>
          <ul>
            {Object.entries(product.specs).map(([key, value]) => (
              <li key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                {value}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailProduct;
