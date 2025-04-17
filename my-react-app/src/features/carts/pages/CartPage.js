
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2 } from 'lucide-react';
import { Button } from 'react-bootstrap';
import { fetchCartItems } from '../api/cartApi'

const CartPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [filteredCartItems, setFilteredCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10;


    const formatPrice = (price) => {
        if (price === null) return 'Price not available';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(price);
    };



    useEffect(() => {
        const loadCartItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetchCartItems(currentPage, pageSize);
                console.log('Cart Items Response:', response);
                const normalizedItems = response.content.map((item) => ({
                    id: item.idLineItem || 0,
                    productName: item?.productName || 'Unknown Product',
                    amountOfProductEachLine: item.amountOfProductEachLine || 0,
                    unitPrice: item.unitPrice || 0,
                    totalPrice: item.priceItem || 0,
                }));

                setCartItems(normalizedItems);
                setFilteredCartItems(normalizedItems);
                setTotalPages(response.totalPages || 0);
            } catch (error) {
                setError(error.message || 'Failed to load cart items');
            } finally {
                setLoading(false);
            }
        };
        loadCartItems();
    }, [currentPage]);


    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = cartItems.filter((item) =>
            item.productName.toLowerCase().includes(term)
        );
        setFilteredCartItems(filtered);
    };

    // const handleDelete = async (id) => {
    //     if (window.confirm('Are you sure you want to remove this item from your cart?')) {
    //         try {
    //             await removeCartItem(id);
    //             const updatedItems = cartItems.filter((item) => item.id !== id);
    //             setCartItems(updatedItems);
    //             setFilteredCartItems(updatedItems);

    //             if (updatedItems.length === 0 && currentPage > 0) {
    //                 setCurrentPage(currentPage - 1);
    //             }
    //         } catch (error) {
    //             setError(error.message || 'Failed to remove item');
    //         }
    //     }
    // };


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

    const totalPrice = filteredCartItems.reduce((total, item) => total + (item.totalPrice || 0), 0).toFixed(2);

    return (
        <motion.div
            className="card mb-4 w-100"
            style={{ backgroundColor: '#2A3447' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="card-title h4 mb-0 text-white">Your Shopping Cart</h2>
                    <div className="d-flex align-items-center">
                        <div className="position-relative">
                            <input
                                type="text"
                                placeholder="Search cart..."
                                className="form-control ps-5"
                                onChange={handleSearch}
                                value={searchTerm}
                                style={{ backgroundColor: '#374151', color: '#FFFFFF', border: 'none' }}
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
                        <p>Loading cart items...</p>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {!loading && !error && filteredCartItems.length === 0 && (
                    <div className="text-center text-white">
                        <p>Your cart is empty.</p>
                    </div>
                )}

                {!loading && !error && filteredCartItems.length > 0 && (
                    <>
                        <div className="table-responsive">
                            <table className="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-white">Product Name</th>
                                        <th scope="col" className="text-white">Quantity</th>
                                        <th scope="col" className="text-white">Unit Price</th>
                                        <th scope="col" className="text-white">Total Price</th>
                                        <th scope="col" className="text-white">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCartItems.map((item) => (
                                        <motion.tr
                                            key={item.idLineItem}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <td className="align-middle text-white">{item.productName}</td>
                                            <td className="align-middle text-white">{item.amountOfProductEachLine}</td>
                                            <td className="align-middle text-white">{formatPrice(item.unitPrice)}</td>
                                            <td className="align-middle text-white">{formatPrice(item.totalPrice)}</td>
                                            <td className="align-middle">
                                                <button
                                                    className="btn btn-link text-danger p-0"
                                                //onClick={() => handleDelete(item.id)}
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

                        <div className="card mt-4" style={{ backgroundColor: '#2A3447' }}>
                            <div className="card-body">
                                <h5 className="card-title text-white">Cart Summary</h5>
                                <p className="card-text text-white">
                                    Total Price: <strong> {formatPrice(totalPrice)}</strong>
                                </p>
                                <Button variant="primary" href="/checkout">
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default CartPage;