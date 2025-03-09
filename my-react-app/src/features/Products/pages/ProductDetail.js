import React, { useEffect, useState } from "react";
import "../styles/ProductDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOneProduct } from "../api/productApi";
import { Container, Alert, Spinner } from "react-bootstrap";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async (id) => {
      if (!id || isNaN(id)) {
        setError("Invalid product ID");
        setLoading(false);
        return;
      }
      try {
        const productData = await fetchOneProduct(id);
        if (!productData || Object.keys(productData).length === 0) {
          setError("Product data is empty or invalid");
        } else {
          setProduct(productData);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadProduct(productId);
  }, [productId]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">Sản phẩm không tồn tại</Alert>
      </Container>
    );
  }

  const handleBuyNow = () => {
    alert(`Mua ngay sản phẩm ${product.productName || "N/A"}`);
  };

  const handleViewMore = () => {
    navigate(`/products`);
  };

  const displayDiscount = Math.floor(product.percentagePromoteOfCustomer || 0);
  const formattedOriginalPrice = new Intl.NumberFormat("vi-VN").format(
    product.retailPrice || 0
  );
  const formattedCurrentPrice = new Intl.NumberFormat("vi-VN").format(
    product.currentProductPrice || 0
  );

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="product-image-section">
          <img
            src={product.image || "https://dummyimage.com/300"}
            alt={product.productName || "Sản phẩm"}
            className="main-product-image"
          />
          <div className="thumbnail-images">
            {Array(4)
              .fill()
              .map((_, index) => (
                <img
                  key={index}
                  src={`https://dummyimage.com/100?index=${index}`}
                  alt={`Thumbnail ${index}`}
                  className="thumbnail-image"
                />
              ))}
          </div>
        </div>

        <div className="product-info-section">
          <div className="product-title-container">
            <h1 className="product-title">
              {product.productName || "Sản phẩm không có tên"}
            </h1>
            {displayDiscount > 0 && (
              <div className="discount-badge">
                <div className="discount-content">
                  <span className="discount-arrow">↓</span>
                  <span className="discount-percentage">
                    {displayDiscount}%
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="product-prices">
            <span className="original-price">{formattedOriginalPrice} VND</span>
            <span className="current-price">{formattedCurrentPrice} VND</span>
          </div>

          <div className="product-options">
            <div className="option-group">
              <label>Dung lượng:</label>
              {(product.options?.storage || []).length > 0 ? (
                product.options.storage.map((storage, index) => (
                  <button key={index} className="option-button">
                    {storage}
                  </button>
                ))
              ) : (
                <p>Không có tùy chọn dung lượng</p>
              )}
            </div>
            <div className="option-group">
              <label>Màu sắc:</label>
              {(product.options?.colors || []).length > 0 ? (
                product.options.colors.map((color, index) => (
                  <button key={index} className="option-button">
                    {color}
                  </button>
                ))
              ) : (
                <p>Không có tùy chọn màu sắc</p>
              )}
            </div>
          </div>

          <div className="promotions">
            <h3>Khuyến mãi</h3>
            {(product.promotions || []).length > 0 ? (
              <ul>
                {product.promotions.map((promo, index) => (
                  <li key={index}>{promo}</li>
                ))}
              </ul>
            ) : (
              <p>Không có khuyến mãi</p>
            )}
          </div>

          <div className="action-buttons">
            <button className="buy-now-button" onClick={handleBuyNow}>
              Mua ngay
            </button>
            <button className="view-more-button" onClick={handleViewMore}>
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
