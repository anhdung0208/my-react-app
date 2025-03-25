import { motion } from "framer-motion";

const SettingSection = ({ icon: Icon, title, children }) => {
  return (
    <motion.div
      className="card mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <Icon className="text-primary me-3" size="24" />
          <h2 className="h4 mb-0">{title}</h2>
        </div>
        {children}
      </div>
    </motion.div>
  );
};
export default SettingSection;
