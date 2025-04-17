import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/main-layout/MainLayout";
import Home from "./features/home/pages/Home";
import ProductDetail from "./features/Products/pages/ProductDetail";
import OverviewPage from "./features/adminManagement/pages/OverviewPage";
import ProductsPage from "./features/adminManagement/pages/ProductsPage";
import UsersPage from "./features/adminManagement/pages/UsersPage";
import SalesPage from "./features/adminManagement/pages/SalesPage";
import OrdersPage from "./features/adminManagement/pages/OrdersPage";
import AnalyticsPage from "./features/adminManagement/pages/AnalyticsPage";
import SettingsPage from "./features/adminManagement/pages/SettingsPage";
import AdminLayout from "./layouts/admin-layout/AdminLayout";
import LoginPage from "./features/auth/componets/LoginForm";
import CartPage from "./features/carts/pages/CartPage";

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


      <Route
        path="/cart"
        element={
          <MainLayout>
            <CartPage />
          </MainLayout>
        }
      />

      <Route
        path="/overview"
        element={
          <AdminLayout>
            <OverviewPage />
          </AdminLayout>
        }
      />
      {/* Route for admin/dashboard pages */}
      <Route
        path="/products"
        element={
          <AdminLayout>
            <ProductsPage />
          </AdminLayout>
        }
      />
      <Route
        path="/users"
        element={
          <AdminLayout>
            <UsersPage />
          </AdminLayout>
        }
      />
      <Route
        path="/sales"
        element={
          <AdminLayout>
            <SalesPage />
          </AdminLayout>
        }
      />
      <Route
        path="/orders"
        element={
          <AdminLayout>
            <OrdersPage />
          </AdminLayout>
        }
      />
      <Route
        path="/analytics"
        element={
          <AdminLayout>
            <AnalyticsPage />
          </AdminLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <AdminLayout>
            <SettingsPage />
          </AdminLayout>
        }
      />
      {/* Route 404 (no sidebar by default, can be adjusted) */}
      <Route
        path="*"
        element={
          <MainLayout>
            <div style={{ padding: "20px", color: "#FFFFFF" }}>
              404 - Page Not Found
            </div>
          </MainLayout>
        }
      />

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
