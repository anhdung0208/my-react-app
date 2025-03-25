import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ProductsTable from "../components/products/ProductsTable";

const ProductsPage = () => {
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
              value={1234}
              color="#6366F1"
            />
          </div>
          <div className="col">
            <StatCard
              name="Top Selling"
              icon={TrendingUp}
              value={89}
              color="#10B981"
            />
          </div>
          <div className="col">
            <StatCard
              name="Low Stock"
              icon={AlertTriangle}
              value={23}
              color="#F59E0B"
            />
          </div>
          <div className="col">
            <StatCard
              name="Total Revenue"
              icon={DollarSign}
              value="$543,210"
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
