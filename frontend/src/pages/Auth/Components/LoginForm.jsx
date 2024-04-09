import React, { useState } from "react";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Instagram_logo.png";
import sendRequest from "../../../core/tools/userRequest.js";
import { requestMethods } from "../../../core/requests/requestMethod.js";
const LoginForm = () => {
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    password: "",
    email: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest(requestMethods.POST, "login", loginCredentials).then(
      (response) => {
        console.log(response);
        if (response.data.status === "success") {
          localStorage.setItem("token", response.data.authorization.token);
          navigate("/home");
        }
      }
    );
  };
  return (
    <>
      <div className="main">
        <div className="login-container">
          <img srcSet={logo} alt="" />
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  name="email"
                  type="text"
                  onChange={(e) => {
                    setLoginCredentials({
                      ...loginCredentials,
                      email: e.target.value,
                    });
                  }}
                  placeholder="username, or email"
                />
              </div>
              <div>
                <input
                  type="password"
                  onChange={(e) => {
                    setLoginCredentials({
                      ...loginCredentials,
                      password: e.target.value,
                    });
                  }}
                  placeholder="Passowrd"
                />
              </div>
              <div>
                <button type="submit">Log in</button>
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
      </div>
    </>
  );
};

export default LoginForm;
