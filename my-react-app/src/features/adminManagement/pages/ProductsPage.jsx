import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ProductsTable from "../components/products/ProductsTable";
import { fetchProductMetrics } from "../api/productPageApi";


const ProductsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProductDashboardMetrics = async () => {
      setLoading(true);
      setError(null);
      try {
        const metricsResponse = await fetchProductMetrics();
        console.log("Metrics Response:", metricsResponse);
        setData(metricsResponse);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProductDashboardMetrics();
  }, []);

  if (loading) {
    return (
      <div
        className="flex-1 overflow-auto position-relative z-10 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#1F2A44", minHeight: "100vh" }}
      >
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div
        className="flex-1 overflow-auto position-relative z-10 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#1F2A44", minHeight: "100vh" }}
      >
        <div className="text-danger">Error: {error}</div>
      </div>
    );
  }

  const defaultMetrics = {
    totalProducts: 'error',
    topSelling: 'error',
    lowStock: 'error',
    totalRevenue: 'error',
  };

  const metrics = data || defaultMetrics;

  return (
    <div
      className="flex-1 overflow-auto position-relative z-10"
      style={{ backgroundColor: "#1F2A44" }}
    >
      <Header title="Products" />

      <main
        className="container-fluid py-4 px-3 mx-0"
        style={{ maxWidth: "100%" }}
      >
        <motion.div
          className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="col">
            <StatCard
              name="Total Products"
              icon={Package}
              value={metrics.totalProduct}
              color="#6366F1"
            />
          </div>
          <div className="col">
            <StatCard
              name="Top Selling"
              icon={TrendingUp}
              value={metrics.topSelling}
              color="#10B981"
            />
          </div>
          <div className="col">
            <StatCard
              name="Low Stock"
              icon={AlertTriangle}
              value={metrics.lowStock}
              color="#F59E0B"
            />
          </div>
          <div className="col">
            <StatCard
              name="Total Revenue"
              icon={DollarSign}
              value={metrics.totalRevenue}
              color="#EF4444"
            />
          </div>
        </motion.div>

        <ProductsTable />

        <div className="row row-cols-1 row-cols-lg-2 g-4">
          <div className="col">
            <SalesTrendChart />
          </div>
          <div className="col">
            <CategoryDistributionChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;