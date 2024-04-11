import React, { useEffect, useState } from "react";
import SideBar from "../Home/Components/SideBar";
import "./styles/index.css";
import Post from "../Home/Components/Post";
import sendAuthRequest from "../../core/tools/authRequest";
import { requestMethods } from "../../core/requests/requestMethod";
import Profile from "./components/Profile";

const Main = () => {
  const [profileData, setProfileData] = useState();
  const [nbOffollower, setNbOffollower] = useState();
  const [nbOffollowing, setNbOffollowing] = useState();
  const [postsData, setPostsData] = useState([]);
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
  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div className="page">
      <SideBar />
      <div className="profile-content">
        <Profile
          user={profileData}
          posts={postsData}
          follower={nbOffollower}
          following={nbOffollowing}
        />
      </div>
    </div>
  );
};

export default Main;
