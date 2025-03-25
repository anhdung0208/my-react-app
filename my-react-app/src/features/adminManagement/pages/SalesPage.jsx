import { motion } from "framer-motion";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/sales/SalesOverviewChart";
import SalesByCategoryChart from "../components/sales/SalesByCategoryChart";
import DailySalesTrend from "../components/sales/DailySalesTrend";

const salesStats = {
  totalRevenue: "$1,234,567",
  averageOrderValue: "$78.90",
  conversionRate: "3.45%",
  salesGrowth: "12.3%",
};

const SalesPage = () => {
  return (
    <div className="flex-1 overflow-auto position-relative z-10">
      <Header title="Sales Dashboard" />

      <main className="container py-4 px-3 mx-auto">
        <motion.div
          className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="col">
            <StatCard
              name="Total Revenue"
              icon={DollarSign}
              value={salesStats.totalRevenue}
              color="#6366F1"
            />
          </div>
          <div className="col">
            <StatCard
              name="Avg. Order Value"
              icon={ShoppingCart}
              value={salesStats.averageOrderValue}
              color="#10B981"
            />
          </div>
          <div className="col">
            <StatCard
              name="Conversion Rate"
              icon={TrendingUp}
              value={salesStats.conversionRate}
              color="#F59E0B"
            />
          </div>
          <div className="col">
            <StatCard
              name="Sales Growth"
              icon={CreditCard}
              value={salesStats.salesGrowth}
              color="#EF4444"
            />
          </div>
        </motion.div>

        <SalesOverviewChart />

        <div className="row row-cols-1 row-cols-lg-2 g-4 mb-4">
          <div className="col">
            <SalesByCategoryChart />
          </div>
          <div className="col">
            <DailySalesTrend />
          </div>
        </div>
      </main>
    </div>
  );
};
export default SalesPage;
