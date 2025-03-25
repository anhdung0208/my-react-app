const ToggleSwitch = ({ label, isOn, onToggle }) => {
  return (
    <div className="d-flex align-items-center justify-content-between py-2">
      <span className="text-secondary">{label}</span>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isOn}
          onChange={onToggle}
        />
      </div>
    </div>
  );
};
export default ToggleSwitch;
