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
import UsersTable from "./UsersTable";
import UsersTableResponsive from "./UsersTableResponsive";
import Search from "../../../components/ui/Search";
import Pagination from "../../../components/ui/Pagination";
import UsersGallery from "./UsersGallery";

const Users = () => {
  const { hash } = useLocation();
  const limitArray = [1, 2, 3, 4];
  const arrayLengthMin = 1;
  const arrayLengthMax = 10;
  const arrayLengthDefault = 5;
  const UNIT_NAME = "유저";
  const [limit, setLimit] = useState(arrayLengthDefault);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [isOpen, setIsOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [sorts, setSorts] = useState({
    userId: "asc",
    username: "asc",
    nickname: "asc",
    gender: "desc",
    birth: "asc",
    role: "asc",
    regdate: "asc",
    email: "asc",
    reportCount: "asc",
  });

  const keywordArray = [
    { keyword: "이름", key: "username" },
    { keyword: "아이디", key: "userId" },
    { keyword: "닉네임", key: "nickname" },
    { keyword: "소개글", key: "user_intro" },
  ];

  // 설정 열고 닫기
  const handleOpenSetting = () => {
    setIsOpen(!isOpen);
  };

  // 정렬
  const handleSort = (
    e: React.MouseEvent<HTMLTableHeaderCellElement | HTMLLIElement, MouseEvent>
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

  // 페이지네이션: 가변인 경우
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    console.log(value);
    setLimit(Number(value));
  };

  console.log(limit);

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
          <div
            className={
              hash === "#gallery"
                ? "users-header-sort-container-gallery"
                : "users-header-sort-container-table"
            }
          >
            <p>정렬</p>
            <ul className="users-header-sorts">
              <li
                className="users-header-sorts-item"
                data-sort="asc"
                id="userId"
                onClick={(e) => handleSort(e)}
              >
                아이디{" "}
                {sorts.userId === "desc" ? <LuChevronDown /> : <LuChevronUp />}
              </li>
              <li
                className="users-header-sorts-item"
                data-sort="asc"
                id="username"
                onClick={(e) => handleSort(e)}
              >
                이름{" "}
                {sorts.username === "desc" ? (
                  <LuChevronDown />
                ) : (
                  <LuChevronUp />
                )}
              </li>
              <li
                className="users-header-sorts-item"
                data-sort="asc"
                id="nickname"
                onClick={(e) => handleSort(e)}
              >
                닉네임{" "}
                {sorts.nickname === "desc" ? (
                  <LuChevronDown />
                ) : (
                  <LuChevronUp />
                )}
              </li>
              <li
                className="users-header-sorts-item"
                data-sort="asc"
                id="gender"
                onClick={(e) => handleSort(e)}
              >
                성별{" "}
                {sorts.gender === "asc" ? <LuChevronDown /> : <LuChevronUp />}
              </li>
              <li
                className="users-header-sorts-item"
                data-sort="asc"
                id="email"
                onClick={(e) => handleSort(e)}
              >
                이메일{" "}
                {sorts.email === "desc" ? <LuChevronDown /> : <LuChevronUp />}
              </li>
              <li
                className="users-header-sorts-item"
                data-sort="asc"
                id="reportCount"
                onClick={(e) => handleSort(e)}
              >
                신고수{" "}
                {sorts.reportCount === "desc" ? (
                  <LuChevronDown />
                ) : (
                  <LuChevronUp />
                )}
              </li>
            </ul>
          </div>
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
            <UsersTable
              sorts={sorts}
              handleSort={handleSort}
              filteredUsers={filteredUsers}
              offset={offset}
              limit={limit}
            />
            <UsersTableResponsive
              filteredUsers={filteredUsers}
              offset={offset}
              limit={limit}
            />
          </div>
        )}
        {hash === "#gallery" && (
          <UsersGallery
            filteredUsers={filteredUsers}
            limit={limit}
            offset={offset}
          />
        )}
      </main>
      <section className="user-search">
        <Search
          array={users}
          setArray={setFilteredUsers}
          keywordArray={keywordArray}
        />
      </section>
      <section>
        <Pagination
          total={filteredUsers.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </section>
    </div>
  );
};

export default Users;
