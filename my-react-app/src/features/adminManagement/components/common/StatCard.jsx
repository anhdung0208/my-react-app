import { motion } from "framer-motion";

const StatCard = ({ name, icon: Icon, value, color }) => {
  return (
    <motion.div
      className="card bg-dark text-white border"
      whileHover={{ y: -5 }}
    >
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-2">
          <Icon size={20} className="me-2" style={{ color }} />
          <span style={{ color }}>{name}</span>
        </div>
        <p className="h2 mb-0" style={{ color }}>
          {value}
        </p>
      </div>
    </motion.div>
  );
};
export default StatCard;
