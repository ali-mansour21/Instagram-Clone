import React from "react";
import SideBar from "./Components/SideBar";
import "./Styles/index.css";
import Slider from "./Components/Slider";
import Post from "./Components/Post";
import SuggestedUser from "./Components/SuggestedUser";

const Home = () => {
  return (
    <div className="page">
      <SideBar />
      <div className="main-page">
        <div className="content">
          <Slider />
          <div className="posts">
            <Post />
          </div>
        </div>
        <SuggestedUser />
      </div>
    </div>
  );
};

export default Home;
