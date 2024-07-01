import "./users.css";
import { useState } from "react";
import PaginationControllerFixed from "../../../components/ui/PaginationControllerFixed";
import PaginationControllerFlexible from "../../../components/ui/PaginationControllerFlexible";
import { RiGalleryView2 } from "react-icons/ri";
import {
  LuTable,
  LuMoreVertical,
  LuChevronDown,
  LuChevronUp,
} from "react-icons/lu";
import Setting from "../../../components/ui/Setting";
import { Link, useLocation } from "react-router-dom";
import { users } from "../../../data/test";
import { UserType } from "../../../types/user";

const Users = () => {
  const { hash } = useLocation();
  const limitArray = [1, 2, 3, 4];
  const arrayLengthMin = 1;
  const arrayLengthMax = 10;
  const arrayLengthDefault = 5;
  const UNIT_NAME = "유저";
  const [limit, setLimit] = useState(arrayLengthDefault);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [sorts, setSorts] = useState({
    user_id: "asc",
    username: "asc",
    nickname: "asc",
    gender: "asc",
    birth: "asc",
    role: "asc",
    regdate: "asc",
    email: "asc",
    report_count: "asc",
  });

  // 설정 열고 닫기
  const handleOpenSetting = () => {
    setIsOpen(!isOpen);
  };

  // 정렬
  const handleSort = (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
  ) => {
    const id = e.currentTarget.id as keyof (typeof users)[0];
    const sort = e.currentTarget.dataset.sort;

    let sortedUsers = filteredUsers;

    sortedUsers = [...users].sort((user1, user2) => {
      if (user1[id] === null || user2[id] === null) return -1;

      const usersArr = [user1, user2];

      if (sort === "asc") {
        usersArr.reverse();
        e.currentTarget.dataset.sort = "desc";
        setSorts({
          ...sorts,
          [id]: "desc",
        });
      } else if (sort === "desc") {
        usersArr.sort();
        e.currentTarget.dataset.sort = "asc";
        setSorts({
          ...sorts,
          [id]: "asc",
        });
      }

      let result = 0;
      if (
        typeof usersArr[0][id] === "number" &&
        typeof usersArr[1][id] === "number"
      ) {
        result = (usersArr[0][id] as number) - (usersArr[1][id] as number);
      } else if (
        typeof usersArr[0][id] === "string" &&
        typeof usersArr[1][id] === "string"
      ) {
        result = (usersArr[0][id] as string).localeCompare(
          usersArr[1][id] as string
        );
      }

      return result;
    });

    setFilteredUsers(sortedUsers);
  };

  return (
    <div className="users">
      <h3>유저 목록</h3>
      <header className="users-header">
        <div className="users-header-left">
          <div className="users-header-layout-container">
            <Link
              to={`#table`}
              title="테이블"
              className={
                hash === "#table" || !hash
                  ? "layout-link active"
                  : "layout-link"
              }
            >
              <LuTable />
            </Link>
            <Link
              to={`#gallery`}
              title="갤러리"
              className={
                hash === "#gallery" ? "layout-link active" : "layout-link"
              }
            >
              <RiGalleryView2 />
            </Link>
          </div>
          <div className="users-header-pagination-container">
            <PaginationControllerFlexible
              arrayLengthMin={arrayLengthMin}
              arrayLengthMax={arrayLengthMax}
              arrayLengthDefault={arrayLengthDefault}
              limit={limit}
              setLimit={setLimit}
              UNIT_NAME={UNIT_NAME}
            />
          </div>
        </div>
        <div className="users-header-right">
          <div className="users-header-sort-container">정렬</div>
          <div
            className="users-header-setting-container"
            onClick={handleOpenSetting}
            title="설정"
          >
            <LuMoreVertical />
            {isOpen && <Setting />}
          </div>
        </div>
      </header>
      <main className="users-main">
        {(hash === "#table" || !hash) && (
          <div className="users-main-table-container">
            <table className="users-main-table">
              <thead className="users-main-table-header">
                <tr
                  className="users-main-table-header-row"
                  key={`usersHeaderRow`}
                >
                  <th
                    data-sort="asc"
                    key={`user_id`}
                    id="user_id"
                    onClick={(e) => handleSort(e)}
                  >
                    아이디{" "}
                    {sorts.user_id === "desc" ? (
                      <LuChevronDown />
                    ) : (
                      <LuChevronUp />
                    )}
                  </th>
                  <th
                    data-sort="asc"
                    key={`user_name`}
                    id="username"
                    onClick={(e) => handleSort(e)}
                  >
                    이름{" "}
                    {sorts.username === "desc" ? (
                      <LuChevronDown />
                    ) : (
                      <LuChevronUp />
                    )}
                  </th>
                  <th
                    data-sort="asc"
                    key={`user_nick`}
                    id="nickname"
                    onClick={(e) => handleSort(e)}
                  >
                    닉네임{" "}
                    {sorts.nickname === "desc" ? (
                      <LuChevronDown />
                    ) : (
                      <LuChevronUp />
                    )}
                  </th>
                  <th
                    data-sort="asc"
                    key={`user_gender`}
                    id="gender"
                    onClick={(e) => handleSort(e)}
                  >
                    성별 {/* 데이터와 한글의 순서가 반대라서 반대로 표기함 */}
                    {sorts.gender === "asc" ? (
                      <LuChevronDown />
                    ) : (
                      <LuChevronUp />
                    )}
                  </th>
                  <th
                    data-sort="asc"
                    key={`user_birth`}
                    id="birth"
                    onClick={(e) => handleSort(e)}
                  >
                    생년월일{" "}
                    {sorts.birth === "desc" ? (
                      <LuChevronDown />
                    ) : (
                      <LuChevronUp />
                    )}
                  </th>
                  <th
                    data-sort="asc"
                    key={`user_role`}
                    id="role"
                    onClick={(e) => handleSort(e)}
                  >
                    등급{" "}
                    {sorts.role === "desc" ? (
                      <LuChevronDown />
                    ) : (
                      <LuChevronUp />
                    )}
                  </th>
                  <th
                    data-sort="asc"
                    key={`user_regdate`}
                    id="regdate"
                    onClick={(e) => handleSort(e)}
                  >
                    가입일{" "}
                    {sorts.regdate === "desc" ? (
                      <LuChevronDown />
                    ) : (
                      <LuChevronUp />
                    )}
                  </th>
                  <th
                    data-sort="asc"
                    key={`user_email`}
                    id="email"
                    onClick={(e) => handleSort(e)}
                  >
                    이메일{" "}
                    {sorts.email === "desc" ? (
                      <LuChevronDown />
                    ) : (
                      <LuChevronUp />
                    )}
                  </th>
                  <th
                    data-sort="asc"
                    key={`user_reports`}
                    id="report_count"
                    onClick={(e) => handleSort(e)}
                  >
                    신고건수{" "}
                    {sorts.report_count === "desc" ? (
                      <LuChevronDown />
                    ) : (
                      <LuChevronUp />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="users-main-table-body">
                {filteredUsers.map((user, index) => (
                  <tr className="users-main-table-row" key={`user${index}`}>
                    <td key={`user${index}_id`}>{user.user_id}</td>
                    <td key={`user${index}_name`}>{user.username}</td>
                    <td key={`user${index}_nick`}>{user.nickname}</td>
                    <td key={`user${index}_gender`}>
                      {user.gender === "m" ? "남자" : "여자"}
                    </td>
                    <td key={`user${index}_birth`}>{user.birth}</td>
                    <td key={`user${index}_role`}>{user.role}</td>
                    <td key={`user${index}_regdate`}>{user.regdate}</td>
                    <td key={`user${index}_email`}>{user.email}</td>
                    <td key={`user${index}_reports`}>{user.report_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {hash === "#gallery" && <p>갤러리</p>}
      </main>
    </div>
  );
};

export default Users;
