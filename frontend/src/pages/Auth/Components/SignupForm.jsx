import React, { useState } from "react";
import "../Styles/signup.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Instagram_logo.png";
import sendRequest from "../../../core/tools/userRequest.js";
import { requestMethods } from "../../../core/requests/requestMethod.js";
const SignupForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    user_name: "",
  });
  const handleAddUser = (e) => {
    e.preventDefault();
    sendRequest(requestMethods.POST, "register", userData).then((response) => {
      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.authorization.token);
        navigate("/home");
      }
    });
  };
  return (
    <>
      <>
        <div className="main-section">
          <div className="container">
            <img srcSet={logo} alt="" />
            <h3>Sign up to see photos and videos from your friends.</h3>
            <button>Log in with Facebook</button>
            <div className="line-2"></div>
            <div className="form-container">
              <form onSubmit={handleAddUser}>
                <div>
                  <input
                    type="text"
                    onChange={(e) => {
                      setUserData({ ...userData, email: e.target.value });
                    }}
                    placeholder=" Email"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    onChange={(e) => {
                      setUserData({ ...userData, name: e.target.value });
                    }}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => {
                      setUserData({ ...userData, user_name: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Passowrd"
                    onChange={(e) => {
                      setUserData({ ...userData, password: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <button type="submit">Sign up</button>
                </div>
              </form>
              <div className="info">
                <p>
                  People who use our service may have uploaded your contact
                  information to Instagram. Learn More
                </p>
                <p>
                  By signing up, you agree to our Terms , Privacy Policy and
                  Cookies Policy .
                </p>
              </div>
            </div>
          </div>
          <div className="signup">
            <p>
              Have an account?
              <span
                onClick={() => {
                  navigate("/");
                }}
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      </>
    </>
  );
};

export default SignupForm;
