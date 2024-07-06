import "./testGallery.css";

interface TestGalleryProps {
  items: any[];
}

const TestGallery = ({ items }: TestGalleryProps) => {
  return (
    <div className="test-gallery">
      <ul className="test-gallery-container">
        {items.map((item) => (
          <li className="test-gallery-item" key={item.userId}>
            <figure className="test-gallery-item-background-image">
              <img src={item.userpic} alt="사진" />
            </figure>
            <div className="test-gallery-item-cap">
              <ul className="test-gallery-item-cap-container">
                <li className="test-gallery-item-cap-item">
                  <p>이름</p> <p>{item.username}</p>
                </li>
                <li className="test-gallery-item-cap-item">
                  <p>아이디</p> <p>{item.userId}</p>
                </li>
                <li className="test-gallery-item-cap-item">
                  <p>닉네임</p> <p>{item.nickname}</p>
                </li>
                <li className="test-gallery-item-cap-item">
                  <p>신고수</p> <p>{item.reportCount}</p>
                </li>
                <li className="test-gallery-item-cap-item">
                  <p>생년월일</p> <p>{item.birth}</p>
                </li>
                <li className="test-gallery-item-cap-item">
                  <p>성별</p> <p>{item.gender === "m" ? "남자" : "여자"}</p>
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestGallery;
