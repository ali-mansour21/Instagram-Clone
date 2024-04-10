import React from "react";
import logo from "../../../assets/donut.jpeg";
import defaultProfileImage from "../../../assets/empty_profile.jpeg";

const SuggestedUser = ({ reccommendedUsers, user }) => {
  return (
    <div className="suggested-users">
      <div className="profile">
        {user?.profile_image ? (
          <img srcSet={user.profile_image} alt="" />
        ) : (
          <img srcSet={defaultProfileImage} alt="Default Profile" />
        )}
        <div>
          <h4>{user?.name}</h4>
          <h5>{user?.user_name}</h5>
        </div>
      </div>
      <div className="suggested">
        <h5>Suggested For you</h5>
        {reccommendedUsers?.map((user) => (
          <div className="profile">
            <div>
              {user.profile_image ? (
                <img srcSet={user.profile_image} alt="" />
              ) : (
                <img srcSet={defaultProfileImage} alt="Default Profile" />
              )}
              <div>
                <h4>{user.name}</h4>
                <h5>{user.user_name}</h5>
              </div>
            </div>
            <div className="follow">
              <button>Follow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUser;
