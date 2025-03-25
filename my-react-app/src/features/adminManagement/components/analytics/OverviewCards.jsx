import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  ShoppingBag,
  Eye,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

const overviewData = [
  { name: "Revenue", value: "$1,234,567", change: 12.5, icon: DollarSign },
  { name: "Users", value: "45,678", change: 8.3, icon: Users },
  { name: "Orders", value: "9,876", change: -3.2, icon: ShoppingBag },
  { name: "Page Views", value: "1,234,567", change: 15.7, icon: Eye },
];

const OverviewCards = () => {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mb-4">
      {overviewData.map((item, index) => (
        <motion.div
          key={item.name}
          className="col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="card-subtitle text-muted mb-2">{item.name}</h3>
                  <p className="card-title h5 mb-0">{item.value}</p>
                </div>
                <div
                  className={`p-3 rounded ${
                    item.change >= 0 ? "bg-success" : "bg-danger"
                  } bg-opacity-25`}
                >
                  <item.icon
                    className={`size-6 ${
                      item.change >= 0 ? "text-success" : "text-danger"
                    }`}
                  />
                </div>
              </div>
              <div
                className={`mt-3 d-flex align-items-center ${
                  item.change >= 0 ? "text-success" : "text-danger"
                }`}
              >
                {item.change >= 0 ? (
                  <ArrowUpRight size="20" />
                ) : (
                  <ArrowDownRight size="20" />
                )}
                <span className="ms-1">{Math.abs(item.change)}%</span>
                <span className="ms-2 text-muted small">vs last period</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
export default OverviewCards;
