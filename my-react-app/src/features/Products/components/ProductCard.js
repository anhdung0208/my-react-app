import React from "react";
import PropTypes from "prop-types";
import "../styles/ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const price = product.currentProductPrice ?? product.retailPrice ?? null;
  const numberOfSoldProduct = product.quantitySold;
  const rating = product.starRating || 0;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const displayDiscount = Math.floor(product.percentagePromoteOfCustomer);

  return (
    <div
      className="product-card relative"
      data-id={product.id}
      onClick={handleCardClick}
    >
      {product.percentagePromoteOfCustomer && (
        <div className="discount-badge">
          <div className="discount-content">
            <span className="discount-arrow">↓</span>
            <span className="discount-percentage">{displayDiscount}%</span>
          </div>
        </div>
      )}

      <img
        src={product.image || "https://dummyimage.com/150"}
        alt={product.productName || "No Title"}
        className="product-image"
      />
      <div className="product-details">
        <h3 className="product-title">
          {product.productName || "Unknown Product"}
        </h3>
        <p className="product-description">
          {product.productDescription || "No description available."}
        </p>
        <div className="product-footer">
          <div className="footer-top-row">
            <span className="product-price">
              {price !== null ? `$${price.toFixed(2)}` : "Price not available"}
            </span>
            <button
              className="add-to-cart"
              onClick={handleAddToCartClick}
              disabled={price === null}
            >
              Add to Cart
            </button>
          </div>
          <div className="footer-bottom-row">
            <span className="product-number-of-sold">
              {numberOfSoldProduct != null
                ? `${numberOfSoldProduct.toFixed(0)} Sold`
                : "0 Sold"}
            </span>
            <span className="product-rating">{rating} ★</span>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
    productName: PropTypes.string.isRequired,
    productDescription: PropTypes.string,
    currentProductPrice: PropTypes.number,
    retailPrice: PropTypes.number,
    quantitySold: PropTypes.number,
    starRating: PropTypes.number,
    discountPercentage: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
