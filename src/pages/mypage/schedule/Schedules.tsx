import { useEffect, useRef, useState } from "react";
import { ScheduleType } from "../../../types/schedules";
import SchedulesCard from "./SchedulesCard";
import "./schedules.css";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../store/store";
import { metroName } from "../../../utils/metro";
import { debounce } from "../../../utils/debounce";
import Pagination from "../../../components/ui/Pagination";
import { FiMoreVertical } from "react-icons/fi";

const Schedules = () => {
  // db와 연결했을 때 사용
  // const schedules = useSelector((state: Rootstate) => state.return.schedules);

  // 설정 열고 닫기
  const [isOpen, setIsOpen] = useState(false);
  // 삭제 체크 박스 표시 여부
  const [showDelete, setShowDelete] = useState(false);

  // schedule data(practice)
  const schedules: ScheduleType[] = [
    {
      schedule_id: "1",
      metro_id: "1",
      start_date: "20240626",
      end_date: "20240628",
      register_date: "20240621",
      user_id: "1",
      schedule_title: "서울 여행",
    },
    {
      schedule_id: "2",
      metro_id: "2",
      start_date: "20240704",
      end_date: "20240712",
      register_date: "20240511",
      user_id: "1",
      schedule_title: "인천 여행",
    },
    {
      schedule_id: "3",
      metro_id: "3",
      start_date: "20240504",
      end_date: "20240513",
      register_date: "20240211",
      user_id: "1",
      schedule_title: "부산 여행",
    },
  ];

  const scheduleDeletions = schedules.map((schedule) => {
    const schedule_id = schedule.schedule_id ? schedule.schedule_id : "";
    const deletion = {
      schedule_id,
      deletion: false,
    };

    return deletion;
  });

  // 삭제할 일정 배열
  const [deletions, setDeletions] = useState<
    {
      schedule_id: string;
      deletion: boolean;
    }[]
  >(scheduleDeletions);

  console.log(deletions);

  const limitArray = [1, 2, 3, 4];

  const arrayLengthMin = 1;
  const arrayLengthMax = 10;
  const arrayLengthDefault = 5;

  const [filteredSchedules, setFilteredSchedules] =
    useState<ScheduleType[]>(schedules);
  const [limit, setLimit] = useState(arrayLengthDefault);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 지역 코드 오름차순
  const areacodeSortIncl = () => {
    console.log("코드 오름");
    const sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
      if (!schedule1.metro_id || !schedule2.metro_id) return -1;

      return schedule1.metro_id?.localeCompare(schedule2.metro_id);
    });

    console.log(sortedSchedules);

    setFilteredSchedules(sortedSchedules);
  };

  // 지역 코드 내림차순
  const areacodeSortDecl = () => {
    console.log("코드 내림");
    const sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
      if (!schedule1.metro_id || !schedule2.metro_id) return -1;

      return schedule2.metro_id?.localeCompare(schedule1.metro_id);
    });

    console.log(sortedSchedules);

    setFilteredSchedules(sortedSchedules);
  };

  // 지역 이름 오름차순
  const areaNameSortIncl = () => {
    console.log("이름 오름");
    const sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
      if (!schedule1.metro_id || !schedule2.metro_id) return -1;

      return metroName(schedule1.metro_id)?.localeCompare(
        metroName(schedule2.metro_id)
      );
    });

    console.log(sortedSchedules);

    setFilteredSchedules(sortedSchedules);
  };

  // 지역 이름 내림차순
  const areaNameSortDecl = () => {
    console.log("이름 내림");

    const sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
      if (!schedule1.metro_id || !schedule2.metro_id) return -1;

      return metroName(schedule2.metro_id)?.localeCompare(
        metroName(schedule1.metro_id)
      );
    });

    console.log(sortedSchedules);

    setFilteredSchedules(sortedSchedules);
  };

  // 일정 시작 오름차순
  const startDateSortIncl = () => {
    console.log("시작 오름");
    const sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
      if (!schedule1.start_date || !schedule2.start_date) return -1;

      return schedule1.start_date?.localeCompare(schedule2.start_date);
    });

    console.log(sortedSchedules);

    setFilteredSchedules(sortedSchedules);
  };

  // 일정 시작 내림차순
  const startDateSortDecl = () => {
    console.log("시작 내림");

    const sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
      if (!schedule1.start_date || !schedule2.start_date) return -1;

      return schedule2.start_date?.localeCompare(schedule1.start_date);
    });

    console.log(sortedSchedules);

    setFilteredSchedules(sortedSchedules);
  };

  // 일정 기간 오름차순
  const durationSortIncl = () => {
    console.log("기간 오름");
    const sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
      if (!schedule1.start_date || !schedule2.start_date) return -1;

      const duration1 =
        Number(schedule1.end_date) - Number(schedule1.start_date);
      const duration2 =
        Number(schedule2.end_date) - Number(schedule2.start_date);

      return duration2 - duration1;
    });

    console.log(sortedSchedules);

    setFilteredSchedules(sortedSchedules);
  };

  // 일정 기간 내림차순
  const durationSortDecl = () => {
    console.log("기간 내림");

    const sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
      if (!schedule1.start_date || !schedule2.start_date) return -1;

      const duration1 =
        Number(schedule1.end_date) - Number(schedule1.start_date);
      const duration2 =
        Number(schedule2.end_date) - Number(schedule2.start_date);

      return duration1 - duration2;
    });

    console.log(sortedSchedules);

    setFilteredSchedules(sortedSchedules);
  };

  // 등록일 오름차순
  const registerDateSortIncl = () => {
    console.log("등록 오름");
    const sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
      if (!schedule1.register_date || !schedule2.register_date) return -1;

      return schedule1.register_date?.localeCompare(schedule2.register_date);
    });

    console.log(sortedSchedules);

    setFilteredSchedules(sortedSchedules);
  };

  // 등록일 내림차순
  const registerDateSortDecl = () => {
    console.log("등록 내림");

    const sortedSchedules = [...schedules].sort((schedule1, schedule2) => {
      if (!schedule1.register_date || !schedule2.register_date) return -1;

      return schedule2.register_date?.localeCompare(schedule1.register_date);
    });

    console.log(sortedSchedules);

    setFilteredSchedules(sortedSchedules);
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
    const newSchedules = schedules.filter((schedule) =>
      schedule.schedule_title?.includes(keyword)
    );

    console.log(newSchedules);

    setFilteredSchedules(newSchedules);
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
    // 삭제할 scheduleIds 배열
    const deletionArray = deletions
      .filter((deletion) => deletion.deletion === true)
      .map((result) => result.schedule_id);

    // console.log(deletionArray);

    // api에서 받아 온 배열 조작
    const newSchedules = filteredSchedules.filter((schedule) => {
      if (schedule.schedule_id)
        return !deletionArray.includes(schedule.schedule_id);
    });

    console.log(newSchedules);

    setFilteredSchedules(newSchedules);

    // api에서 삭제
  };

  // 일괄 선택
  const handleSelectAll = () => {
    const newDeletions = deletions.map((deletion) => ({
      schedule_id: deletion.schedule_id,
      deletion: !deletion.deletion,
    }));

    setDeletions(newDeletions);
    console.log(newDeletions);
  };

  console.log(filteredSchedules);

  return (
    <div className="schedules">
      <h3 className="schedules-title">내 여행 일정</h3>
      <div className="schedules-control">
        <div className="schedules-pagination">
          <p>페이지 수({limit})</p>
          <ul className="schedules-pagination-container">
            {/* 고정인 경우 */}
            {/* {limitArray.map((limit) => (
              <li
                className="schedules-pagination-item"
                data-pageNum={limit}
                key={limit}
                onClick={(e) => handlePagination(e)}
              >
                {limit}
              </li>
            ))} */}

            {/* 가변인 경우 */}
            <li className="schedules-pagination-item">
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
            </li>
          </ul>
        </div>
        <div className="schedules-right">
          <div className="schedules-sort">
            <ul className="schedules-sort-container">
              <li
                className="schedules-sort-item"
                key={"areacode"}
                id="areacode"
              >
                <p>지역순</p>

                <ul className="schedules-sort-dropdown-container">
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"areacode0"}
                    onClick={() => areacodeSortIncl()}
                  >
                    지역코드순서: 오름차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"areacode1"}
                    onClick={() => areacodeSortDecl()}
                  >
                    지역코드순서: 내림차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"areacode2"}
                    onClick={areaNameSortIncl}
                  >
                    지역이름순서: 오름차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"areacode3"}
                    onClick={areaNameSortDecl}
                  >
                    지역이름순서: 내림차순
                  </li>
                </ul>
              </li>
              <li className="schedules-sort-item" key={"date"} id="date">
                <p>일정순</p>

                <ul className="schedules-sort-dropdown-container">
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"date0"}
                    onClick={startDateSortIncl}
                  >
                    일정시작날짜: 오름차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"date1"}
                    onClick={startDateSortDecl}
                  >
                    일정시작날짜: 내림차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"date2"}
                    onClick={durationSortIncl}
                  >
                    일정기간기준: 오름차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"date3"}
                    onClick={durationSortDecl}
                  >
                    일정기간기준: 내림차순
                  </li>
                </ul>
              </li>
              <li
                className="schedules-sort-item"
                key={"register"}
                id="register"
              >
                <p>등록일</p>

                <ul className="schedules-sort-dropdown-container">
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"register0"}
                    onClick={registerDateSortIncl}
                  >
                    등록일기준: 오름차순
                  </li>
                  <li
                    className="schedules-sort-dropdown-item"
                    key={"register1"}
                    onClick={registerDateSortDecl}
                  >
                    등록일기준: 내림차순
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="schedules-more" title="설정" onClick={handleOpen}>
            <FiMoreVertical />
            {isOpen && (
              <ul className="schedules-more-container">
                <li
                  className="schedules-more-item"
                  key={"delete"}
                  onClick={handleShowDelete}
                >
                  {!showDelete && "삭제"}
                  {showDelete && "삭제 취소"}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          showDelete ? "schedules-deletion-active" : "schedules-deletion"
        }
      >
        <span className="schedules-deletion-item" onClick={handleDelete}>
          삭제
        </span>
        <span className="schedules-deletion-item" onClick={handleSelectAll}>
          일괄 선택
        </span>
        <span
          className="schedules-deletion-item"
          onClick={() => setShowDelete(false)}
        >
          삭제 취소
        </span>
      </div>
      <div className="schedules-cards">
        <ul className="schedules-cards-container">
          {filteredSchedules.length === 0 && (
            <>
              <div className="schedules-cards-logo">
                <img src={`/images/trip-it-logo.png`} alt="" />
                <p>검색결과가 없습니다.</p>
              </div>
            </>
          )}
          {filteredSchedules
            .slice(offset, offset + limit)
            .map((schedule, index) => (
              <SchedulesCard
                schedule={schedule}
                key={index}
                showDelete={showDelete}
                setShowDelete={setShowDelete}
                deletions={deletions}
                setDeletions={setDeletions}
              />
            ))}
        </ul>
      </div>
      <div className="schedules-search">
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
      <div className="schedules-pagination-bottom">
        <Pagination
          total={schedules.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default Schedules;
