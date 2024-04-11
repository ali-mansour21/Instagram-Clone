import React from "react";
import "../Styles/sidebar.css";
import logo from "../../../assets/Instagram_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCompass,
  faEnvelope,
  faHeart,
  faHouse,
  faMagnifyingGlass,
  faPlay,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import defaultProfileImage from "../../../assets/empty_profile.jpeg";
import { useNavigate } from "react-router-dom";
const SideBar = ({ openPopUp, user }) => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <img srcSet={logo} alt="Logo" />
      <div className="menu">
        <ul>
          <li
            onClick={() => {
              navigate("/home");
            }}
          >
            <FontAwesomeIcon icon={faHouse} />
            Home
          </li>
          <li>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Search
          </li>
          <li>
            <FontAwesomeIcon icon={faCompass} />
            Explore
          </li>
          <li>
            <FontAwesomeIcon icon={faPlay} />
            Reels
          </li>
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
            Messages
          </li>
          <li>
            <FontAwesomeIcon icon={faHeart} />
            Notifications
          </li>
          <li onClick={openPopUp}>
            <FontAwesomeIcon icon={faSquarePlus} />
            Create
          </li>
          <li
            onClick={() => {
              navigate("/profile");
            }}
          >
            {user?.profile_image ? (
              <img
                src={`http://127.0.0.1:8000/storage/${user?.profile_image}`}
                className="profile"
                alt=""
              />
            ) : (
              <img
                className="profile"
                srcSet={defaultProfileImage}
                alt="Default Profile"
              />
            )}
            Profile
          </li>
        </ul>
      </div>
      <div className="footer">
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>
            Thread
          </li>
          <li>
            <FontAwesomeIcon icon={faBars} />
            More
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
