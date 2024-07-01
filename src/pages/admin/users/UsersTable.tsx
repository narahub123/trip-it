import React from "react";
import "./usersTable.css";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { UserType } from "../../../types/user";

export interface UsersTableProps {
  sorts: {
    user_id: string;
    username: string;
    nickname: string;
    gender: string;
    birth: string;
    role: string;
    regdate: string;
    email: string;
    report_count: string;
  };
  handleSort: (
    value: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
  ) => void;
  filteredUsers: UserType[];
  offset: number;
  limit: number;
}

const UsersTable = ({
  sorts,
  handleSort,
  filteredUsers,
  limit,
  offset,
}: UsersTableProps) => {
  return (
    <table className="users-table">
      <thead className="users-table-header">
        <tr className="users-table-header-row" key={`usersHeaderRow`}>
          <th
            data-sort="asc"
            key={`user_id`}
            id="user_id"
            onClick={(e) => handleSort(e)}
          >
            아이디{" "}
            {sorts.user_id === "desc" ? <LuChevronDown /> : <LuChevronUp />}
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
            {sorts.report_count === "desc" ? (
              <LuChevronDown />
            ) : (
              <LuChevronUp />
            )}
          </th>
        </tr>
      </thead>
      <tbody className="users-table-body">
        {filteredUsers.slice(offset, offset + limit).map((user, index) => (
          <tr className="users-table-row" key={`user${index}`}>
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
  );
};

export default UsersTable;
