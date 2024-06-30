import "./users.css";
import { useState } from "react";
import PaginationControllerFixed from "../../../components/ui/PaginationControllerFixed";
import PaginationControllerFlexible from "../../../components/ui/PaginationControllerFlexible";
import { RiGalleryView2 } from "react-icons/ri";
import { LuTable, LuMoreVertical } from "react-icons/lu";
import Setting from "../../../components/ui/Setting";
import { Link, useLocation } from "react-router-dom";
import { UserType } from "../../../types/user";
import { users } from "../../../data/test";

const Users = () => {
  const { hash } = useLocation();
  const limitArray = [1, 2, 3, 4];
  const arrayLengthMin = 1;
  const arrayLengthMax = 10;
  const arrayLengthDefault = 5;
  const UNIT_NAME = "유저";
  const [limit, setLimit] = useState(arrayLengthDefault);
  const [isOpen, setIsOpen] = useState(false);

  // 설정 열고 닫기
  const handleOpenSetting = () => {
    setIsOpen(!isOpen);
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
          <div className="user-header-sort-container">정렬</div>
          <div
            className="user-header-setting-container"
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
                <tr>
                  <th key={`user_id`}>아이디</th>
                  <th key={`user_name`}>이름</th>
                  <th key={`user_nick`}>닉네임</th>
                  <th key={`user_gender`}>성별</th>
                  <th key={`user_birth`}>생년월일</th>
                  <th key={`user_role`}>등급</th>
                  <th key={`user_regdate`}>가입일</th>
                  <th key={`user_email`}>이메일</th>
                  <th key={`user_reports`}>신고건수</th>
                </tr>
              </thead>
              <tbody className="users-main-table-body">
                {users.map((user, index) => (
                  <tr key={`user${index}`}>
                    <td key={`user${index}_id`}>{user.user_id}</td>
                    <td key={`user${index}_name`}>{user.username}</td>
                    <td key={`user${index}_nick`}>{user.nickname}</td>
                    <td key={`user${index}_gender`}>{user.gender}</td>
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
