import React from "react";

import defaultProfileImage from "../../../assets/empty_profile.jpeg";

const Slider = ({ users }) => {
  return (
    <div className="story-slider">
      {users?.map((user, index) => {
        return (
          <div className="box" key={index}>
            {user?.profile_image ? (
              <img srcSet={user?.profile_image} alt="" />
            ) : (
              <img srcSet={defaultProfileImage} alt="Default Profile" />
            )}
            <h4>{user?.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
