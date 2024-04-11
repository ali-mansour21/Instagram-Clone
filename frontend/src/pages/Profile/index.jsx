import React, { useEffect, useState } from "react";
import SideBar from "../Home/Components/SideBar";
import "./styles/index.css";
import Post from "../Home/Components/Post";
import sendAuthRequest from "../../core/tools/authRequest";
import { requestMethods } from "../../core/requests/requestMethod";
import Profile from "./components/Profile";
import PopUp from "../Home/Components/PopUp";

const Main = () => {
  const [profileData, setProfileData] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [nbOffollower, setNbOffollower] = useState();
  const [nbOffollowing, setNbOffollowing] = useState();
  const [postsData, setPostsData] = useState([]);
  const [editProfile, setEditProfile] = useState({
    id: 0,
    bio: "",
    profile_image: "",
  });
  const openPopup = (id) => {
    setShowPopup(true);
    setEditProfile({
      id: id,
      bio: "",
      profile_image: "",
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setEditProfile({
      ...editProfile,
      profile_image: base64,
    });
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const getProfileData = () => {
    sendAuthRequest(requestMethods.GET, "profile").then((response) => {
      if (response.data.status === "success") {
        setProfileData(response.data.data.user);
        setNbOffollower(response.data.data.nbOfFollower);
        setNbOffollowing(response.data.data.nbOfFollowing);
        setPostsData(response.data.data.posts);
        console.log(response.data.data.user);
      }
    });
  };
  const EditUserProfile = () => {
    sendAuthRequest(
      requestMethods.PUT,
      `profile/${editProfile.id}`,
      editProfile
    ).then((response) => {
      if (response.data.status === "success") {
        setEditProfile({
          id: 0,
          bio: "",
          profile_image: "",
        });
        getProfileData();
        closePopup();
      }
    });
  };
  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div className="page">
      <SideBar user={profileData} />
      <div className="profile-content">
        <Profile
          openPopup={openPopup}
          user={profileData}
          posts={postsData}
          follower={nbOffollower}
          following={nbOffollowing}
        />
      </div>
      {showPopup && (
        <PopUp
          formTitle={"Edit Profile"}
          buttonText={"Edit"}
          isOpen={showPopup}
          closePopUp={closePopup}
          handleSubmit={(e) => {
            e.preventDefault();
            EditUserProfile();
          }}
        >
          <div>
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              onChange={(e) => {
                setEditProfile({ ...editProfile, bio: e.target.value });
              }}
              id="bio"
              name="bio"
            />
          </div>
          <div>
            <label htmlFor="post_image">Image</label>
            <input
              type="file"
              onChange={(e) => uploadImage(e)}
              name="post_image"
              id="post_image"
              multiple
            />
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default Main;
