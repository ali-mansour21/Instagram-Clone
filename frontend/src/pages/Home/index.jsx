import React, { useEffect, useState } from "react";
import SideBar from "./Components/SideBar";
import "./Styles/index.css";
import Slider from "./Components/Slider";
import Post from "./Components/Post";
import SuggestedUser from "./Components/SuggestedUser";
import PopUp from "./Components/PopUp";

import sendAuthRequest from "../../core/tools/authRequest";
import { requestMethods } from "../../core/requests/requestMethod";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [reccommendedUsers, setReccommendedUsers] = useState([]);
  const [activeUser, setActiveUser] = useState();
  const [followingIds, setFollowingIds] = useState([]);
  const [postCredentials, setPostCredentials] = useState({
    caption: "",
    post_image: null,
  });

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setPostCredentials({
      ...postCredentials,
      post_image: base64,
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
  const createPostAction = async () => {
    try {
      const response = await sendAuthRequest(
        requestMethods.POST,
        "posts",
        postCredentials
      );
      console.log(response);
      setPostCredentials({
        caption: "",
        post_image: null,
      });
      closePopup();
    } catch (error) {
      console.error("Error occurred while uploading image:", error);
    }
  };

  const getFeedPost = () => {
    sendAuthRequest(requestMethods.GET, "feed").then((response) => {
      setPostsData(response.data.data.posts);
      setFollowingUsers(response.data.data.followingUsers);
    });
  };
  const getRecommendedUsers = () => {
    sendAuthRequest(requestMethods.GET, "recommendations").then((response) => {
      console.log(response.data.data.recommendations);
      setReccommendedUsers(response.data.data.recommendations);
      setActiveUser(response.data.data.user);
    });
  };
  const handleFollowUser = (id) => {
    console.log(id);
    sendAuthRequest(requestMethods.POST, `follow/${id}`)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response);
          setFollowingIds((prevId) => [...prevId, id]);
          console.log(followingIds);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getFeedPost();
    getRecommendedUsers();
  }, []);

  return (
    <div className="page">
      <SideBar openPopUp={openPopup} user={activeUser} />
      <div className="main-page">
        <div className="content">
          <Slider users={followingUsers} />
          <div className="posts">
            {postsData?.map((post) => {
              return (
                <Post reloadData={getFeedPost} key={post.id} post={post} />
              );
            })}
          </div>
        </div>
        <SuggestedUser
          reccommendedUsers={reccommendedUsers}
          user={activeUser}
          followingIds={followingIds}
          getUserId={handleFollowUser}
        />
      </div>
      {showPopup && (
        <PopUp
          formTitle={"Create Post"}
          buttonText={"Create"}
          isOpen={showPopup}
          closePopUp={closePopup}
          handleSubmit={(e) => {
            e.preventDefault();
            createPostAction();
          }}
        >
          <div>
            <label htmlFor="caption">Caption</label>
            <input
              type="text"
              onChange={(e) => {
                setPostCredentials({
                  ...postCredentials,
                  caption: e.target.value,
                });
              }}
              id="caption"
              name="caption"
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

export default Home;
