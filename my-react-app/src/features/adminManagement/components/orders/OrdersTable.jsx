import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";

const orderData = [
  {
    id: "ORD001",
    customer: "John Doe",
    total: 235.4,
    status: "Delivered",
    date: "2023-07-01",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    total: 412.0,
    status: "Processing",
    date: "2023-07-02",
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    total: 162.5,
    status: "Shipped",
    date: "2023-07-03",
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    total: 750.2,
    status: "Pending",
    date: "2023-07-04",
  },
  {
    id: "ORD005",
    customer: "Charlie Wilson",
    total: 95.8,
    status: "Delivered",
    date: "2023-07-05",
  },
  {
    id: "ORD006",
    customer: "Eva Martinez",
    total: 310.75,
    status: "Processing",
    date: "2023-07-06",
  },
  {
    id: "ORD007",
    customer: "David Lee",
    total: 528.9,
    status: "Shipped",
    date: "2023-07-07",
  },
  {
    id: "ORD008",
    customer: "Grace Taylor",
    total: 189.6,
    status: "Delivered",
    date: "2023-07-08",
  },
];

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orderData);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orderData.filter(
      (order) =>
        order.id.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

  return (
    <motion.div
      className="card mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="card-title h4 mb-0">Order List</h2>
          <div className="position-relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="form-control ps-5"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search
              className="position-absolute top-50 translate-middle-y ms-2 text-muted"
              size={18}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="align-middle">{order.id}</td>
                  <td className="align-middle">{order.customer}</td>
                  <td className="align-middle">${order.total.toFixed(2)}</td>
                  <td className="align-middle">
                    <span
                      className={`badge ${
                        order.status === "Delivered"
                          ? "bg-success"
                          : order.status === "Processing"
                          ? "bg-warning"
                          : order.status === "Shipped"
                          ? "bg-primary"
                          : "bg-danger"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="align-middle">{order.date}</td>
                  <td className="align-middle">
                    <button className="btn btn-link text-primary p-0">
                      <Eye size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
export default OrdersTable;
