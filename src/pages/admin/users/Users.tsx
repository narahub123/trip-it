import { useState } from "react";
import PaginationControllerFixed from "../../../components/ui/PaginationControllerFixed";
import "./users.css";
import PaginationControllerFlexible from "../../../components/ui/PaginationControllerFlexible";

const Users = () => {
  const limitArray = [1, 2, 3, 4];
  const arrayLengthMin = 1;
  const arrayLengthMax = 10;
  const arrayLengthDefault = 5;
  const [limit, setLimit] = useState(arrayLengthDefault);
  const UNIT_NAME = "유저";

  return (
    <div className="users">
      <h3>유저 목록</h3>
      <header className="users-header">
        <div className="users-header-left">
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
          <div className="user-header-setting-container">설정</div>
        </div>
      </header>
      <main className="users-main">메인</main>
    </div>
  );
};

export default Users;
