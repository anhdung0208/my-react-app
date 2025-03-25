const Header = ({ title }) => {
  return (
    <header className="bg-dark border-bottom">
      <div className="container-fluid py-4 px-4">
        <h1 className="h4 text-white mb-0">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
