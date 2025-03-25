import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const DangerZone = () => {
  return (
    <motion.div
      className="card border-danger mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <Trash2 className="text-danger me-2" size={24} />
          <h2 className="h4 mb-0">Danger Zone</h2>
        </div>
        <p className="text-muted mb-3">
          Permanently delete your account and all of your content.
        </p>
        <button className="btn btn-danger">Delete Account</button>
      </div>
    </motion.div>
  );
};
export default DangerZone;
