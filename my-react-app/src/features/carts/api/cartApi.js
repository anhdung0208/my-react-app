
import axios from "axios";



const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";


const nativeApi = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': "application/json"
    },
});



export const fetchCartItems = async (page, pageSize) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("The authentication token is invaild or empty")
        }
        const response = await nativeApi.get(`api/v1/shopping-cart/get-all-items?page=${page}&size=${pageSize}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error("Failed to fetch cart items")
        }

    } catch (error) {
        if (error.response) {
            const { status, data, statusText } = error.response;
            if (status === 403) {
                throw new Error("You do not have permission to access products list");
            } else if (status === 404) {
                throw new Error("Cart endpoint not found");
            }
            throw new Error(
                `Failed to fetch cart product list : ${status} - ${data?.message || statusText}`
            );
        }
        throw new Error(
            "An unexpected error occurred while fetching product dashboard metrics. Please check your network connection."
        );
    }
}