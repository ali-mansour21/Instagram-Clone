import React from "react";
import defaultProfileImage from "../../../assets/empty_profile.jpeg";

const Profile = ({ user, following, follower, posts, openPopup }) => {
  return (
    <div className="profile-container">
      {user?.profile_image ? (
        <img
          srcSet={`http://127.0.0.1:8000/storage/${user?.profile_image}`}
          alt=""
        />
      ) : (
        <img srcSet={defaultProfileImage} alt="Default Profile" />
      )}
      <div className="info">
        <div className="actions">
          <h2>{user?.name}</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              openPopup(user?.id);
            }}
          >
            Edit profile
          </button>
          <button>View Archive</button>
          <button>Ad tools</button>
        </div>
        <div className="stats">
          <p>{posts?.length} posts</p>
          <p>{follower} followers</p>
          <p>{following} following</p>
        </div>
        <div className="user-info">
          <p>{user?.user_name}</p>
          {user?.bio && <p>{user?.bio}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
