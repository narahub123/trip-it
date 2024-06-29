import React from "react";
import { useNavigate } from "react-router-dom";
import "./postsCard.css";
import { FaCalendar } from "react-icons/fa";

const PostsCard = () => {
  let navigate = useNavigate();

  return (
    <section className="postsCard">
      <div
        className="postsCard-container"
        onClick={() => {
          navigate("/detail/:detailId");
        }}
      >
        <div className="postsCard-head">
          <div className="postsCard-head-profile">
            <div className="postsCard-profile-img">
              <img src={"/images/male-profile-image.jpg"} alt="profile"></img>
            </div>
            <div className="postsCard-profile-name">
              <p className="postsCard-profile-name-font">닉네임</p>
              <div className="postsCard-profile-name-spec">
                <p className="postsCard-profile-name-spec-font">나이</p>
                <div className="postsCard-profile-name-spec-dot"></div>
                <p className="postsCard-profile-name-spec-font">성별</p>
              </div>
            </div>
          </div>
          <div className="postsCard-head-bar"></div>
          <div className="postsCard-head-duration">
            <div className="postsCard-duration-bar"></div>
            <div className="postsCard-duration-img">
              <figure className="postsCard-duration-imgfile">
                <FaCalendar />
              </figure>
              <p className="postsCard-duration-font">여행기간</p>
            </div>
            <div className="postsCard-duration-spec">
              <p className="postsCard-duration-spec-day">4일</p>
              <div className="postsCard-duration-spec-dot"></div>
              <p className="postsCard-duration-spec-schedule">06/06 - 06/09</p>
            </div>
          </div>
        </div>
        <div className="postsCard-img">
          <div className="postsCard-img-main">
            <img
              src={
                "https://res.heraldm.com/content/image/2023/08/19/20230819000100_0.jpg"
              }
              alt="area_img"
              className="postsCard-img-imgfile"
            ></img>
          </div>
          <div className="postsCard-img-location">
            <div className="postsCard-location-img">
              <svg
                width="13"
                height="17"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7244 7.11371C12.7244 10.6866 6.49995 16.3557 6.49995 16.3557C6.49995 16.3557 0.275513 10.6866 0.275513 7.11371C0.275513 3.54077 3.06229 0.644341 6.49995 0.644341C9.93761 0.644341 12.7244 3.54077 12.7244 7.11371Z"
                  fill="#008FF6"
                ></path>
                <ellipse
                  cx="6.50063"
                  cy="6.40462"
                  rx="2.81106"
                  ry="2.81106"
                  fill="#fff"
                ></ellipse>
              </svg>
            </div>
            <p className="postsCard-location-font">장소</p>
          </div>
          <div className="postsCard-hide">
            <div className="postsCard-hide-left">
              <p className="postsCard-left-font">?명 모집중</p>
            </div>
            <div className="postsCard-hide-right">
              <div className="postsCard-right-box">
                <img
                  // src={eye}
                  alt="icon"
                  className="postsCard-hide-imgfile"
                ></img>
                <p className="postsCard-right-font">25</p>
              </div>
              <div className="postsCard-right-box">
                <img
                  // src={chat}
                  alt="icon"
                  className="postsCard-hide-imgfile"
                ></img>
                <p className="postsCard-right-font">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostsCard;
