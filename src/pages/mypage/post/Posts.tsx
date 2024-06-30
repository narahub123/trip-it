import { useState } from "react";
import Pagination from "../../../components/ui/Pagination";
import "./posts.css";
import { metroName } from "../../../utils/metro";
import PostsCard from "./PostsCard";
import { FiMoreVertical } from "react-icons/fi";

export interface PostsProps {
  posts: any[];
}

const Posts = ({ posts }: PostsProps) => {
  // db와 연결했을 때 사용
  // const posts = useSelector((state: Rootstate) => state.return.posts);

  // 설정 열고 닫기
  const [isOpen, setIsOpen] = useState(false);
  // 삭제 체크 박스 표시 여부
  const [showDelete, setShowDelete] = useState(false);

  const postDeletions = posts.map((post) => {
    const post_id = post.post_id ? post.post_id : "";
    const deletion = {
      post_id,
      deletion: false,
    };

    return deletion;
  });

  // 삭제할 일정 배열
  const [deletions, setDeletions] = useState<
    {
      post_id: string;
      deletion: boolean;
    }[]
  >(postDeletions);

  console.log(deletions);

  const limitArray = [1, 2, 3, 4];

  const arrayLengthMin = 1;
  const arrayLengthMax = 10;
  const arrayLengthDefault = 5;

  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [limit, setLimit] = useState(arrayLengthDefault);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 지역 코드 오름차순
  const areacodeSortIncl = () => {
    console.log("코드 오름");
    const sortedPosts = [...posts].sort((post1, post2) => {
      if (!post1.metro_id || !post2.metro_id) return -1;

      return post1.metro_id?.localeCompare(post2.metro_id);
    });

    console.log(sortedPosts);

    setFilteredPosts(sortedPosts);
  };

  // 지역 코드 내림차순
  const areacodeSortDecl = () => {
    console.log("코드 내림");
    const sortedPosts = [...posts].sort((post1, post2) => {
      if (!post1.metro_id || !post2.metro_id) return -1;

      return post2.metro_id?.localeCompare(post1.metro_id);
    });

    console.log(sortedPosts);

    setFilteredPosts(sortedPosts);
  };

  // 지역 이름 오름차순
  const areaNameSortIncl = () => {
    console.log("이름 오름");
    const sortedPosts = [...posts].sort((post1, post2) => {
      if (!post1.metro_id || !post2.metro_id) return -1;

      return metroName(post1.metro_id)?.localeCompare(
        metroName(post2.metro_id)
      );
    });

    console.log(sortedPosts);

    setFilteredPosts(sortedPosts);
  };

  // 지역 이름 내림차순
  const areaNameSortDecl = () => {
    console.log("이름 내림");

    const sortedPosts = [...posts].sort((post1, post2) => {
      if (!post1.metro_id || !post2.metro_id) return -1;

      return metroName(post2.metro_id)?.localeCompare(
        metroName(post1.metro_id)
      );
    });

    console.log(sortedPosts);

    setFilteredPosts(sortedPosts);
  };

  // 일정 시작 오름차순
  const startDateSortIncl = () => {
    console.log("시작 오름");
    const sortedPosts = [...posts].sort((post1, post2) => {
      if (!post1.start_date || !post2.start_date) return -1;

      return post1.start_date?.localeCompare(post2.start_date);
    });

    console.log(sortedPosts);

    setFilteredPosts(sortedPosts);
  };

  // 일정 시작 내림차순
  const startDateSortDecl = () => {
    console.log("시작 내림");

    const sortedPosts = [...posts].sort((post1, post2) => {
      if (!post1.start_date || !post2.start_date) return -1;

      return post2.start_date?.localeCompare(post1.start_date);
    });

    console.log(sortedPosts);

    setFilteredPosts(sortedPosts);
  };

  // 일정 기간 오름차순
  const durationSortIncl = () => {
    console.log("기간 오름");
    const sortedPosts = [...posts].sort((post1, post2) => {
      if (!post1.start_date || !post2.start_date) return -1;

      const duration1 = Number(post1.end_date) - Number(post1.start_date);
      const duration2 = Number(post2.end_date) - Number(post2.start_date);

      return duration2 - duration1;
    });

    console.log(sortedPosts);

    setFilteredPosts(sortedPosts);
  };

  // 일정 기간 내림차순
  const durationSortDecl = () => {
    console.log("기간 내림");

    const sortedPosts = [...posts].sort((post1, post2) => {
      if (!post1.start_date || !post2.start_date) return -1;

      const duration1 = Number(post1.end_date) - Number(post1.start_date);
      const duration2 = Number(post2.end_date) - Number(post2.start_date);

      return duration1 - duration2;
    });

    console.log(sortedPosts);

    setFilteredPosts(sortedPosts);
  };

  // 등록일 오름차순
  const registerDateSortIncl = () => {
    console.log("등록 오름");
    const sortedPosts = [...posts].sort((post1, post2) => {
      if (!post1.post_date || !post2.post_date) return -1;

      return post1.post_date?.localeCompare(post2.post_date);
    });

    console.log(sortedPosts);

    setFilteredPosts(sortedPosts);
  };

  // 등록일 내림차순
  const registerDateSortDecl = () => {
    console.log("등록 내림");

    const sortedPosts = [...posts].sort((post1, post2) => {
      if (!post1.post_date || !post2.post_date) return -1;

      return post2.post_date?.localeCompare(post1.post_date);
    });

    console.log(sortedPosts);

    setFilteredPosts(sortedPosts);
  };

  // 페이지네이션: 고정인 경우
  const handlePagination = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const pageNum = Number(e.currentTarget.dataset.pagenum);
    console.log(pageNum);
    setPage(1);
    setLimit(pageNum);
  };

  // 페이지네이션: 가변인 경우
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    console.log(value);
    setLimit(Number(value));
  };

  // 검색
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value;
    console.log(keyword);
    const newPosts = posts.filter((post) => post.post_title?.includes(keyword));

    console.log(newPosts);

    setFilteredPosts(newPosts);
  };

  // 설정 열기
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  // 삭제 체크 박스 보이기
  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  };

  // 삭제
  const handleDelete = () => {
    // 삭제할 postIds 배열
    const deletionArray = deletions
      .filter((deletion) => deletion.deletion === true)
      .map((result) => result.post_id);

    // console.log(deletionArray);

    // api에서 받아 온 배열 조작
    const newPosts = filteredPosts.filter((post) => {
      if (post.post_id) return !deletionArray.includes(post.post_id);
    });

    console.log(newPosts);

    setFilteredPosts(newPosts);

    // api에서 삭제
  };

  // 일괄 선택
  const handleSelectAll = () => {
    const newDeletions = deletions.map((deletion) => ({
      post_id: deletion.post_id,
      deletion: !deletion.deletion,
    }));

    setDeletions(newDeletions);
    console.log(newDeletions);
  };

  console.log(filteredPosts);

  return (
    <div className="posts">
      <h3 className="posts-title">내 모집글</h3>
      <div className="posts-control">
        <div className="posts-pagination">
          <p>페이지 당 모집글 수({limit})</p>
          <ul className="posts-pagination-container">
            {/* 고정인 경우 */}
            {limitArray.map((limit) => (
              <li
                className="posts-pagination-item"
                data-pageNum={limit}
                key={limit}
                onClick={(e) => handlePagination(e)}
              >
                {limit}
              </li>
            ))}

            {/* 가변인 경우 */}
            {/* <li className="posts-pagination-item">
              {arrayLengthMin}
              <input
                type="range"
                min={arrayLengthMin}
                max={arrayLengthMax}
                step={1}
                defaultValue={arrayLengthDefault}
                onChange={(e) => handleInputChange(e)}
              />
              {arrayLengthMax}
            </li> */}
          </ul>
        </div>
        <div className="posts-right">
          <div className="posts-sort">
            <ul className="posts-sort-container">
              <li className="posts-sort-item" key={"areacode"} id="areacode">
                <p>지역순</p>

                <ul className="posts-sort-dropdown-container">
                  <li
                    className="posts-sort-dropdown-item"
                    key={"areacode0"}
                    onClick={() => areacodeSortIncl()}
                  >
                    지역코드순서: 오름차순
                  </li>
                  <li
                    className="posts-sort-dropdown-item"
                    key={"areacode1"}
                    onClick={() => areacodeSortDecl()}
                  >
                    지역코드순서: 내림차순
                  </li>
                  <li
                    className="posts-sort-dropdown-item"
                    key={"areacode2"}
                    onClick={areaNameSortIncl}
                  >
                    지역이름순서: 오름차순
                  </li>
                  <li
                    className="posts-sort-dropdown-item"
                    key={"areacode3"}
                    onClick={areaNameSortDecl}
                  >
                    지역이름순서: 내림차순
                  </li>
                </ul>
              </li>
              <li className="posts-sort-item" key={"date"} id="date">
                <p>일정순</p>

                <ul className="posts-sort-dropdown-container">
                  <li
                    className="posts-sort-dropdown-item"
                    key={"date0"}
                    onClick={startDateSortIncl}
                  >
                    일정시작날짜: 오름차순
                  </li>
                  <li
                    className="posts-sort-dropdown-item"
                    key={"date1"}
                    onClick={startDateSortDecl}
                  >
                    일정시작날짜: 내림차순
                  </li>
                  <li
                    className="posts-sort-dropdown-item"
                    key={"date2"}
                    onClick={durationSortIncl}
                  >
                    일정기간기준: 오름차순
                  </li>
                  <li
                    className="posts-sort-dropdown-item"
                    key={"date3"}
                    onClick={durationSortDecl}
                  >
                    일정기간기준: 내림차순
                  </li>
                </ul>
              </li>
              <li className="posts-sort-item" key={"register"} id="register">
                <p>등록일</p>

                <ul className="posts-sort-dropdown-container">
                  <li
                    className="posts-sort-dropdown-item"
                    key={"register0"}
                    onClick={registerDateSortIncl}
                  >
                    등록일기준: 오름차순
                  </li>
                  <li
                    className="posts-sort-dropdown-item"
                    key={"register1"}
                    onClick={registerDateSortDecl}
                  >
                    등록일기준: 내림차순
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="posts-more" title="설정" onClick={handleOpen}>
            <FiMoreVertical />
            {isOpen && (
              <ul className="posts-more-container">
                <li
                  className="posts-more-item"
                  key={"delete"}
                  onClick={handleShowDelete}
                >
                  {!showDelete && "삭제"}
                  {showDelete && "삭제 완료"}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className={showDelete ? "posts-deletion-active" : "posts-deletion"}>
        <span className="posts-deletion-item" onClick={handleDelete}>
          삭제
        </span>
        <span className="posts-deletion-item" onClick={handleSelectAll}>
          일괄 선택
        </span>
        <span
          className="posts-deletion-item"
          onClick={() => setShowDelete(false)}
        >
          삭제 완료
        </span>
      </div>
      <div className="posts-cards">
        <ul className="posts-cards-container">
          {filteredPosts.length === 0 && (
            <>
              <div className="posts-cards-logo">
                <img src={`/images/trip-it-logo.png`} alt="" />
                <p>검색결과가 없습니다.</p>
              </div>
            </>
          )}
          {filteredPosts.slice(offset, offset + limit).map((post, index) => (
            <PostsCard
            // post={post}
            // key={index}
            // showDelete={showDelete}
            // setShowDelete={setShowDelete}
            // deletions={deletions}
            // setDeletions={setDeletions}
            />
          ))}
        </ul>
      </div>
      <div className="posts-search">
        <input
          id="search"
          type="search"
          placeholder="검색어를 적어주세요"
          style={{
            width: "50%",
            height: "clamp(40px, 2vw, 60px)",
            fontSize: "clamp(12px, 2vw, 16px)",
            paddingLeft: "5px",
          }}
          autoFocus
          onChange={(e) => handleSearchChange(e)}
        />
      </div>
      <div className="posts-pagination-bottom">
        <Pagination
          total={posts.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default Posts;
