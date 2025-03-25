import {
  BarChart2,
  DollarSign,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/overview" },
  { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
  { name: "Users", icon: Users, color: "#EC4899", href: "/users" },
  { name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales" },
  { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
  { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-16"}`}
      animate={{ width: isSidebarOpen ? 256 : 64 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="h-100"
        style={{ backgroundColor: "#1F2A44", borderRight: "1px solid #374151" }}
      >
        <div className="p-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="btn p-2"
            style={{ backgroundColor: "#374151" }}
          >
            <Menu size={24} className="text-white" />
          </motion.button>
        </div>

        <nav className="mt-4">
          {SIDEBAR_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `d-flex align-items-center p-3 text-white mb-1 ${
                  isActive ? "bg-secondary bg-opacity-25" : ""
                }`
              }
              style={{ textDecoration: "none" }}
            >
              <item.icon
                size={20}
                style={{ color: item.color, minWidth: "20px" }}
              />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    className="ms-3"
                    style={{ color: "#FFFFFF" }}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
