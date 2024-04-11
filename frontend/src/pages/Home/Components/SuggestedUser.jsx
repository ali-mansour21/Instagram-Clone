import React from "react";
import defaultProfileImage from "../../../assets/empty_profile.jpeg";

const SuggestedUser = ({
  reccommendedUsers,
  user,
  getUserId,
  followingIds,
}) => {
  console.log(reccommendedUsers[0]);
  return (
    <div className="suggested-users">
      <div className="profile">
        {user?.profile_image ? (
          <img
            src={`http://127.0.0.1:8000/storage/${user?.profile_image}`}
            alt=""
          />
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
        {reccommendedUsers?.map((suggestedUser, i) => (
          <div className="profile" key={i}>
            <div>
              {suggestedUser?.recommended_users?.profile_image ? (
                <img
                  srcSet={suggestedUser?.recommended_users?.profile_image}
                  alt=""
                />
              ) : (
                <img srcSet={defaultProfileImage} alt="Default Profile" />
              )}
              <div>
                <h4>{suggestedUser?.recommended_users?.name}</h4>
                <h5>{suggestedUser?.recommended_users?.user_name}</h5>
              </div>
            </div>
            <div className="follow">
              <button
                onClick={() => getUserId(suggestedUser?.recommended_users?.id)}
              >
                {followingIds?.includes(suggestedUser?.recommended_users?.id)
                  ? "Following"
                  : "Follow"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUser;
