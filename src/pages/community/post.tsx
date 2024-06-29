import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Post() {
  let navigate = useNavigate();

  return (
    <section className="post">
      <div
        className="post-col"
        onClick={() => {
          navigate("/detail");
        }}
      >
        <div className="post-col-head">
          <div className="post-col-head-profile">
            <div className="post-profile-img">
              <img src={"images/metros/metro-1.jpg"} alt="profile"></img>
            </div>
            <div className="post-profile-name">
              <p className="post-profile-name-font">닉네임</p>
              <div className="post-profile-name-spec">
                <p className="post-profile-name-spec-font">나이</p>
                <div className="post-profile-name-spec-dot"></div>
                <p className="post-profile-name-spec-font">성별</p>
              </div>
            </div>
          </div>
          <div className="post-col-head-bar"></div>
          <div className="post-col-head-duration">
            <div className="post-duration-bar"></div>
            <div className="post-duration-img">
              <img
                // src={calendar}
                alt="icon"
                className="post-duration-imgfile"
              ></img>

              <p className="post-duration-font">여행기간</p>
            </div>
            <div className="post-duration-spec">
              <p className="post-duration-spec-day">4일</p>
              <div className="post-duration-spec-dot"></div>
              <p className="post-duration-spec-schedule">06/06 - 06/09</p>
            </div>
          </div>
        </div>
        <div className="post-col-img">
          <div className="post-col-img-main">
            <img
              // src={test}
              alt="area_img"
              className="post-img-imgfile"
            ></img>
          </div>
          <div className="post-col-img-location">
            <div className="post-location-img">
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
            <p className="post-location-font">장소</p>
          </div>
          <div className="post-col-hide">
            <div className="post-col-hide-left">
              <p className="post-left-font">?명 모집중</p>
            </div>
            <div className="post-col-hide-right">
              <div className="post-right-box">
                <img
                  // src={eye}
                  alt="icon"
                  className="post-hide-imgfile"
                ></img>
                <p className="post-right-font">25</p>
              </div>
              <div className="post-right-box">
                <img
                  // src={chat}
                  alt="icon"
                  className="post-hide-imgfile"
                ></img>
                <p className="post-right-font">3</p>
              </div>
            </div>
          </div>
        </div>
        <div className="post-col-text">
          <p className="post-text-title">글 제목</p>
          <p className="post-text-body">글 본문</p>
        </div>
      </div>

      <div className="post-col">테스트</div>
      <div className="post-col">테스트</div>
      <div className="post-col">테스트</div>
      <div className="post-col">테스트</div>
      <div className="post-col">테스트</div>
      <div className="post-col">테스트</div>
      <div className="post-col">테스트</div>
      <div className="post-col">테스트</div>
      <div className="post-col">테스트</div>
    </section>
  );
}

export default Post;
