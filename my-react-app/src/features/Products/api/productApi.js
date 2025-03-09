const fetchProducts = async (page, size) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/product/get-all-product?page=${page}&size=${size}`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching products: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();

    if (!data || (!data.content && !Array.isArray(data))) {
      throw new Error("Invalid product data format");
    }
    return data.content || data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};

const fetchOneProduct = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/product/get-single-product/${id}`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching product: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    if (!data) {
      throw new Error("Product not found");
    }
    return data;
  } catch (error) {
    console.error("Error fetching product:", error.message);
    throw error;
  }
};

export { fetchProducts, fetchOneProduct };
