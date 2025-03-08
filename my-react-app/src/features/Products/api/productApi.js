const fetchProducts = async (page, size) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/product/get-all-product?page=${page}&size=${size}`
    );
    if (!response.ok) throw new Error("Error when fetching data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};
export default fetchProducts;
