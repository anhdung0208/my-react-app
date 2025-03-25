import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { useState } from "react";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const SALES_CHANNEL_DATA = [
  { name: "Website", value: 45600 },
  { name: "Mobile App", value: 38200 },
  { name: "Marketplace", value: 29800 },
  { name: "Social Media", value: 18700 },
];

const SalesChannelChart = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("This Month");

  return (
    <motion.div
      className="card mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="card-title h5 mb-0">Sales by Channel</h2>
          <select
            className="form-select w-auto bg-dark text-white border-secondary"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            style={{
              fontSize: "0.875rem",
              padding: "0.25rem 2rem 0.25rem 0.5rem",
            }}
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
        </div>

        <div style={{ height: "320px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SALES_CHANNEL_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="name" stroke="#6c757d" />
              <YAxis stroke="#6c757d" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Legend />
              <Bar dataKey="value">
                {SALES_CHANNEL_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default SalesChannelChart;
