import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../utils/Cookie";
// import Write from "../Community/Write";

function Header() {
  //   const headerLeftButtonList = ["홈", "플래너", "커뮤니티"];
  //   const nav = ["/home", "/planner", "/community"];
  const headerLeftButtonList = [
    "홈",
    "커뮤니티",
    "마이페이지",
    "관리자페이지",
    "테스트",
  ];
  const nav = ["/", "/community", "/mypage", "/admin", "/test"];
  const [clicked, setClicked] = useState(0);
  const [write, setWrite] = useState(0);

  let navigate = useNavigate();

  const toggleActive = (e: any) => {
    setClicked(() => {
      return e.target.value;
    });
    navigate(nav[e.target.value]);
  };

  return (
    <>
      <div className="head">
        <div className="header">
          <div className="header-nav">
            <div className="header-nav-left">
              {headerLeftButtonList.map(function (a, i) {
                return (
                  <button
                    value={i}
                    className={
                      "header-left-button" + (i == clicked ? "active" : "")
                    }
                    key={i}
                    onClick={toggleActive}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
            {localStorage.key(0) != null ? (
              <div className="header-nav-right">
                <div className="header-nav-right-login">
                  <button
                    className="header-right-button"
                    onClick={() => {
                      setClicked(() => {
                        return 5;
                      });
                      navigate("/mypage");
                    }}
                  >
                    마이페이지
                  </button>
                  <button
                    className="header-right-button"
                    onClick={() => {
                      setClicked(() => {
                        return 5;
                      });
                      localStorage.clear();
                      removeCookie("refresh");
                      navigate("/");
                    }}
                  >
                    로그아웃
                  </button>
                </div>
                <button
                  className="header-nav-right-write"
                  onClick={() => {
                    setWrite(1);
                  }}
                >
                  글쓰기
                </button>
              </div>
            ) : (
              <div className="header-nav-right">
                <div className="header-nav-right-login">
                  <button
                    className="header-right-button"
                    onClick={() => {
                      setClicked(() => {
                        return 5;
                      });
                      navigate("/login");
                    }}
                  >
                    로그인
                  </button>
                  <button
                    className="header-right-button"
                    onClick={() => {
                      setClicked(() => {
                        return 5;
                      });
                      navigate("/join");
                    }}
                  >
                    회원가입
                  </button>
                </div>
                <button
                  className="header-nav-right-write"
                  onClick={() => {
                    alert("로그인");
                    navigate("/login");
                  }}
                >
                  글쓰기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* {write == 1 ? <Write write={write} setWrite={setWrite}></Write> : null} */}
    </>
  );
}

export default Header;
