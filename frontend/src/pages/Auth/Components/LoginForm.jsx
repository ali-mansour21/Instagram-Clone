import React from "react";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Instagram_logo.png";
const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="login-container">
        <img srcSet={logo} alt="" />
        <div className="form-container">
          <form>
            <div>
              <input
                type="text"
                placeholder="Phone number, username, or email"
              />
            </div>
            <div>
              <input type="password" placeholder="Passowrd" />
            </div>
            <div>
              <button>Log in</button>
            </div>
          </form>
          <div className="line"></div>
          <div className="info">
            <p>Log in with Facebook</p>
            <p className="reset">Forgot password?</p>
          </div>
        </div>
      </div>
      <div className="signup">
        <p>
          Don't have an account?{" "}
          <span
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            Sign up
          </span>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
