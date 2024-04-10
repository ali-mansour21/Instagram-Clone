import React, { useState } from "react";
import logo from "../../../assets/donut.jpeg";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultProfileImage from "../../../assets/empty_profile.jpeg";
import sendAuthRequest from "../../../core/tools/authRequest";
import { requestMethods } from "../../../core/requests/requestMethod";
const Post = ({ post, reloadData }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState({
    content: "",
  });
  function calculateElapsedTime(postDate) {
    const currentDate = new Date();
    const elapsedTime = currentDate - new Date(postDate);

    const seconds = Math.floor(elapsedTime / 1000);

    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours}h`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days}d`;
    }
  }
  const handleCreateComment = () => {
    sendAuthRequest(
      requestMethods.POST,
      `posts/${post.id}/comment`,
      comment
    ).then((response) => {
      if (response.data.status === "success") {
        reloadData();
        setComment({
          content: "",
        });
      }
    });
  };
  const handleLikePost = () => {
    sendAuthRequest(requestMethods.POST, `posts/${post.id}/like`).then(
      (response) => {
        if (response.data.status === "success") {
          setIsLiked(!isLiked);
          reloadData();
        }
      }
    );
  };
  return (
    <div className="post">
      <div className="header">
        <div>
          {post.user.profile_image ? (
            <img srcSet={post.user.profile_image} alt="" />
          ) : (
            <img srcSet={defaultProfileImage} alt="Default Profile" />
          )}
          <div className="info">
            <h3>{post.user.name}</h3>
            <p>{calculateElapsedTime(post.created_at)}</p>
          </div>
        </div>
        <div className="dots">
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>
      <div className="post_image">
        <img
          src={`http://127.0.0.1:8000/storage/${post.post_image}`}
          alt="post_image"
        />
      </div>
      <div className="actions">
        <div>
          <div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 ${isLiked ? "red-fill" : ""}`}
                onClick={() => {
                  handleLikePost();
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
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
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
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
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </div>
            <p>{post.likes?.length} likes</p>
            <p>
              {post.user.name}: {post.caption}
            </p>
          </div>
          <div>
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
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          </div>
        </div>
        <div className="comments">
          <p>View all {post.comments?.length} comments</p>
          {post.comments?.map((comment, index) => (
            <p key={index} className="comment">
              <span>{comment.user.name}</span>: {comment.content}
            </p>
          ))}
          <div className="input-field">
            <input
              type="text"
              onChange={(e) => {
                setComment({ ...comment, content: e.target.value });
              }}
              placeholder="Add  a comment..."
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleCreateComment();
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
