import { Link } from "react-router-dom";
import { UserType } from "../../../types/user";
import "./usersGallery.css";

export interface UsersGalleryProps {
  users: UserType[];
  offset: number;
  size: number;
}

const UsersGallery = ({ users, size, offset }: UsersGalleryProps) => {
  return (
    <div className="users-gallery">
      <ul className="users-gallery-container">
        {users.length === 0 && (
          <li className="users-gallery-no-data">
            <img src="/images/trip-it-logo.png" alt="" />
            <p>검색 결과가 없습니다.</p>
          </li>
        )}
        {users.slice(offset, offset + size).map((user) => (
          <li className="users-gallery-item" key={user.userId}>
            <Link to={`${user.userId}`}>
              <figure className="users-gallery-item-image">
                <img
                  src={
                    user.userpic || user.gender === "m"
                      ? "/images/male-profile-image.jpg"
                      : "/images/female-profile-image.jpg"
                  }
                  alt=""
                />
              </figure>
              <div className="users-gallery-item-bottom-cap">
                <ul>
                  <li className="users-gallery-item-nickname">
                    닉네임(아이디) : {user.nickname}({user.userId})
                  </li>
                  <li className="users-gallery-item-username">
                    이름: {user.username}
                  </li>
                  <li className="users-gallery-item-email">
                    이메일: {user.email}
                  </li>
                  <li className="users-gallery-item-reports">
                    신고수: {user.reportCount}
                  </li>
                  <li className="users-gallery-item-gender">
                    성별: {user.gender === "m" ? "남자" : "여자"}
                  </li>
                </ul>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersGallery;
