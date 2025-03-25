import Header from "../components/common/Header";
import OverviewCards from "../components/analytics/OverviewCards";
import RevenueChart from "../components/analytics/RevenueChart";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import ProductPerformance from "../components/analytics/ProductPerformance";
import UserRetention from "../components/analytics/UserRetention";
import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";

const AnalyticsPage = () => {
  return (
    <div className="flex-1 overflow-auto position-relative z-10 bg-dark">
      <Header title={"Analytics Dashboard"} />

      <main className="container py-4 px-3 mx-auto">
        <OverviewCards />
        <RevenueChart />

        <div className="row row-cols-1 row-cols-lg-2 g-4 mb-4">
          <div className="col">
            <ChannelPerformance />
          </div>
          <div className="col">
            <ProductPerformance />
          </div>
          <div className="col">
            <UserRetention />
          </div>
          <div className="col">
            <CustomerSegmentation />
          </div>
        </div>

        <AIPoweredInsights />
      </main>
    </div>
  );
};
export default AnalyticsPage;
