import { motion } from 'framer-motion';
import { Search, Trash2, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {
  fetchProductsList,
  deleteProductById,
  addProduct,
  fetchCategoryList,
} from '../../api/productPageApi';

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProductsList] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 10;

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    currentProductPrice: '',
    retailPrice: '',
    productDescription: '',
    stockQuantity: '',
    manufacturingCountry: '',
    percentagePromoteOfCustomer: '',
    productStatus: '',
    importTime: '',
    categoryId: '',
  });

  useEffect(() => {
    const loadProductsList = async () => {
      setLoading(true);
      setCategoryLoading(true);
      setError(null);

      try {
        const categories = await fetchCategoryList();
        setCategory(categories);
        setCategoryLoading(false);

        const response = await fetchProductsList(currentPage, pageSize);
        const normalizedProducts = response.content.map((product) => ({
          id: product.id || 0,
          productName: product.productName || 'Unknown Product',
          currentProductPrice: product.currentProductPrice || 0,
          retailPrice: product.retailPrice || 0,
          productDescription: product.productDescription || 'No description',
          stockQuantity: product.stockQuantity || 0,
          manufacturingCountry: product.manufacturingCountry || 'Unknown',
          percentagePromoteOfCustomer: product.percentagePromoteOfCustomer || 0,
          productStatus: product.productStatus || 'Unknown',
          importTime: product.importTime || new Date().toISOString(),
          imageUrl: product.imageUrl || null,
        }));

        setProductsList(normalizedProducts);
        setFilteredProducts(normalizedProducts);
        setTotalPages(response.totalPages || 0);
      } catch (error) {
        setError(error.message || 'Failed to load products');
      } finally {
        setLoading(false);
        setCategoryLoading(false);
      }
    };
    loadProductsList();
  }, [currentPage]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(term) ||
        product.manufacturingCountry.toLowerCase().includes(term) ||
        product.productStatus.toLowerCase().includes(term),
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProductById(id);
        const updatedProducts = products.filter((product) => product.id !== id);
        setProductsList(updatedProducts);
        setFilteredProducts(updatedProducts);

        if (updatedProducts.length === 0 && currentPage > 0) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        setError(error.message || 'Failed to delete product');
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddProduct = () => {
    setFormData({
      productName: '',
      currentProductPrice: '',
      retailPrice: '',
      productDescription: '',
      stockQuantity: '',
      manufacturingCountry: '',
      percentagePromoteOfCustomer: '',
      productStatus: '',
      importTime: '',
      categoryId: '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      productName: '',
      currentProductPrice: '',
      retailPrice: '',
      productDescription: '',
      stockQuantity: '',
      manufacturingCountry: '',
      percentagePromoteOfCustomer: '',
      productStatus: '',
      importTime: '',
      categoryId: '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      productName: formData.productName,
      currentProductPrice: parseFloat(formData.currentProductPrice) || 0,
      retailPrice: parseFloat(formData.retailPrice) || 0,
      quantity: parseInt(formData.stockQuantity) || 0,
      productDescription: formData.productDescription,
      stockQuantity: parseInt(formData.stockQuantity) || 0,
      manufacturingCountry: formData.manufacturingCountry,
      starRating: 0,
      productStatus: formData.productStatus,
      importTime: formData.importTime
        ? new Date(formData.importTime).toISOString()
        : new Date().toISOString(),
      categoryId: parseInt(formData.categoryId),
    };

    try {
      const response = await addProduct(productData);
      const newProduct = response.data;
      setProductsList((prev) => [...prev, newProduct]);
      setFilteredProducts((prev) => [...prev, newProduct]);
      handleCloseModal();
    } catch (error) {
      setError(error.message || 'Failed to add product');
    }
  };

  // URL dự phòng cho hình ảnh
  const fallbackImage = 'https://placehold.co/40x40?text=Image+Not+Found';

  return (
    <>
      <motion.div
        className="card mb-4 w-100"
        style={{ backgroundColor: '#2A3447' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="card-title h4 mb-0 text-white">Product List</h2>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-primary me-3"
                onClick={handleAddProduct}
              >
                <Plus size={18} className="me-1" /> Add Product
              </button>
              <div className="position-relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="form-control ps-5"
                  onChange={handleSearch}
                  value={searchTerm}
                  style={{
                    backgroundColor: '#374151',
                    color: '#FFFFFF',
                    border: 'none',
                  }}
                />
                <Search
                  className="position-absolute top-50 translate-middle-y ms-2 text-white"
                  size={18}
                />
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center text-white">
              <p>Loading products...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center text-white">
              <p>No products found.</p>
            </div>
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th scope="col" className="text-white">
                        Product Name
                      </th>
                      <th scope="col" className="text-white">
                        Current Price
                      </th>
                      <th scope="col" className="text-white">
                        Retail Price
                      </th>
                      <th scope="col" className="text-white">
                        Description
                      </th>
                      <th scope="col" className="text-white">
                        Stock Quantity
                      </th>
                      <th scope="col" className="text-white">
                        Manufacturing Country
                      </th>
                      <th scope="col" className="text-white">
                        Promotion (%)
                      </th>
                      <th scope="col" className="text-white">
                        Status
                      </th>
                      <th scope="col" className="text-white">
                        Import Time
                      </th>
                      <th scope="col" className="text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <img
                              src={product.imageUrl || 'https://placehold.co/40x40?text=Product'}
                              alt={product.productName}
                              className="rounded-circle me-2"
                              style={{ width: '40px', height: '40px' }}
                              onError={(e) => {
                                // Chỉ đặt lại src nếu nó chưa phải là hình ảnh dự phòng
                                if (e.target.src !== fallbackImage) {
                                  e.target.src = fallbackImage;
                                }
                              }}
                            />
                            <span className="text-white">
                              {product.productName}
                            </span>
                          </div>
                        </td>
                        <td className="align-middle text-white">
                          ${product.currentProductPrice.toFixed(2)}
                        </td>
                        <td className="align-middle text-white">
                          ${product.retailPrice.toFixed(2)}
                        </td>
                        <td className="align-middle text-white">
                          {product.productDescription}
                        </td>
                        <td className="align-middle text-white">
                          {product.stockQuantity}
                        </td>
                        <td className="align-middle text-white">
                          {product.manufacturingCountry}
                        </td>
                        <td className="align-middle text-white">
                          {product.percentagePromoteOfCustomer.toFixed(2)}%
                        </td>
                        <td className="align-middle text-white">
                          {product.productStatus}
                        </td>
                        <td className="align-middle text-white">
                          {new Date(product.importTime).toLocaleDateString()}
                        </td>
                        <td className="align-middle">
                          <button
                            className="btn btn-link text-danger p-0"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-secondary"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                >
                  Previous
                </button>
                <span className="text-white align-self-center">
                  Page {currentPage + 1} of {totalPages || 1}
                </span>
                <button
                  className="btn btn-secondary"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCurrentProductPrice">
              <Form.Label>Current Product Price</Form.Label>
              <Form.Control
                type="number"
                name="currentProductPrice"
                value={formData.currentProductPrice}
                onChange={handleFormChange}
                required
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRetailPrice">
              <Form.Label>Retail Price</Form.Label>
              <Form.Control
                type="number"
                name="retailPrice"
                value={formData.retailPrice}
                onChange={handleFormChange}
                required
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="productDescription"
                value={formData.productDescription}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStockQuantity">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formManufacturingCountry">
              <Form.Label>Manufacturing Country</Form.Label>
              <Form.Control
                type="text"
                name="manufacturingCountry"
                value={formData.manufacturingCountry}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formPercentagePromoteOfCustomer"
            >
              <Form.Label>Promotion Percentage (%)</Form.Label>
              <Form.Control
                type="number"
                name="percentagePromoteOfCustomer"
                value={formData.percentagePromoteOfCustomer}
                onChange={handleFormChange}
                required
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductStatus">
              <Form.Label>Product Status</Form.Label>
              <Form.Control
                type="text"
                name="productStatus"
                value={formData.productStatus}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImportTime">
              <Form.Label>Import Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="importTime"
                value={formData.importTime}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategoryId">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleFormChange}
                required
                disabled={categoryLoading}
              >
                {categoryLoading ? (
                  <option value="">Loading categories...</option>
                ) : (
                  <>
                    <option value="">Select a category</option>
                    {category.length > 0 ? (
                      [...category]
                        .sort((a, b) =>
                          a.categoryName.localeCompare(b.categoryName),
                        )
                        .map((cat) => (
                          <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.categoryName}
                          </option>
                        ))
                    ) : (
                      <option value="" disabled>
                        No categories available
                      </option>
                    )}
                  </>
                )}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductsTable;