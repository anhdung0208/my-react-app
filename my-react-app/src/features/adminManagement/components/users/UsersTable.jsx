import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const userData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Customer",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Moderator",
    status: "Active",
  },
];

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(userData);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = userData.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <motion.div
      className="card bg-dark bg-opacity-50 shadow border border-secondary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="card-title text-light fs-4">Users</h2>
          <div className="position-relative">
            <input
              type="text"
              placeholder="Search users..."
              className="form-control bg-secondary text-white ps-5"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              size={18}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col" className="text-muted text-uppercase small">
                  Name
                </th>
                <th scope="col" className="text-muted text-uppercase small">
                  Email
                </th>
                <th scope="col" className="text-muted text-uppercase small">
                  Role
                </th>
                <th scope="col" className="text-muted text-uppercase small">
                  Status
                </th>
                <th scope="col" className="text-muted text-uppercase small">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div
                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                          style={{ width: "40px", height: "40px" }}
                        >
                          {user.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ms-3">
                        <div className="text-light">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-muted">{user.email}</td>
                  <td>
                    <span className="badge bg-primary">{user.role}</span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "Active" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-link text-primary p-0 me-2">
                      Edit
                    </button>
                    <button className="btn btn-link text-danger p-0">
                      Delete
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
export default UsersTable;
