import React from "react";
import PropTypes from "prop-types";
import "../styles/ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const price = product.currentProductPrice ?? product.retailPrice ?? null;

  return (
    <div className="product-card" data-id={product.id}>
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
          <span className="product-price">
            {price !== null ? `$${price.toFixed(2)}` : "Price not available"}
          </span>
          <button
            className="add-to-cart"
            onClick={() => onAddToCart(product)}
            disabled={price === null}
          >
            Add to Cart
          </button>
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
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
