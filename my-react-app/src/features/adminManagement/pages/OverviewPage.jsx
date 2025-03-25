import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";
import fetchStartCardOverview from "../api/overviewPageApi/adminOverviewApi";

const OverviewPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStartCardMetrics = async () => {
      setLoading(true);
      setError(null);
      try {
        const metrics = await fetchStartCardOverview();
        if (!metrics) {
          throw new Error("Invalid or empty data received from API");
        }
        setData(metrics);
      } catch (error) {
        console.error("Error fetching overview data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadStartCardMetrics();
  }, []);

  if (loading) {
    return (
      <div
        className="flex-1 overflow-auto relative z-10"
        style={{ backgroundColor: "#1F2A44" }}
      >
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex-1 overflow-auto relative z-10"
        style={{ backgroundColor: "#1F2A44" }}
      >
        <div className="flex justify-center items-center h-screen text-red-500">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 overflow-auto relative z-10"
      style={{ backgroundColor: "#1F2A44" }}
    >
      <Header title="Overview" />
      <main className="container py-4 px-3 mx-auto">
        <motion.div
          className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="col">
            <StatCard
              name="Total Sales"
              icon={Zap}
              value={
                data?.totalSales
                  ? `$${data.totalSales.toLocaleString()}`
                  : "N/A"
              }
              color="#6366F1"
            />
          </div>
          <div className="col">
            <StatCard
              name="Total Order"
              icon={Users}
              value={
                data?.totalOrders ? data.totalOrders.toLocaleString() : "N/A"
              }
              color="#8B5CF6"
            />
          </div>
          <div className="col">
            <StatCard
              name="Total Products"
              icon={ShoppingBag}
              value={
                data?.totalProducts
                  ? data.totalProducts.toLocaleString()
                  : "N/A"
              }
              color="#EC4899"
            />
          </div>
          <div className="col">
            <StatCard
              name="Conversion Rate"
              icon={BarChart2}
              value={data?.conversionRate ? `${1}%` : "N/A"}
              color="#10B981"
            />
          </div>
        </motion.div>

        <div className="row row-cols-1 row-cols-lg-2 g-4">
          <div className="col">
            <SalesOverviewChart data={data} />
          </div>
          <div className="col">
            <CategoryDistributionChart data={data} />
          </div>
          <div className="col">
            <SalesChannelChart data={data} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
