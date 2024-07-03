import { Link } from "react-router-dom";
import { UserType } from "../../../types/user";
import "./usersTableResponsive.css";

export interface UsersTableResponsiveProps {
  filteredUsers: UserType[];
  offset: number;
  limit: number;
}

const UsersTableResponsive = ({
  filteredUsers,
  limit,
  offset,
}: UsersTableResponsiveProps) => {
  console.log(filteredUsers.length);

  return (
    <table className="users-table-responsive">
      {filteredUsers.slice(offset, offset + limit).map((user) => (
        <tr className="users-table-responsive-row" key={user.userId}>
          <Link to={`${user.userId}`} key={user.userId}>
            <td>
              <span className="cell-header">아이디</span> {user.userId}
            </td>
            <td>
              <span className="cell-header">이름</span> {user.username}
            </td>
            <td>
              <span className="cell-header">닉네임</span> {user.nickname}
            </td>
            <td>
              <span className="cell-header">성별</span>{" "}
              {user.gender === "m" ? "남자" : "여자"}
            </td>
            <td>
              <span className="cell-header">이메일</span> {user.email}
            </td>
            <td>
              <span className="cell-header">신고수</span> {user.reportCount}
            </td>
          </Link>
        </tr>
      ))}
    </table>
  );
};

export default UsersTableResponsive;
