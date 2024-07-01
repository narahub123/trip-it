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

  const newLimit = filteredUsers.length % 2 === 0 ? limit : limit + 1;

  const modifiedUsers: UserType[] =
    filteredUsers.length % 2 === 0
      ? filteredUsers
      : [
          ...filteredUsers,
          {
            user_id: 0,
            email: "hidden@gmail.com",
            username: "hidden",
            nickname: "hidden",
            password: "hidden@1234",
            birth: "hidden",
            gender: "m",
            user_intro: "hidden",
            role: "hidden",
            regdate: "hidden",
            userpic: "",
            report_count: 0,
            end_date: undefined,
          },
        ];

  return (
    <table className="users-table-responsive">
      {modifiedUsers.slice(offset, offset + newLimit).map((user) => (
        <tr
          className={
            filteredUsers.length % 2 === 0
              ? "users-table-responsive-row"
              : "users-table-responsive-row-odd"
          }
          key={user.user_id}
        >
          <td>
            <span className="cell-header">아이디</span> {user.user_id}
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
            <span className="cell-header">신고수</span> {user.report_count}
          </td>
        </tr>
      ))}
    </table>
  );
};

export default UsersTableResponsive;
