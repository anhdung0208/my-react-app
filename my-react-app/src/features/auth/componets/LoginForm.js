import React, { useState } from "react";
import loginRequest from "../api/authApi";
import registerRequest from "../api/authApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await loginRequest(accountName, password);
        navigation("/");
        console.log("Login successful");
      } else {
        await registerRequest(name, accountName, password);
        console.log("Registration successful");
        setIsLogin(true);
      }
    } catch (err) {
      setError(
        err.message ||
          (isLogin ? "Login failed" : "Registration failed") +
            ". Please try again."
      );
    }
  };

  return (
    <div
      className="wrapper d-flex justify-content-center align-items-center vh-100 highlight-orange-theme"
      style={{
        background: "linear-gradient(135deg, #FF8F00, #FF5722)",
      }}
    >
      <div className="card-switch">
        <label className="switch">
          <input
            type="checkbox"
            className="toggle"
            checked={!isLogin}
            onChange={() => setIsLogin(!isLogin)}
          />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form className="flip-card__form" onSubmit={handleSubmit}>
                <input
                  className="flip-card__input"
                  name="Account Name"
                  placeholder="Account Name "
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="flip-card__btn">
                  Let`s go!
                </button>
              </form>
            </div>

            <div className="flip-card__back">
              <div className="title">Sign up</div>
              <form className="flip-card__form" onSubmit={handleSubmit}>
                <input
                  className="flip-card__input"
                  placeholder="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  className="flip-card__input"
                  name="email"
                  placeholder="Account Name"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="flip-card__btn">
                  Confirm!
                </button>
              </form>
            </div>
          </div>
        </label>
      </div>
      {error && <p className="text-danger text-center mt-3">{error}</p>}
    </div>
  );
};

export default LoginPage;
