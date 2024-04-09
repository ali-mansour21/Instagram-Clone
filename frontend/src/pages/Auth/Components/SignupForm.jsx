import React from "react";
import "../Styles/signup.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Instagram_logo.png";
const SignupForm = () => {
  const navigate = useNavigate();
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
              <form>
                <div>
                  <input type="text" placeholder=" Email" />
                </div>
                <div>
                  <input type="text" placeholder="Full name" />
                </div>
                <div>
                  <input type="text" placeholder="Username" />
                </div>
                <div>
                  <input type="password" placeholder="Passowrd" />
                </div>
                <div>
                  <button>Sign up</button>
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
              Have an account?{" "}
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
