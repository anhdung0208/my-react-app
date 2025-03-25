import Header from "../components/common/Header";
import ConnectedAccounts from "../components/settings/ConnectedAccounts";
import DangerZone from "../components/settings/DangerZone";
import Notifications from "../components/settings/Notifications";
import Profile from "../components/settings/Profile";
import Security from "../components/settings/Security";

const SettingsPage = () => {
  return (
    <div className="flex-1 overflow-auto position-relative z-10 bg-dark">
      <Header title="Settings" />
      <main
        className="container py-4 px-3 mx-auto"
        style={{ maxWidth: "960px" }}
      >
        <Profile />
        <Notifications />
        <Security />
        <ConnectedAccounts />
        <DangerZone />
      </main>
    </div>
  );
};
export default SettingsPage;
