import React from "react";
import logo from "../../../assets/donut.jpeg";

const SuggestedUser = () => {
  return (
    <div className="suggested-users">
      <div className="profile">
        <img srcSet={logo} alt="profile_image" />
        <div>
          <h4>name</h4>
          <h5>user_nmae</h5>
        </div>
      </div>
      <div className="suggested">
        <h5>Suggested For you</h5>
        <div className="profile">
          <div>
            <img srcSet={logo} alt="profile_image" />
            <div>
              <h4>name</h4>
              <h5>user_nmae</h5>
            </div>
          </div>
          <div className="follow">
            <button>Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedUser;
