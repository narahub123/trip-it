import axios from "axios";
import "./bans.css";
import { getCookie } from "../../../utils/Cookie";
import { useEffect, useState } from "react";

const baseURL = process.env.REACT_APP_SERVER_URL;

const Bans = () => {
  const [bans, setBans] = useState<
    {
      blockId: number;
      userId: number;
      nickname: string;
      blockDate: string;
    }[]
  >([
    {
      blockId: 0,
      userId: 0,
      nickname: "",
      blockDate: "",
    },
  ]);

  useEffect(() => {
    axios
      .get(`${baseURL}/mypage/blockedlist/user`, {
        headers: {
          "Content-Type": "application/json",
          Access: `${localStorage.getItem("access")}`,
          Refresh: `${getCookie("refresh")}`,
        },
      })
      .then((response) => {
        console.log("응답", response.data);
        return setBans(response.data);
      });
  }, []);

  // 차단
  const handleClick = () => {
    const userId = 2;
    const nickname = "차단테스트3";
    axios
      .post(
        baseURL + "/mypage/blockedlist/add",
        {
          userId,
          nickname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Access: `${localStorage.getItem("access")}`,
            Refresh: `${getCookie("refresh")}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        if (!response.data) {
          window.alert(
            "차단멤버가 추가되었지만 네트워크 문제로 확인할 수가 없습니다. \n 새로고침을 해보세요."
          );
        }
        setBans(response.data);
        window.alert("차단한 멤버가 추가되었습니다.");
      });
  };

  // 차단 해제
  const handleClick2 = (nickname: string) => {
    console.log(nickname);

    axios
      .post(
        baseURL + "/mypage/blockedlist/remove",
        {
          nickname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Access: `${localStorage.getItem("access")}`,
            Refresh: `${getCookie("refresh")}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (!response) {
          console.log("리턴 없어");
        }
        console.log(response.data);

        setBans(response.data);
        window.alert(`${nickname}님의 차단이 해제되었습니다.`);
      })
      .catch((err) => window.alert(err));
  };
  return (
    <>
      <div className="bans">
        {bans.map((ban) => (
          <ul key={ban.blockId}>
            <li className="bans-table-cell">{ban.blockId}</li>
            <li className="bans-table-cell">{ban.userId}</li>
            <li className="bans-table-cell">{ban.nickname}</li>
            <li className="bans-table-cell">{ban.blockDate}</li>
            <li>
              <button
                className="bans-button"
                onClick={() => handleClick2(ban.nickname)}
              >
                차단 해제
              </button>
            </li>
          </ul>
        ))}
      </div>
      <button className="bans-button" onClick={handleClick}>
        차단
      </button>
    </>
  );
};

export default Bans;
