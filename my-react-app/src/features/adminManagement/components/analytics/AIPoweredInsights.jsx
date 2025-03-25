import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";

const INSIGHTS = [
  {
    icon: TrendingUp,
    color: "text-success",
    insight:
      "Revenue is up 15% compared to last month, driven primarily by a successful email campaign.",
  },
  {
    icon: Users,
    color: "text-primary",
    insight:
      "Customer retention has improved by 8% following the launch of the new loyalty program.",
  },
  {
    icon: ShoppingBag,
    color: "text-purple",
    insight:
      'Product category "Electronics" shows the highest growth potential based on recent market trends.',
  },
  {
    icon: DollarSign,
    color: "text-warning",
    insight:
      "Optimizing pricing strategy could potentially increase overall profit margins by 5-7%.",
  },
];

const AIPoweredInsights = () => {
  return (
    <motion.div
      className="card mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
    >
      <div className="card-body">
        <h2 className="card-title h4 mb-4">AI-Powered Insights</h2>
        <div className="d-flex flex-column gap-3">
          {INSIGHTS.map((item, index) => (
            <div key={index} className="d-flex align-items-center">
              <div className={`p-2 rounded ${item.color}`}>
                <item.icon className={`size-6 ${item.color}`} />
              </div>
              <p className="ms-3 mb-0 text-muted">{item.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
export default AIPoweredInsights;
