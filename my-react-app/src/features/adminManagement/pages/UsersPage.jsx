import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";

const userStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
  churnRate: "2.4%",
};

const UsersPage = () => {
  return (
    <div className="flex-1 overflow-auto position-relative z-10">
      <Header title="Users" />

      <main className="container py-4 px-3 mx-auto">
        <motion.div
          className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="col">
            <StatCard
              name="Total Users"
              icon={UsersIcon}
              value={userStats.totalUsers.toLocaleString()}
              color="#6366F1"
            />
          </div>
          <div className="col">
            <StatCard
              name="New Users Today"
              icon={UserPlus}
              value={userStats.newUsersToday}
              color="#10B981"
            />
          </div>
          <div className="col">
            <StatCard
              name="Active Users"
              icon={UserCheck}
              value={userStats.activeUsers.toLocaleString()}
              color="#F59E0B"
            />
          </div>
          <div className="col">
            <StatCard
              name="Churn Rate"
              icon={UserX}
              value={userStats.churnRate}
              color="#EF4444"
            />
          </div>
        </motion.div>

        <UsersTable />

        <div className="row row-cols-1 row-cols-lg-2 g-4 mt-4">
          <div className="col">
            <UserGrowthChart />
          </div>
          <div className="col">
            <UserActivityHeatmap />
          </div>
          <div className="col">
            <UserDemographicsChart />
          </div>
        </div>
      </main>
    </div>
  );
};
export default UsersPage;
