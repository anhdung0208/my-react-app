// src/components/products/TopSellingProductsTable.js
import { motion } from "framer-motion";

const TopSellingProductsTable = ({ products }) => {
  const fallbackImage = "https://placehold.co/40x40?text=Image+Not+Found";

  return (
    <motion.div
      className="card mb-4 w-100"
      style={{ backgroundColor: "#2A3447" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="card-body">
        <h2 className="card-title h4 mb-4 text-white">Top 5 Selling Products</h2>

        {products.length === 0 ? (
          <div className="text-center text-white">
            <p>No top selling products available.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-white">Product Name</th>
                  <th scope="col" className="text-white">Price</th>
                  <th scope="col" className="text-white">Quantity Sold</th>
                  <th scope="col" className="text-white">Stock Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        <img
                          src={product.imageUrl || "https://placehold.co/40x40?text=Product"}
                          alt={product.productName}
                          className="rounded-circle me-2"
                          style={{ width: "40px", height: "40px" }}
                          onError={(e) => {
                            if (e.target.src !== fallbackImage) {
                              e.target.src = fallbackImage;
                            }
                          }}
                        />
                        <span className="text-white">{product.productName}</span>
                      </div>
                    </td>
                    <td className="align-middle text-white">
                      ${product.currentProductPrice.toFixed(2)}
                    </td>
                    <td className="align-middle text-white">{product.quantitySold}</td>
                    <td className="align-middle text-white">{product.stockQuantity}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TopSellingProductsTable;