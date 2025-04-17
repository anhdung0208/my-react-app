import React, { useEffect, useState } from "react";
import "../styles/ProductDetail.css";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOneProduct } from "../api/productApi";
import { Container, Alert, Spinner, Modal } from "react-bootstrap";
import { addToProductToCart } from "../api/ProductDetailApi/productDetailApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

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
    alert(`Mua ngay sản phẩm ${product.productName || "N/A"} với số lượng ${quantity}`);
  };

  const handleAddToCart = () => {
    setShowModal(true);
  };

  const handleViewMore = () => {
    navigate(`/products`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setQuantity(1);
  };

  const handleConfirmAddToCart = async (productId, quantity) => {
    if (quantity < 1) {
      toast.error("Số lượng phải lớn hơn 0");
      return;
    }
    if (quantity > (product.stockQuantity || 500)) {
      toast.error(`Số lượng vượt quá tồn kho (${product.stockQuantity || 1000})`);
      return;
    }

    setAdding(true);
    setShowModal(false);

    try {
      await addToProductToCart(productId, quantity);
      toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
      setQuantity(1);
    } catch (error) {

      if (error.message.includes("403")) {
        toast.error("Vui lòng đăng nhập để mua hàng . Tự động chuyển hướng sang trang đăng nhập sau 3 giây", {
          autoClose: 3000,
          onClose: () => { navigate("/login") }
        });
        //setTimeout(() => { navigate("/login") }, 5000); the difference is that this will not show the toast message
        return;
      } else if (error.message.includes("404")) {
        toast.error("Sản phẩm hoặc giỏ hàng không tồn tại.");
      }
      toast.error(`Lỗi: Không thể thêm sản phẩm vào giỏ hàng - ${error.message}`);
    } finally {
      setAdding(false);
    }
  };

  const displayDiscount = Math.floor(product.percentagePromoteOfCustomer || 0);
  const formattedOriginalPrice = new Intl.NumberFormat("vi-VN").format(
    product.retailPrice || 0
  );
  const formattedCurrentPrice = new Intl.NumberFormat("vi-VN").format(
    product.currentProductPrice || 0
  );

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <>
      <div className="product-detail-container">
        <div className="product-detail-content">
          <div className="product-image-section">
            <motion.img
              src={product.image || "https://dummyimage.com/300"}
              alt={product.productName || "Sản phẩm"}
              className="main-product-image"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
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
              <motion.button
                className="buy-now-button"
                onClick={handleBuyNow}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={adding}
              >
                Mua ngay
              </motion.button>
              <div className="secondary-buttons">
                <motion.button
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={adding}
                >
                  {adding ? "Đang thêm..." : "Thêm vào giỏ hàng"}
                </motion.button>
                <motion.button
                  className="view-more-button"
                  onClick={handleViewMore}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={adding}
                >
                  Xem thêm
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="custom-modal"
        backdropClassName="custom-backdrop"
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm sản phẩm vào giỏ hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-body-content">
              <div className="modal-product-image">
                <img
                  src={product.image || "https://dummyimage.com/300"}
                  alt={product.productName || "Sản phẩm"}
                />
              </div>
              <div className="modal-product-details">
                <h2>{product.productName || "Sản phẩm không có tên"}</h2>
                <p className="modal-price">Giá: {formattedCurrentPrice} VND</p>
                <div className="modal-quantity">
                  <label>Số lượng:</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value) || 1;
                      if (newQuantity < 1) {
                        toast.error("Số lượng phải lớn hơn 0");
                        setQuantity(1);
                      } else if (newQuantity > (product.stockQuantity || 1000)) {
                        toast.error(`Số lượng vượt quá tồn kho (${product.stockQuantity || 1000})`);
                        setQuantity(product.stockQuantity || 1000);
                      } else {
                        setQuantity(newQuantity);
                      }
                    }}
                    min="1"
                    max={product.stockQuantity || 1000}
                    className="quantity-input"
                  />
                </div>
              </div>
            </div>
            <motion.button
              className="buy-product"
              onClick={() => handleConfirmAddToCart(productId, quantity)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={adding}
            >
              Thêm vào giỏ hàng của bạn
            </motion.button>
          </Modal.Body>
        </motion.div>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
      />
    </>
  );
};

export default ProductDetail;