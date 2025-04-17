import axios from "axios";


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const nativeApi = axios.create(
    {
        baseURL: API_BASE_URL,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    });

export const addToProductToCart = async (productId, quantity) => {
    if (productId == null || isNaN(productId) || quantity == null || isNaN(quantity)) {

        throw new Error("Invalid product ID or quantity")
    }
    const request = { productQuantity: quantity, productId: productId };
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No authentication token found. Please log in.");
        }
        const addToProduct = await nativeApi.post(`/api/v1/shopping-cart/add-line-item-to-cart`, request, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Successfully added product to cart:", addToProduct);
        return addToProduct.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message || `${error.response.status} - ${error.response.statusText}`;
            throw new Error(`Failed to add product to cart: ${message}`);
        }
        throw new Error(`Failed to add product to cart: ${error.message}`);
    }
};
