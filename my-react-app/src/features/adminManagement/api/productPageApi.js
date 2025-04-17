import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const apiGetProductsList = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiDeleteProduct = axios.create({
  baseURL: API_BASE_URL,
  timeout : 10000,
  headers:{
    "Conttent-Type": "application/json",
  },
});

const apiAddProduct = axios.create({
  baseURL :API_BASE_URL,
  timeout : 10000,
  headers:{
    "Content-Type": "application/json",
  }
});

const nativeApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers:{
    "Content-Type": "application/json",
  }
});

export const fetchProductsList = async (page = 0, size = 10) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    const response = await apiGetProductsList.get(
      `/api/v1/product/get-all-product?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    if (!data || (Array.isArray(data.content) && data.content.length === 0)) {
      throw new Error("The product list is empty or invalid");
    }

    console.log("Successfully fetched products list:", data);
    return data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      console.error("Request timed out:", error.message);
      throw new Error("Request timed out after 10 seconds");
    }

    if (error.response) {
      console.error("Error fetching products list:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      });

      if (error.response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Session expired. Please log in again.");
      }

      if (error.response.status === 403) {
        throw new Error(
          "Access denied. You do not have permission to view this data."
        );
      }

      if (error.response.status === 500) {
        throw new Error("Server error. Please try again later.");
      }

      throw new Error(
        `Error fetching products list: ${error.response.status} - ${error.response.statusText}`
      );
    }

    console.error("Unexpected error fetching products list:", {
      message: error.message,
      stack: error.stack,
    });
    throw new Error(
      "An unexpected error occurred while fetching the products list"
    );
  }
};

export const deleteProductById = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please log in");
    }

    const response = await apiDeleteProduct.delete(`/api/v1/product/delete-product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (response.status === 204 || response.status === 200) {
      return response; 
    } else {
      throw new Error("Failed to delete product: Unexpected response from server");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Failed to delete product: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`
      );
    }
    throw new Error("An unexpected error occurred while deleting the product");
  }
};

export const addProduct = async (request) =>
{
  try{
    const token = localStorage.getItem("token");
    if(!token)
    {
      throw new Error("The authentication token is invaild or empty")
    }

    const response = await apiAddProduct.post(`/api/v1/product/add-single-product`,request,{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.status === 200 || response.status === 201)
    {
      return response;
    }
    else
    {
      throw new Error("Failed to add product: Unexpected response from server");
    }
 
    } catch (error) {
        if (error.response) {
          throw new Error(`Failed to add product: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
        }
        throw new Error("An unexpected error occurred while adding the product");
    }
  };

export const fetchCategoryList = async () => {
    
      try {
         const token = localStorage.getItem("token");
         if (!token) {
           throw new Error("No authentication token found. Please log in.");
         }
         const response = await nativeApi.get(`/api/v1/category/get-all-category`, {
          headers:{
            Authorization: `Bearer ${token}`,
          }});
          
          if(response.status === 200 || response.status === 201)
          {
            return response.data;
          }
          else
          {
            throw new Error("Failed to fetch category list: Unexpected response from server");
          }
      } catch (error) {
        if (error.response) {
          throw new Error(`Failed to add product: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
        }
        throw new Error("An unexpected error occurred while adding the product");
      }
  
  
  }

export const editProduct = async (productId,request) =>{
  const token = localStorage.getItem("token");
  if(!token)
  {
    throw new Error("The authentication token is invalid or empty");
  }

  try {
    const response = await nativeApi.put(`/api/v1/product/update-product/${productId}`,request,{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from server:", response.data); // Log the response data
  
    if(response.status === 200 || response.status === 201)
    {
      return response;
    }
    else
    {
      throw new Error("Failed to edit product: Unexpected response from server");
    } 
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to edit product: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
    }
    throw new Error("An unexpected error occurred while editing the product");
  }
 
}  

export const fetchProductMetrics = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    const response = await nativeApi.get("/api/v1/admin/product-dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response from server:", response.data); // Log the response data

    if (response.status === 200) {

      if (!response.data) {
        throw new Error("No data returned from the server for product dashboard metrics");
      }
      return JSON.parse(JSON.stringify(response.data));
    } else {
      throw new Error(
        `Failed to fetch product dashboard metrics: Unexpected status code ${response.status}`
      );
    }
  } catch (error) {
    if (error.response) {
      const { status, data, statusText } = error.response;
      if (status === 403) {
        throw new Error("You do not have permission to access product dashboard metrics");
      } else if (status === 404) {
        throw new Error("Product dashboard metrics endpoint not found");
      }
      throw new Error(
        `Failed to fetch product dashboard metrics: ${status} - ${data?.message || statusText}`
      );
    }
    throw new Error(
      "An unexpected error occurred while fetching product dashboard metrics. Please check your network connection."
    );
  }
};