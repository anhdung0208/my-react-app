import { useState } from "react";
import SettingSection from "./SettingSection";
import { HelpCircle, Plus } from "lucide-react";

const ConnectedAccounts = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([
    { id: 1, name: "Google", connected: true, icon: "/google.png" },
    { id: 2, name: "Facebook", connected: false, icon: "/facebook.svg" },
    { id: 3, name: "Twitter", connected: true, icon: "/x.png" },
  ]);

  return (
    <SettingSection icon={HelpCircle} title={"Connected Accounts"}>
      {connectedAccounts.map((account) => (
        <div
          key={account.id}
          className="d-flex align-items-center justify-content-between py-2"
        >
          <div className="d-flex align-items-center">
            <img
              src={account.icon}
              alt="Social img"
              className="rounded-circle me-2"
              style={{ width: "24px", height: "24px" }}
            />
            <span className="text-secondary">{account.name}</span>
          </div>
          <button
            className={`btn btn-sm ${
              account.connected ? "btn-success" : "btn-secondary"
            }`}
            onClick={() => {
              setConnectedAccounts(
                connectedAccounts.map((acc) =>
                  acc.id === account.id
                    ? { ...acc, connected: !acc.connected }
                    : acc
                )
              );
            }}
          >
            {account.connected ? "Connected" : "Connect"}
          </button>
        </div>
      ))}
      <button className="btn btn-link mt-3 p-0">
        <Plus size={18} className="me-1" /> Add Account
      </button>
    </SettingSection>
  );
};
export default ConnectedAccounts;
