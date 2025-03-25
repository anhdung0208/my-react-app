import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = () => {
  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="row align-items-center mb-4">
        <div className="col-auto">
          <img
            src="https://randomuser.me/api/portraits/men/3.jpg"
            alt="Profile"
            className="rounded-circle"
            style={{ width: "80px", height: "80px" }}
          />
        </div>
        <div className="col">
          <h3 className="h5 mb-0">John Doe</h3>
          <p className="text-muted mb-0">john.doe@example.com</p>
        </div>
      </div>
      <button className="btn btn-primary">Edit Profile</button>
    </SettingSection>
  );
};
export default Profile;
