import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import DailyOrders from "../components/orders/DailyOrders";
import OrderDistribution from "../components/orders/OrderDistribution";
import OrdersTable from "../components/orders/OrdersTable";

const orderStats = {
  totalOrders: "1,234",
  pendingOrders: "56",
  completedOrders: "1,178",
  totalRevenue: "$98,765",
};

const OrdersPage = () => {
  return (
    <div className="flex-1 position-relative z-10 overflow-auto">
      <Header title={"Orders"} />

      <main className="container py-4 px-3 mx-auto">
        <motion.div
          className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="col">
            <StatCard 
              name='Total Orders' 
              icon={ShoppingBag} 
              value={orderStats.totalOrders} 
              color='#6366F1' 
            />
          </div>
          <div className="col">
            <StatCard 
              name='Pending Orders' 
              icon={Clock} 
              value={orderStats.pendingOrders} 
              color='#F59E0B' 
            />
          </div>
          <div className="col">
            <StatCard
              name='Completed Orders'
              icon={CheckCircle}
              value={orderStats.completedOrders}
              color='#10B981'
            />
          </div>
          <div className="col">
            <StatCard 
              name='Total Revenue' 
              icon={DollarSign} 
              value={orderStats.totalRevenue} 
              color='#EF4444' 
            />
          </div>
        </motion.div>

        <div className="row row-cols-1 row-cols-lg-2 g-4 mb-4">
          <div className="col">
            <DailyOrders />
          </div>
          <div className="col">
            <OrderDistribution />
          </div>
        </div>

        <OrdersTable />
      </main>
    </div>
  );
};

export default OrdersPage;