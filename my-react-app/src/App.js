import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/main-layout/MainLayout";
import Home from "./features/home/pages/Home";
import ProductDetail from "./features/Products/pages/ProductDetail";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/product/:productId"
        element={
          <MainLayout>
            <ProductDetail />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
