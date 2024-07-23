import React from "react";
import "./usersTable.css";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { UserType } from "../../../types/user";
import { Link, useNavigate } from "react-router-dom";

export interface UsersTableProps {
  sorts: {
    userId: string;
    username: string;
    nickname: string;
    gender: string;
    birth: string;
    role: string;
    regdate: string;
    email: string;
    reportCount: string;
  };

  handleSort: (
    value: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
  ) => void;
  users: UserType[];
  offset: number;
  size: number;
}

const UsersTable = ({
  sorts,
  handleSort,
  users,
  size,
  offset,
}: UsersTableProps) => {
  const navigate = useNavigate();
  const handleLink = (userId: number | string) => {
    navigate(`${userId}`);
  };
  return (
    <table className="users-table">
      <thead className="users-table-header">
        <tr className="users-table-header-row" key={`usersHeaderRow`}>
          <th
            data-sort="asc"
            key={`userId`}
            id="userId"
            onClick={(e) => handleSort(e)}
          >
            아이디{" "}
            {sorts.userId === "desc" ? <LuChevronDown /> : <LuChevronUp />}
          </th>
          <th
            data-sort="asc"
            key={`user_name`}
            id="username"
            onClick={(e) => handleSort(e)}
          >
            이름{" "}
            {sorts.username === "desc" ? <LuChevronDown /> : <LuChevronUp />}
          </th>
          <th
            data-sort="asc"
            key={`user_nick`}
            id="nickname"
            onClick={(e) => handleSort(e)}
          >
            닉네임{" "}
            {sorts.nickname === "desc" ? <LuChevronDown /> : <LuChevronUp />}
          </th>
          <th
            data-sort="asc"
            key={`user_gender`}
            id="gender"
            onClick={(e) => handleSort(e)}
          >
            성별 {/* 데이터와 한글의 순서가 반대라서 반대로 표기함 */}
            {sorts.gender === "asc" ? <LuChevronDown /> : <LuChevronUp />}
          </th>
          <th
            data-sort="asc"
            key={`user_birth`}
            id="birth"
            onClick={(e) => handleSort(e)}
          >
            생년월일{" "}
            {sorts.birth === "desc" ? <LuChevronDown /> : <LuChevronUp />}
          </th>
          <th
            data-sort="asc"
            key={`user_role`}
            id="role"
            onClick={(e) => handleSort(e)}
          >
            등급 {sorts.role === "desc" ? <LuChevronDown /> : <LuChevronUp />}
          </th>
          <th
            data-sort="asc"
            key={`user_regdate`}
            id="regdate"
            onClick={(e) => handleSort(e)}
          >
            가입일{" "}
            {sorts.regdate === "desc" ? <LuChevronDown /> : <LuChevronUp />}
          </th>
          <th
            data-sort="asc"
            key={`user_email`}
            id="email"
            onClick={(e) => handleSort(e)}
          >
            이메일{" "}
            {sorts.email === "desc" ? <LuChevronDown /> : <LuChevronUp />}
          </th>
          <th
            data-sort="asc"
            key={`user_reports`}
            id="report_count"
            onClick={(e) => handleSort(e)}
          >
            신고건수{" "}
            {sorts.reportCount === "desc" ? <LuChevronDown /> : <LuChevronUp />}
          </th>
        </tr>
      </thead>
      <tbody className="users-table-body">
        {users.slice(offset, offset + size).map((user, index) => (
          <tr
            className="users-table-row"
            key={`user${index}`}
            onClick={() => handleLink(user.userId)}
          >
            <td key={`user${index}_id`}>{user.userId}</td>
            <td key={`user${index}_name`}>{user.username}</td>
            <td key={`user${index}_nick`}>{user.nickname}</td>
            <td key={`user${index}_gender`}>
              {user.gender === "m" ? "남자" : "여자"}
            </td>
            <td key={`user${index}_birth`}>{user.birth}</td>
            <td key={`user${index}_role`}>{user.role}</td>
            <td key={`user${index}_regdate`}>{user.regdate}</td>
            <td key={`user${index}_email`}>{user.email}</td>
            <td key={`user${index}_reports`}>{user.reportCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
